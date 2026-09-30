import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/Reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Автодром автошколы «Автокласс» в Кемерово",
  description: "Собственный автодром автошколы «Автокласс»: разметка, знаки и светофоры как в городе. Без очередей и простоев между занятиями по вождению.",
  path: "/avtodrom/",
  ogImage: "/images/gallery3.jpg",
});

export default function AvtodromPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/avtodrom/", label: "Автодром" }]} />
        <PageHeader
          kicker="Практика"
          title="Собственный автодром автошколы «Автокласс»"
          intro="Разметка, знаки и светофоры — как в городе. Никаких очередей и простоев: занятия по вождению идут по расписанию с вашим инструктором."
        />

        <div className="mx-auto max-w-7xl px-5 sm:px-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Reveal className="relative aspect-[4/3] overflow-hidden">
            <img src="/images/gallery3.jpg" alt="Занятие на автодроме автошколы Автокласс" className="h-full w-full object-cover" />
          </Reveal>
          <Reveal delay={0.06} className="relative aspect-[4/3] overflow-hidden">
            <img src="/images/gallery4.jpg" alt="Мотоцикл на автодроме, отработка манёвров" className="h-full w-full object-cover" />
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl px-5 sm:px-8 mt-16 max-w-2xl">
          <Reveal>
            <p className="text-fog-dim leading-relaxed">
              На автодроме курсанты отрабатывают базовые манёвры до автоматизма — прежде чем выехать в реальный
              городской поток с инструктором. Это отдельный этап практики: подробнее о том, как строится
              обучение целиком, — на странице{" "}
              <Link href="/obuchenie/kategoriya-b/" className="text-blue hover:text-line transition-colors">категории B</Link>{" "}
              и{" "}
              <Link href="/obuchenie/kategoriya-a/" className="text-blue hover:text-line transition-colors">категории A</Link>.
            </p>
          </Reveal>
        </div>
      </main>
      <CtaBand />
      <Footer />
    </>
  );
}
