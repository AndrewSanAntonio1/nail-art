export const STORAGE_KEYS = {
  favorites: "nailmuse:favorites",
  preferences: "nailmuse:preferences",
  recentDesigns: "nailmuse:recentDesigns",
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined" || !("localStorage" in window)) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    try {
      window.localStorage.removeItem(key);
    } catch {
      // ignore removal errors
    }
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined" || !("localStorage" in window)) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota / serialization errors
  }
}
