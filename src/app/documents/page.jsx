import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import DocumentsExplorer from "@/components/DocumentsExplorer";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Сведения об образовательной организации — автошкола «Автокласс»",
  description: "Информация об автошколе «Автокласс» в Кемерово как образовательной организации: лицензия, устав, учебные программы, педагогический состав, документы.",
  path: "/documents/",
});

const POLICIES = [
  { href: "/docs/privacy-policy.pdf", label: "Политика конфиденциальности" },
  { href: "/docs/cookie-policy.pdf", label: "Политика использования cookie" },
  { href: "/docs/user-agreement.pdf", label: "Пользовательское соглашение" },
];

export default function DocumentsPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-16 min-h-[60vh]">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/documents/", label: "Сведения об организации" }]} />
        <PageHeader
          kicker="Документы"
          title="Сведения об образовательной организации"
          intro="Автошкола «Автокласс» ведёт образовательную деятельность по подготовке водителей категорий B и A в Кемерово с 2016 года."
        />

        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Reveal>
            <DocumentsExplorer />
          </Reveal>

          <Reveal className="mt-16 border-t border-asphalt-700 pt-8">
            <h2 className="font-display uppercase tracking-wide text-fog text-lg mb-4">Правовые документы сайта</h2>
            <ul className="list-disc pl-5 space-y-1 text-fog-dim">
              {POLICIES.map((d) => (
                <li key={d.href}>
                  <a
                    href={d.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue hover:text-line transition-colors underline underline-offset-2"
                  >
                    {d.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-fog-dim">
              Уточнить реквизиты и получить копии документов также можно по телефону{" "}
              <a href={SITE.phoneHref} className="text-blue hover:text-line transition-colors">{SITE.phone}</a>{" "}
              или e-mail{" "}
              <a href={`mailto:${SITE.email}`} className="text-blue hover:text-line transition-colors">{SITE.email}</a>.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
