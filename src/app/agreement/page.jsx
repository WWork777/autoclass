import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Пользовательское соглашение — автошкола «Автокласс»",
  description: "Пользовательское соглашение сайта автошколы «Автокласс» в Кемерово.",
  path: "/agreement/",
});

export default function AgreementPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8 min-h-[60vh]">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/agreement/", label: "Соглашение" }]} />
        <PageHeader kicker="Документы" title="Пользовательское соглашение" />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-fog-dim leading-relaxed space-y-4">
            <p>
              Используя сайт autoklass42.ru, вы подтверждаете, что ознакомились и согласны с условиями
              настоящего пользовательского соглашения.
            </p>
            <p>
              Сайт предоставляет информацию об услугах автошколы «Автокласс», включая программы обучения,
              стоимость и контактные данные. Отправка формы обратной связи означает согласие на обработку
              указанных вами данных в целях связи по вопросам записи на обучение — подробнее в{" "}
              <a href="/privacy/" className="text-blue hover:text-line transition-colors underline underline-offset-2">
                политике конфиденциальности
              </a>.
            </p>
            <p>
              Полный текст пользовательского соглашения доступен для скачивания:{" "}
              <a
                href="/docs/user-agreement.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-line transition-colors underline underline-offset-2"
              >
                скачать PDF
              </a>.
            </p>
            <p>
              По всем вопросам обращайтесь по телефону{" "}
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
