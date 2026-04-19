"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as WADb from "@/lib/study/db/wrong-answers";
import type { ReviewStatus } from "@/types/study-db";

export async function createWrongAnswerAction(input: {
  subject_id: string;
  question: string;
  correct_answer?: string;
  my_answer?: string;
  reason_tags?: string[];
  source?: string;
  review_status?: ReviewStatus;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const row = await WADb.createWrongAnswer(supabase, {
    user_id: user.id,
    subject_id: input.subject_id,
    question: input.question,
    correct_answer: input.correct_answer ?? null,
    my_answer: input.my_answer ?? null,
    reason_tags: input.reason_tags ?? [],
    source: input.source ?? null,
    review_status: input.review_status ?? "미복습"
  });
  revalidatePath(`/study/subjects/${input.subject_id}`);
  return row;
}

export async function updateWrongAnswerAction(
  id: string,
  subjectId: string,
  patch: Partial<{
    question: string;
    correct_answer: string | null;
    my_answer: string | null;
    reason_tags: string[];
    source: string | null;
    review_status: ReviewStatus;
  }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await WADb.updateWrongAnswer(supabase, id, patch);
  revalidatePath(`/study/subjects/${subjectId}`);
}

export async function deleteWrongAnswerAction(id: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await WADb.deleteWrongAnswer(supabase, id);
  revalidatePath(`/study/subjects/${subjectId}`);
}
