"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { PROGRAMS, SITE } from "@/lib/data";
import Reveal from "./Reveal";
import LeadButton from "./leads/LeadButton";

const CATEGORY_LINKS = {
  b: "/obuchenie/kategoriya-b/",
  a: "/obuchenie/kategoriya-a/",
  cb: "/obuchenie/perepodgotovka-s-na-b/",
  db: "/obuchenie/perepodgotovka-d-na-b/",
};

export default function Programs() {
  const [active, setActive] = useState(PROGRAMS[0].id);
  const [gearbox, setGearbox] = useState(PROGRAMS[0].gearbox[0]);
  const program = PROGRAMS.find((p) => p.id === active);

  return (
    <section id="programs" className="relative bg-asphalt-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Услуги и цены</span>
        </Reveal>
        <Reveal delay={0.05} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-3xl text-balance">
            Цены окончательные. Без доплат
          </h2>
          <div className="flex flex-col items-start sm:items-end gap-3 shrink-0">
            <LeadButton
              kind="price"
              ctaId="programs_price"
              label="Узнать стоимость"
              className="font-mono text-fog border border-asphalt-700 px-5 py-4 hover:border-line hover:text-line transition-colors"
            />
            <Link href="/tseny/" className="font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors">
              Все цены и оплата →
            </Link>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
          <Reveal className="flex flex-col gap-2">
            {PROGRAMS.map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  setActive(p.id);
                  setGearbox(p.gearbox[0]);
                }}
                aria-pressed={active === p.id}
                className={`group text-left border-b border-asphalt-700 py-6 flex items-center justify-between transition-colors ${
                  active === p.id ? "text-line" : "text-fog hover:text-fog-dim"
                }`}
              >
                <span>
                  <span className="font-mono text-sm block text-fog-dim">{p.code}</span>
                  <span className="font-display uppercase text-2xl sm:text-3xl tracking-tight">{p.title}</span>
                </span>
                <span className="font-mono text-xl sm:text-2xl tabular-nums">{p.price}</span>
              </button>
            ))}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative bg-asphalt-900 border border-asphalt-700 p-8 sm:p-10 sticky top-24 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={program.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex items-baseline justify-between">
                    <h3 className="font-display uppercase text-3xl">{program.title}</h3>
                    <span className="font-mono text-fog-dim text-sm">{program.subtitle}</span>
                  </div>

                  <div className="font-mono text-5xl sm:text-6xl text-accent-red mt-8 tabular-nums">{program.price}</div>

                  <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-asphalt-700 pt-8">
                    <div>
                      <dt className="text-fog-dim text-xs uppercase tracking-wide">Теория</dt>
                      <dd className="font-mono text-lg mt-1">{program.theory}</dd>
                    </div>
                    <div>
                      <dt className="text-fog-dim text-xs uppercase tracking-wide">Вождение</dt>
                      <dd className="font-mono text-lg mt-1">{program.driving}</dd>
                    </div>
                    <div>
                      <dt className="text-fog-dim text-xs uppercase tracking-wide">Срок</dt>
                      <dd className="font-mono text-lg mt-1">{program.duration}</dd>
                    </div>
                  </dl>

                  {program.gearbox.length > 1 ? (
                    <div className="mt-6 inline-flex border border-asphalt-700">
                      {program.gearbox.map((g) => (
                        <button
                          key={g}
                          onClick={() => setGearbox(g)}
                          aria-pressed={gearbox === g}
                          className={`font-mono text-xs uppercase px-4 py-2 transition-colors ${
                            gearbox === g ? "bg-line text-fog" : "text-fog-dim hover:text-fog"
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 flex gap-2">
                      <span className="font-mono text-xs uppercase border border-asphalt-700 px-3 py-1.5 text-fog-dim">
                        {program.gearbox[0]}
                      </span>
                    </div>
                  )}

                  <a
                    href={SITE.phoneHref}
                    className="mt-10 block text-center font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 hover:bg-blue transition-colors"
                  >
                    Записаться на обучение
                  </a>
                  <Link
                    href={CATEGORY_LINKS[program.id]}
                    className="mt-4 block text-center font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors"
                  >
                    Подробнее о программе →
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
