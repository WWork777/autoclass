"use client";

import { useRef } from "react";
import Link from "next/link";
import { INSTRUCTORS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Instructors() {
  const scroller = useRef(null);
  const scrollBy = (dir) => scroller.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="instructors" className="bg-asphalt-950 py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Наша команда</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-2xl text-balance">
              Инструкторы, которые объясняют по-человечески
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Link href="/instruktory/" className="mt-3 inline-block font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors">
              Все инструкторы →
            </Link>
          </Reveal>
        </div>

        <div className="hidden sm:flex gap-2 shrink-0">
          <button
            aria-label="Прокрутить назад"
            onClick={() => scrollBy(-1)}
            className="w-11 h-11 border border-asphalt-700 flex items-center justify-center hover:border-line hover:text-line transition-colors"
          >
            ←
          </button>
          <button
            aria-label="Прокрутить вперёд"
            onClick={() => scrollBy(1)}
            className="w-11 h-11 border border-asphalt-700 flex items-center justify-center hover:border-line hover:text-line transition-colors"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-14 flex gap-4 overflow-x-auto px-5 sm:px-8 pb-4 snap-x snap-mandatory"
      >
        {INSTRUCTORS.map((ins, i) => (
          <Reveal
            key={ins.slug}
            delay={Math.min(i * 0.04, 0.3)}
            className="group relative snap-start shrink-0 w-[260px] sm:w-[300px] aspect-[3/4.2] overflow-hidden bg-asphalt-900"
          >
            <Link href={`/instruktory/${ins.slug}/`} className="block h-full w-full">
              <img
                src={ins.photo}
                alt={ins.name}
                className="portrait-fade absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/40 to-transparent" />

              <span className="absolute top-5 left-5 font-mono text-fog-dim text-xs">{String(i + 1).padStart(2, "0")}</span>

              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display uppercase text-xl leading-tight text-fog">{ins.name}</h3>
                <p className="mt-1 text-fog-dim text-sm">Стаж {ins.years}</p>

                <div className="mt-3 max-h-0 overflow-hidden opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-focus-within:max-h-24 group-focus-within:opacity-100 transition-all duration-400 ease-out">
                  <dl className="border-t border-fog/15 pt-3 space-y-1.5">
                    <div className="flex justify-between text-sm">
                      <dt className="text-fog-dim">Коробка</dt>
                      <dd className="font-mono text-accent-red">{ins.gearbox}</dd>
                    </div>
                    <div className="flex justify-between text-sm">
                      <dt className="text-fog-dim">Автомобиль</dt>
                      <dd className="font-mono text-fog text-right">{ins.car}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
