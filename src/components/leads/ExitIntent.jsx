"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadModal } from "./LeadModalContext";
import { track } from "@/lib/analytics";

const SESSION_KEY = "ak_exit_shown_v1";
const MIN_DELAY_MS = 15_000; // не показывать сразу после входа

export default function ExitIntent() {
  const [visible, setVisible] = useState(false);
  const readyRef = useRef(false);
  const shownRef = useRef(false);
  const { open } = useLeadModal();

  useEffect(() => {
    // Только desktop: на мобильных курсор не покидает окно сверху,
    // а агрессивный popup там не нужен по ТЗ.
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // ignore
    }

    const timer = setTimeout(() => {
      readyRef.current = true;
    }, MIN_DELAY_MS);

    const onMouseLeave = (e) => {
      if (!readyRef.current || shownRef.current) return;
      if (e.clientY > 0) return; // курсор ушёл не через верх окна
      shownRef.current = true;
      setVisible(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        // ignore
      }
    };

    document.addEventListener("mouseleave", onMouseLeave);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  const close = () => setVisible(false);

  const handleOpenQuiz = () => {
    track("cta_click", { cta: "exit_intent" });
    setVisible(false);
    open("quiz", { source: "exit_intent" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="hidden lg:flex fixed inset-0 z-[90] items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-asphalt-950/85 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            className="relative max-w-sm bg-asphalt-900 border border-asphalt-700 p-8 text-center"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute top-4 right-4 text-fog-dim hover:text-fog transition-colors text-xl leading-none"
            >
              ✕
            </button>
            <h2 className="font-display uppercase text-2xl leading-tight">
              Не уверены, какая программа вам подойдёт?
            </h2>
            <p className="mt-3 text-fog-dim text-sm">Ответьте на 5 вопросов — подберём категорию и коробку передач.</p>
            <button
              type="button"
              onClick={handleOpenQuiz}
              className="mt-6 w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-3.5 hover:bg-blue transition-colors"
            >
              Подобрать обучение
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
