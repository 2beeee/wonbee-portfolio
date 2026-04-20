"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { provisionUserIfNeeded } from "@/lib/study/db/provisioning";

export type ProvisionResult = { ok: true } | { ok: false; error: string };

export async function runProvisionAction(): Promise<ProvisionResult> {
  try {
    const user = await getCurrentUser();
    if (!user) return { ok: false, error: "로그인 세션을 찾을 수 없습니다." };
    const supabase = await getSupabaseServerClient();
    await provisionUserIfNeeded(supabase, user.id);
    revalidatePath("/study");
    return { ok: true };
  } catch (e) {
    const err = e as { message?: string; code?: string; details?: string; hint?: string };
    const parts = [err.message, err.code, err.details, err.hint].filter(Boolean);
    return { ok: false, error: parts.join(" · ") || "알 수 없는 오류" };
  }
}
