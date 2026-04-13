import Link from "next/link";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-dark bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Col 1: Identity */}
          <div className="space-y-3">
            <p className="font-mono text-sm font-medium tracking-[0.12em] text-warm-white">
              {siteConfig.name}
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">
              {siteConfig.role}
            </p>
            <p className="text-xs leading-5 text-text-secondary">
              Curated engineering portfolio focused on propulsion execution, practical build capability, and clear communication.
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Navigation</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              <Link href="/projects" className="text-text-secondary transition hover:text-combustion">
                Liquid Propulsion
              </Link>
              <Link href="/tedx" className="text-text-secondary transition hover:text-combustion">
                TEDx
              </Link>
              <Link href="/awards" className="text-text-secondary transition hover:text-combustion">
                Samsung Award
              </Link>
              <Link href="/skills" className="text-text-secondary transition hover:text-combustion">
                Skills
              </Link>
              <Link href="/recap" className="text-text-secondary transition hover:text-combustion">
                Recap
              </Link>
              <Link href="/contact" className="text-text-secondary transition hover:text-combustion">
                Contact
              </Link>
            </div>
          </div>

          {/* Col 3: Coordinates + Links */}
          <div className="space-y-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">Connect</p>
            <div className="flex flex-wrap gap-3 text-xs">
              <a className="text-text-secondary transition hover:text-lox" href={siteConfig.links.email}>
                Email
              </a>
              <a
                className="text-text-secondary transition hover:text-lox"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                className="text-text-secondary transition hover:text-lox"
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              <a
                className="text-text-secondary transition hover:text-lox"
                href={siteConfig.links.tedxTalk}
                target="_blank"
                rel="noreferrer"
              >
                TEDx Talk
              </a>
            </div>
            <div className="mt-4 space-y-1 font-mono text-[10px] text-text-muted">
              <p>37.5665&deg;N &nbsp; 127.0092&deg;E</p>
              <p>Seoul, South Korea</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-border-dark pt-6">
          <p className="font-mono text-[10px] text-text-muted">
            &copy; {year} {siteConfig.name}
          </p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-glow-pulse" />
            <span className="font-mono text-[10px] text-text-muted">Systems nominal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
