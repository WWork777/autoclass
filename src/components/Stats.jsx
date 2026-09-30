import { STATS } from "@/lib/data";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

export default function Stats() {
  return (
    <section className="relative bg-asphalt-950 overflow-hidden">
      <div className="absolute inset-0 opacity-25">
        <img src="/images/gallery5.jpg" alt="" className="h-full w-full object-cover grayscale" />
        <div className="absolute inset-0 bg-asphalt-950/80" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 py-28 sm:py-36 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-6">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.1} className={`${i !== 0 ? "sm:border-l sm:border-fog/15 sm:pl-8" : ""}`}>
            <div className="font-display text-6xl sm:text-7xl lg:text-8xl text-fog leading-none">
              <CountUp value={s.value} />
            </div>
            <div className="mt-4 text-fog-dim uppercase text-sm tracking-widest max-w-[18ch]">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
