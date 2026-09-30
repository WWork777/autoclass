import Link from "next/link";
import { GALLERY } from "@/lib/data";
import Reveal from "./Reveal";

export default function Gallery() {
  const preview = GALLERY.slice(0, 6);

  return (
    <section id="gallery" className="bg-asphalt-950 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-end justify-between gap-6">
        <div>
          <Reveal>
            <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Фотогалерея</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-2xl text-balance">
              Команда, ученики, автомобили
            </h2>
          </Reveal>
        </div>
        <Link href="/galereya/" className="hidden sm:block font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors shrink-0">
          Вся галерея →
        </Link>
      </div>

      <div className="mt-14 mx-auto max-w-7xl px-5 sm:px-8 columns-2 sm:columns-3 gap-2 sm:gap-3 [column-fill:balance]">
        {preview.map((src, i) => (
          <Reveal
            key={src}
            delay={Math.min(i * 0.05, 0.3)}
            className="group relative mb-2 sm:mb-3 overflow-hidden break-inside-avoid cursor-pointer"
          >
            <img
              src={src}
              alt="Фото из автошколы Автокласс"
              loading="lazy"
              className="w-full h-auto object-cover grayscale group-hover:grayscale-0 scale-100 group-hover:scale-[1.06] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-fog/0 group-hover:ring-fog/20 transition-all duration-500" />
          </Reveal>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-6 sm:hidden">
        <Link href="/galereya/" className="font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors">
          Вся галерея →
        </Link>
      </div>
    </section>
  );
}
