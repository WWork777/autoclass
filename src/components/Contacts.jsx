"use client";

import { SITE } from "@/lib/data";
import Reveal from "./Reveal";
import LeadButton from "./leads/LeadButton";

export default function Contacts() {
  return (
    <section id="contacts" className="bg-asphalt-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <Reveal>
            <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Контакты</span>
            <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 text-balance">
              Приходите с вопросами
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div>
              <h3 className="font-display uppercase text-sm tracking-widest text-fog-dim">Телефоны</h3>
              <div className="mt-4 flex flex-col gap-2">
                {SITE.phonesFooter.map((p) => (
                  <a key={p.href} href={p.href} className="font-mono text-lg hover:text-line transition-colors">
                    {p.label}
                  </a>
                ))}
              </div>
              <a href={`mailto:${SITE.email}`} className="mt-4 block font-mono text-fog-dim hover:text-line transition-colors">
                {SITE.email}
              </a>
            </div>

            <div>
              <h3 className="font-display uppercase text-sm tracking-widest text-fog-dim">Филиалы</h3>
              <ul className="mt-4 flex flex-col gap-2 text-fog leading-relaxed">
                {SITE.addresses.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10 border-t border-asphalt-700 pt-8">
            <h3 className="font-display uppercase text-sm tracking-widest text-fog-dim">График работы</h3>
            <dl className="mt-4 grid grid-cols-2 gap-y-2 max-w-sm">
              <dt className="text-fog-dim text-sm">Лекции</dt>
              <dd className="font-mono text-sm">{SITE.hours.lectures}</dd>
              <dt className="text-fog-dim text-sm">Вечерние лекции</dt>
              <dd className="font-mono text-sm">{SITE.hours.evening}</dd>
              <dt className="text-fog-dim text-sm">Вождение</dt>
              <dd className="font-mono text-sm">{SITE.hours.driving}</dd>
            </dl>
          </Reveal>

          <Reveal delay={0.2}>
            <LeadButton
              kind="consultation"
              ctaId="contacts_apply"
              label="Оставить заявку"
              props={{ title: "Оставить заявку", source: "contacts_page" }}
              className="mt-10 inline-block font-display uppercase text-sm tracking-wider bg-line text-fog px-7 py-4 hover:bg-blue transition-colors"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1} className="relative min-h-[360px] lg:min-h-0 border border-asphalt-700 overflow-hidden">
          <iframe
            title="Автошкола Автокласс на карте Кемерово"
            src="https://yandex.ru/map-widget/v1/?text=Кемерово%20проспект%20Ленина%2052%20автошкола%20автокласс&z=14"
            className="absolute inset-0 h-full w-full grayscale-[40%] contrast-[1.05]"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
