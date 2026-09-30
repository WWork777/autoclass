"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmartQuiz from "./SmartQuiz";
import ConsultationForm from "./ConsultationForm";
import CallbackForm from "./CallbackForm";
import PriceLeadForm from "./PriceLeadForm";

const LeadModalContext = createContext(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within LeadModalProvider");
  return ctx;
}

export function LeadModalProvider({ children }) {
  const [state, setState] = useState(null); // { kind, props }

  const open = useCallback((kind, props = {}) => setState({ kind, props }), []);
  const close = useCallback(() => setState(null), []);

  useEffect(() => {
    if (!state) return;
    const onKey = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [state, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {state && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-asphalt-950/85 backdrop-blur-sm"
              onClick={close}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full sm:max-w-md bg-asphalt-900 border-t sm:border border-asphalt-700 pt-14 px-6 pb-6 sm:pt-14 sm:px-8 sm:pb-8 max-h-[90vh] overflow-y-auto"
            >
              <button
                type="button"
                onClick={close}
                aria-label="Закрыть"
                className="absolute top-3 right-3 h-9 w-9 flex items-center justify-center text-fog-dim hover:text-fog hover:bg-asphalt-700 rounded-full transition-colors text-lg leading-none"
              >
                ✕
              </button>

              {state.kind === "quiz" && <SmartQuiz {...state.props} />}
              {state.kind === "consultation" && <ConsultationForm {...state.props} />}
              {state.kind === "callback" && <CallbackForm {...state.props} />}
              {state.kind === "price" && <PriceLeadForm {...state.props} />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadModalContext.Provider>
  );
}
