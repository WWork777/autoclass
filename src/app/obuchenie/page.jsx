import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PROGRAMS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Обучение вождению в Кемерово — категории B, A, переподготовка | Автокласс",
  description: "Все программы обучения в автошколе «Автокласс»: права категории B (МКПП и АКПП), категория A, переподготовка с C на B и с D на B. Цены, сроки, автодром.",
  path: "/obuchenie/",
});

const LINKS = [
  { href: "/obuchenie/kategoriya-b/", program: PROGRAMS[0], desc: "Легковой автомобиль, механика или автомат" },
  { href: "/obuchenie/kategoriya-a/", program: PROGRAMS[1], desc: "Обучение вождению мотоцикла" },
  { href: "/obuchenie/perepodgotovka-s-na-b/", program: PROGRAMS[2], desc: "Для водителей грузовых автомобилей" },
  { href: "/obuchenie/perepodgotovka-d-na-b/", program: PROGRAMS[3], desc: "Для водителей автобусов" },
];

export default function ObucheniePage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/obuchenie/", label: "Обучение" }]} />
        <PageHeader
          kicker="Обучение вождению"
          title="Программы обучения в автошколе «Автокласс»"
          intro="Выберите категорию — на странице каждой программы стоимость, часы теории и вождения, срок обучения и инструкторы."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-asphalt-700 border border-asphalt-700">
            {LINKS.map((item, i) => (
              <Reveal key={item.href} delay={i * 0.06} className="bg-asphalt-950 p-8 sm:p-10">
                <Link href={item.href} className="group block">
                  <span className="font-mono text-fog-dim text-sm">{item.program.code}</span>
                  <h2 className="font-display uppercase text-2xl sm:text-3xl mt-2 group-hover:text-line transition-colors">
                    {item.program.title}
                  </h2>
                  <p className="mt-2 text-fog-dim text-sm">{item.desc}</p>
                  <div className="mt-6 flex items-baseline justify-between border-t border-asphalt-700 pt-4">
                    <span className="font-mono text-2xl text-accent-red">{item.program.price}</span>
                    <span className="font-mono text-xs uppercase text-fog-dim group-hover:text-fog transition-colors">Подробнее →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-16">
          <Reveal>
            <p className="text-fog-dim max-w-2xl">
              Точную стоимость и способы оплаты смотрите на странице{" "}
              <Link href="/tseny/" className="text-blue hover:text-line transition-colors">цен</Link>.
              Все занятия проходят на собственном{" "}
              <Link href="/avtodrom/" className="text-blue hover:text-line transition-colors">автодроме школы</Link>{" "}
              с опытными{" "}
              <Link href="/instruktory/" className="text-blue hover:text-line transition-colors">инструкторами</Link>.
            </p>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Не уверены, какая категория нужна?"
        text="Пройдите короткий подбор — учтём опыт вождения и желаемые сроки."
        ctaLabel="Подобрать обучение"
        kind="quiz"
        ctaId="obuchenie_quiz"
        leadProps={{ source: "obuchenie_page" }}
      />
      <Footer />
    </>
  );
}
