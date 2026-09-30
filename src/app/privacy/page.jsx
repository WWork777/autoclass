import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Политика конфиденциальности — автошкола «Автокласс»",
  description: "Политика обработки персональных данных пользователей сайта автошколы «Автокласс» в Кемерово, в соответствии с 152-ФЗ.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 pb-8 min-h-[60vh]">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/privacy/", label: "Конфиденциальность" }]} />
        <PageHeader kicker="Документы" title="Политика конфиденциальности" />
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal className="text-fog-dim leading-relaxed space-y-4">
            <p>
              Настоящая политика определяет порядок обработки персональных данных автошколой «Автокласс»
              (далее — «Оператор») в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
              «О персональных данных».
            </p>
            <p>
              Оставляя заявку на сайте autoklass42.ru, вы даёте согласие на обработку персональных данных
              (имя и номер телефона, при обращении также e-mail) Оператором для целей связи по вопросам
              записи на обучение, консультирования по программам и услугам автошколы.
            </p>
            <p>
              Обработка данных включает сбор, запись, хранение, использование и уничтожение персональных
              данных с использованием средств автоматизации. Правовым основанием обработки является
              согласие субъекта персональных данных (ст. 6 152-ФЗ).
            </p>
            <p>
              Данные не передаются третьим лицам, за исключением случаев, предусмотренных законодательством
              РФ, и используются исключительно для обратной связи с вами. Срок хранения данных — до момента
              достижения цели обработки либо до отзыва согласия.
            </p>
            <p>
              Сайт использует файлы cookie для обеспечения работы сайта и веб-аналитики — подробнее в{" "}
              <a href="/cookies/" className="text-blue hover:text-line transition-colors underline underline-offset-2">
                политике использования cookie
              </a>.
            </p>
            <p>
              Вы вправе в любой момент отозвать согласие на обработку персональных данных, а также запросить
              уточнение, блокирование или уничтожение своих данных, направив запрос по телефону{" "}
              <a href={SITE.phoneHref} className="text-blue hover:text-line transition-colors">{SITE.phone}</a>{" "}
              или e-mail{" "}
              <a href={`mailto:${SITE.email}`} className="text-blue hover:text-line transition-colors">{SITE.email}</a>.
            </p>
            <p>
              Полный текст политики обработки персональных данных доступен для скачивания:{" "}
              <a
                href="/docs/privacy-policy.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue hover:text-line transition-colors underline underline-offset-2"
              >
                скачать PDF
              </a>.
            </p>
          </Reveal>
        </div>
      </main>
      <Footer />
    </>
  );
}
