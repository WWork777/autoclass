import Link from "next/link";
import { PROMOTIONS, SITE } from "@/lib/data";
import Reveal from "./Reveal";

export default function Promotions() {
  return (
    <section className="bg-paper text-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12 items-end">
          <Reveal>
            <span className="font-mono text-accent-red text-sm tracking-[0.3em] uppercase">Наши акции</span>
            <h2 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95] mt-4 text-balance">
              Выгоднее для тех, кто рядом
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-ink/15 pb-8">
            <p className="text-paper-dim max-w-sm">Успейте записаться до конца месяца и получите приятный бонус к обучению.</p>
            <a
              href={SITE.phoneHref}
              className="shrink-0 font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-3.5 hover:bg-blue transition-colors"
            >
              Записаться
            </a>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-10">
          {PROMOTIONS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="border-t border-ink/15 pt-6">
              <h3 className="font-display uppercase text-xl tracking-tight text-accent-red">{p.title}</h3>
              <p className="mt-3 text-paper-dim leading-relaxed text-sm">{p.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <Link href="/aktsii/" className="text-line hover:opacity-70 transition-opacity text-sm">Все акции →</Link>
        </Reveal>
      </div>
    </section>
  );
}
