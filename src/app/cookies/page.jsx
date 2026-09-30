import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Политика использования cookie — автошкола «Автокласс»",
  description: "Политика использования файлов cookie на сайте автошколы «Автокласс» в Кемерово.",
  path: "/cookies/",
});

export default function CookiesPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8 min-h-[60vh]">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/cookies/", label: "Cookie" }]} />
        <PageHeader kicker="Документы" title="Политика использования cookie" />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-fog-dim leading-relaxed space-y-4">
            <p>
              Сайт autoklass42.ru использует файлы cookie и аналогичные технологии для обеспечения
              корректной работы сайта, запоминания ваших настроек и анализа посещаемости с помощью
              сервисов веб-аналитики.
            </p>
            <p>
              Cookie — это небольшие текстовые файлы, которые сохраняются в браузере при посещении сайта.
              Они не содержат персональных данных, позволяющих напрямую идентифицировать вас, и не
              используются для целей, не связанных с работой сайта.
            </p>
            <p>
              Продолжая использовать сайт, вы соглашаетесь с использованием файлов cookie в соответствии
              с настоящей политикой. Вы можете отключить cookie в настройках вашего браузера, однако это
              может повлиять на корректность работы отдельных функций сайта.
            </p>
            <p>
              Полный текст политики использования cookie доступен для скачивания:{" "}
              <a
                href="/docs/cookie-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-line transition-colors underline underline-offset-2"
              >
                скачать PDF
              </a>.
            </p>
            <p>
              По вопросам обработки данных обращайтесь по телефону{" "}
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
