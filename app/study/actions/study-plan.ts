"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { setPlanStatus } from "@/lib/study/db/study-plan";

export async function setPlanStatusAction(
  id: string,
  status: "pending" | "done" | "skipped"
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("로그인 세션이 만료됐어요.");
  const supabase = await getSupabaseServerClient();
  const row = await setPlanStatus(supabase, id, status);
  revalidatePath("/study");
  return row;
}
