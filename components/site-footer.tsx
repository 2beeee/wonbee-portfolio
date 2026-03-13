import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-neutral-200 py-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-3 px-4 text-sm text-neutral-600 sm:px-6 lg:px-8">
        <p>{siteConfig.name} · {siteConfig.role}</p>
        <p>Built with Next.js and TypeScript. Updated content can be managed in /data files.</p>
      </div>
    </footer>
  );
}
