import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Wonbee Park for engineering collaboration, research, and project opportunities."
};

export default function ContactPage() {
  return (
    <section className="max-w-3xl space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-lox">Connect</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Contact</h1>
        <p className="leading-7 text-text-secondary">
          For collaboration, research conversations, or project opportunities, reach out through the channels below.
        </p>
      </header>

      <section className="scroll-animate rounded-xl border border-border-dark bg-surface p-6">
        <ul className="space-y-5">
          <li className="flex items-center gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-border-dark bg-surface-light font-mono text-xs text-combustion">@</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Email</p>
              <a className="text-sm text-lox transition hover:text-combustion" href={siteConfig.links.email}>
                {siteConfig.contact.email}
              </a>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-border-dark bg-surface-light font-mono text-xs text-combustion">in</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">LinkedIn</p>
              <a
                className="text-sm text-lox transition hover:text-combustion"
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                wonbee-park-859711329
              </a>
            </div>
          </li>
          <li className="flex items-center gap-4">
            <span className="flex h-8 w-8 items-center justify-center rounded border border-border-dark bg-surface-light font-mono text-xs text-lox">ig</span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">Instagram</p>
              <a
                className="text-sm text-lox transition hover:text-combustion"
                href={siteConfig.links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                {siteConfig.contact.instagram}
              </a>
            </div>
          </li>
        </ul>
      </section>

      <section className="scroll-animate rounded-xl border border-border-dark bg-surface p-6">
        <p className="text-sm leading-6 text-text-secondary">
          TEDx talk link:{" "}
          <a href={siteConfig.links.tedxTalk} target="_blank" rel="noreferrer" className="text-lox underline underline-offset-4 transition hover:text-combustion">
            YouTube (starts at 1:19:30)
          </a>
        </p>
      </section>

      {/* Coordinates */}
      <div className="scroll-animate flex items-center gap-4 rounded-xl border border-border-dark bg-surface px-6 py-4">
        <div className="h-8 w-0.5 bg-gradient-to-b from-lox to-transparent" />
        <div className="font-mono text-[10px] text-text-muted">
          <p>37.5665&deg;N &nbsp; 127.0092&deg;E</p>
          <p>Seoul, South Korea</p>
        </div>
      </div>
    </section>
  );
}
