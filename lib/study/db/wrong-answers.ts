import type { ReviewStatus, WrongAnswer } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listWrongAnswers(supabase: Client, subjectId: string): Promise<WrongAnswer[]> {
  const { data, error } = await supabase
    .from("wrong_answers")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as WrongAnswer[];
}

export async function createWrongAnswer(
  supabase: Client,
  input: {
    user_id: string;
    subject_id: string;
    question: string;
    correct_answer?: string | null;
    my_answer?: string | null;
    reason_tags?: string[];
    source?: string | null;
    review_status?: ReviewStatus;
    linked_concept_id?: string | null;
  }
): Promise<WrongAnswer> {
  const { data, error } = await supabase
    .from("wrong_answers")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id,
      question: input.question,
      correct_answer: input.correct_answer ?? null,
      my_answer: input.my_answer ?? null,
      reason_tags: input.reason_tags ?? [],
      source: input.source ?? null,
      review_status: input.review_status ?? "미복습",
      linked_concept_id: input.linked_concept_id ?? null
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as WrongAnswer;
}

export async function updateWrongAnswer(
  supabase: Client,
  id: string,
  patch: Partial<WrongAnswer>
): Promise<WrongAnswer> {
  const { data, error } = await supabase
    .from("wrong_answers")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as WrongAnswer;
}

export async function deleteWrongAnswer(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("wrong_answers").delete().eq("id", id);
  if (error) throw error;
}
