"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as SubjectsDb from "@/lib/study/db/subjects";

export async function updateSubjectAction(
  id: string,
  patch: Partial<{
    name: string;
    exam_date: string | null;
    exam_period: string | null;
    exam_start_time: string | null;
    location: string | null;
    notes: string | null;
    score_breakdown: Record<string, number> | null;
  }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await SubjectsDb.updateSubject(supabase, id, patch);
  revalidatePath(`/study/subjects/${id}`);
  revalidatePath("/study");
}
