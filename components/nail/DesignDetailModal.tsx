"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import NailPreview from "@/components/nail/NailPreview";
import FavoriteButton from "@/components/nail/FavoriteButton";
import type { NailDesign } from "@/lib/types";

export default function DesignDetailModal({
  design,
  onOpenChange,
}: {
  design: NailDesign | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={design !== null} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {design && (
          <>
            <DialogHeader>
              <DialogTitle>{design.name}</DialogTitle>
              <DialogDescription>{design.description}</DialogDescription>
            </DialogHeader>
            <div className="rounded-xl bg-gradient-to-b from-muted/60 to-muted p-3">
              <NailPreview
                colors={design.colors}
                style={design.style}
                shape="almond"
                seed={design.image}
              />
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              <Badge variant="secondary">{design.category}</Badge>
              <Badge variant="outline">{design.style}</Badge>
              <Badge variant="outline">{design.difficulty}</Badge>
              {design.tags.map((t) => (
                <Badge key={t} variant="outline" className="font-normal">
                  #{t}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <FavoriteButton id={Number(design.id)} name={design.name} />
              <span className="text-xs text-muted-foreground">Save to favorites</span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
