import Link from "next/link";

type ReturnLinkProps = {
  href: string;
  label?: string;
};

export function ReturnLink({ href, label = "Back to Home" }: ReturnLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-neutral-300/80 bg-white/80 px-3 py-1.5 text-xs font-medium tracking-wide text-neutral-700 transition hover:-translate-y-0.5 hover:border-neutral-500 hover:text-neutral-900"
    >
      <span aria-hidden>{"<-"}</span>
      <span>{label}</span>
    </Link>
  );
}
