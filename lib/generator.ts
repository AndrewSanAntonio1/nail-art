import type { GeneratedDesign } from "./types";
import { DESIGNS } from "./designs";

export const OPTION_SETS = {
  Shape: ["Almond", "Square", "Oval", "Coffin", "Stiletto", "Round"],
  Length: ["Short", "Medium", "Long", "Extra Long"],
  Color: ["Pink", "Lavender", "Blue", "White", "Red", "Black", "Nude", "Green", "Yellow", "Purple"],
  Style: ["Cute", "Elegant", "Chrome", "Floral", "Kawaii", "Y2K", "Minimal", "Gothic", "Romantic", "Luxury"],
  Decoration: ["Hearts", "Flowers", "Stars", "Rhinestones", "Pearls", "Bows", "Glitter", "Chrome", "Swirls", "3D Art"],
} as const;

export type GeneratorSelections = {
  shape?: string;
  length?: string;
  color?: string;
  style?: string;
  decoration?: string;
};

export type GeneratorResult = GeneratedDesign & {
  shape: string;
  length: string;
  color: string;
  decoration: string;
};

const COLOR_HEX: Record<string, [string, string]> = {
  Pink: ["#f9a8d4", "#fce7f3"],
  Lavender: ["#c4b5fd", "#ede9fe"],
  Blue: ["#93c5fd", "#eff6ff"],
  White: ["#ffffff", "#f1f5f9"],
  Red: ["#dc2626", "#fecaca"],
  Black: ["#27272a", "#52525b"],
  Nude: ["#e8c4a8", "#fdf6f0"],
  Green: ["#86efac", "#f0fdf4"],
  Yellow: ["#fde047", "#fefce8"],
  Purple: ["#a855f7", "#f3e8ff"],
};

const STYLE_AFFINITY: Record<string, { colors?: string[]; decorations?: string[]; shapes?: string[] }> = {
  Chrome: { decorations: ["Rhinestones", "Chrome", "Glitter"] },
  Gothic: { colors: ["Black", "Purple"], shapes: ["Almond", "Stiletto"] },
  Kawaii: { colors: ["Pink", "Lavender", "White", "Yellow"], decorations: ["Hearts", "Bows"] },
  Floral: { colors: ["Pink", "Green", "White", "Nude", "Lavender"], decorations: ["Flowers"] },
  Y2K: { colors: ["Pink", "Blue", "Purple", "Yellow"], decorations: ["Stars", "Chrome"] },
};

function pick<T>(options: readonly T[]): T {
  return options[Math.floor(Math.random() * options.length)] as T;
}

function weightedPick<T>(preferred: readonly T[] | undefined, fallback: readonly T[]): T {
  if (preferred && preferred.length > 0 && Math.random() < 0.75) return pick(preferred);
  return pick(fallback);
}

const CATALOG_NAMES = new Set(DESIGNS.map((d) => d.name.toLowerCase()));
const generatedNames = new Set<string>();

function uniqueName(color: string, style: string, decoration: string): string {
  const tails = [`${style} ${decoration}`, `${style} Dreams`, `${decoration} Accent`, `${style} Muse`];
  for (const tail of tails) {
    const name = `${color} ${tail}`;
    const key = name.toLowerCase();
    if (!CATALOG_NAMES.has(key) && !generatedNames.has(key)) {
      generatedNames.add(key);
      return name;
    }
  }
  let n = 2;
  while (generatedNames.has(`${color} ${style} ${decoration} ${n}`.toLowerCase())) n++;
  const name = `${color} ${style} ${decoration} ${n}`;
  generatedNames.add(name.toLowerCase());
  return name;
}

export function generateFromSelections(s: Partial<GeneratorSelections>): GeneratorResult {
  const style = s.style ?? pick(OPTION_SETS.Style);
  const affinity = STYLE_AFFINITY[style];
  const color = s.color ?? weightedPick(affinity?.colors, OPTION_SETS.Color);
  const decoration = s.decoration ?? weightedPick(affinity?.decorations, OPTION_SETS.Decoration);
  const shape = s.shape ?? weightedPick(affinity?.shapes, OPTION_SETS.Shape);
  const length = s.length ?? pick(OPTION_SETS.Length);

  const [primaryHex, secondaryHex] = COLOR_HEX[color] ?? COLOR_HEX.Pink;
  const name = uniqueName(color, style, decoration);

  return {
    id: `gen-${Date.now().toString(36)}-${Math.floor(Math.random() * 1e6).toString(36)}`,
    name,
    category: style,
    colors: [primaryHex, secondaryHex, primaryHex],
    style: `${style} ${decoration}`,
    difficulty: "Medium",
    description: `A custom ${color.toLowerCase()} ${style.toLowerCase()} look with ${decoration.toLowerCase()} accents, made for you.`,
    tags: [color.toLowerCase(), style.toLowerCase(), decoration.toLowerCase(), "custom"],
    image: `custom-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    shape,
    length,
    color,
    decoration,
    generatedAt: new Date().toISOString(),
    basedOn: Object.entries({ shape: s.shape, length: s.length, color: s.color, style: s.style, decoration: s.decoration })
      .filter(([, v]) => v !== undefined)
      .map(([k]) => k),
  };
}

export function surpriseMe(): GeneratorResult {
  return generateFromSelections({});
}
