import Link from "next/link";
import { FAQ } from "@/lib/data";
import Reveal from "./Reveal";
import FaqAccordion from "./FaqAccordion";

export default function Faq() {
  return (
    <section id="faq" className="bg-paper text-ink py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <span className="font-mono text-accent-red text-sm tracking-[0.3em] uppercase">Вопросы</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 text-balance">
            Частые вопросы новичков
          </h2>
        </Reveal>

        <FaqAccordion items={FAQ} className="mt-14" />

        <Reveal delay={0.1} className="mt-6">
          <Link href="/faq/" className="text-line hover:opacity-70 transition-opacity text-sm">Все вопросы →</Link>
        </Reveal>
      </div>
    </section>
  );
}
