"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/components/providers/FavoritesProvider";
import { cn } from "@/lib/utils";

export default function FavoriteButton({
  id,
  name,
  className,
}: {
  id: number;
  name: string;
  className?: string;
}) {
  const { isFavorite, toggle, hydrated } = useFavorites();
  const reduce = useReducedMotion();
  const fav = hydrated && isFavorite(id);

  return (
    <motion.span
      key={String(fav)}
      initial={false}
      animate={fav && !reduce ? { scale: [1, 1.35, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
      className="inline-flex"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        aria-pressed={fav}
        aria-label={fav ? `Remove ${name} from favorites` : `Add ${name} to favorites`}
        onClick={() => toggle(id)}
        className={cn("h-11 w-11", className)}
      >
        <Heart className={cn("h-4 w-4", fav ? "fill-rose-500 text-rose-500" : "text-muted-foreground")} />
      </Button>
    </motion.span>
  );
}
