"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as KPDb from "@/lib/study/db/key-points";

export async function createKeyPointAction(input: {
  subject_id: string;
  title: string;
  content?: string;
  category?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const row = await KPDb.createKeyPoint(supabase, {
    user_id: user.id,
    subject_id: input.subject_id,
    title: input.title,
    content: input.content ?? null,
    category: input.category ?? null
  });
  revalidatePath(`/study/subjects/${input.subject_id}`);
  return row;
}

export async function updateKeyPointAction(
  id: string,
  subjectId: string,
  patch: Partial<{ title: string; content: string | null; category: string | null }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await KPDb.updateKeyPoint(supabase, id, patch);
  revalidatePath(`/study/subjects/${subjectId}`);
}

export async function deleteKeyPointAction(id: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await KPDb.deleteKeyPoint(supabase, id);
  revalidatePath(`/study/subjects/${subjectId}`);
}
