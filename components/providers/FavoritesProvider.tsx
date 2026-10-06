"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "@/lib/hooks/useLocalStorage";
import { STORAGE_KEYS } from "@/lib/storage";

interface FavoritesContextValue {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggle: (id: number) => void;
  hydrated: boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { value: raw, set, hydrated } = useLocalStorage<Array<number | string>>(STORAGE_KEYS.favorites, []);

  const favorites = useMemo<number[]>(
    () => raw.map(Number).filter((n) => Number.isFinite(n)),
    [raw]
  );

  const isFavorite = useCallback((id: number) => favorites.includes(id), [favorites]);

  const toggle = useCallback(
    (id: number) => {
      set((prev) => {
        const nums = prev.map(Number).filter((n) => Number.isFinite(n));
        return nums.includes(id) ? nums.filter((n) => n !== id) : [...nums, id];
      });
    },
    [set]
  );

  const val = useMemo(
    () => ({ favorites, isFavorite, toggle, hydrated }),
    [favorites, isFavorite, toggle, hydrated]
  );

  return <FavoritesContext.Provider value={val}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
