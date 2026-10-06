import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/components/providers/FavoritesProvider";
import MobileNav from "@/components/layout/MobileNav";
import Sparkles from "@/components/decorative/Sparkles";
import FloatingHearts from "@/components/decorative/FloatingHearts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nail Muse — Find your perfect nail design",
  description: "Browse cute, elegant, chrome, and floral nail designs. Search, filter, and save favorites.",
  icons: { icon: "/browserpic.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <FavoritesProvider>
          <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
            <Sparkles />
            <FloatingHearts />
          </div>
          <div className="relative flex min-h-full flex-1 flex-col">
            <header className="border-b">
          <nav aria-label="Desktop" className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="text-sm font-bold tracking-tight">
              💅 Nail Muse
            </Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/designs" className="font-medium hover:underline">
                Gallery
              </Link>
              <Link href="/masonry" className="text-muted-foreground hover:text-foreground">
                Masonry
              </Link>
            </div>
          </nav>
        </header>
        {children}
        <MobileNav />
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
