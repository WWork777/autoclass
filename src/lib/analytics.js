"use client";

// Единая точка аналитики. Пушит события в window.dataLayer (GTM/GA4/Метрика
// совместимый формат) — если на проекте позже подключат Google Tag Manager
// или Яндекс.Метрику, события уже будут доступны без переписывания кода.
// Второй системы аналитики намеренно не создаётся.

export function track(event, payload = {}) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload, ts: Date.now() });

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", event, payload);
  }
}
