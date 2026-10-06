import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getProgram } from "@/lib/data";

const LEADS_EMAIL = "autoklass@yandex.ru";

// Прямое соединение с api.telegram.org с этого сервера часто рвётся по
// таймауту/ENETUNREACH — используем проксирующий Cloudflare Worker.
const TELEGRAM_API_BASE = "https://tg-proxy.parsikovevgenij470.workers.dev";

// Единый эндпоинт для всех форм сайта (SmartQuiz, ConsultationForm,
// CallbackForm, PriceLeadForm, ExitIntent, FinalCta, StickyCta).
// Никакой другой формы/роута для заявок в проекте быть не должно.

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// Простой in-memory лимитер по IP. Достаточно для одного инстанса Node.
// На serverless с несколькими инстансами это не защитит на 100% — при
// росте нагрузки нужен внешний стор (Redis/Upstash) — см. CONVERSION-AUDIT.md.
const hits = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > RATE_LIMIT_MAX;
}

function normalizePhoneServer(raw) {
  let d = (raw || "").replace(/\D/g, "");
  if (d.startsWith("8") && d.length === 11) d = "7" + d.slice(1);
  if (d.length === 10) d = "7" + d;
  if (d.length !== 11 || !d.startsWith("7")) return null;
  return `+${d}`;
}

const CATEGORY_LABELS = { b: "Категория B", a: "Категория A", cb: "Переподготовка C→B", db: "Переподготовка D→B" };

// Соединение с api.telegram.org с этого сервера иногда обрывается по таймауту —
// поэтому у запроса есть таймаут и одна повторная попытка, и ошибка сети
// никогда не должна ронять сохранение заявки для пользователя.
async function telegramSendMessage(token, chatId, text) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(`${TELEGRAM_API_BASE}/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
      signal: controller.signal,
    });
    if (!res.ok) {
      console.error("[leads] Telegram ответил ошибкой", res.status, await res.text().catch(() => ""));
      return false;
    }
    return true;
  } catch (err) {
    console.error("[leads] Ошибка сети при отправке в Telegram", err?.message || err);
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

// Данные заявки уходят только на почту; в Telegram — уведомление без
// персональных данных.
async function sendToEmail(lead) {
  const password = process.env.EMAIL_PASSWORD;

  if (!password) {
    // Интеграция не настроена в этом окружении — не роняем заявку,
    // но явно логируем, чтобы это было видно в проде до подключения пароля.
    console.warn("[leads] EMAIL_PASSWORD не задан — заявка не отправлена на почту", lead);
    return false;
  }

  const categoryProgram = lead.category ? getProgram(lead.category) : null;
  const categoryLabel = categoryProgram?.title || CATEGORY_LABELS[lead.category] || "—";

  const utmLine = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
    .filter(Boolean)
    .join(" / ") || "—";

  const text = [
    "Новая заявка с сайта",
    "",
    `Имя: ${lead.name}`,
    `Телефон: ${lead.phone}`,
    "",
    `Категория: ${categoryLabel}`,
    `Коробка: ${lead.transmission || "—"}`,
    `Опыт: ${lead.experience || "—"}`,
    `Желаемый старт: ${lead.desiredStart || "—"}`,
    lead.comment ? `\nКомментарий: ${lead.comment}` : "",
    "",
    `Страница: ${lead.landingPage || "—"}`,
    `Источник: ${lead.source || "—"}`,
    `UTM: ${utmLine}`,
  ].filter(Boolean).join("\n");

  const transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true,
    auth: { user: LEADS_EMAIL, pass: password },
    connectionTimeout: 8000,
    socketTimeout: 8000,
    // На этом сервере нет маршрута IPv6 — без family:4 nodemailer пытается
    // подключиться по IPv6-адресу из DNS и падает с ENETUNREACH.
    family: 4,
  });

  try {
    await transporter.sendMail({
      from: `"Сайт Автокласс" <${LEADS_EMAIL}>`,
      to: LEADS_EMAIL,
      subject: `Новая заявка: ${lead.name}, ${lead.phone}`,
      text,
    });
    return true;
  } catch (err) {
    // Заявка на почту не ушла — оставляем её в логах, чтобы не потерять.
    console.error("[leads] Ошибка отправки заявки на почту", err?.message || err, lead);
    return false;
  }
}

async function notifyTelegram(lead, emailDelivered) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[leads] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID не заданы — уведомление в Telegram не отправлено");
    return;
  }

  const utmLine = [lead.utm_source, lead.utm_medium, lead.utm_campaign]
    .filter(Boolean)
    .join(" / ") || "—";

  const statusLine = emailDelivered
    ? `🚗 Новая заявка на сайте. Подробности — на почте ${LEADS_EMAIL}`
    : "⚠️ Новая заявка на сайте, но письмо на почту не доставлено. Данные заявки — в логах сервера.";

  const text = [
    statusLine,
    "",
    `Страница: ${lead.landingPage || "—"}`,
    `Источник: ${lead.source || "—"}`,
    `UTM: ${utmLine}`,
  ].join("\n");

  const sent = await telegramSendMessage(token, chatId, text);
  if (!sent) {
    // одна повторная попытка при сетевом сбое/таймауте
    await telegramSendMessage(token, chatId, text);
  }
}

export async function POST(request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Слишком много заявок подряд. Попробуйте немного позже." },
      { status: 429 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный запрос." }, { status: 400 });
  }

  // Honeypot: обычные пользователи это поле никогда не заполняют.
  if (body.website) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  const name = (body.name || "").trim();
  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Укажите имя." }, { status: 400 });
  }

  const phone = normalizePhoneServer(body.phone);
  if (!phone) {
    return NextResponse.json({ ok: false, error: "Некорректный номер телефона." }, { status: 400 });
  }

  const lead = {
    name,
    phone,
    category: body.category || "",
    transmission: body.transmission || "",
    experience: body.experience || "",
    desiredStart: body.desiredStart || "",
    comment: (body.comment || "").trim(),
    source: body.source || "",
    utm_source: body.utm_source || "",
    utm_medium: body.utm_medium || "",
    utm_campaign: body.utm_campaign || "",
    landingPage: body.landingPage || "",
  };

  let delivered = false;
  try {
    delivered = await sendToEmail(lead);
    await notifyTelegram(lead, delivered);
  } catch (err) {
    console.error("[leads] Непредвиденная ошибка при отправке заявки", err?.message || err);
  }

  // Заявка считается принятой в любом случае — сбой доставки на почту
  // не должен показывать пользователю ошибку отправки.
  return NextResponse.json({ ok: true, delivered });
}
