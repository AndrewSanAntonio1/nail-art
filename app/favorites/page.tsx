"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PageContainer from "@/components/layout/PageContainer";
import NailCard from "@/components/nail/NailCard";
import DesignDetailModal from "@/components/nail/DesignDetailModal";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { DESIGNS_BY_ID } from "@/lib/designs";
import type { NailDesign } from "@/lib/types";

export default function FavoritesPage() {
  const { favorites, hydrated } = useFavorites();
  const [selected, setSelected] = useState<NailDesign | null>(null);
  const reduce = useReducedMotion();
  const saved = favorites
    .map((id) => DESIGNS_BY_ID[String(id)])
    .filter(Boolean);

  return (
    <PageContainer>
      <h1 className="text-3xl font-bold tracking-tight">My Favorite Nails 💗</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {!hydrated ? "Loading…" : `${saved.length} saved designs`}
      </p>
      {hydrated && saved.length === 0 && (
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="font-medium">No favorites yet ✨</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Find something pretty for your next look.
          </p>
          <Link
            href="/designs"
            className="mt-4 inline-flex h-10 items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Browse designs
          </Link>
        </div>
      )}
      {reduce ? (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {saved.map((d) => (
            <NailCard key={d.id} design={d} onSelect={setSelected} />
          ))}
        </div>
      ) : (
      <motion.div layout className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence initial={false}>
          {saved.map((d) => (
            <motion.div
              key={d.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.25 }}
            >
              <NailCard design={d} onSelect={setSelected} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      )}

      <DesignDetailModal design={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </PageContainer>
  );
}
