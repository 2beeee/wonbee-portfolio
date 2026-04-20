"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { recordAttempt } from "@/lib/study/db/practice-questions";

export async function recordAttemptAction(
  id: string,
  subjectId: string,
  correct: boolean
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("로그인 세션이 만료됐어요.");
  const supabase = await getSupabaseServerClient();
  const row = await recordAttempt(supabase, id, correct);
  revalidatePath(`/study/subjects/${subjectId}`);
  return row;
}
