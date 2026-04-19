"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as CNDb from "@/lib/study/db/concept-notes";

export async function createConceptNoteAction(input: {
  subject_id: string | null;
  title: string;
  content?: string;
  tags?: string[];
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const row = await CNDb.createConceptNote(supabase, {
    user_id: user.id,
    subject_id: input.subject_id ?? null,
    title: input.title,
    content: input.content ?? null,
    tags: input.tags ?? []
  });
  if (input.subject_id) revalidatePath(`/study/subjects/${input.subject_id}`);
  return row;
}

export async function updateConceptNoteAction(
  id: string,
  subjectId: string | null,
  patch: Partial<{ title: string; content: string | null; tags: string[] }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await CNDb.updateConceptNote(supabase, id, patch);
  if (subjectId) revalidatePath(`/study/subjects/${subjectId}`);
}

export async function deleteConceptNoteAction(id: string, subjectId: string | null) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await CNDb.deleteConceptNote(supabase, id);
  if (subjectId) revalidatePath(`/study/subjects/${subjectId}`);
}
