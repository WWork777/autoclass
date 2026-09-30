import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { GALLERY } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Фотогалерея автошколы «Автокласс» — Кемерово",
  description: "Фото команды, учеников и учебных автомобилей автошколы «Автокласс» в Кемерово.",
  path: "/galereya/",
});

export default function GalereyaPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/galereya/", label: "Галерея" }]} />
        <PageHeader kicker="Фотогалерея" title="Команда, ученики, автомобили" />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 columns-2 sm:columns-3 gap-2 sm:gap-3 [column-fill:balance]">
          {GALLERY.map((src, i) => (
            <Reveal
              key={src}
              delay={Math.min(i * 0.05, 0.3)}
              className="relative mb-2 sm:mb-3 overflow-hidden break-inside-avoid"
            >
              <img src={src} alt="Фото из автошколы Автокласс" loading="lazy" className="w-full h-auto object-cover" />
            </Reveal>
          ))}
        </div>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
