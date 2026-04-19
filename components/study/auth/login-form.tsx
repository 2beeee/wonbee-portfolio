"use client";

import { useActionState } from "react";
import { signInAction, type AuthFormState } from "@/app/study/actions/auth";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState<AuthFormState, FormData>(signInAction, undefined);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="next" value={next} />
      <Field label="이메일" name="email" type="email" autoComplete="email" required />
      <Field label="비밀번호" name="password" type="password" autoComplete="current-password" required />
      {state?.error && (
        <p className="rounded-md border border-combustion/40 bg-combustion/10 px-3 py-2 text-xs text-combustion">
          {state.error}
        </p>
      )}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg border border-combustion/40 bg-combustion/15 px-4 py-2.5 font-mono text-sm tracking-wider text-combustion transition hover:bg-combustion/25 disabled:opacity-50"
      >
        {pending ? "접속 중..." : "로그인"}
      </button>
    </form>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-text-muted">{label}</span>
      <input
        {...rest}
        className="w-full rounded-lg border border-border-dark bg-surface px-3 py-2 text-sm text-warm-white placeholder:text-text-muted focus:border-combustion focus:outline-none"
      />
    </label>
  );
}
