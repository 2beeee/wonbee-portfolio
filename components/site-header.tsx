"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="group">
          <p className="text-sm font-semibold tracking-[0.12em] text-neutral-900">WONBEE PARK</p>
          <p className="text-[11px] text-neutral-500 transition group-hover:text-neutral-700">Propulsion and Systems Engineering</p>
        </Link>
        <nav aria-label="Primary">
          <ul className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 sm:justify-end">
            {nav.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-full px-3 py-1.5 transition ${
                      isActive
                        ? "bg-neutral-900 text-white"
                        : "border border-transparent hover:border-neutral-300 hover:text-neutral-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
