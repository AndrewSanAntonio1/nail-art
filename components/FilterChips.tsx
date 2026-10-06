"use client";

import { useRef } from "react";
import { CHIP_COLORS, CHIP_LABELS } from "@/lib/gallery";

export default function FilterChips({
  active,
  onSelect,
}: {
  active: string | null;
  onSelect: (label: string | null) => void;
}) {
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  const onKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = e.key === "ArrowRight" ? (index + 1) % CHIP_LABELS.length : (index - 1 + CHIP_LABELS.length) % CHIP_LABELS.length;
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Filter by category"
      className="scrollbar-hide sticky top-16 z-20 flex gap-2 overflow-x-auto bg-background px-6 py-3"
    >
      {CHIP_LABELS.map((label, i) => {
        const selected = active === label;
        return (
          <button
            key={label}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            aria-selected={selected}
            tabIndex={selected || (active === null && i === 0) ? 0 : -1}
            onClick={() => onSelect(selected ? null : label)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`flex shrink-0 items-center gap-2 rounded-full border py-1 pl-1 pr-4 transition-colors duration-150 ease-out ${
              selected
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card hover:border-ring/60 hover:bg-muted"
            }`}
          >
            <span
              aria-hidden="true"
              className="h-10 w-10 rounded-lg border border-border"
              style={{ backgroundColor: CHIP_COLORS[label] ?? "var(--muted)" }}
            />
            <span className="text-sm font-medium">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
