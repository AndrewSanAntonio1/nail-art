"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import PageContainer from "@/components/layout/PageContainer";
import NailPreview from "@/components/nail/NailPreview";
import NailCard from "@/components/nail/NailCard";
import FavoriteButton from "@/components/nail/FavoriteButton";
import DesignDetailModal from "@/components/nail/DesignDetailModal";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";
import { DESIGNS, DESIGNS_BY_ID } from "@/lib/designs";
import type { NailDesign } from "@/lib/types";

const TRENDING_IDS = ["11", "2", "18", "26", "31", "44", "13", "7", "45", "5", "43", "8"];

const COLOR_WORDS = [
  "pink", "white", "silver", "lavender", "blue", "pearl", "red", "nude",
  "lilac", "gold", "black", "green", "plum", "coral", "peach",
];

function colorWord(design: NailDesign): string {
  const tags = design.tags.map((t) => t.toLowerCase());
  const hit = COLOR_WORDS.find((c) => tags.includes(c));
  if (hit) return hit.charAt(0).toUpperCase() + hit.slice(1);
  return design.colors[0] ?? "";
}

const QUICK_ACTIONS = [
  { href: "/create", icon: "✨", label: "Create Design" },
  { href: "/designs", icon: "🎨", label: "Browse Designs" },
  { href: "/favorites", icon: "💗", label: "Favorites" },
] as const;

export default function Dashboard() {
  const { value: prefs } = useLocalStorage<{ name?: string }>(
    STORAGE_KEYS.preferences,
    { name: "Janella Llaguno" }
  );
  const name = prefs?.name?.trim() ? prefs.name : "Janella Llaguno";
  const [selected, setSelected] = useState<NailDesign | null>(null);

  const featured = DESIGNS_BY_ID["11"] ?? DESIGNS[0];
  const trending = TRENDING_IDS.map((id) => DESIGNS_BY_ID[id]).filter(Boolean);

  const surprise = () => {
    const pick = DESIGNS[Math.floor(Math.random() * DESIGNS.length)];
    setSelected(pick ?? null);
  };

  return (
    <PageContainer>
      <section aria-label="Greeting">
        <h1 className="text-3xl font-bold tracking-tight">Hi, {name} 💗</h1>
        <p className="mt-1 text-muted-foreground">What are we creating today?</p>
      </section>

      <section aria-label="Featured design" className="mt-6">
        <div
          role="button"
          tabIndex={0}
          onClick={() => setSelected(featured)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setSelected(featured);
            }
          }}
          className="block w-full cursor-pointer rounded-2xl border border-white/40 bg-white/60 p-5 text-left shadow-lg backdrop-blur-md focus-visible:outline-2 focus-visible:outline-ring/50 dark:border-white/10 dark:bg-white/10"
        >
          <span className="block overflow-hidden rounded-xl">
            <NailPreview colors={featured.colors} style={featured.style} shape="almond" seed={featured.image} />
          </span>
          <span className="mt-3 flex items-start justify-between gap-2">
            <span>
              <span className="block text-lg font-semibold leading-tight">{featured.name}</span>
              <span className="mt-0.5 block text-sm text-muted-foreground">
                {featured.category} • {colorWord(featured)} • Almond
              </span>
            </span>
            <span onClick={(e) => e.stopPropagation()}>
              <FavoriteButton id={Number(featured.id)} name={featured.name} />
            </span>
          </span>
        </div>
      </section>

      <section aria-label="Quick actions" className="mt-6">
        <div className="grid grid-cols-2 gap-3">
          {QUICK_ACTIONS.map((a) => (
            <Link key={a.href} href={a.href}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-2 p-4">
                  <span aria-hidden="true" className="text-xl">{a.icon}</span>
                  <CardTitle className="text-sm font-semibold">{a.label}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
          <button type="button" onClick={surprise} className="text-left">
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardContent className="flex h-full items-center gap-2 p-4">
                <span aria-hidden="true" className="text-xl">🎲</span>
                <CardTitle className="text-sm font-semibold">Surprise Me</CardTitle>
              </CardContent>
            </Card>
          </button>
        </div>
      </section>

      <section aria-label="Trending now" className="mt-8">
        <h2 className="flex items-center gap-1.5 text-xl font-bold tracking-tight">
          Trending now <Sparkles className="h-4 w-4 text-primary" aria-hidden="true" />
        </h2>
        <div className="scrollbar-hide -mx-6 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-2">
          {trending.map((d) => (
            <NailCard
              key={d.id}
              design={d}
              onSelect={setSelected}
              className="w-44 shrink-0 snap-center sm:w-52"
            />
          ))}
        </div>
      </section>

      <DesignDetailModal design={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </PageContainer>
  );
}
