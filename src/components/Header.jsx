"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/data";
import LeadButton from "./leads/LeadButton";
import { track } from "@/lib/analytics";

const NAV = [
  { href: "/obuchenie/", label: "Обучение" },
  { href: "/tseny/", label: "Цены" },
  { href: "/instruktory/", label: "Инструкторы" },
  { href: "/otzyvy/", label: "Отзывы" },
  { href: "/faq/", label: "Вопросы" },
  { href: "/documents/", label: "Документы" },
  { href: "/kontakty/", label: "Контакты" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handlePhoneClick = () => track("phone_click", { source: "header" });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        open ? "" : scrolled ? "bg-asphalt-950/90 backdrop-blur-md border-b border-asphalt-700" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 flex items-center justify-between h-[72px]">
        <Link href="/" onClick={() => setOpen(false)} className="relative z-10 font-display uppercase tracking-wide text-xl text-fog">
          Авто<span className="text-accent-red">класс</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 font-display uppercase text-sm tracking-wider text-fog-dim">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-line transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href={SITE.phoneHref}
            onClick={handlePhoneClick}
            className="font-mono text-sm text-fog hover:text-line transition-colors"
          >
            {SITE.phone}
          </a>
          <LeadButton
            kind="consultation"
            ctaId="header_apply"
            label="Записаться"
            props={{ title: "Записаться на обучение", source: "header" }}
            className="font-display uppercase text-sm tracking-wider bg-line text-fog px-5 py-2.5 hover:bg-blue transition-colors"
          />
        </div>

        <button
          aria-label={open ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 lg:hidden w-9 h-9 flex flex-col items-center justify-center gap-[6px]"
        >
          <span className={`block h-[2px] w-6 bg-fog transition-transform ${open ? "translate-y-[8px] rotate-45" : ""}`} />
          <span className={`block h-[2px] w-6 bg-fog transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`block h-[2px] w-6 bg-fog transition-transform ${open ? "-translate-y-[8px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 h-[100dvh] bg-asphalt-950 flex flex-col"
          >
            <nav className="flex-1 flex flex-col justify-center gap-1 px-8">
              {NAV.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display uppercase text-4xl text-fog hover:text-line transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-8 pb-10 flex flex-col gap-4 border-t border-asphalt-700 pt-8"
              style={{ paddingBottom: "max(2.5rem, env(safe-area-inset-bottom))" }}
            >
              <a href={SITE.phoneHref} onClick={handlePhoneClick} className="font-mono text-fog text-lg">
                {SITE.phone}
              </a>
              <LeadButton
                kind="consultation"
                ctaId="header_apply_mobile"
                label="Записаться"
                props={{ title: "Записаться на обучение", source: "header_mobile" }}
                className="font-display uppercase text-sm tracking-wider bg-line text-fog px-5 py-4 text-center"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
