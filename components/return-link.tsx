import Link from "next/link";

type ReturnLinkProps = {
  href: string;
  label?: string;
};

export function ReturnLink({ href, label = "Back to Home" }: ReturnLinkProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-lg border border-border-dark bg-surface px-5 py-2.5 font-mono text-xs uppercase tracking-[0.12em] text-text-muted transition hover:border-combustion/40 hover:text-combustion"
    >
      <span aria-hidden>{"<-"}</span>
      <span>{label}</span>
    </Link>
  );
}
