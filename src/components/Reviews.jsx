"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { REVIEWS } from "@/lib/data";
import Reveal from "./Reveal";

export default function Reviews() {
  const [active, setActive] = useState(0);
  const review = REVIEWS[active];

  return (
    <section id="reviews" className="bg-asphalt-900 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal>
          <span className="font-mono text-blue text-sm tracking-[0.3em] uppercase">Отзывы</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="font-display uppercase text-4xl sm:text-6xl leading-[0.95] mt-4 text-balance">
            Наши ученики нас любят
          </h2>
        </Reveal>

        <div className="mt-16">
          <span className="font-display text-6xl text-accent-red/70 leading-none select-none">&ldquo;</span>

          <AnimatePresence mode="wait">
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="-mt-4"
            >
              <p className="font-display text-2xl sm:text-3xl leading-[1.3] text-fog text-balance max-w-2xl">
                {review.text}
              </p>

              <div className="mt-8 flex items-center gap-4">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="h-12 w-12 rounded-full object-cover grayscale"
                />
                <span className="font-mono uppercase tracking-wide text-sm text-blue">{review.name}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 flex gap-2">
            {REVIEWS.map((r, i) => (
              <button
                key={r.name}
                onClick={() => setActive(i)}
                aria-label={`Отзыв ${i + 1}`}
                aria-pressed={active === i}
                className={`h-1 transition-all duration-300 ${active === i ? "w-10 bg-line" : "w-5 bg-fog/25 hover:bg-fog/50"}`}
              />
            ))}
          </div>

          <Link href="/otzyvy/" className="mt-8 inline-block text-blue hover:text-line transition-colors text-sm">
            Все отзывы →
          </Link>
        </div>
      </div>
    </section>
  );
}
