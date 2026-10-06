"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import NailCard from "@/components/nail/NailCard";
import DesignDetailModal from "@/components/nail/DesignDetailModal";
import { CATEGORIES, DESIGNS } from "@/lib/designs";
import type { NailDesign } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function DesignsPage() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<NailDesign | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return DESIGNS.filter((d) => {
      const matchesCategory = active === "All" || d.category === active;
      if (!matchesCategory) return false;
      if (q.length === 0) return true;
      return (
        d.name.toLowerCase().includes(q) ||
        d.style.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q) ||
        d.colors.some((c) => c.toLowerCase().includes(q)) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, active]);

  const hasFilters = query.trim().length > 0 || active !== "All";
  const clearFilters = () => {
    setQuery("");
    setActive("All");
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight">Nail Designs</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {`${filtered.length} of ${DESIGNS.length} designs`}
      </p>

      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, style, color, or tag…"
          className="pl-9"
          aria-label="Search designs"
        />
      </div>

      <div
        role="group"
        aria-labelledby="category-filter-label"
        className="mt-4 flex snap-x gap-2 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible"
      >
        <span id="category-filter-label" className="sr-only">
          Filter by category
        </span>
        {["All", ...CATEGORIES].map((c) => (
          <Button
            key={c}
            variant={active === c ? "default" : "outline"}
            size="sm"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={cn("min-h-[44px] shrink-0 snap-start rounded-full", active !== c && "border")}
          >
            {c}
          </Button>
        ))}
      </div>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="mt-3">
          Clear filters
        </Button>
      )}

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              reduce || i >= 12
                ? { duration: 0 }
                : { duration: 0.35, delay: i * 0.05 }
            }
          >
            <NailCard design={d} onSelect={setSelected} />
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 flex flex-col items-center text-center">
          <p className="text-sm text-muted-foreground">No designs match ✨</p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-3">
            Clear filters
          </Button>
        </div>
      )}

      <DesignDetailModal design={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </main>
  );
}
