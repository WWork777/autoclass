import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import Contacts from "@/components/Contacts";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/data";
import { buildMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Контакты автошколы «Автокласс» в Кемерово — адреса, телефоны",
  description: "Адреса филиалов, телефоны и график работы автошколы «Автокласс» в Кемерово: проспект Ленина 52, улица Красноармейская 130, улица Волгоградская 1.",
  path: "/kontakty/",
});

export default function KontaktyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Автошкола Автокласс",
    url: SITE_URL,
    telephone: "+7-904-992-13-77",
    email: SITE.email,
    address: SITE.addresses.map((a) => ({ "@type": "PostalAddress", streetAddress: a, addressLocality: "Кемерово", addressCountry: "RU" })),
    openingHours: "Mo-Fr 10:00-18:00",
  };

  return (
    <>
      <Header />
      <JsonLd data={jsonLd} />
      <main className="bg-asphalt-950 pb-8">
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/kontakty/", label: "Контакты" }]} />
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-4">
          <Reveal>
            <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Контакты</span>
            <h1 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-3xl text-balance">
              Контакты автошколы «Автокласс» в Кемерово
            </h1>
          </Reveal>
        </div>
      </main>
      <Contacts />
      <Footer />
    </>
  );
}
