import type { PracticeQuestion } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listPracticeQuestions(
  supabase: Client,
  subjectId: string
): Promise<PracticeQuestion[]> {
  const { data, error } = await supabase
    .from("practice_questions")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as PracticeQuestion[];
}

export async function recordAttempt(
  supabase: Client,
  id: string,
  correct: boolean
): Promise<PracticeQuestion> {
  const { data: current, error: sErr } = await supabase
    .from("practice_questions")
    .select("times_attempted,times_correct")
    .eq("id", id)
    .single();
  if (sErr) throw sErr;
  const row = current as { times_attempted: number; times_correct: number };
  const { data, error } = await supabase
    .from("practice_questions")
    .update({
      times_attempted: (row.times_attempted ?? 0) + 1,
      times_correct: (row.times_correct ?? 0) + (correct ? 1 : 0),
      last_attempted_at: new Date().toISOString()
    })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as PracticeQuestion;
}
