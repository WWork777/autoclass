"use client";

// Захват UTM/источника при первом визите и сохранение на весь сеанс,
// чтобы при переходе между страницами (и через какое угодно число кликов)
// заявка всё равно ушла с исходными utm_source/utm_medium/utm_campaign.

const STORAGE_KEY = "ak_utm_v1";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function captureUtm() {
  if (typeof window === "undefined") return;

  const params = new URLSearchParams(window.location.search);
  const hasNewUtm = UTM_KEYS.some((k) => params.has(k));

  let stored = readUtm();

  if (hasNewUtm || !stored) {
    const next = {
      landingPage: stored?.landingPage || window.location.pathname,
      referrer: stored?.referrer ?? document.referrer ?? "",
    };
    UTM_KEYS.forEach((k) => {
      next[k] = params.get(k) || stored?.[k] || "";
    });
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // sessionStorage может быть недоступен (приватный режим) — не критично
    }
  }
}

export function readUtm() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getUtmForLead() {
  const stored = readUtm() || {};
  return {
    landingPage: stored.landingPage || (typeof window !== "undefined" ? window.location.pathname : ""),
    referrer: stored.referrer || "",
    utm_source: stored.utm_source || "",
    utm_medium: stored.utm_medium || "",
    utm_campaign: stored.utm_campaign || "",
    utm_content: stored.utm_content || "",
    utm_term: stored.utm_term || "",
  };
}
