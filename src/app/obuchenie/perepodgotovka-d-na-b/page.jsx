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

const program = getProgram("db");
const faq = getFaqByTag("db");

export const metadata = buildMetadata({
  title: "Переподготовка с категории D на B в Кемерово — автошкола Автокласс",
  description: `Переподготовка водителей с категории D на B: ${program.price}, теория ${program.theory}, вождение ${program.driving}, срок обучения ${program.duration}.`,
  path: "/obuchenie/perepodgotovka-d-na-b/",
});

export default function PereD2BPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Переподготовка с категории D на B",
    description: metadata.description,
    provider: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
    offers: { "@type": "Offer", price: program.price.replace(/\D/g, ""), priceCurrency: "RUB", url: `${SITE_URL}/obuchenie/perepodgotovka-d-na-b/` },
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
            { href: "/obuchenie/perepodgotovka-d-na-b/", label: "Переподготовка D→B" },
          ]}
        />
        <PageHeader
          kicker="Переподготовка · с автобуса на легковой"
          title="Переподготовка с категории D на B в Кемерово"
          intro="Для водителей с действующей категорией D, которым нужны права на легковой автомобиль. Программа учитывает уже имеющийся опыт вождения."
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

        <div className="mx-auto max-w-4xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Вопросы про переподготовку</h2>
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
            <Link href="/obuchenie/perepodgotovka-s-na-b/" className="text-blue hover:text-line transition-colors text-sm">Переподготовка с C на B →</Link>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Готовы начать переподготовку?"
        text={`Первый взнос в рассрочку — ${SITE.deposit}. Оставьте заявку — расскажем о ближайшем старте.`}
        ctaLabel="Записаться на переподготовку"
        kind="consultation"
        ctaId="category_db_apply"
        leadProps={{ defaultCategory: "db", title: "Записаться на переподготовку", source: "category_db_page" }}
      />
      <Footer />
    </>
  );
}
