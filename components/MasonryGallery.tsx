import DesignCard from "@/components/DesignCard";
import type { GalleryDesign } from "@/lib/gallery";

// CSS columns drive the masonry: zero JS measuring, no layout library.
// Browser flows cards top-to-bottom per column; `break-inside-avoid`
// keeps each card intact. Trade-off vs shortest-column JS distribution:
// column fill order is top-aligned per column rather than globally
// shortest-first, but it never reflows on resize and needs no observers.
export default function MasonryGallery({ designs }: { designs: GalleryDesign[] }) {
  return (
    <ul className="columns-1 gap-4 px-6 pb-24 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-6 [&>li]:mb-4">
      {designs.map((d) => (
        <DesignCard key={d.id} design={d} />
      ))}
    </ul>
  );
}
