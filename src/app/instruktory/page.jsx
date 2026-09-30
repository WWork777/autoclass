import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { INSTRUCTORS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Инструкторы по вождению в Кемерово — автошкола «Автокласс»",
  description: "6 инструкторов автошколы «Автокласс» в Кемерово: стаж от 6 до 31 года, обучение на механике и автомате. Hyundai Solaris, Toyota Corolla, Lada Vesta.",
  path: "/instruktory/",
});

export default function InstruktoryPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/instruktory/", label: "Инструкторы" }]} />
        <PageHeader
          kicker="Наша команда"
          title="Инструкторы по вождению в Кемерово"
          intro="Шесть инструкторов автошколы «Автокласс» — стаж вождения от 6 до 31 года, обучение на механике и автомате."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INSTRUCTORS.map((ins, i) => (
            <Reveal key={ins.slug} delay={Math.min(i * 0.05, 0.3)}>
              <Link href={`/instruktory/${ins.slug}/`} className="group block relative aspect-[3/4] overflow-hidden bg-asphalt-900">
                <img
                  src={ins.photo}
                  alt={ins.name}
                  className="portrait-fade absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="font-display uppercase text-base leading-tight text-fog">{ins.name}</h2>
                  <p className="mt-1 text-fog-dim text-xs">Стаж {ins.years} · {ins.gearbox}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </main>
      <CtaBand
        title="Не знаете, какого инструктора выбрать?"
        text="Ответьте на несколько вопросов — подберём программу и коробку передач."
        ctaLabel="Подобрать обучение"
        kind="quiz"
        ctaId="instruktory_quiz"
        leadProps={{ source: "instruktory_page" }}
      />
      <Footer />
    </>
  );
}
