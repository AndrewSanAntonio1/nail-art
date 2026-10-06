"use client";

import { motion, useReducedMotion } from "framer-motion";

const HEARTS = [
  { left: "10%", top: "30%", size: 14, delay: 0, duration: 14, drift: 24 },
  { left: "24%", top: "72%", size: 11, delay: 3, duration: 18, drift: -20 },
  { left: "76%", top: "38%", size: 16, delay: 1.5, duration: 16, drift: 28 },
  { left: "88%", top: "58%", size: 12, delay: 5, duration: 20, drift: -24 },
  { left: "58%", top: "82%", size: 10, delay: 2, duration: 12, drift: 18 },
];

const HEART_PATH =
  "M12 20.5 Q4 15 4 9.5 Q4 5.5 8 5.5 Q10.5 5.5 12 8 Q13.5 5.5 16 5.5 Q20 5.5 20 9.5 Q20 15 12 20.5 Z";

export default function FloatingHearts() {
  const reduce = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      {HEARTS.map((h, i) =>
        reduce ? (
          <svg
            key={i}
            className="absolute opacity-10"
            style={{ left: h.left, top: h.top }}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
          >
            <path d={HEART_PATH} fill="currentColor" className="text-rose-400" />
          </svg>
        ) : (
          <motion.svg
            key={i}
            className="absolute"
            style={{ left: h.left, top: h.top }}
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            initial={{ opacity: 0.04, y: 0, x: 0 }}
            animate={{ opacity: [0.04, 0.18, 0.04], y: [-10, 10, -10], x: [0, h.drift, 0] }}
            transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d={HEART_PATH} fill="currentColor" className="text-rose-400" />
          </motion.svg>
        )
      )}
    </div>
  );
}
