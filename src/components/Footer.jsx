"use client";

import Link from "next/link";
import { SITE } from "@/lib/data";
import RoadDivider from "./RoadDivider";
import FinalCta from "./leads/FinalCta";
import { track } from "@/lib/analytics";

const COLUMNS = [
  {
    title: "Обучение",
    links: [
      { href: "/obuchenie/kategoriya-b/", label: "Категория B" },
      { href: "/obuchenie/kategoriya-a/", label: "Категория A" },
      { href: "/obuchenie/perepodgotovka-s-na-b/", label: "Переподготовка C→B" },
      { href: "/obuchenie/perepodgotovka-d-na-b/", label: "Переподготовка D→B" },
    ],
  },
  {
    title: "Школа",
    links: [
      { href: "/tseny/", label: "Цены" },
      { href: "/instruktory/", label: "Инструкторы" },
      { href: "/avtodrom/", label: "Автодром" },
      { href: "/aktsii/", label: "Акции" },
    ],
  },
  {
    title: "Информация",
    links: [
      { href: "/otzyvy/", label: "Отзывы" },
      { href: "/galereya/", label: "Галерея" },
      { href: "/faq/", label: "Вопросы" },
      { href: "/blog/", label: "Блог" },
      { href: "/kontakty/", label: "Контакты" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-asphalt-950 pb-24 sm:pb-0">
      <FinalCta />
      <RoadDivider />
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10">
        <div>
          <Link href="/" className="font-display uppercase tracking-wide text-2xl text-fog">
            Авто<span className="text-accent-red">класс</span>
          </Link>
          <p className="mt-3 text-fog-dim text-sm max-w-sm">
            Автошкола в Кемерово с {SITE.founded} года. Категории B, A, переподготовка C→B и D→B.
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-fog-dim text-sm font-mono">
            <a href={`mailto:${SITE.email}`} className="hover:text-line transition-colors">{SITE.email}</a>
            <a href={SITE.vk} target="_blank" rel="noopener noreferrer" className="hover:text-line transition-colors">VK</a>
          </div>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h2 className="font-display uppercase text-sm tracking-widest text-fog-dim">{col.title}</h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-fog hover:text-line transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 pb-10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-fog-dim/70 border-t border-asphalt-700 pt-6">
        <span>© {new Date().getFullYear()} Автошкола «Автокласс». Все права защищены.</span>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          <Link href="/documents/" className="hover:text-line transition-colors">Сведения об организации</Link>
          <Link href="/privacy/" className="hover:text-line transition-colors">Политика конфиденциальности</Link>
          <Link href="/cookies/" className="hover:text-line transition-colors">Политика cookie</Link>
          <Link href="/agreement/" className="hover:text-line transition-colors">Пользовательское соглашение</Link>
        </div>
      </div>
    </footer>
  );
}
