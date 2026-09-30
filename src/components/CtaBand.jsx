"use client";

import { SITE } from "@/lib/data";
import Reveal from "./Reveal";
import LeadButton from "./leads/LeadButton";
import { track } from "@/lib/analytics";

// Универсальный CTA-блок для внутренних страниц. По умолчанию открывает
// консультацию, но каждая страница передаёт свой kind/label/leadProps,
// чтобы кнопка соответствовала намерению страницы (не "Записаться" везде).
export default function CtaBand({
  title = "Остались вопросы?",
  text = "Позвоните нам — расскажем про обучение и запишем на удобное время.",
  ctaLabel = "Оставить заявку",
  kind = "consultation",
  ctaId,
  leadProps,
}) {
  return (
    <section className="bg-asphalt-900 py-20 sm:py-28">
      <Reveal className="mx-auto max-w-7xl px-5 sm:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
        <div>
          <h2 className="font-display uppercase text-3xl sm:text-4xl leading-tight max-w-md">{title}</h2>
          <p className="mt-3 text-fog-dim max-w-md">{text}</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full sm:w-auto">
          <LeadButton
            kind={kind}
            ctaId={ctaId}
            props={leadProps}
            label={ctaLabel}
            className="font-display uppercase text-sm tracking-wider bg-line text-fog px-7 py-4 hover:bg-blue transition-colors"
          />
          <a
            href={SITE.phoneHref}
            onClick={() => track("phone_click", { source: "cta_band" })}
            className="font-mono text-sm text-fog-dim border border-asphalt-700 px-5 py-4 text-center hover:text-fog hover:border-fog transition-colors"
          >
            {SITE.phone}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
