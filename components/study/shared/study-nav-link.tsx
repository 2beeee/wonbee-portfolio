import Link from "next/link";
import { getCurrentUser } from "@/lib/supabase/server";

export async function StudyNavLink() {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <Link
      href="/study"
      className="rounded-lg border border-combustion/30 bg-combustion/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-combustion transition hover:bg-combustion/20"
    >
      Study Hub
    </Link>
  );
}
