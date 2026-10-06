"use client";

import { motion, useReducedMotion } from "framer-motion";

const SPARKS = [
  { left: "6%", top: "18%", size: 5, delay: 0, duration: 12 },
  { left: "14%", top: "64%", size: 4, delay: 2, duration: 16 },
  { left: "82%", top: "24%", size: 6, delay: 1, duration: 14 },
  { left: "90%", top: "70%", size: 4, delay: 4, duration: 18 },
  { left: "48%", top: "10%", size: 3, delay: 3, duration: 11 },
  { left: "70%", top: "86%", size: 5, delay: 5, duration: 20 },
];

function star4(cx: number, cy: number, r: number) {
  return `M${cx} ${cy - r} Q${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} Q${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} Q${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} Q${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r} Z`;
}

export default function Sparkles() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {SPARKS.map((s, i) =>
        reduce ? (
          <svg
            key={i}
            className="absolute opacity-20"
            style={{ left: s.left, top: s.top }}
            width={s.size * 3}
            height={s.size * 3}
            viewBox="0 0 30 30"
          >
            <path d={star4(15, 15, 12)} fill="currentColor" className="text-primary" />
          </svg>
        ) : (
          <motion.svg
            key={i}
            className="absolute"
            style={{ left: s.left, top: s.top }}
            width={s.size * 3}
            height={s.size * 3}
            viewBox="0 0 30 30"
            initial={{ opacity: 0.05, scale: 0.7, rotate: 0 }}
            animate={{ opacity: [0.05, 0.3, 0.05], scale: [0.7, 1.1, 0.7], rotate: 360 }}
            transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={star4(15, 15, 12)} fill="currentColor" className="text-primary" />
          </motion.svg>
        )
      )}
    </div>
  );
}
