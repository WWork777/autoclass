"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLeadModal } from "./LeadModalContext";
import { track } from "@/lib/analytics";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);
  const { open } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openConsultation = () => {
    track("cta_click", { cta: "sticky_cta" });
    open("consultation", { title: "Записаться на обучение", source: "sticky_cta" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: плавающая кнопка */}
          <motion.button
            type="button"
            onClick={openConsultation}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="hidden sm:block fixed bottom-8 right-8 z-40 font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4 shadow-xl shadow-black/40 hover:bg-blue transition-colors"
          >
            Записаться на обучение
          </motion.button>

          {/* Mobile: нижняя фиксированная панель, с учётом safe-area */}
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-asphalt-950/95 backdrop-blur-md border-t border-asphalt-700"
            style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <button
              type="button"
              onClick={openConsultation}
              className="w-full font-display uppercase text-sm tracking-wider bg-line text-fog px-6 py-4"
            >
              Записаться на обучение
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
