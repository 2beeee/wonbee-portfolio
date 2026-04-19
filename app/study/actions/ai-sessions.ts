"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as AiDb from "@/lib/study/db/ai-sessions";
import { createConceptNote } from "@/lib/study/db/concept-notes";
import type { AiTool, Flashcard } from "@/types/study-db";

export async function createAiSessionAction(input: {
  subject_id: string;
  title: string;
  ai_tool?: AiTool;
  topic?: string;
  conversation_url?: string;
  raw_content?: string;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const row = await AiDb.createAiSession(supabase, {
    user_id: user.id,
    subject_id: input.subject_id,
    title: input.title,
    ai_tool: input.ai_tool ?? "claude",
    topic: input.topic ?? null,
    conversation_url: input.conversation_url ?? null,
    raw_content: input.raw_content ?? null
  });
  revalidatePath(`/study/subjects/${input.subject_id}`);
  revalidatePath("/study");
  return row;
}

export async function updateAiSessionAction(
  id: string,
  subjectId: string,
  patch: Partial<{
    title: string;
    topic: string | null;
    conversation_url: string | null;
    raw_content: string | null;
    summary: string | null;
    key_concepts: string[];
    follow_up_questions: string[];
    generated_flashcards: Flashcard[];
  }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await AiDb.updateAiSession(supabase, id, patch);
  revalidatePath(`/study/subjects/${subjectId}`);
  revalidatePath(`/study/subjects/${subjectId}/sessions/${id}`);
  revalidatePath("/study");
}

export async function deleteAiSessionAction(id: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await AiDb.deleteAiSession(supabase, id);
  revalidatePath(`/study/subjects/${subjectId}`);
  revalidatePath("/study");
}

export async function promoteSessionToConceptNoteAction(sessionId: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const session = await AiDb.getAiSession(supabase, sessionId);
  if (!session) throw new Error("Session not found");
  const note = await createConceptNote(supabase, {
    user_id: user.id,
    subject_id: subjectId,
    title: session.title,
    content: session.summary ?? session.raw_content ?? "",
    tags: session.key_concepts
  });
  revalidatePath(`/study/subjects/${subjectId}`);
  return note;
}
