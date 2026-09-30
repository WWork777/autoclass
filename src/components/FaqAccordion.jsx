"use client";

import { useState } from "react";

export default function FaqAccordion({ items, className = "" }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className={`divide-y divide-ink/15 border-t border-b border-ink/15 ${className}`}>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.slug ?? item.q}>
            <button
              onClick={() => setOpenIndex(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-6 py-6 text-left"
            >
              <span className="font-display uppercase text-lg sm:text-xl tracking-tight">{item.q}</span>
              <span
                className={`shrink-0 font-mono text-2xl text-accent-red transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>
            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="pb-6 pr-10 text-paper-dim leading-relaxed">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
