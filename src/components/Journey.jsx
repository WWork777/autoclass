import Link from "next/link";
import { JOURNEY } from "@/lib/data";
import Reveal from "./Reveal";

export default function Journey() {
  return (
    <section className="bg-asphalt-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Как проходит обучение</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-2xl text-balance">
            От теории до прав — четыре шага
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {JOURNEY.map((stop, i) => (
            <Reveal key={stop.n} delay={i * 0.08}>
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={stop.image}
                  alt={stop.stage}
                  loading="lazy"
                  className="h-full w-full object-cover grayscale-[15%]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950/85 via-asphalt-950/10 to-transparent" />
                <span className="absolute top-4 left-4 font-mono text-accent-red text-sm">{stop.n}</span>
                <h3 className="absolute bottom-5 left-5 font-display uppercase text-2xl text-fog">{stop.stage}</h3>
              </div>
              <p className="mt-4 text-fog-dim text-sm leading-relaxed">{stop.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-8">
          <Link href="/avtodrom/" className="text-blue hover:text-line transition-colors text-sm">
            Подробнее про автодром →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
