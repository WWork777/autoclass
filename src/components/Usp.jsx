import { USP } from "@/lib/data";
import Reveal from "./Reveal";
import LeadButton from "./leads/LeadButton";

export default function Usp() {
  return (
    <section className="relative bg-paper text-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <span className="font-mono text-accent-red text-sm tracking-[0.3em] uppercase">Почему Автокласс</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.92] mt-4 max-w-lg text-balance">
              Одна из самых опытных школ в городе
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <LeadButton
              kind="quiz"
              ctaId="usp_pick_program"
              label="Подобрать обучение"
              className="mt-8 inline-block font-display uppercase text-sm tracking-wider bg-line text-fog px-7 py-4 hover:bg-blue transition-colors"
            />
          </Reveal>
          <Reveal delay={0.1} className="mt-10 relative aspect-[4/5] overflow-hidden hidden lg:block">
            <img
              src="/images/gallery2.jpg"
              alt="Ученик автошколы Автокласс за рулём"
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>

        <div>
          {USP.map((item, i) => (
            <Reveal key={item.n} delay={i * 0.06}>
              <div className="flex gap-6 py-9 border-b border-ink/15">
                <span className="font-mono text-2xl text-accent-red/70 shrink-0 pt-1">{item.n}</span>
                <div>
                  <h3 className="font-display uppercase text-2xl sm:text-3xl tracking-tight">{item.title}</h3>
                  <p className="mt-3 text-paper-dim leading-relaxed max-w-md">{item.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
