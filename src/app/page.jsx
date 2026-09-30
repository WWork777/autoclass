import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Usp from "@/components/Usp";
import Journey from "@/components/Journey";
import Stats from "@/components/Stats";
import Programs from "@/components/Programs";
import Instructors from "@/components/Instructors";
import Payments from "@/components/Payments";
import Promotions from "@/components/Promotions";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Автошкола «Автокласс» в Кемерово — обучение на права",
  description: "Автошкола «Автокласс» в Кемерово с 2007 года: собственный автодром, сопровождение на экзамене ГИБДД, рассрочка 0% с первым взносом 5 000 ₽. Категории B, A, переподготовка C→B и D→B.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Usp />
        <Journey />
        <Stats />
        <Programs />
        <Instructors />
        <Payments />
        <Promotions />
        <Gallery />
        <Reviews />
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
