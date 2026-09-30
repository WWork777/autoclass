import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PROMOTIONS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Акции и скидки в автошколе «Автокласс» — Кемерово",
  description: "Скидка 1000 ₽ студентам и пенсионерам, бонус 1000 ₽ по программе «Приведи друга». Актуальные акции автошколы «Автокласс» в Кемерово.",
  path: "/aktsii/",
});

export default function AktsiiPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/aktsii/", label: "Акции" }]} />
        <PageHeader
          kicker="Акции"
          title="Акции и скидки в автошколе «Автокласс»"
          intro="Выгодные предложения для студентов, пенсионеров и тех, кто приходит учиться компанией."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {PROMOTIONS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07} className="border-t border-asphalt-700 pt-6">
              <h2 className="font-display uppercase text-2xl tracking-tight text-accent-red">{p.title}</h2>
              <p className="mt-3 text-fog-dim leading-relaxed">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </main>
      <CtaBand
        title="Хотите узнать детали акции?"
        text="Оставьте заявку — менеджер подскажет, какая акция подойдёт именно вам."
        ctaLabel="Получить консультацию"
        kind="consultation"
        ctaId="aktsii_consultation"
        leadProps={{ source: "aktsii_page" }}
      />
      <Footer />
    </>
  );
}
