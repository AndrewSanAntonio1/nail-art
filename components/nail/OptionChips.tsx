"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function OptionChips({
  options,
  value,
  onChange,
  label,
  multi = false,
}: {
  options: string[];
  value: string | string[];
  onChange: (next: string | string[]) => void;
  label: string;
  multi?: boolean;
}) {
  const id = `option-chips-${label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const selected = (opt: string) =>
    Array.isArray(value) ? value.includes(opt) : value === opt;

  const toggle = (opt: string) => {
    if (multi) {
      const arr = Array.isArray(value) ? value : value ? [value] : [];
      const next = arr.includes(opt) ? arr.filter((v) => v !== opt) : [...arr, opt].slice(-2);
      onChange(next);
    } else {
      onChange(opt);
    }
  };

  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="mb-2 text-sm font-medium">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <Button
            key={opt}
            type="button"
            variant={selected(opt) ? "default" : "outline"}
            size="sm"
            aria-pressed={selected(opt)}
            onClick={() => toggle(opt)}
            className={cn("min-h-[44px] rounded-full", !selected(opt) && "border")}
          >
            {opt}
          </Button>
        ))}
      </div>
    </div>
  );
}
