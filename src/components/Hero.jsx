"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SITE } from "@/lib/data";
import CallbackForm from "./leads/CallbackForm";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};

const line = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

const fade = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.28]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const revealClip = useTransform(scrollYProgress, [0, 0.7], ["inset(0% 0% 0% 0%)", "inset(0% 0% 42% 0%)"]);

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden bg-asphalt-950 pt-[72px] lg:pt-0">
      <motion.div style={{ clipPath: revealClip }} className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.18, opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ opacity: { duration: 1.4, ease: "easeOut" } }}
          style={{ scale: imgScale, y: imgY }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2400&auto=format&fit=crop"
            alt="Вечерняя дорога — автошкола Автокласс в Кемерово"
            className="h-full w-full object-cover object-center grayscale-[10%] brightness-[0.6]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-asphalt-950 via-asphalt-950/35 to-asphalt-950/5" />
        <div className="absolute inset-0 bg-gradient-to-r from-asphalt-950/85 via-transparent to-asphalt-950/55" />
      </motion.div>

      <motion.div
        style={{ y: textY, opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8 py-16 lg:min-h-[100svh] flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16"
      >
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="split-text mb-5">
            <motion.span variants={line} className="block font-mono text-blue text-sm tracking-[0.3em] uppercase">
              {SITE.city} · с {SITE.founded} года
            </motion.span>
          </div>

          <h1 className="font-display uppercase text-[13vw] sm:text-[9vw] lg:text-[6.4rem] leading-[0.86] tracking-tight text-fog max-w-4xl">
            <span className="split-text block">
              <motion.span variants={line} className="block">Права</motion.span>
            </span>
            <span className="split-text block">
              <motion.span variants={line} className="block">без <span className="text-accent-red">компромиссов</span></motion.span>
            </span>
          </h1>

          <motion.p variants={fade} className="mt-8 max-w-md text-fog-dim text-base sm:text-lg leading-relaxed">
            Собственный автодром, сопровождение на экзамене ГИБДД и рассрочка 0%
            с первым взносом {SITE.deposit}. {SITE.graduates} выпускников с {SITE.founded} года.
          </motion.p>
        </div>

        <motion.div variants={fade} className="w-full lg:w-[380px] shrink-0">
          <div className="bg-asphalt-900/90 backdrop-blur-md border border-asphalt-700 p-6 sm:p-7">
            <CallbackForm source="hero_form" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{ opacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-fog-dim"
      >
        <span className="font-mono text-xs tracking-widest uppercase">Скролл</span>
        <motion.span
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "top" }}
          className="w-px h-10 bg-accent-red"
        />
      </motion.div>
    </section>
  );
}
