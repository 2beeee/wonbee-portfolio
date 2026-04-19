"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as ScopeDb from "@/lib/study/db/scope-items";
import type { ScopeSource } from "@/types/study-db";

export async function createScopeItemAction(input: {
  subject_id: string;
  source_type: ScopeSource;
  title: string;
  page_range?: string;
  detail?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const item = await ScopeDb.createScopeItem(supabase, {
    user_id: user.id,
    subject_id: input.subject_id,
    source_type: input.source_type,
    title: input.title,
    page_range: input.page_range ?? null,
    detail: input.detail ?? null
  });
  revalidatePath(`/study/subjects/${input.subject_id}`);
  return item;
}

export async function deleteScopeItemAction(id: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await ScopeDb.deleteScopeItem(supabase, id);
  revalidatePath(`/study/subjects/${subjectId}`);
}
