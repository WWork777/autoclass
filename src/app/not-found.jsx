import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Страница не найдена — Автокласс",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-asphalt-950 min-h-[70vh] flex items-center">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 pt-28 pb-16">
          <span className="font-mono text-accent-red text-sm tracking-[0.3em] uppercase">404</span>
          <h1 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 max-w-2xl">
            Страница не найдена
          </h1>
          <p className="mt-6 max-w-md text-fog-dim leading-relaxed">
            Возможно, страница была перемещена. Посмотрите программы обучения или вернитесь на главную.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-3.5 hover:bg-blue transition-colors">
              На главную
            </Link>
            <Link href="/obuchenie/" className="font-mono text-sm text-fog-dim border border-asphalt-700 px-6 py-3.5 hover:text-fog hover:border-fog transition-colors">
              Программы обучения
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
