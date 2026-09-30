"use client";

import { normalizePhone } from "@/lib/phone";
import { getUtmForLead } from "@/lib/utm";
import { track } from "@/lib/analytics";

// Единая точка отправки заявки для всех форм сайта — SmartQuiz, ConsultationForm,
// CallbackForm, PriceLeadForm. Все формы формируют один и тот же объект лида
// и уходят через один и тот же API-эндпоинт POST /api/leads.
export async function submitLead({ source, ...fields }) {
  const phone = normalizePhone(fields.phone);
  if (!phone) {
    throw new Error("Некорректный номер телефона");
  }

  const utm = getUtmForLead();

  const payload = {
    name: (fields.name || "").trim(),
    phone,
    category: fields.category || "",
    transmission: fields.transmission || "",
    experience: fields.experience || "",
    desiredStart: fields.desiredStart || "",
    comment: fields.comment || "",
    source,
    ...utm,
    referrer: typeof document !== "undefined" ? document.referrer : "",
    timestamp: new Date().toISOString(),
    // honeypot — обычные пользователи это поле никогда не заполняют
    website: fields.website || "",
  };

  track("form_submit", { source, category: payload.category });

  const res = await fetch("/api/leads/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok || !data.ok) {
    track("form_error", { source, status: res.status });
    throw new Error(data.error || "Не удалось отправить заявку. Попробуйте ещё раз.");
  }

  track("form_success", { source, category: payload.category });
  return data;
}
