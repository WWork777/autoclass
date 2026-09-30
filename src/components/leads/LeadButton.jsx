"use client";

import { useLeadModal } from "./LeadModalContext";
import { track } from "@/lib/analytics";

// Универсальная CTA-кнопка, открывающая нужную форму в модальном окне.
// kind: "quiz" | "consultation" | "callback" | "price"
export default function LeadButton({ kind, label, ctaId, props, className }) {
  const { open } = useLeadModal();

  return (
    <button
      type="button"
      onClick={() => {
        track("cta_click", { cta: ctaId || kind });
        open(kind, props);
      }}
      className={className}
    >
      {label}
    </button>
  );
}
