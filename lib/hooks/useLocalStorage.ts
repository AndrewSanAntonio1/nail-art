"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Read storage after paint: deferred so hydration completes first, avoiding a cascading render.
    const raf = requestAnimationFrame(() => {
      setValue(readJSON<T>(key, initialValue));
      setHydrated(true);
    });
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const set = (next: T | ((prev: T) => T)) => {
    setValue((prev) => {
      const resolved = typeof next === "function" ? (next as (p: T) => T)(prev) : next;
      writeJSON(key, resolved);
      return resolved;
    });
  };

  return { value, set, hydrated };
}
