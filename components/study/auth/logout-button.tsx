"use client";

import { signOutAction } from "@/app/study/actions/auth";

export function LogoutButton() {
  return (
    <form action={signOutAction}>
      <button
        type="submit"
        className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-secondary transition hover:text-combustion"
      >
        Sign Out
      </button>
    </form>
  );
}
