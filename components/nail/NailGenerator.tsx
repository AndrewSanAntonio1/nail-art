"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import OptionChips from "@/components/nail/OptionChips";
import NailPreview from "@/components/nail/NailPreview";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS, readJSON, writeJSON } from "@/lib/storage";
import {
  OPTION_SETS,
  generateFromSelections,
  type GeneratorResult,
  type GeneratorSelections,
} from "@/lib/generator";
import type { NailShape } from "@/lib/types";

const DECORATION_PREVIEW_STYLE: Record<string, string> = {
  Hearts: "French Hearts",
  Flowers: "Floral",
  Stars: "Starry Night",
  Rhinestones: "Crystal Jewels",
  Pearls: "Pearl Chrome",
  Bows: "Coquette",
  Glitter: "Fairy Glitter",
  Chrome: "Silver Chrome",
  Swirls: "Candy Swirls",
  "3D Art": "Crystal Jewels",
};

const SECTIONS = ["Shape", "Length", "Color", "Style", "Decoration"] as const;

export default function NailGenerator() {
  const { value: prefs, hydrated } = useLocalStorage<Record<string, string>>(
    STORAGE_KEYS.preferences,
    {}
  );
  const [selections, setSelections] = useState<GeneratorSelections>({});
  const [result, setResult] = useState<GeneratorResult | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!hydrated) return;
    // Defer to after paint so the stored preferences prefill without a cascading render.
    const raf = requestAnimationFrame(() => {
      setSelections((prev) => ({
        shape: prev.shape ?? prefs?.shape,
        length: prev.length ?? prefs?.length,
        color: prev.color ?? prefs?.color,
        style: prev.style ?? prefs?.style,
        decoration: prev.decoration,
      }));
    });
    return () => cancelAnimationFrame(raf);
  }, [hydrated, prefs]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(t);
  }, [toast]);

  const setSection = (key: Lowercase<(typeof SECTIONS)[number]>, next: string | string[]) => {
    const v = Array.isArray(next) ? next[0] : next;
    setSelections((prev) => ({ ...prev, [key]: v || undefined }));
  };

  const generate = () => setResult(generateFromSelections(selections));

  const save = () => {
    if (!result) return;
    const recent = readJSON<GeneratorResult[]>(STORAGE_KEYS.recentDesigns, []);
    writeJSON(STORAGE_KEYS.recentDesigns, [result, ...recent.filter((r) => r.id !== result.id)].slice(0, 10));
    setToast("Saved to your studio 💗");
  };

  const share = async () => {
    if (!result) return;
    const text = `${result.name} — ${result.color} ${result.style} nails (${result.shape}, ${result.length}) with ${result.decoration.toLowerCase()} accents. Made with Nail Muse.`;
    try {
      if (typeof navigator !== "undefined" && "share" in navigator) {
        await (navigator as Navigator & { share: (d: { title: string; text: string }) => Promise<void> }).share({
          title: result.name,
          text,
        });
        return;
      }
      throw new Error("no-share");
    } catch {
      try {
        await navigator.clipboard.writeText(text);
        setToast("Copied — paste it anywhere to share");
      } catch {
        setToast("Could not share on this device");
      }
    }
  };

  const previewShape = (result?.shape?.toLowerCase() ?? "almond") as NailShape;

  return (
    <>
      <div className="space-y-5">
        {SECTIONS.map((section) => {
          const key = section.toLowerCase() as Lowercase<typeof section>;
          return (
            <OptionChips
              key={section}
              label={section}
              options={[...OPTION_SETS[section]]}
              value={selections[key] ?? ""}
              onChange={(next) => setSection(key, next)}
            />
          );
        })}
      </div>

      <motion.div whileTap={reduce ? undefined : { scale: 0.97 }} className="mt-6">
        <Button onClick={generate} className="h-12 w-full text-base" size="lg">
          ✨ Generate Design
        </Button>
      </motion.div>

      {result && (
        <Card className="mt-6 overflow-hidden">
          <div className="bg-gradient-to-b from-muted/60 to-muted p-3">
            <NailPreview
              colors={result.colors}
              style={DECORATION_PREVIEW_STYLE[result.decoration] ?? result.style}
              shape={previewShape}
              seed={result.image}
            />
          </div>
          <CardHeader className="p-4 pb-1">
            <CardTitle className="text-lg leading-tight">{result.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 p-4 pt-1">
            <motion.ul
              initial={reduce ? false : "hidden"}
              animate="show"
              variants={reduce ? undefined : { show: { transition: { staggerChildren: 0.06 } } }}
              className="space-y-1 text-sm"
            >
              {(
                [
                  ["Shape", result.shape],
                  ["Length", result.length],
                  ["Color", result.color],
                  ["Style", result.style],
                  ["Decoration", result.decoration],
                ] as Array<[string, string]>
              ).map(([k, v]) => (
                <motion.li
                  key={k}
                  variants={reduce ? undefined : { hidden: { opacity: 0, x: -8 }, show: { opacity: 1, x: 0 } }}
                  className="flex items-center gap-2"
                >
                  <span className="w-24 shrink-0 text-muted-foreground">{k}</span>
                  <Badge variant="secondary">{v}</Badge>
                </motion.li>
              ))}
            </motion.ul>
            <div className="flex flex-col gap-2">
              <Button onClick={save} className="h-11 w-full">
                Save
              </Button>
              <div className="flex gap-2">
                <Button onClick={share} variant="outline" className="h-11 flex-1">
                  Share
                </Button>
                <Button onClick={generate} variant="outline" className="h-11 flex-1">
                  Generate Again
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {toast && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-sm text-background shadow-lg md:bottom-8"
        >
          {toast}
        </div>
      )}
    </>
  );
}
