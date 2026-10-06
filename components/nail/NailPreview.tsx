"use client";

import type { NailShape } from "@/lib/types";

interface NailPreviewProps {
  colors: string[];
  style: string;
  shape?: NailShape;
  seed?: string;
}

function hashSeed(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pseudoRandom(seed: number, salt: number): number {
  let x = (seed ^ Math.imul(salt + 1, 2654435761)) >>> 0;
  x ^= x >>> 15;
  x = Math.imul(x, 2246822519);
  x ^= x >>> 13;
  return (x >>> 0) / 4294967295;
}

function nailPath(shape: NailShape): string {
  switch (shape) {
    case "square":
      return "M10 95 L10 30 Q10 22 18 22 L42 22 Q50 22 50 30 L50 95 Q50 103 40 103 L20 103 Q10 103 10 95 Z";
    case "coffin":
      return "M14 95 L20 30 Q21 22 29 22 L31 22 Q39 22 40 30 L46 95 Q46 103 38 103 L22 103 Q14 103 14 95 Z";
    case "stiletto":
      return "M10 95 L22 28 Q26 14 30 14 Q34 14 38 28 L50 95 Q50 103 40 103 L20 103 Q10 103 10 95 Z";
    case "round":
      return "M10 95 L10 40 Q10 12 30 12 Q50 12 50 40 L50 95 Q50 103 40 103 L20 103 Q10 103 10 95 Z";
    case "oval":
      return "M12 95 L14 42 Q16 10 30 10 Q44 10 46 42 L48 95 Q48 103 39 103 L21 103 Q12 103 12 95 Z";
    case "almond":
    default:
      return "M12 95 L18 38 Q24 10 30 10 Q36 10 42 38 L48 95 Q48 103 39 103 L21 103 Q12 103 12 95 Z";
  }
}

function StyleOverlay({
  style,
  seed,
  base,
  accent,
}: {
  style: string;
  seed: number;
  base: string;
  accent: string;
}) {
  const s = style.toLowerCase();
  const ty = 40;

  if (s.includes("french")) {
    const hearts = s.includes("heart");
    const darkTip = s.includes("black") ? "#18181b" : s.includes("red") ? "#b91c1c" : "#ffffff";
    if (hearts) {
      return (
        <g>
          <path
            d="M18 34 Q18 26 24 26 Q28 26 30 30 Q32 26 36 26 Q42 26 42 34 Q42 42 30 50 Q18 42 18 34 Z"
            fill="#ffffff"
          />
          <circle cx="30" cy="72" r="5" fill={accent} opacity="0.7" />
        </g>
      );
    }
    const isDarkFrench = darkTip !== "#ffffff";
    return (
      <g>
        {isDarkFrench && (
          <path
            d="M13 42 Q30 48 47 42 L48 95 Q48 103 39 103 L21 103 Q12 103 12 95 L12 42 Z"
            fill={s.includes("black") ? "#3f3f46" : base}
            opacity="0.9"
          />
        )}
        <path d="M12 38 Q30 30 48 38 L46 30 Q44 14 30 13 Q16 14 14 30 Z" fill={darkTip} />
        <rect x="12" y="44" width="36" height="2" rx="1" fill={isDarkFrench ? "#e4e4e7" : accent} opacity="0.8" />
      </g>
    );
  }
  if (s.includes("y2k")) {
    return (
      <g>
        <path d="M14 58 Q22 52 30 58 Q38 64 46 58" stroke="#ffffff" strokeWidth="2.5" fill="none" opacity="0.9" />
        <path d="M14 72 Q22 66 30 72 Q38 78 46 72" stroke={accent} strokeWidth="2.5" fill="none" opacity="0.9" />
        {[
          [22, 44, 5],
          [38, 82, 6],
          [32, 62, 4],
        ].map(([x, y, r], i) => (
          <path
            key={i}
            d={`M${x} ${y - r} L${x + r * 0.25} ${y - r * 0.25} L${x + r} ${y} L${x + r * 0.25} ${y + r * 0.25} L${x} ${y + r} L${x - r * 0.25} ${y + r * 0.25} L${x - r} ${y} L${x - r * 0.25} ${y - r * 0.25} Z`}
            fill={i === 1 ? accent : "#ffffff"}
            opacity="0.95"
          />
        ))}
        <circle cx="26" cy="84" r="2" fill={accent} />
        <circle cx="35" cy="40" r="2" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("chrome")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={18 + pseudoRandom(seed, i) * 24}
            cy={30 + pseudoRandom(seed, i + 10) * 55}
            r={1.6 + pseudoRandom(seed, i + 20) * 1.6}
            fill="#ffffff"
            opacity="0.85"
          />
        ))}
        <path d="M18 60 L42 34" stroke="#ffffff" strokeWidth="4" opacity="0.4" strokeLinecap="round" />
      </g>
    );
  }
  if (s.includes("tropical")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          const px = 30 + Math.cos(a) * 7;
          const py = 60 + Math.sin(a) * 7;
          return (
            <ellipse
              key={i}
              cx={px}
              cy={py}
              rx="4.5"
              ry="6.5"
              fill={i % 2 ? base : "#f472b6"}
              opacity="0.95"
              transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
            />
          );
        })}
        <circle cx="30" cy="60" r="3.5" fill="#fde047" />
        <path d="M18 86 Q24 78 20 70 M42 86 Q36 78 40 70" stroke="#16a34a" strokeWidth="2.5" fill="none" />
      </g>
    );
  }
  if (s.includes("floral") || s.includes("tulip") || s.includes("rose") || s.includes("daisy")) {
    const petals = 5;
    return (
      <g>
        {Array.from({ length: petals }).map((_, i) => {
          const a = (i / petals) * Math.PI * 2 + pseudoRandom(seed, i) * 0.5;
          const px = 30 + Math.cos(a) * 8;
          const py = 62 + Math.sin(a) * 8;
          return <ellipse key={i} cx={px} cy={py} rx="5" ry="7" fill={accent} opacity="0.9" transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`} />;
        })}
        <circle cx="30" cy="62" r="4.5" fill={s.includes("daisy") ? "#fde047" : base} />
        <path d="M30 74 L30 95" stroke="#16a34a" strokeWidth="2.5" opacity="0.8" />
      </g>
    );
  }
  if (s.includes("coquette")) {
    return (
      <g>
        <circle cx="24" cy={ty + 22} r="4" fill={accent} />
        <circle cx="36" cy={ty + 22} r="4" fill={accent} />
        <circle cx="30" cy={ty + 22} r="2.4" fill="#fff" />
        <path d="M30 64 L24 74 M30 64 L36 74" stroke={accent} strokeWidth="2" />
      </g>
    );
  }
  if (s.includes("butterfly")) {
    return (
      <g>
        <ellipse cx="24" cy="58" rx="6" ry="10" fill={accent} opacity="0.85" transform="rotate(-20 24 58)" />
        <ellipse cx="36" cy="58" rx="6" ry="10" fill={accent} opacity="0.85" transform="rotate(20 36 58)" />
        <rect x="29" y="50" width="2" height="20" rx="1" fill="#334155" />
        <circle cx="24" cy="56" r="1.5" fill="#fff" />
        <circle cx="36" cy="56" r="1.5" fill="#fff" />
      </g>
    );
  }
  if (s.includes("fruit") || s.includes("strawberry")) {
    return (
      <g>
        <path d="M20 60 Q30 52 40 60 Q40 78 30 88 Q20 78 20 60 Z" fill="#ef4444" />
        {[[26, 66], [34, 66], [30, 73], [26, 79], [34, 79]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="1.2" ry="1.8" fill="#fef9c3" />
        ))}
        <path d="M24 58 L30 50 L36 58" fill="#22c55e" />
      </g>
    );
  }
  if ((s.includes("kawaii") || s.includes("sky") || s.includes("cloud")) && !s.includes("party")) {
    return (
      <g>
        <ellipse cx="23" cy="66" rx="8" ry="5" fill="#ffffff" />
        <ellipse cx="31" cy="62" rx="7" ry="5" fill="#ffffff" />
        <ellipse cx="38" cy="67" rx="6" ry="4" fill="#ffffff" />
        <circle cx="26" cy="72" r="1.3" fill="#f9a8d4" />
        <circle cx="35" cy="72" r="1.3" fill="#f9a8d4" />
      </g>
    );
  }
  if (s.includes("rainbow")) {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <path
            key={i}
            d={`M14 ${56 + i * 9} Q30 ${50 + i * 9} 46 ${56 + i * 9}`}
            stroke={["#f9a8d4", "#fde68a", "#86efac", "#93c5fd"][i % 4]}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}
      </g>
    );
  }
  if ((s.includes("glitter") || s.includes("fairy") || s.includes("starry") || s.includes("celestial") || s.includes("crystal") || s.includes("jewel")) && !s.includes("wings")) {
    const star = (cx: number, cy: number, r: number, fill: string, o = 0.95) => (
      <path
        d={`M${cx} ${cy - r} L${cx + r * 0.25} ${cy - r * 0.25} L${cx + r} ${cy} L${cx + r * 0.25} ${cy + r * 0.25} L${cx} ${cy + r} L${cx - r * 0.25} ${cy + r * 0.25} L${cx - r} ${cy} L${cx - r * 0.25} ${cy - r * 0.25} Z`}
        fill={fill}
        opacity={o}
      />
    );
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <circle
            key={i}
            cx={18 + pseudoRandom(seed, i) * 24}
            cy={32 + pseudoRandom(seed, i + 10) * 55}
            r={1 + pseudoRandom(seed, i + 20) * 1.4}
            fill="#ffffff"
            opacity="0.9"
          />
        ))}
        {star(24, 48, 5, s.includes("crystal") ? "#ffffff" : "#fde68a")}
        {star(37, 66, 6, s.includes("crystal") ? "#cffafe" : "#ffffff")}
        {star(29, 80, 4, "#fde68a", 0.9)}
        {(s.includes("celestial") || s.includes("starry")) && (
          <path d="M36 40 A7 7 0 1 0 36 54 A5.5 5.5 0 1 1 36 40 Z" fill="#fde68a" />
        )}
        {s.includes("crystal") && (
          <path d="M22 58 L30 50 L38 58 L30 76 Z" fill="#ffffff" opacity="0.75" />
        )}
      </g>
    );
  }
  if (
    s.includes("teddy") ||
    s.includes("bear") ||
    s.includes("bunny") ||
    s.includes("cat") ||
    s.includes("panda")
  ) {
    const isBunny = s.includes("bunny");
    const isCat = s.includes("cat");
    const isPanda = s.includes("panda");
    const fur = isPanda ? "#ffffff" : isCat ? "#e7e5e4" : base;
    const dark = isPanda ? "#18181b" : "#451a03";
    return (
      <g>
        {/* ears */}
        {isBunny ? (
          <g>
            <ellipse cx="23" cy="42" rx="3.5" ry="9" fill={fur} stroke={dark} strokeWidth="1" opacity="0.95" />
            <ellipse cx="37" cy="42" rx="3.5" ry="9" fill={fur} stroke={dark} strokeWidth="1" opacity="0.95" />
            <ellipse cx="23" cy="43" rx="1.5" ry="5" fill="#f9a8d4" />
            <ellipse cx="37" cy="43" rx="1.5" ry="5" fill="#f9a8d4" />
          </g>
        ) : isCat ? (
          <g>
            <path d="M20 54 L18 42 L28 48 Z" fill={fur} stroke={dark} strokeWidth="1" />
            <path d="M40 54 L42 42 L32 48 Z" fill={fur} stroke={dark} strokeWidth="1" />
          </g>
        ) : (
          <g>
            <circle cx="21" cy="52" r="4.5" fill={fur} stroke={dark} strokeWidth="1" />
            <circle cx="39" cy="52" r="4.5" fill={fur} stroke={dark} strokeWidth="1" />
          </g>
        )}
        {/* face */}
        <circle cx="30" cy="63" r="10" fill={fur} />
        {isPanda ? (
          <g>
            <ellipse cx="25.5" cy="61" rx="3" ry="4" fill={dark} transform="rotate(-15 25.5 61)" />
            <ellipse cx="34.5" cy="61" rx="3" ry="4" fill={dark} transform="rotate(15 34.5 61)" />
            <circle cx="25.5" cy="60.5" r="1" fill="#fff" />
            <circle cx="34.5" cy="60.5" r="1" fill="#fff" />
            <ellipse cx="30" cy="67" rx="2" ry="1.5" fill={dark} />
          </g>
        ) : (
          <g>
            <circle cx="26" cy="61" r="1.6" fill={dark} />
            <circle cx="34" cy="61" r="1.6" fill={dark} />
            <circle cx="26.8" cy="60.4" r="0.5" fill="#fff" />
            <circle cx="34.8" cy="60.4" r="0.5" fill="#fff" />
            <ellipse cx="30" cy="65.5" rx="1.8" ry="1.3" fill={isBunny ? "#ec4899" : dark} />
            <circle cx="23" cy="64.5" r="1.6" fill="#f9a8d4" opacity="0.8" />
            <circle cx="37" cy="64.5" r="1.6" fill="#f9a8d4" opacity="0.8" />
          </g>
        )}
        {isCat && (
          <g stroke={dark} strokeWidth="1" opacity="0.9">
            <path d="M14 62 L23 63 M14 66 L23 65 M46 62 L37 63 M46 66 L37 65" />
          </g>
        )}
      </g>
    );
  }
  if (
    s.includes("cherry") ||
    s.includes("lemon") ||
    s.includes("orange") ||
    s.includes("blueberry") ||
    s.includes("watermelon") ||
    s.includes("kiwi") ||
    s.includes("grape") ||
    s.includes("apple") ||
    s.includes("cupcake") ||
    s.includes("cake")
  ) {
    if (s.includes("cherry")) {
      return (
        <g>
          <path d="M25 66 Q28 56 34 52 M35 68 Q34 58 34 52" stroke="#16a34a" strokeWidth="2" fill="none" />
          <path d="M34 52 Q42 50 44 56 Q38 58 34 52 Z" fill="#16a34a" />
          <circle cx="24" cy="70" r="6" fill="#dc2626" />
          <circle cx="36" cy="72" r="6" fill="#b91c1c" />
          <circle cx="22" cy="68" r="1.8" fill="#fecaca" />
          <circle cx="34" cy="70" r="1.8" fill="#fecaca" />
        </g>
      );
    }
    if (s.includes("lemon")) {
      return (
        <g>
          <path d="M18 70 A12 12 0 0 0 42 70 Z" fill="#fde047" />
          <path d="M20 70 A10 10 0 0 0 40 70 Z" fill="#fefce8" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M30 70 L${22 + i * 8} ${64 + pseudoRandom(seed, i) * 2}`} stroke="#facc15" strokeWidth="1.5" />
          ))}
          <path d="M38 58 Q44 56 45 61 Q40 62 38 58 Z" fill="#16a34a" />
        </g>
      );
    }
    if (s.includes("orange")) {
      return (
        <g>
          <circle cx="30" cy="66" r="11" fill="#fb923c" />
          <circle cx="30" cy="66" r="8.5" fill="#ffedd5" />
          {[0, 1, 2, 3, 4, 5].map((i) => {
            const a = (i / 6) * Math.PI * 2;
            return (
              <path
                key={i}
                d={`M30 66 L${30 + Math.cos(a) * 8} ${66 + Math.sin(a) * 8}`}
                stroke="#fb923c"
                strokeWidth="1.2"
              />
            );
          })}
          <path d="M30 53 Q30 48 35 47" stroke="#16a34a" strokeWidth="2" fill="none" />
        </g>
      );
    }
    if (s.includes("blueberry")) {
      return (
        <g>
          <circle cx="25" cy="68" r="6.5" fill="#4c1d95" />
          <circle cx="35" cy="64" r="5.5" fill="#3730a3" />
          <circle cx="23" cy="66" r="1.6" fill="#c7d2fe" />
          <path d="M25 62 l1.2 2.4 2.6 0.4 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.4 Z" fill="#1e1b4b" />
          <path d="M35 58.5 l1 2 2.2 0.3 -1.6 1.5 0.4 2.2 -2 -1.1 -2 1.1 0.4 -2.2 -1.6 -1.5 2.2 -0.3 Z" fill="#1e1b4b" />
        </g>
      );
    }
    if (s.includes("kiwi")) {
      return (
        <g>
          <circle cx="30" cy="66" r="11" fill="#65a30d" />
          <circle cx="30" cy="66" r="7" fill="#a3e635" />
          <circle cx="30" cy="66" r="2.5" fill="#ecfccb" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const a = (i / 8) * Math.PI * 2 + pseudoRandom(seed, i) * 0.3;
            return (
              <ellipse
                key={i}
                cx={30 + Math.cos(a) * 4.8}
                cy={66 + Math.sin(a) * 4.8}
                rx="0.9"
                ry="1.3"
                fill="#365314"
              />
            );
          })}
        </g>
      );
    }
    if (s.includes("grape")) {
      return (
        <g>
          <path d="M30 50 Q30 44 36 43" stroke="#16a34a" strokeWidth="2" fill="none" />
          <path d="M36 43 Q42 41 43 46 Q38 48 36 43 Z" fill="#16a34a" />
          {[
            [26, 60],
            [34, 60],
            [30, 66],
            [24, 70],
            [36, 70],
            [30, 76],
          ].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="5" fill={i % 2 ? "#7c3aed" : "#8b5cf6"} />
              <circle cx={x - 1.5} cy={y - 1.5} r="1.4" fill="#ddd6fe" />
            </g>
          ))}
        </g>
      );
    }
    if (s.includes("apple")) {
      return (
        <g>
          <path d="M30 56 Q30 50 34 49" stroke="#78350f" strokeWidth="2" fill="none" />
          <path d="M34 49 Q40 47 41 52 Q36 54 34 49 Z" fill="#16a34a" />
          <path d="M22 62 Q22 78 30 84 Q38 78 38 62 Q34 56 30 59 Q26 56 22 62 Z" fill="#dc2626" />
          <ellipse cx="25.5" cy="68" rx="2" ry="4.5" fill="#fca5a5" opacity="0.8" transform="rotate(12 25.5 68)" />
        </g>
      );
    }
    if (s.includes("cupcake")) {
      return (
        <g>
          <path d="M22 68 L38 68 L35 86 L25 86 Z" fill="#f59e0b" />
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M${25 + i * 3.5} 70 L${24 + i * 3.5} 84`} stroke="#92400e" strokeWidth="1.2" />
          ))}
          <path d="M21 68 Q21 60 30 60 Q39 60 39 68 Q35 64 30 65 Q25 64 21 68 Z" fill="#fff7ed" />
          <path d="M24 61 Q24 55 30 55 Q36 55 36 61 Q33 58.5 30 59 Q27 58.5 24 61 Z" fill="#fbcfe8" />
          <circle cx="30" cy="53" r="2.5" fill="#dc2626" />
          <circle cx="26" cy="73" r="1" fill="#ec4899" />
          <circle cx="34" cy="73" r="1" fill="#8b5cf6" />
          <circle cx="30" cy="79" r="1" fill="#22c55e" />
        </g>
      );
    }
    if (s.includes("cake")) {
      return (
        <g>
          <path d="M20 78 L40 78 L40 86 L20 86 Z" fill="#f9a8d4" />
          <path d="M20 72 L40 72 L40 78 L20 78 Z" fill="#fff7ed" />
          <path d="M20 66 L40 66 L40 72 L20 72 Z" fill="#e879a8" />
          <path d="M20 66 Q25 62 30 66 Q35 70 40 66 L40 68 Q35 72 30 68 Q25 64 20 68 Z" fill="#ffffff" />
          <circle cx="24" cy="75" r="1.2" fill="#8b5cf6" />
          <circle cx="30" cy="82" r="1.2" fill="#22c55e" />
          <circle cx="36" cy="75" r="1.2" fill="#f59e0b" />
          <circle cx="30" cy="60" r="2.5" fill="#dc2626" />
        </g>
      );
    }
    // watermelon
    return (
      <g>
        <path d="M18 60 L42 60 L30 84 Z" fill="#f87171" />
        <path d="M18 60 L42 60 L40.5 63.5 L19.5 63.5 Z" fill="#fef2f2" />
        <path d="M18 60 L42 60 L41.5 62 L18.5 62 Z" fill="#22c55e" />
        {[[30, 68], [26.5, 72], [33.5, 72], [30, 77]].map(([x, y], i) => (
          <ellipse key={i} cx={x} cy={y} rx="1.1" ry="1.6" fill="#18181b" />
        ))}
      </g>
    );
  }
  if (s.includes("kawaii") && s.includes("party")) {
    return (
      <g>
        <circle cx="30" cy="60" r="8" fill="#ffffff" />
        <circle cx="27" cy="59" r="1.5" fill="#18181b" />
        <circle cx="33" cy="59" r="1.5" fill="#18181b" />
        <path d="M27.5 63 Q30 65 32.5 63" stroke="#18181b" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        <circle cx="24.5" cy="62" r="1.5" fill="#f9a8d4" />
        <circle cx="35.5" cy="62" r="1.5" fill="#f9a8d4" />
        <path d="M20 76 Q20 72 23 72 Q25 72 25.5 74.5 Q26 72 28 72 Q31 72 31 76 Q31 80 25.5 82.5 Q20 80 20 76 Z" fill="#f472b6" />
        <path d="M36 44 l1.2 2.4 2.6 0.4 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.4 Z" fill="#fde047" />
        <circle cx="24" cy="46" r="2" fill="#bae6fd" />
        <circle cx="38" cy="80" r="2" fill="#fef9c3" />
      </g>
    );
  }
  if (s.includes("unicorn")) {
    return (
      <g>
        <path d="M16 78 L26 78 L24 88 L18 88 Z" fill="#f9a8d4" opacity="0.7" />
        <path d="M26 76 L36 76 L34 88 L28 88 Z" fill="#bae6fd" opacity="0.7" />
        <path d="M36 74 L46 74 L44 88 L38 88 Z" fill="#fde68a" opacity="0.7" />
        <path d="M27 58 L33 58 L30 40 Z" fill="#fefce8" stroke="#eab308" strokeWidth="1" />
        <path d="M28.5 52 L31.8 52 M29.2 47 L31.2 47" stroke="#eab308" strokeWidth="1.2" />
        <path d="M20 66 l1 2 2.2 0.3 -1.6 1.5 0.4 2.2 -2 -1.1 -2 1.1 0.4 -2.2 -1.6 -1.5 2.2 -0.3 Z" fill="#ffffff" />
        <path d="M40 60 l0.9 1.7 1.9 0.3 -1.4 1.3 0.4 1.9 -1.8 -0.9 -1.8 0.9 0.4 -1.9 -1.4 -1.3 1.9 -0.3 Z" fill="#ffffff" />
        <circle cx="30" cy="82" r="2" fill={accent} />
      </g>
    );
  }
  if (s.includes("mermaid")) {
    return (
      <g>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <path
              key={`${row}-${col}`}
              d={`M${16 + col * 8} ${58 + row * 9} a4 4 0 0 1 8 0`}
              stroke="#ffffff"
              strokeWidth="1.5"
              fill="none"
              opacity="0.85"
            />
          ))
        )}
        <circle cx="30" cy="46" r="4" fill="#fdf4ff" />
        <circle cx="28.5" cy="44.5" r="1.2" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("fairy")) {
    return (
      <g>
        <ellipse cx="22" cy="60" rx="6" ry="11" fill="#ffffff" opacity="0.55" transform="rotate(-24 22 60)" />
        <ellipse cx="38" cy="60" rx="6" ry="11" fill="#ffffff" opacity="0.55" transform="rotate(24 38 60)" />
        <ellipse cx="22" cy="60" rx="3" ry="7" fill={accent} opacity="0.4" transform="rotate(-24 22 60)" />
        <ellipse cx="38" cy="60" rx="3" ry="7" fill={accent} opacity="0.4" transform="rotate(24 38 60)" />
        <circle cx="30" cy="62" r="3" fill={base} />
        <path d="M18 84 L42 76" stroke="#fde68a" strokeWidth="1.5" strokeDasharray="2.5 2" opacity="0.9" />
        <circle cx="20" cy="83" r="1.5" fill="#fde68a" />
        <circle cx="26" cy="81" r="1.2" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("ocean") && s.includes("wave")) {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M14 ${56 + i * 11} Q20 ${51 + i * 11} 26 ${56 + i * 11} Q32 ${61 + i * 11} 38 ${56 + i * 11} Q42 ${53 + i * 11} 46 ${56 + i * 11}`}
            stroke={i === 1 ? "#ffffff" : "#0c4a6e"}
            strokeWidth="2.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}
      </g>
    );
  }
  if (s.includes("seashell")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (-60 + i * 30) * (Math.PI / 180);
          return (
            <path
              key={i}
              d={`M30 74 L${30 + Math.cos(a - Math.PI / 2) * 13} ${74 + Math.sin(a - Math.PI / 2) * 13}`}
              stroke="#d4a017"
              strokeWidth="1.5"
              opacity="0.9"
            />
          );
        })}
        <path d="M19 74 A11 11 0 0 1 41 74 Z" fill="#fde68a" opacity="0.85" />
        <path d="M23 74 A7 7 0 0 1 37 74 Z" fill="#fffbeb" />
        <circle cx="30" cy="82" r="3.5" fill="#fdf4ff" />
        <circle cx="28.8" cy="80.8" r="1" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("coral")) {
    return (
      <g strokeLinecap="round">
        <path d="M30 88 L30 66 M30 74 L22 66 M30 74 L38 64 M30 66 L24 58 M30 66 L36 56" stroke={base} strokeWidth="3" fill="none" />
        <path d="M30 80 L36 74 M24 84 L28 78" stroke="#0d9488" strokeWidth="2.5" fill="none" />
        <circle cx="22" cy="64" r="2" fill={accent} />
        <circle cx="38" cy="62" r="2" fill={accent} />
        <circle cx="24" cy="56" r="1.6" fill="#ffffff" />
        <circle cx="36" cy="54" r="1.6" fill="#ffffff" />
        <circle cx="30" cy="62" r="1.6" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("fish")) {
    return (
      <g>
        <circle cx="20" cy="48" r="1.5" fill="#ffffff" opacity="0.8" />
        <circle cx="25" cy="42" r="1.2" fill="#ffffff" opacity="0.8" />
        <circle cx="38" cy="82" r="1.5" fill="#ffffff" opacity="0.8" />
        <path d="M22 68 L34 68 L39 62 L39 74 Z" fill="#f97316" />
        <ellipse cx="27" cy="68" rx="6" ry="4.5" fill="#fb923c" />
        <path d="M24 65 Q27 63 30 65" stroke="#fff7ed" strokeWidth="1.2" fill="none" />
        <circle cx="24.5" cy="67.5" r="1.2" fill="#18181b" />
        <circle cx="24.8" cy="67.2" r="0.4" fill="#fff" />
      </g>
    );
  }
  if (s.includes("palm")) {
    return (
      <g>
        <rect x="12" y="60" width="36" height="10" fill="#fdba74" opacity="0.35" />
        <path d="M30 92 L30 62" stroke="#451a03" strokeWidth="2.5" />
        {[-2, -1, 0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M30 62 Q${30 + i * 7} ${54 + Math.abs(i) * 2} ${30 + i * 9} ${60 + Math.abs(i) * 4}`}
            stroke="#451a03"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        ))}
        <circle cx="38" cy="40" r="5" fill="#fef3c7" opacity="0.9" />
      </g>
    );
  }
  if (s.includes("sunset")) {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x="12" y={30 + i * 16} width="36" height="16" fill={["#fdba74", "#fb923c", "#f472b6", "#7c3aed"][i]} opacity="0.55" />
        ))}
        <circle cx="30" cy="52" r="6" fill="#fefce8" opacity="0.95" />
        <path d="M14 78 Q20 74 26 78 Q32 82 38 78 Q42 75 46 78" stroke="#451a03" strokeWidth="1.5" fill="none" opacity="0.6" />
      </g>
    );
  }
  if (s.includes("galaxy")) {
    return (
      <g>
        <ellipse cx="26" cy="58" rx="9" ry="6" fill="#7c3aed" opacity="0.7" transform="rotate(-24 26 58)" />
        <ellipse cx="35" cy="70" rx="7" ry="5" fill="#f0abfc" opacity="0.6" transform="rotate(20 35 70)" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle
            key={i}
            cx={17 + pseudoRandom(seed, i) * 26}
            cy={32 + pseudoRandom(seed, i + 10) * 55}
            r={0.9 + pseudoRandom(seed, i + 20) * 1.1}
            fill="#ffffff"
            opacity="0.95"
          />
        ))}
      </g>
    );
  }
  if (s.includes("shooting")) {
    return (
      <g>
        {[0, 1, 2].map((i) => {
          const y = 44 + i * 14;
          return (
            <g key={i}>
              <path d={`M${38 - i * 6} ${y} L${20 - i * 3} ${y + 8}`} stroke="#fde68a" strokeWidth="2" strokeLinecap="round" opacity={0.9 - i * 0.2} />
              <path d={`M${38 - i * 6} ${y - 3} l1 2 2.2 0.3 -1.6 1.5 0.4 2.2 -2 -1.1 -2 1.1 0.4 -2.2 -1.6 -1.5 2.2 -0.3 Z`} fill="#ffffff" />
            </g>
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`d${i}`} cx={18 + pseudoRandom(seed, i) * 24} cy={36 + pseudoRandom(seed, i + 5) * 50} r="1" fill="#ffffff" opacity="0.9" />
        ))}
      </g>
    );
  }
  if (s.includes("flame")) {
    return (
      <g>
        {[0, 1, 2, 3].map((i) => {
          const x = 17 + i * 9;
          const h = 22 + pseudoRandom(seed, i) * 14;
          return (
            <path
              key={i}
              d={`M${x} 92 Q${x - 3} ${92 - h * 0.6} ${x + 1} ${92 - h} Q${x + 2} ${92 - h * 0.6} ${x + 5} ${92 - h * 0.75} Q${x + 7} ${92 - h * 0.4} ${x + 8} 92 Z`}
              fill={i % 2 ? "#f97316" : "#fde047"}
              opacity="0.95"
            />
          );
        })}
      </g>
    );
  }
  if (s.includes("burgundy")) {
    return (
      <g>
        <path d="M20 26 L27 26 L22 90 L17 90 Z" fill="#ffffff" opacity="0.28" transform="rotate(8 22 58)" />
        <ellipse cx="36" cy="44" rx="3.5" ry="8" fill="#ffffff" opacity="0.35" transform="rotate(16 36 44)" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={22 + pseudoRandom(seed, i) * 16} cy={60 + pseudoRandom(seed, i + 3) * 25} r="1.4" fill="#fca5a5" opacity="0.5" />
        ))}
      </g>
    );
  }
  if (s.includes("lace") && !s.includes("snow")) {
    return (
      <g stroke="#e4e4e7" fill="none" opacity="0.9">
        <path d="M14 50 Q30 42 46 50" strokeWidth="1.5" />
        <path d="M14 62 Q30 54 46 62" strokeWidth="1.5" />
        <path d="M14 74 Q30 66 46 74" strokeWidth="1.5" />
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <circle key={i} cx={17 + i * 5.5} cy={56 + (i % 2) * 12} r="2.2" strokeWidth="1.2" />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={`d${i}`} cx={20 + i * 7} cy={68 + (i % 2) * 12} r="1" fill="#e4e4e7" stroke="none" />
        ))}
      </g>
    );
  }
  if (s.includes("spider") || s.includes("web")) {
    return (
      <g stroke="#e4e4e7" fill="none" opacity="0.9">
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 4) * Math.PI - Math.PI / 2;
          return <path key={i} d={`M30 56 L${30 + Math.cos(a) * 20} ${56 + Math.sin(a) * 26}`} strokeWidth="1.2" />;
        })}
        {[0, 1, 2].map((r) => (
          <path key={`r${r}`} d={`M${30 - 7 * (r + 1)} ${56 + 3 * (r + 1)} Q30 ${56 + 7 * (r + 1)} ${30 + 7 * (r + 1)} ${56 + 3 * (r + 1)}`} strokeWidth="1" opacity="0.8" />
        ))}
        <circle cx="30" cy="56" r="2" fill="#e4e4e7" stroke="none" />
      </g>
    );
  }
  if (s.includes("vampire")) {
    return (
      <g>
        <path d="M16 40 Q22 40 22 48 L22 60 Q22 66 25 66 Q28 66 28 58 L28 48 Q28 40 34 40 L34 40 Q40 40 40 48 L40 62 Q40 72 43 72" stroke="#dc2626" strokeWidth="4" fill="none" strokeLinecap="round" />
        <circle cx="25" cy="68" r="2.5" fill="#ef4444" />
        <ellipse cx="34" cy="50" rx="2" ry="4" fill="#fca5a5" opacity="0.7" />
      </g>
    );
  }
  if (s.includes("split")) {
    return (
      <g>
        <path d="M30 13 L46 13 L48 95 Q48 103 39 103 L30 103 Z" fill={accent} opacity="0.85" />
        <path d="M30 13 L30 103" stroke="#e4e4e7" strokeWidth="1.5" opacity="0.9" />
        <ellipse cx="22" cy="44" rx="2.5" ry="6" fill="#ffffff" opacity="0.25" />
      </g>
    );
  }
  if (s.includes("leopard")) {
    return (
      <g>
        {[
          [24, 52, 0],
          [36, 58, 1],
          [27, 68, 2],
          [37, 74, 0],
          [30, 82, 1],
          [21, 76, 2],
        ].map(([x, y, v], i) => (
          <g key={i}>
            <ellipse cx={x} cy={y} rx="4.5" ry="3.5" fill="#7c2d12" opacity="0.9" transform={`rotate(${v * 30 + pseudoRandom(seed, i) * 20} ${x} ${y})`} />
            <ellipse cx={x} cy={y} rx="2.4" ry="1.8" fill={base} transform={`rotate(${v * 30} ${x} ${y})`} />
          </g>
        ))}
        {[0, 1, 2].map((i) => (
          <circle key={`d${i}`} cx={20 + pseudoRandom(seed, i + 9) * 20} cy={44 + pseudoRandom(seed, i + 14) * 40} r="1.3" fill="#18181b" />
        ))}
      </g>
    );
  }
  if (s.includes("snake")) {
    return (
      <g>
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <ellipse
              key={`${row}-${col}`}
              cx={20 + col * 10 + (row % 2) * 5}
              cy={44 + row * 12}
              rx="5.5"
              ry="6.5"
              fill="none"
              stroke={col === 1 ? "#65a30d" : "#44403c"}
              strokeWidth="1.6"
              opacity="0.9"
            />
          ))
        )}
        <circle cx="30" cy="50" r="2" fill="#65a30d" />
      </g>
    );
  }
  if (s.includes("zebra")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${14 + i * 7} 34 Q${11 + i * 7} 60 ${16 + i * 7} 92`}
            stroke="#18181b"
            strokeWidth={3 + pseudoRandom(seed, i) * 2}
            fill="none"
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  }
  if (s.includes("cow")) {
    return (
      <g>
        {[
          [24, 52, 6],
          [37, 60, 7],
          [26, 72, 5],
          [36, 80, 6],
        ].map(([x, y, r], i) => (
          <path
            key={i}
            d={`M${x - r} ${y} Q${x - r} ${y - r} ${x} ${y - r * 0.8} Q${x + r} ${y - r * 0.6} ${x + r * 0.8} ${y + r * 0.5} Q${x + r * 0.4} ${y + r} ${x - r * 0.5} ${y + r * 0.7} Q${x - r * 1.1} ${y + r * 0.4} ${x - r} ${y} Z`}
            fill={i === 1 ? "#f9a8d4" : "#44403c"}
          />
        ))}
      </g>
    );
  }
  if (s.includes("tiger")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const y = 40 + i * 11;
          return (
            <path
              key={i}
              d={`M14 ${y} L24 ${y + 2} L20 ${y + 5} L32 ${y + 4} L28 ${y + 8} L46 ${y + 6}`}
              stroke="#18181b"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}
      </g>
    );
  }
  if (s.includes("marble")) {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M${16 + i * 4} 28 Q${24 + i * 6} ${50 + i * 8} ${18 + i * 3} 70 Q${28 - i * 4} 84 ${36 + i * 2} 94`}
            stroke="#ffffff"
            strokeWidth={1 + (i === 1 ? 1 : 0)}
            fill="none"
            opacity={0.7 - i * 0.15}
          />
        ))}
        <path d="M34 34 Q30 55 38 72 Q32 84 36 94" stroke={accent} strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M22 40 Q26 58 22 76" stroke={accent} strokeWidth="1.2" fill="none" opacity="0.4" />
      </g>
    );
  }
  if (s.includes("checker") || s.includes("chess")) {
    const dark = s.includes("chess") ? "#1c1917" : "#18181b";
    const light = s.includes("chess") ? "#e7e5e4" : "#fafaf9";
    return (
      <g>
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 4 }).map((_, c) => (
            <rect
              key={`${r}-${c}`}
              x={14 + c * 8}
              y={30 + r * 11}
              width="8"
              height="11"
              fill={(r + c) % 2 === 0 ? dark : light}
              opacity="0.92"
            />
          ))
        )}
      </g>
    );
  }
  if (s.includes("swirl") || s.includes("groovy") || s.includes("candy")) {
    return (
      <g>
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M14 ${48 + i * 13} Q22 ${40 + i * 13} 30 ${48 + i * 13} Q38 ${56 + i * 13} 46 ${48 + i * 13}`}
            stroke={i === 1 ? "#ffffff" : accent}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            opacity="0.9"
          />
        ))}
      </g>
    );
  }
  if (s.includes("aura")) {
    return (
      <g>
        <ellipse cx="30" cy="62" rx="13" ry="17" fill={accent} opacity="0.55" />
        <ellipse cx="30" cy="62" rx="8" ry="11" fill={accent} opacity="0.6" />
        <ellipse cx="30" cy="62" rx="4" ry="6" fill="#ffffff" opacity="0.5" />
      </g>
    );
  }
  if (s.includes("sakura")) {
    return (
      <g>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2 + pseudoRandom(seed, i) * 0.4;
          const px = 30 + Math.cos(a) * 6.5;
          const py = 60 + Math.sin(a) * 6.5;
          return (
            <path
              key={i}
              d={`M${px} ${py - 5.5} Q${px + 3.5} ${py - 3} ${px + 2.5} ${py + 1} Q${px + 1} ${py + 4.5} ${px} ${py + 5} Q${px - 1} ${py + 4.5} ${px - 2.5} ${py + 1} Q${px - 3.5} ${py - 3} ${px} ${py - 5.5} Z`}
              fill="#fbcfe8"
              opacity="0.95"
            />
          );
        })}
        <circle cx="30" cy="60" r="2.5" fill="#be123c" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={20 + pseudoRandom(seed, i + 5) * 20} cy={74 + pseudoRandom(seed, i + 9) * 14} r="2" fill="#fbcfe8" opacity="0.8" />
        ))}
      </g>
    );
  }
  if (s.includes("fan")) {
    return (
      <g>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const a = (Math.PI * (15 + i * 25)) / 180;
          return (
            <path
              key={i}
              d={`M30 78 L${30 + Math.cos(a - Math.PI / 2) * 24} ${78 + Math.sin(a - Math.PI / 2) * 24}`}
              stroke="#fde68a"
              strokeWidth="1.6"
            />
          );
        })}
        <path d="M12 78 A18 18 0 0 1 48 78 L44 78 A14 14 0 0 0 16 78 Z" fill="#dc2626" />
        <path d="M18 78 A12 12 0 0 1 42 78" stroke="#fefce8" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="78" r="2.5" fill="#fde68a" />
      </g>
    );
  }
  if (s.includes("dragon")) {
    return (
      <g>
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => (
            <path
              key={`${row}-${col}`}
              d={`M${15 + col * 8} ${54 + row * 10} a4.5 4.5 0 0 1 9 0`}
              stroke="#fde047"
              strokeWidth="1.6"
              fill={row === 1 && col === 1 ? "#14532d" : "none"}
              opacity="0.9"
            />
          ))
        )}
        <ellipse cx="24" cy="44" rx="3" ry="4" fill="#fde047" />
        <ellipse cx="24" cy="44" rx="1" ry="2" fill="#052e16" />
      </g>
    );
  }
  if (s.includes("lucky")) {
    return (
      <g>
        <circle cx="30" cy="60" r="9" fill="none" stroke="#fde68a" strokeWidth="2" />
        <circle cx="30" cy="60" r="5.5" fill="none" stroke="#fde68a" strokeWidth="1.2" opacity="0.8" />
        {[0, 1, 2, 3].map((i) => {
          const a = (i / 4) * Math.PI * 2;
          return <circle key={i} cx={30 + Math.cos(a) * 9} cy={60 + Math.sin(a) * 9} r="1.8" fill="#fde68a" />;
        })}
        <path d="M18 84 Q30 78 42 84" stroke="#fde68a" strokeWidth="1.5" fill="none" opacity="0.7" />
      </g>
    );
  }
  if (s.includes("pressed") || s.includes("botanical")) {
    return (
      <g>
        <path d="M30 88 L30 52" stroke="#16a34a" strokeWidth="1.5" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <ellipse cx={26 - i} cy={58 + i * 8} rx="3.5" ry="1.8" fill="#86efac" transform={`rotate(-30 ${26 - i} ${58 + i * 8})`} />
            <ellipse cx={34 + i} cy={62 + i * 8} rx="3.5" ry="1.8" fill="#86efac" transform={`rotate(30 ${34 + i} ${62 + i * 8})`} />
          </g>
        ))}
        <circle cx="30" cy="50" r="3" fill="#f472b6" />
        <circle cx="30" cy="50" r="1.2" fill="#fde047" />
        <circle cx="22" cy="78" r="2.2" fill="#ffffff" opacity="0.9" />
        <circle cx="38" cy="72" r="1.8" fill="#fbcfe8" />
      </g>
    );
  }
  if (s.includes("clover")) {
    return (
      <g>
        {[0, 1, 2].map((i) => {
          const cx = 22 + i * 8;
          const cy = 56 + (i % 2) * 12;
          return (
            <g key={i} fill="#16a34a">
              <circle cx={cx - 2.2} cy={cy} r="3" />
              <circle cx={cx + 2.2} cy={cy} r="3" />
              <circle cx={cx} cy={cy - 2.2} r="3" />
              <circle cx={cx} cy={cy + 2.2} r="3" />
            </g>
          );
        })}
      </g>
    );
  }
  if (s.includes("sunflower")) {
    return (
      <g>
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i / 10) * Math.PI * 2;
          const px = 30 + Math.cos(a) * 7;
          const py = 62 + Math.sin(a) * 7;
          return (
            <ellipse
              key={i}
              cx={px}
              cy={py}
              rx="3"
              ry="5.5"
              fill="#facc15"
              transform={`rotate(${(a * 180) / Math.PI} ${px} ${py})`}
            />
          );
        })}
        <circle cx="30" cy="62" r="5" fill="#78350f" />
        <circle cx="28.5" cy="60.5" r="0.8" fill="#a16207" />
        <circle cx="31.5" cy="63" r="0.8" fill="#a16207" />
      </g>
    );
  }
  if (s.includes("puffy") || (s.includes("3d") && s.includes("heart"))) {
    const gid = `puffy-${seed}`;
    return (
      <g>
        <defs>
          <radialGradient id={gid} cx="0.35" cy="0.3" r="0.9">
            <stop offset="0%" stopColor="#ffe4e6" />
            <stop offset="55%" stopColor={base} />
            <stop offset="100%" stopColor="#be123c" />
          </radialGradient>
        </defs>
        <path
          d="M22 62 Q22 54 28 54 Q30 54 30 57 Q30 54 32 54 Q38 54 38 62 Q38 70 30 75 Q22 70 22 62 Z"
          fill={`url(#${gid})`}
        />
        <ellipse cx="26.5" cy="59.5" rx="2" ry="3" fill="#ffffff" opacity="0.85" transform="rotate(-18 26.5 59.5)" />
        <circle cx="36" cy="80" r="1.6" fill="#fbcfe8" />
      </g>
    );
  }
  if (s.includes("bubble")) {
    return (
      <g>
        {[
          [24, 56, 6],
          [36, 64, 4.5],
          [29, 74, 5],
          [38, 48, 3],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="#ffffff" opacity="0.35" />
            <circle cx={x} cy={y} r={r} fill="none" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
            <circle cx={x - r * 0.3} cy={y - r * 0.3} r={r * 0.25} fill="#ffffff" opacity="0.95" />
          </g>
        ))}
      </g>
    );
  }
  if (s.includes("droplet") || s.includes("rain")) {
    return (
      <g>
        {[
          [25, 58, 4],
          [35, 68, 5],
          [28, 78, 3.5],
        ].map(([x, y, r], i) => (
          <g key={i}>
            <path d={`M${x} ${y - r * 1.6} Q${x + r} ${y} ${x + r * 0.8} ${y + r * 0.6} A${r} ${r} 0 1 1 ${x - r * 0.8} ${y + r * 0.6} Q${x - r} ${y} ${x} ${y - r * 1.6} Z`} fill="#38bdf8" opacity="0.55" />
            <circle cx={x - r * 0.3} cy={y + r * 0.2} r={r * 0.28} fill="#ffffff" opacity="0.95" />
          </g>
        ))}
      </g>
    );
  }
  if (s.includes("glacier") || s.includes("icy")) {
    return (
      <g>
        <path d="M14 60 L46 44 L46 52 L14 68 Z" fill="#ffffff" opacity="0.5" />
        <path d="M14 74 L46 60 L46 66 L14 80 Z" fill="#0369a1" opacity="0.35" />
        <path d="M30 34 l1.2 2.4 2.6 0.4 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.4 Z" fill="#ffffff" opacity="0.9" />
        <ellipse cx="36" cy="70" rx="2.5" ry="5" fill="#ffffff" opacity="0.5" transform="rotate(18 36 70)" />
      </g>
    );
  }
  if (s.includes("snow")) {
    return (
      <g stroke="#ffffff" strokeLinecap="round" opacity="0.95">
        {[0, 1, 2].map((i) => {
          const a = (i / 3) * Math.PI;
          return (
            <path
              key={i}
              d={`M${30 - Math.cos(a) * 13} ${62 - Math.sin(a) * 16} L${30 + Math.cos(a) * 13} ${62 + Math.sin(a) * 16}`}
              strokeWidth="1.8"
            />
          );
        })}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <path
              key={`t${i}`}
              d={`M${30 + Math.cos(a) * 8} ${62 + Math.sin(a) * 10} l${-Math.cos(a) * 2.5} ${-Math.sin(a) * 2.5 - 1.5} M${30 + Math.cos(a) * 8} ${62 + Math.sin(a) * 10} l${-Math.cos(a) * 2.5} ${-Math.sin(a) * 2.5 + 1.5}`}
              strokeWidth="1.2"
              opacity="0.9"
            />
          );
        })}
        <circle cx="30" cy="62" r="2" fill="#ffffff" stroke="none" />
      </g>
    );
  }
  if (s.includes("holiday") || s.includes("pine")) {
    return (
      <g>
        <path d="M30 46 L37 60 L33 60 L39 70 L35 70 L41 80 L19 80 L25 70 L21 70 L27 60 L23 60 Z" fill="#166534" />
        <path d="M30 80 L30 86" stroke="#78350f" strokeWidth="2.5" />
        <circle cx="27" cy="64" r="1.8" fill="#dc2626" />
        <circle cx="34" cy="70" r="1.8" fill="#dc2626" />
        <circle cx="28" cy="76" r="1.8" fill="#fde68a" />
        <path d="M30 40 l1.2 2.4 2.6 0.4 -1.9 1.8 0.5 2.6 -2.4 -1.3 -2.4 1.3 0.5 -2.6 -1.9 -1.8 2.6 -0.4 Z" fill="#fde68a" />
      </g>
    );
  }
  if (s.includes("haunted")) {
    return (
      <g>
        <circle cx="30" cy="52" r="8" fill="#f97316" />
        <circle cx="27" cy="52" r="1.5" fill="#18181b" />
        <circle cx="33" cy="52" r="1.5" fill="#18181b" />
        <path d="M27 56 Q30 58.5 33 56" stroke="#18181b" strokeWidth="1.2" fill="none" />
        <path d="M20 68 q3 -4 6 0 q3 -4 6 0" stroke="#a855f7" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        <path d="M28 76 q3 -4 6 0 q3 -4 6 0" stroke="#a855f7" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={20 + pseudoRandom(seed, i) * 20} cy={80 + pseudoRandom(seed, i + 4) * 10} r="1" fill="#fde68a" />
        ))}
      </g>
    );
  }
  if (s.includes("sweetheart")) {
    return (
      <g>
        <path d="M24 58 Q24 52 28 52 Q30 52 30 55 Q30 52 32 52 Q36 52 36 58 Q36 64 30 68 Q24 64 24 58 Z" fill="#be123c" />
        <path d="M34 72 Q34 68 37 68 Q38.5 68 38.5 70 Q38.5 68 40 68 Q43 68 43 72 Q43 76 38.5 78.5 Q34 76 34 72 Z" fill="#f472b6" />
        <circle cx="22" cy="74" r="1.5" fill="#ffffff" opacity="0.9" />
        <circle cx="40" cy="60" r="1.2" fill="#ffffff" opacity="0.9" />
      </g>
    );
  }
  if (s.includes("confetti")) {
    return (
      <g>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <rect
            key={i}
            x={17 + pseudoRandom(seed, i) * 26}
            y={36 + pseudoRandom(seed, i + 8) * 50}
            width="3"
            height="4.5"
            rx="0.8"
            fill={["#f9a8d4", "#fde047", "#93c5fd", "#86efac"][i % 4]}
            transform={`rotate(${pseudoRandom(seed, i + 16) * 90} ${17 + pseudoRandom(seed, i) * 26} ${36 + pseudoRandom(seed, i + 8) * 50})`}
            opacity="0.95"
          />
        ))}
      </g>
    );
  }
  if (s.includes("veil")) {
    return (
      <g>
        <path d="M14 40 Q30 34 46 40 L44 88 Q30 92 16 88 Z" fill="#ffffff" opacity="0.35" />
        <path d="M20 44 Q30 40 40 44" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.8" />
        <circle cx="30" cy="66" r="4" fill="#fdf4ff" />
        <circle cx="28.5" cy="64.5" r="1.2" fill="#ffffff" />
      </g>
    );
  }
  if (s.includes("janella") || s.includes("monogram")) {
    return (
      <g>
        <path d="M22 74 Q22 66 27 66 Q32 66 32 72 Q32 79 25 79" stroke="#a855f7" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="32" cy="63" r="1.4" fill="#a855f7" />
        <path d="M20 50 Q24 44 30 46 Q36 48 38 54" stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.7" />
        <circle cx="24" cy="82" r="1.2" fill="#f9a8d4" />
        <circle cx="37" cy="80" r="1.2" fill="#e9d5ff" />
      </g>
    );
  }
  // default: subtle shimmer dots
  return (
    <g>
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx={20 + pseudoRandom(seed, i * 3) * 20}
          cy={45 + pseudoRandom(seed, i * 3 + 1) * 35}
          r="2"
          fill="#ffffff"
          opacity="0.7"
        />
      ))}
    </g>
  );
}

function isDarkHex(hex: string): boolean {
  const m = hex.replace("#", "");
  if (m.length < 6) return false;
  const r = parseInt(m.slice(0, 2), 16) / 255;
  const g = parseInt(m.slice(2, 4), 16) / 255;
  const b = parseInt(m.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b < 0.35;
}

export default function NailPreview({ colors, style, shape = "almond", seed = "nail" }: NailPreviewProps) {
  const base = colors[0] ?? "#f9a8d4";
  const accent = colors[1] ?? "#ffffff";
  const deep = colors[2] ?? base;
  const d = nailPath(shape);
  const seedNum = hashSeed(`${seed}-${style}`);
  const xs = [0, 1, 2, 3, 4].map((i) => i * 64);
  const chrome = /chrome|glaz|pearl/i.test(style);
  const gradId = `chrome-${hashSeed(`${seed}-${style}-${shape}`).toString(36)}`;
  const darkBase = isDarkHex(base);

  return (
    <svg viewBox="0 0 320 120" className="h-auto w-full" role="img" aria-label={`${style} nail preview`}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="28%" stopColor={accent} />
          <stop offset="55%" stopColor={base} />
          <stop offset="80%" stopColor={deep} />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.85" />
        </linearGradient>
      </defs>
      {xs.map((x, i) => {
        const s = hashSeed(`${seed}-${i}`);
        return (
          <g key={i} transform={`translate(${x},0)`}>
            <path d={d} fill={chrome ? `url(#${gradId})` : base} />
            {!chrome && (
              <path d={d} fill={accent} opacity={0.18 + pseudoRandom(s, 7) * 0.25} />
            )}
            <StyleOverlay style={style} seed={s + seedNum} base={base} accent={accent} />
            {chrome && (
              <g>
                <path
                  d="M20 24 L28 24 L22 92 L17 92 Z"
                  fill="#ffffff"
                  opacity="0.55"
                  transform="rotate(8 23 58)"
                />
                <ellipse cx="37" cy="40" rx="4" ry="9" fill="#ffffff" opacity="0.65" transform="rotate(18 37 40)" />
                <path d={d} fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.7" />
              </g>
            )}
            <path d={d} fill="none" stroke={darkBase ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.12)"} strokeWidth="1.5" />
          </g>
        );
      })}
    </svg>
  );
}
