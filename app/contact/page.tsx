import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact and professional profile links for Wonbee Park."
};

export default function ContactPage() {
  return (
    <section className="max-w-2xl space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="leading-7 text-neutral-700">
        For collaboration, project discussions, or technical conversations, use one of the channels below.
      </p>
      <ul className="space-y-3 text-sm text-neutral-700">
        <li>
          Email: <a className="underline underline-offset-4 hover:text-neutral-900" href={siteConfig.links.email}>your.email@example.com</a>
        </li>
        <li>
          GitHub: <a className="underline underline-offset-4 hover:text-neutral-900" href={siteConfig.links.github}>github.com/your-github</a>
        </li>
        <li>
          LinkedIn: <a className="underline underline-offset-4 hover:text-neutral-900" href={siteConfig.links.linkedin}>linkedin.com/in/your-linkedin</a>
        </li>
      </ul>
    </section>
  );
}
