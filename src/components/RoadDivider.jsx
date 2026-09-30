"use client";

import { motion } from "framer-motion";

export default function RoadDivider({ className = "" }) {
  return (
    <div className={`relative overflow-hidden h-[3px] w-full ${className}`} aria-hidden="true">
      <motion.div
        className="road-rule absolute inset-0"
        initial={{ x: 0 }}
        whileInView={{ x: [-60, 0] }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{ duration: 1.3, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}
