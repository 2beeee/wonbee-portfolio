import type { Metadata } from "next";
import { ReturnLink } from "@/components/return-link";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Wonbee Park for engineering collaboration, research, and project opportunities."
};

export default function ContactPage() {
  return (
    <section className="max-w-3xl space-y-8">
      <ReturnLink href="/" label="Back to Home" />

      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Contact</h1>
        <p className="leading-7 text-neutral-700">
          For collaboration, research conversations, or project opportunities, reach out through the channels below.
        </p>
      </header>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <ul className="space-y-4 text-sm text-neutral-700 sm:text-base">
          <li>
            <span className="font-medium text-neutral-900">Email:</span>{" "}
            <a className="underline underline-offset-4 hover:text-neutral-900" href={siteConfig.links.email}>
              {siteConfig.contact.email}
            </a>
          </li>
          <li>
            <span className="font-medium text-neutral-900">LinkedIn:</span>{" "}
            <a
              className="underline underline-offset-4 hover:text-neutral-900"
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              wonbee-park-859711329
            </a>
          </li>
          <li>
            <span className="font-medium text-neutral-900">Instagram:</span>{" "}
            <a
              className="underline underline-offset-4 hover:text-neutral-900"
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noreferrer"
            >
              {siteConfig.contact.instagram}
            </a>
          </li>
          <li>
            <span className="font-medium text-neutral-900">Phone:</span>{" "}
            <a className="underline underline-offset-4 hover:text-neutral-900" href={siteConfig.links.phone}>
              {siteConfig.contact.phone}
            </a>
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-neutral-200 bg-white p-6">
        <p className="text-sm leading-6 text-neutral-700">
          TEDx talk link:{" "}
          <a href={siteConfig.links.tedxTalk} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-neutral-900">
            YouTube (starts at 1:19:30)
          </a>
        </p>
      </section>
    </section>
  );
}
