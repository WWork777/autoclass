import { PAYMENTS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Payments() {
  return (
    <section className="relative bg-asphalt-950 py-28 sm:py-40 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/gallery7.jpg"
          alt="Команда автошколы Автокласс"
          className="h-full w-full object-cover grayscale-[35%] brightness-[0.32]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt-950 via-asphalt-950/70 to-asphalt-950/30" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Варианты оплаты</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-xl text-balance">
            Как удобно вам
          </h2>
        </Reveal>

        <div className="mt-16 max-w-2xl">
          {PAYMENTS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="flex gap-6 py-6 border-b border-fog/15">
              <span className="font-mono text-accent-red/80 text-sm pt-1 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display uppercase text-xl tracking-tight">{p.title}</h3>
                <p className="mt-2 text-fog-dim leading-relaxed text-sm max-w-md">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
