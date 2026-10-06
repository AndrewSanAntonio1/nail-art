import GalleryApp from "@/components/GalleryApp";

export const metadata = {
  title: "Nail Muse — Masonry Gallery",
  description: "A masonry mix of nail art looks: search, chip-filter, and browse.",
};

export default function MasonryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <GalleryApp />
    </main>
  );
}
