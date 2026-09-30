import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import TrackOnMount from "@/components/leads/TrackOnMount";
import { INSTRUCTORS, getInstructorBySlug } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export function generateStaticParams() {
  return INSTRUCTORS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ins = getInstructorBySlug(slug);
  if (!ins) return {};
  return buildMetadata({
    title: `${ins.name} — инструктор по вождению в Кемерово | Автокласс`,
    description: `${ins.name} — инструктор автошколы «Автокласс» в Кемерово. Стаж вождения ${ins.years}, обучение на ${ins.gearbox}, автомобиль ${ins.car}.`,
    path: `/instruktory/${ins.slug}/`,
    ogImage: ins.photo,
  });
}

export default async function InstructorPage({ params }) {
  const { slug } = await params;
  const ins = getInstructorBySlug(slug);
  if (!ins) notFound();

  const others = INSTRUCTORS.filter((i) => i.slug !== ins.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: ins.name,
    jobTitle: "Инструктор по вождению",
    image: `${SITE_URL}${ins.photo}`,
    worksFor: { "@type": "EducationalOrganization", name: "Автошкола Автокласс", sameAs: SITE_URL },
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <TrackOnMount event="instructor_view" payload={{ slug: ins.slug }} />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/instruktory/", label: "Инструкторы" },
            { href: `/instruktory/${ins.slug}/`, label: ins.name },
          ]}
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-12">
          <Reveal className="relative aspect-[3/4] overflow-hidden bg-asphalt-900">
            <img src={ins.photo} alt={ins.name} className="portrait-fade absolute inset-0 h-full w-full object-cover object-top" />
          </Reveal>

          <Reveal delay={0.08}>
            <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Инструктор</span>
            <h1 className="font-display uppercase text-4xl sm:text-5xl leading-[0.95] mt-4">{ins.name}</h1>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-asphalt-700 pt-8 max-w-md">
              <div>
                <dt className="text-fog-dim text-xs uppercase">Стаж</dt>
                <dd className="font-mono text-lg mt-1">{ins.years}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Коробка</dt>
                <dd className="font-mono text-lg mt-1">{ins.gearbox}</dd>
              </div>
              <div>
                <dt className="text-fog-dim text-xs uppercase">Автомобиль</dt>
                <dd className="font-mono text-lg mt-1">{ins.car}</dd>
              </div>
            </dl>

            <p className="mt-8 max-w-md text-fog-dim leading-relaxed">
              Обучает вождению категории B на {ins.gearbox === "МКПП" ? "механической" : "автоматической"} коробке передач
              в автошколе «Автокласс» в Кемерово.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={ins.gearbox === "МКПП" ? "/obuchenie/kategoriya-b/mkpp/" : "/obuchenie/kategoriya-b/akpp/"}
                className="font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-3.5 hover:bg-blue transition-colors"
              >
                Записаться на обучение
              </Link>
              <Link
                href="/instruktory/"
                className="font-mono text-sm text-fog-dim border border-asphalt-700 px-6 py-3.5 hover:text-fog hover:border-fog transition-colors"
              >
                Все инструкторы
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-24">
          <Reveal>
            <h2 className="font-display uppercase text-2xl sm:text-3xl">Другие инструкторы</h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.05}>
                <Link href={`/instruktory/${o.slug}/`} className="group block relative aspect-[3/4] overflow-hidden bg-asphalt-900">
                  <img src={o.photo} alt={o.name} className="portrait-fade absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-3 right-3 font-display uppercase text-sm text-fog leading-tight">{o.name}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </main>
      <CtaBand
        title={`Хотите заниматься с ${ins.name.split(" ")[0]}?`}
        text="Оставьте заявку — уточним расписание и запишем на обучение."
        ctaLabel="Записаться на обучение"
        kind="consultation"
        ctaId="instructor_apply"
        leadProps={{ defaultCategory: "b", title: "Записаться на обучение", source: `instructor_${ins.slug}` }}
      />
      <Footer />
    </>
  );
}
