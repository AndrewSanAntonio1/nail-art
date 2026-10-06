import Image from "next/image";
import { Bookmark, MoreHorizontal, Play } from "lucide-react";
import type { GalleryDesign } from "@/lib/gallery";

export default function DesignCard({ design }: { design: GalleryDesign }) {
  return (
    <li className="break-inside-avoid">
      <a href={`#${design.id}`} className="group block cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-ring/50">
        <span className="relative block overflow-hidden rounded-2xl bg-muted">
          <Image
            src={design.imageUrl}
            alt={design.title}
            width={design.width}
            height={design.height}
            sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-black/0 transition-colors duration-200 group-hover:bg-black/20" />
          <span className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button type="button" aria-label={`Save ${design.title}`} aria-pressed="false" className="flex h-11 w-11 items-center justify-center rounded-full bg-card/90 backdrop-blur hover:bg-card">
              <Bookmark className="h-4 w-4" />
            </button>
            <button type="button" aria-label={`More options for ${design.title}`} className="flex h-11 w-11 items-center justify-center rounded-full bg-card/90 backdrop-blur hover:bg-card">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </span>
          {design.isVideo && (
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white backdrop-blur">
              <Play className="h-3 w-3" /> Video
            </span>
          )}
        </span>
        <span className="mt-2 block px-1">
          <span className="block text-sm leading-snug text-foreground line-clamp-2">{design.title}</span>
          <span className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="inline-block h-4 w-4 rounded-full bg-muted-foreground/30" aria-hidden="true" />
            {design.source}
          </span>
        </span>
      </a>
    </li>
  );
}
