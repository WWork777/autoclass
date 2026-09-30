import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { PROGRAMS, PAYMENTS } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Цены на обучение в автошколе «Автокласс» — Кемерово",
  description: "Актуальные цены на обучение вождению в Кемерово: категория B — 59 900 ₽, категория A — 30 000 ₽, переподготовка C→B и D→B — 33 000 ₽. Рассрочка 0%, оплата материнским капиталом.",
  path: "/tseny/",
});

const CATEGORY_LINKS = {
  b: "/obuchenie/kategoriya-b/",
  a: "/obuchenie/kategoriya-a/",
  cb: "/obuchenie/perepodgotovka-s-na-b/",
  db: "/obuchenie/perepodgotovka-d-na-b/",
};

export default function TsenyPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/tseny/", label: "Цены" }]} />
        <PageHeader
          kicker="Цены"
          title="Цены на обучение в автошколе «Автокласс»"
          intro="Цены окончательные — никаких доплат, бензин входит в стоимость обучения. Актуальны для всех программ."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 overflow-x-auto">
          <table className="w-full border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b border-asphalt-700 text-left">
                <th className="py-4 font-mono text-xs uppercase text-fog-dim font-normal">Программа</th>
                <th className="py-4 font-mono text-xs uppercase text-fog-dim font-normal">Стоимость</th>
                <th className="py-4 font-mono text-xs uppercase text-fog-dim font-normal">Теория</th>
                <th className="py-4 font-mono text-xs uppercase text-fog-dim font-normal">Вождение</th>
                <th className="py-4 font-mono text-xs uppercase text-fog-dim font-normal">Срок</th>
              </tr>
            </thead>
            <tbody>
              {PROGRAMS.map((p) => (
                <tr key={p.id} className="border-b border-asphalt-700">
                  <td className="py-5">
                    <Link href={CATEGORY_LINKS[p.id]} className="font-display uppercase text-lg hover:text-line transition-colors">
                      {p.title}
                    </Link>
                    <div className="text-fog-dim text-xs mt-1">{p.subtitle}</div>
                  </td>
                  <td className="py-5 font-mono text-accent-red text-xl">{p.price}</td>
                  <td className="py-5 font-mono">{p.theory}</td>
                  <td className="py-5 font-mono">{p.driving}</td>
                  <td className="py-5 font-mono">{p.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-20">
          <Reveal>
            <h2 className="font-display uppercase text-3xl sm:text-4xl">Способы оплаты</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {PAYMENTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="border-t border-asphalt-700 pt-5">
                <h3 className="font-display uppercase text-lg">{p.title}</h3>
                <p className="mt-2 text-fog-dim text-sm leading-relaxed">{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.15} className="mt-8">
            <Link href="/aktsii/" className="text-blue hover:text-line transition-colors text-sm">Скидки и акции →</Link>
          </Reveal>
        </div>
      </main>
      <CtaBand
        title="Остались вопросы по ценам?"
        text="Расскажем об условиях оплаты, рассрочке и ближайшем наборе групп."
        ctaLabel="Получить консультацию"
        kind="consultation"
        ctaId="tseny_consultation"
        leadProps={{ source: "tseny_page" }}
      />
      <Footer />
    </>
  );
}
