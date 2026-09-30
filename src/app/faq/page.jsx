import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import { FAQ } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Вопросы и ответы об обучении в автошколе «Автокласс»",
  description: "Как проходит обучение, какие нужны документы, сколько действует медсправка и обучают ли только на автомате — ответы на частые вопросы новичков автошколы «Автокласс».",
  path: "/faq/",
});

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main className="bg-paper text-ink pb-8 min-h-screen">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/faq/", label: "Вопросы" }]} />
        <div className="mx-auto max-w-4xl px-5 sm:px-8 pb-14">
          <Reveal>
            <span className="font-mono text-accent-red text-sm tracking-[0.3em] uppercase">Вопросы</span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 text-balance">
              Частые вопросы новичков
            </h1>
          </Reveal>
        </div>
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <FaqAccordion items={FAQ} />
        </div>
      </main>
      <CtaBand
        title="Не нашли ответ?"
        text="Задайте вопрос менеджеру — ответим по телефону или в мессенджере."
        ctaLabel="Задать вопрос"
        kind="consultation"
        ctaId="faq_ask_question"
        leadProps={{ title: "Задать вопрос", source: "faq_page" }}
      />
      <Footer />
    </>
  );
}
