import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { INSTRUCTORS, getFaqByTag, getProgram } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

const program = getProgram("b");
const instructors = INSTRUCTORS.filter((i) => i.gearbox === "АКПП");
const faq = getFaqByTag("akpp");

export const metadata = buildMetadata({
  title: "Обучение на права категории B на автомате (АКПП) в Кемерово",
  description: `Учим водить на автоматической коробке передач в Кемерово. Стоимость ${program.price}, теория ${program.theory}, вождение ${program.driving}.`,
  path: "/obuchenie/kategoriya-b/akpp/",
});

export default function AkppPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/obuchenie/", label: "Обучение" },
            { href: "/obuchenie/kategoriya-b/", label: "Категория B" },
            { href: "/obuchenie/kategoriya-b/akpp/", label: "АКПП" },
          ]}
        />
        <PageHeader
          kicker="Категория B · автомат"
          title="Обучение вождению на автомате в Кемерово"
          intro="Автоматическая коробка передач упрощает первые месяцы за рулём — не нужно думать о сцеплении и переключении передач, всё внимание на дорогу."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Reveal className="sm:col-span-1">
            <span className="text-fog-dim text-xs uppercase tracking-wide">Стоимость</span>
            <div className="font-mono text-4xl text-accent-red mt-2">{program.price}</div>
          </Reveal>
          <Reveal delay={0.05} className="sm:col-span-1">
            <span className="text-fog-dim text-xs uppercase tracking-wide">Теория / вождение</span>
            <div className="font-mono text-2xl mt-2">{program.theory} / {program.driving}</div>
          </Reveal>
          <Reveal delay={0.1} className="sm:col-span-1">
            <span className="text-fog-dim text-xs uppercase tracking-wide">Срок обучения</span>
            <div className="font-mono text-2xl mt-2">{program.duration}</div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Инструктор на автомате</h2>
            <Link href="/instruktory/" className="font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors shrink-0">
              Все инструкторы →
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {instructors.map((ins, i) => (
              <Reveal key={ins.slug} delay={i * 0.05}>
                <Link href={`/instruktory/${ins.slug}/`} className="group block relative aspect-[3/4] overflow-hidden bg-asphalt-900">
                  <img src={ins.photo} alt={ins.name} className="portrait-fade absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="font-display uppercase text-sm text-fog leading-tight block">{ins.name}</span>
                    <span className="font-mono text-xs text-fog-dim">{ins.car}</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 mt-20">
          {faq.map((item) => (
            <Reveal key={item.slug} className="border-t border-b border-asphalt-700 py-6">
              <h2 className="font-display uppercase text-xl">{item.q}</h2>
              <p className="mt-3 text-fog-dim leading-relaxed">{item.a}</p>
            </Reveal>
          ))}
          <Reveal delay={0.1} className="mt-6 flex flex-wrap gap-4">
            <Link href="/obuchenie/kategoriya-b/mkpp/" className="text-blue hover:text-line transition-colors text-sm">Обучение на механике (МКПП) →</Link>
            <Link href="/obuchenie/kategoriya-b/" className="text-blue hover:text-line transition-colors text-sm">Категория B — общая информация →</Link>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Записаться на обучение на автомате"
        text="Первый взнос в рассрочку — 5 000 ₽. Оставьте заявку — уточним ближайшую группу."
        ctaLabel="Записаться на обучение"
        kind="consultation"
        ctaId="category_b_akpp_apply"
        leadProps={{ defaultCategory: "b", title: "Записаться на автомат", source: "category_b_akpp_page" }}
      />
      <Footer />
    </>
  );
}
