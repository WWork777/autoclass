import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { getFaqByTag, getProgram, SITE } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

const program = getProgram("a");
const faq = getFaqByTag("a");

export const metadata = buildMetadata({
  title: "Обучение на права категории A (мотоцикл) в Кемерово — Автокласс",
  description: `Права категории A в Кемерово: ${program.price}, теория ${program.theory}, вождение ${program.driving}, срок обучения ${program.duration}. Отработка манёвров на собственном автодроме.`,
  path: "/obuchenie/kategoriya-a/",
  ogImage: "/images/gallery3.jpg",
});

export default function KategoriyaAPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Обучение на права категории A",
    description: metadata.description,
    provider: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
    offers: { "@type": "Offer", price: program.price.replace(/\D/g, ""), priceCurrency: "RUB", url: `${SITE_URL}/obuchenie/kategoriya-a/` },
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
            { href: "/obuchenie/kategoriya-a/", label: "Категория A" },
          ]}
        />
        <PageHeader
          kicker="Категория A · мотоцикл"
          title="Обучение на права категории A в Кемерово"
          intro="Учим управлять мотоциклом с нуля: теория ПДД, отработка манёвров на автодроме и вождение перед экзаменом в ГИБДД."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <Reveal>
            <span className="text-fog-dim text-xs uppercase tracking-wide">Стоимость</span>
            <div className="font-mono text-4xl text-accent-red mt-2">{program.price}</div>
          </Reveal>
          <Reveal delay={0.05}>
            <span className="text-fog-dim text-xs uppercase tracking-wide">Теория / вождение</span>
            <div className="font-mono text-2xl mt-2">{program.theory} / {program.driving}</div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="text-fog-dim text-xs uppercase tracking-wide">Срок обучения</span>
            <div className="font-mono text-2xl mt-2">{program.duration}</div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal className="relative aspect-[16/9] overflow-hidden">
            <img src="/images/gallery3.jpg" alt="Обучение вождению мотоцикла на автодроме Автокласс" className="h-full w-full object-cover" />
          </Reveal>
          <Reveal delay={0.06} className="mt-6 max-w-2xl">
            <p className="text-fog-dim leading-relaxed">
              Практика проходит на собственном автодроме школы — с разметкой, знаками и светофорами, как в городе.
              Никаких очередей и простоев между занятиями.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-4xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Вопросы про категорию A</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-asphalt-700 border-t border-b border-asphalt-700">
            {faq.map((item) => (
              <div key={item.slug} className="py-5">
                <h3 className="font-display uppercase text-lg">{item.q}</h3>
                <p className="mt-3 text-fog-dim leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <Reveal delay={0.1} className="mt-6">
            <Link href="/faq/" className="text-blue hover:text-line transition-colors text-sm">Все вопросы →</Link>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Готовы начать обучение?"
        text={`Первый взнос в рассрочку — ${SITE.deposit}. Оставьте заявку — расскажем о ближайшем старте.`}
        ctaLabel="Записаться на обучение"
        kind="consultation"
        ctaId="category_a_apply"
        leadProps={{ defaultCategory: "a", title: "Записаться на обучение", source: "category_a_page" }}
      />
      <Footer />
    </>
  );
}
