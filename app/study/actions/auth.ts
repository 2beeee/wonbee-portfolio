"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { isEmailAllowed } from "@/lib/study/auth";

export type AuthFormState = { error?: string } | undefined;

export async function signInAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = String(formData.get("next") ?? "/study");

  if (!email || !password) return { error: "이메일과 비밀번호를 모두 입력하세요." };
  if (!isEmailAllowed(email)) return { error: "허용되지 않은 이메일입니다." };

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  redirect(nextPath.startsWith("/study") ? nextPath : "/study");
}

export async function signUpAction(_: AuthFormState, formData: FormData): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) return { error: "이메일과 비밀번호를 모두 입력하세요." };
  if (password.length < 8) return { error: "비밀번호는 8자 이상이어야 합니다." };
  if (!isEmailAllowed(email)) return { error: "이 이메일로는 가입할 수 없습니다." };

  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };
  redirect("/study/login?signup=ok");
}

export async function signOutAction(): Promise<void> {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/study/login");
}
