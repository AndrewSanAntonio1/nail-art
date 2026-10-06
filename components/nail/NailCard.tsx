"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NailPreview from "@/components/nail/NailPreview";
import FavoriteButton from "@/components/nail/FavoriteButton";
import type { NailDesign } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function NailCard({
  design,
  onSelect,
  className,
}: {
  design: NailDesign;
  onSelect?: (design: NailDesign) => void;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      whileHover={reduce ? undefined : { y: -4 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
    <Card className={cn("relative overflow-hidden", className)}>
      <div className="absolute right-2 top-2 z-10">
        <FavoriteButton id={Number(design.id)} name={design.name} />
      </div>
      <button
        type="button"
        onClick={() => onSelect?.(design)}
        aria-label={`View ${design.name}`}
        className="block w-full cursor-pointer rounded-t-xl text-left focus-visible:outline-2 focus-visible:outline-ring/50"
      >
        <span className="block bg-gradient-to-b from-muted/60 to-muted p-2">
          <NailPreview colors={design.colors} style={design.style} shape="almond" seed={design.image} />
        </span>
        <CardHeader className="p-4 pb-1">
          <CardTitle className="text-sm font-semibold leading-tight">{design.name}</CardTitle>
        </CardHeader>
      </button>
      <CardContent className="space-y-2 p-4 pt-1">
        <p className="text-xs text-muted-foreground">{design.description}</p>
        <div className="flex flex-wrap gap-1">
          <Badge variant="secondary">{design.category}</Badge>
          <Badge variant="outline">{design.difficulty}</Badge>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}
