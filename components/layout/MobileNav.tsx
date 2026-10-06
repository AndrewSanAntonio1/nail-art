"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Home, Images, LayoutGrid, PlusCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";

const ITEMS = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/designs", label: "Designs", Icon: Images },
  { href: "/masonry", label: "Masonry", Icon: LayoutGrid },
  { href: "/create", label: "Create", Icon: PlusCircle },
  { href: "/favorites", label: "Favorites", Icon: Heart },
  { href: "/profile", label: "Profile", Icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 rounded-t-3xl border-t border-border bg-background/80 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="flex items-stretch justify-around px-2 pb-1 pt-2">
        {ITEMS.map(({ href, label, Icon }) => {
          const active = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative mx-auto flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-xl px-2 py-1.5 text-[11px] font-medium",
                  active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {active && (
                  <motion.span
                    layoutId={reduce ? undefined : "mobile-nav-pill"}
                    transition={{ type: "spring", stiffness: 500, damping: 40 }}
                    className="absolute inset-0 rounded-xl bg-primary/10"
                    aria-hidden="true"
                  />
                )}
                <Icon className="relative h-5 w-5" aria-hidden="true" />
                <span className="relative">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
