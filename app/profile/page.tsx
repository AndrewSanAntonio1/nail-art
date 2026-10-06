"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/PageContainer";
import OptionChips from "@/components/nail/OptionChips";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { OPTION_SETS } from "@/lib/generator";
import type { NailLength, NailShape } from "@/lib/types";

const SHAPES: NailShape[] = ["almond", "square", "oval", "coffin", "stiletto", "round"];
const LENGTHS: NailLength[] = ["short", "medium", "long"];

type Prefs = {
  name?: string;
  style?: string;
  color?: string;
  shape?: string;
  length?: string;
};

const ROWS: Array<{ key: keyof Prefs; label: string; options: string[] }> = [
  { key: "style", label: "Favorite Style", options: [...OPTION_SETS.Style] },
  { key: "color", label: "Favorite Color", options: [...OPTION_SETS.Color] },
  { key: "shape", label: "Preferred Shape", options: SHAPES.map((s) => s.charAt(0).toUpperCase() + s.slice(1)) },
  { key: "length", label: "Preferred Length", options: [...LENGTHS.map((l) => l.charAt(0).toUpperCase() + l.slice(1)), "Extra Long"] },
];

export default function ProfilePage() {
  const { value: prefs, set } = useLocalStorage<Prefs>(STORAGE_KEYS.preferences, {
    name: "Janella Llaguno",
  });
  const [editing, setEditing] = useState<string | null>(null);

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold tracking-tight">💗 Janella Llaguno&apos;s Nail Studio</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your preferences power the home greeting and prefill the design studio.
      </p>

      <div className="mt-6 space-y-3">
        {ROWS.map((row) => {
          const current = prefs?.[row.key];
          const isOpen = editing === row.key;
          return (
            <div key={row.key} className="rounded-xl border border-border bg-card p-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{row.label}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{current ?? "Not set yet"}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditing(isOpen ? null : row.key)}
                  aria-label={`Edit ${row.label}`}
                >
                  <Pencil className="h-4 w-4" />
                  {isOpen ? "Done" : "Edit"}
                </Button>
              </div>
              {isOpen && (
                <div className="mt-3">
                  <OptionChips
                    label={row.label}
                    options={row.options}
                    value={current ?? ""}
                    onChange={(next) => set({ ...(prefs ?? {}), [row.key]: next as string })}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
}
