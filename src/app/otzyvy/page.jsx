import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import { REVIEWS } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Отзывы об автошколе «Автокласс» в Кемерово",
  description: "Реальные отзывы учеников автошколы «Автокласс» в Кемерово — о теории, инструкторах и практике вождения.",
  path: "/otzyvy/",
});

export default function OtzyvyPage() {
  const jsonLd = REVIEWS.map((r) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    reviewBody: r.text,
    itemReviewed: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
  }));

  return (
    <>
      <Header />
      {jsonLd.map((data, i) => <JsonLd key={i} data={data} />)}
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/otzyvy/", label: "Отзывы" }]} />
        <PageHeader kicker="Отзывы" title="Отзывы об автошколе «Автокласс»" />

        <div className="mx-auto max-w-4xl px-5 sm:px-8 divide-y divide-asphalt-700 border-t border-b border-asphalt-700">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={Math.min(i * 0.06, 0.3)} className="py-8 flex gap-5">
              <img src={r.photo} alt={r.name} className="h-14 w-14 rounded-full object-cover grayscale shrink-0" />
              <div>
                <p className="text-fog leading-relaxed">&laquo;{r.text}&raquo;</p>
                <span className="mt-3 block font-mono uppercase tracking-wide text-sm text-blue">{r.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
