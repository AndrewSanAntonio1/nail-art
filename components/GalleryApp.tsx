"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import FilterChips from "@/components/FilterChips";
import MasonryGallery from "@/components/MasonryGallery";
import { GALLERY_DESIGNS } from "@/lib/gallery";

function SkeletonGrid() {
  const heights = [320, 480, 260, 560, 400, 300, 520, 360, 440, 280, 500, 340];
  return (
    <ul className="columns-1 gap-4 px-6 pb-24 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6" aria-hidden="true">
      {heights.map((h, i) => (
        <li key={i} className="mb-4 break-inside-avoid">
          <div className="animate-pulse rounded-2xl bg-muted" style={{ height: h }} />
        </li>
      ))}
    </ul>
  );
}

export default function GalleryApp() {
  const [query, setQuery] = useState("");
  const [chip, setChip] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GALLERY_DESIGNS.filter((d) => {
      if (chip && !d.tags.includes(chip)) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, chip]);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur">
        <div className="flex h-16 items-center gap-4 px-6">
          <p className="text-2xl font-bold tracking-tight">
            <span className="text-primary">nail</span>
            <span className="text-foreground">book</span>
          </p>
          <div className="flex flex-1 justify-center">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <div className="flex items-center gap-3">
            <button type="button" aria-label="Google apps" className="rounded-full p-2 text-muted-foreground hover:bg-muted">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                { [0, 1, 2].map((r) => [0, 1, 2].map((c) => (
                  <circle key={`${r}-${c}`} cx={4 + c * 6} cy={4 + r * 6} r={1.8} />
                )))}
              </svg>
            </button>
            <Image
              src="/profilepic.png"
              alt="Your profile photo"
              width={1080}
              height={1440}
              className="h-8 w-8 rounded-full object-cover ring-2 ring-border"
            />
          </div>
        </div>
      </header>

      <FilterChips active={chip} onSelect={setChip} />

      {!mounted ? (
        <SkeletonGrid />
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center px-6 py-24 text-center">
          <div className="h-32 w-32 rounded-2xl bg-muted" aria-hidden="true" />
          <p className="mt-6 text-lg font-medium">No designs match {query ? `"${query}"` : "these filters"}</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setChip(null);
            }}
            className="mt-4 rounded-md px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <MasonryGallery designs={filtered} />
      )}
    </>
  );
}
