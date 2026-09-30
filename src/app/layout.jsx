import { Oswald, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LeadModalProvider } from "@/components/leads/LeadModalContext";
import UtmCapture from "@/components/leads/UtmCapture";
import StickyCta from "@/components/leads/StickyCta";
import ExitIntent from "@/components/leads/ExitIntent";
import CookieBanner from "@/components/CookieBanner";
import AccessibilityWidget from "@/components/AccessibilityWidget";

const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-tech",
  display: "swap",
});

const SITE_URL = "https://autoklass42.ru";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Автошкола «Автокласс» в Кемерово — обучение на права",
  description:
    "Автошкола «Автокласс» в Кемерово с 2007 года: собственный автодром, сопровождение на экзамене ГИБДД, рассрочка 0% с первым взносом 5 000 ₽. Категории B, A, переподготовка C→B и D→B.",
  keywords: [
    "автошкола в Кемерово",
    "учиться на права Кемерово",
    "права категории B Кемерово",
    "автошкола Автокласс",
    "переподготовка водителей Кемерово",
  ],
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Автошкола Автокласс",
  url: SITE_URL,
  telephone: "+7-904-992-13-77",
  email: "autoklass@yandex.ru",
  foundingDate: "2007",
  address: [
    { "@type": "PostalAddress", streetAddress: "проспект Ленина, 52", addressLocality: "Кемерово", addressCountry: "RU" },
    { "@type": "PostalAddress", streetAddress: "улица Красноармейская, 130", addressLocality: "Кемерово", addressCountry: "RU" },
    { "@type": "PostalAddress", streetAddress: "улица Волгоградская, 1", addressLocality: "Кемерово", addressCountry: "RU" },
  ],
  areaServed: "Кемерово",
  priceRange: "30000-59900 RUB",
  openingHours: "Mo-Fr 10:00-18:00",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${oswald.variable} ${inter.variable} ${mono.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LeadModalProvider>
          <UtmCapture />
          {children}
          <StickyCta />
          <ExitIntent />
          <CookieBanner />
          <AccessibilityWidget />
        </LeadModalProvider>
      </body>
    </html>
  );
}
