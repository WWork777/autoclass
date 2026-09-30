"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

function parseValue(raw) {
  const match = raw.match(/[\d\s]+/);
  const digits = match ? match[0].replace(/\s/g, "") : "0";
  return {
    number: parseInt(digits, 10) || 0,
    prefix: raw.slice(0, match?.index ?? 0),
    suffix: raw.slice((match?.index ?? 0) + (match?.[0].length ?? 0)),
  };
}

function formatNumber(n) {
  return n.toLocaleString("ru-RU");
}

export default function CountUp({ value, duration = 1.6, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState("0");
  const { number, prefix, suffix } = parseValue(value);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(formatNumber(Math.round(number * eased)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, number, duration]);

  return (
    <span ref={ref} className={`count-tabular ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
