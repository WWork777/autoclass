// Маска +7 (___) ___-__-__, устойчивая к вставке номера из буфера обмена
// в любом формате (8912..., +7912..., 912..., с пробелами/скобками/тире).

export function digitsOnly(value) {
  return (value || "").replace(/\D/g, "");
}

// Приводит любой ввод к 10 цифрам после кода страны (без 7/8 в начале)
function toNationalDigits(raw) {
  let d = digitsOnly(raw);
  if (d.startsWith("8") && d.length === 11) d = "7" + d.slice(1);
  if (d.startsWith("7") && d.length === 11) d = d.slice(1);
  if (d.length > 10) d = d.slice(-10);
  return d;
}

export function formatPhoneInput(raw) {
  const d = toNationalDigits(raw);
  if (!d) return "";

  let out = "+7";
  if (d.length > 0) out += ` (${d.slice(0, 3)}`;
  if (d.length >= 3) out += `)`;
  if (d.length > 3) out += ` ${d.slice(3, 6)}`;
  if (d.length > 6) out += `-${d.slice(6, 8)}`;
  if (d.length > 8) out += `-${d.slice(8, 10)}`;
  return out;
}

// Нормализованный вид для отправки на сервер / в Telegram: +7XXXXXXXXXX
export function normalizePhone(raw) {
  const d = toNationalDigits(raw);
  if (d.length !== 10) return null;
  return `+7${d}`;
}

export function isValidPhone(raw) {
  return normalizePhone(raw) !== null;
}
