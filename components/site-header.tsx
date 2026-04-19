"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Liquid Propulsion" },
  { href: "/skills", label: "Skills" },
  { href: "/recap", label: "Recap" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader({ studySlot }: { studySlot?: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border-dark frosted-glass">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <div className="h-8 w-0.5 bg-gradient-to-b from-combustion to-transparent" />
          <div>
            <p className="font-mono text-sm font-medium tracking-[0.16em] text-warm-white">
              WONBEE PARK
            </p>
            <p className="font-mono text-[10px] tracking-[0.12em] text-text-muted transition group-hover:text-combustion">
              PROPULSION &amp; SYSTEMS
            </p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden sm:flex sm:items-center sm:gap-3">
          <ul className="flex items-center gap-1.5 font-mono text-sm tracking-wider">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-lg px-4 py-2 transition ${
                      isActive
                        ? "bg-combustion/15 text-combustion"
                        : "text-text-secondary hover:text-warm-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {studySlot}
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="sm:hidden p-2 text-text-secondary hover:text-warm-white"
          aria-label="Toggle menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M5 5l10 10M15 5L5 15" />
            ) : (
              <path d="M3 6h14M3 10h14M3 14h14" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="border-t border-border-dark px-4 py-3 sm:hidden frosted-glass">
          <ul className="flex flex-col gap-1 font-mono text-sm tracking-wider">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-lg px-4 py-3 transition ${
                      isActive
                        ? "bg-combustion/15 text-combustion"
                        : "text-text-secondary hover:text-warm-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          {studySlot && <div className="mt-3">{studySlot}</div>}
        </nav>
      )}
    </header>
  );
}
