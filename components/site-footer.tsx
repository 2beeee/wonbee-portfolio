import Link from "next/link";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-200/80 bg-white/75 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 text-sm text-neutral-600 sm:px-6 lg:px-8">
        <p className="font-medium text-neutral-800">
          {siteConfig.name} | {siteConfig.role}
        </p>
        <p>Curated engineering portfolio focused on propulsion execution, practical build capability, and clear communication.</p>
        <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-600">
          <Link href="/projects" className="underline underline-offset-4 hover:text-neutral-900">
            Liquid Propulsion
          </Link>
          <Link href="/tedx" className="underline underline-offset-4 hover:text-neutral-900">
            TEDx
          </Link>
          <Link href="/awards" className="underline underline-offset-4 hover:text-neutral-900">
            Samsung Award
          </Link>
          <Link href="/skills" className="underline underline-offset-4 hover:text-neutral-900">
            Skills
          </Link>
          <Link href="/recap" className="underline underline-offset-4 hover:text-neutral-900">
            Recap
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-neutral-700">
          <a className="underline-offset-4 hover:text-neutral-900 hover:underline" href={siteConfig.links.email}>
            Email
          </a>
          <a
            className="underline-offset-4 hover:text-neutral-900 hover:underline"
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="underline-offset-4 hover:text-neutral-900 hover:underline"
            href={siteConfig.links.instagram}
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a className="underline-offset-4 hover:text-neutral-900 hover:underline" href={siteConfig.links.phone}>
            {siteConfig.contact.phone}
          </a>
          <a
            className="underline-offset-4 hover:text-neutral-900 hover:underline"
            href={siteConfig.links.tedxTalk}
            target="_blank"
            rel="noreferrer"
          >
            TEDx Talk
          </a>
        </div>
        <p className="text-xs text-neutral-500">
          {year} {siteConfig.name}. Seoul, South Korea.
        </p>
      </div>
    </footer>
  );
}
