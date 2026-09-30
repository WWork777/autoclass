import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { JOURNEY, INSTRUCTORS, getFaqByTag, getProgram, SITE } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const program = getProgram("b");
const faq = getFaqByTag("b");

export const metadata = buildMetadata({
  title: "Обучение на права категории B в Кемерово — автошкола «Автокласс»",
  description: `Права категории B в Кемерово: ${program.price}, теория ${program.theory}, вождение ${program.driving}, срок обучения ${program.duration}. МКПП и АКПП, собственный автодром, сопровождение на экзамене ГИБДД.`,
  path: "/obuchenie/kategoriya-b/",
});

export default function KategoriyaBPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Обучение на права категории B",
    description: metadata.description,
    provider: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
    offers: {
      "@type": "Offer",
      price: program.price.replace(/\D/g, ""),
      priceCurrency: "RUB",
      url: `${SITE_URL}/obuchenie/kategoriya-b/`,
    },
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/obuchenie/", label: "Обучение" },
            { href: "/obuchenie/kategoriya-b/", label: "Категория B" },
          ]}
        />
        <PageHeader
          kicker="Категория B · легковой автомобиль"
          title="Обучение на права категории B в Кемерово"
          intro="Учим вождению легкового автомобиля на механике и автомате. Собственный автодром, сопровождение на экзамене ГИБДД, рассрочка 0%."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">
          <Reveal className="bg-asphalt-900 border border-asphalt-700 p-8 sm:p-10">
            <h2 className="font-display uppercase text-2xl">Стоимость и сроки</h2>
            <div className="font-mono text-5xl text-accent-red mt-6">{program.price}</div>
            <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-asphalt-700 pt-6">
              <div>
                <dt className="text-fog-dim text-xs uppercase">Теория</dt>
                <dd className="font-mono text-lg mt-1">{program.theory}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Вождение</dt>
                <dd className="font-mono text-lg mt-1">{program.driving}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Срок</dt>
                <dd className="font-mono text-lg mt-1">{program.duration}</dd>
              </div>
            </dl>
            <p className="mt-6 text-fog-dim text-sm">
              Цены и способы оплаты, включая рассрочку 0% и материнский капитал — на странице{" "}
              <Link href="/tseny/" className="text-blue hover:text-line transition-colors">«Цены»</Link>.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="bg-asphalt-900 border border-asphalt-700 p-8 sm:p-10">
            <h2 className="font-display uppercase text-2xl">Выберите коробку передач</h2>
            <p className="mt-3 text-fog-dim text-sm">Обучаем и на механике, и на автомате — выбираете при записи на курс.</p>
            <div className="mt-8 grid grid-cols-1 gap-3">
              <Link href="/obuchenie/kategoriya-b/mkpp/" className="group flex items-center justify-between border border-asphalt-700 px-5 py-4 hover:border-line transition-colors">
                <span className="font-display uppercase text-lg">Механика (МКПП)</span>
                <span className="font-mono text-xs text-fog-dim group-hover:text-line transition-colors">Подробнее →</span>
              </Link>
              <Link href="/obuchenie/kategoriya-b/akpp/" className="group flex items-center justify-between border border-asphalt-700 px-5 py-4 hover:border-line transition-colors">
                <span className="font-display uppercase text-lg">Автомат (АКПП)</span>
                <span className="font-mono text-xs text-fog-dim group-hover:text-line transition-colors">Подробнее →</span>
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Этапы обучения</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {JOURNEY.map((stop, i) => (
              <Reveal key={stop.n} delay={i * 0.06}>
                <span className="font-mono text-accent-red text-sm">{stop.n}</span>
                <h3 className="font-display uppercase text-xl mt-2">{stop.stage}</h3>
                <p className="mt-2 text-fog-dim text-sm leading-relaxed">{stop.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-6">
            <Link href="/avtodrom/" className="text-blue hover:text-line transition-colors text-sm">
              Подробнее про автодром школы →
            </Link>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Документы для обучения</h2>
            <p className="mt-4 max-w-2xl text-fog-dim leading-relaxed">
              Паспорт, медицинская справка установленного образца и фотографии для личного дела. Медицинская справка
              действует 12 месяцев с даты выдачи — важно успеть сдать экзамен ГИБДД в этот срок.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal className="flex items-end justify-between gap-6">
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Инструкторы категории B</h2>
            <Link href="/instruktory/" className="font-mono text-xs uppercase text-fog-dim hover:text-line transition-colors shrink-0">
              Все инструкторы →
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INSTRUCTORS.slice(0, 4).map((ins, i) => (
              <Reveal key={ins.slug} delay={i * 0.05}>
                <Link href={`/instruktory/${ins.slug}/`} className="group block relative aspect-[3/4] overflow-hidden bg-asphalt-900">
                  <img src={ins.photo} alt={ins.name} className="portrait-fade absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 font-display uppercase text-sm text-fog leading-tight">{ins.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Вопросы про категорию B</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-asphalt-700 border-t border-b border-asphalt-700">
            {faq.map((item) => (
              <details key={item.slug} className="group py-5">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-display uppercase text-lg">
                  {item.q}
                  <span className="font-mono text-accent-red shrink-0">+</span>
                </summary>
                <p className="mt-3 text-fog-dim leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-4">
            <Link href="/faq/" className="text-blue hover:text-line transition-colors text-sm">Все вопросы →</Link>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Готовы начать обучение?"
        text={`Первый взнос в рассрочку — ${SITE.deposit}. Оставьте заявку — расскажем о ближайшем старте.`}
        ctaLabel="Записаться на обучение"
        kind="consultation"
        ctaId="category_b_apply"
        leadProps={{ defaultCategory: "b", title: "Записаться на обучение", source: "category_b_page" }}
      />
      <Footer />
    </>
  );
}
