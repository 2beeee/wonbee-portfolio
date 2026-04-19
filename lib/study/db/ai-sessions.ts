import type { AiSession, AiTool, Flashcard } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listAiSessions(
  supabase: Client,
  opts: { userId: string; subjectId?: string; limit?: number }
): Promise<AiSession[]> {
  let q = supabase.from("ai_sessions").select("*").eq("user_id", opts.userId);
  if (opts.subjectId) q = q.eq("subject_id", opts.subjectId);
  q = q.order("created_at", { ascending: false });
  if (opts.limit) q = q.limit(opts.limit);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as AiSession[];
}

export async function getAiSession(supabase: Client, id: string): Promise<AiSession | null> {
  const { data, error } = await supabase.from("ai_sessions").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as AiSession | null) ?? null;
}

export async function createAiSession(
  supabase: Client,
  input: {
    user_id: string;
    subject_id: string;
    title: string;
    ai_tool?: AiTool;
    topic?: string | null;
    conversation_url?: string | null;
    raw_content?: string | null;
  }
): Promise<AiSession> {
  const { data, error } = await supabase
    .from("ai_sessions")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id,
      title: input.title,
      ai_tool: input.ai_tool ?? "claude",
      topic: input.topic ?? null,
      conversation_url: input.conversation_url ?? null,
      raw_content: input.raw_content ?? null
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as AiSession;
}

export async function updateAiSession(
  supabase: Client,
  id: string,
  patch: Partial<Omit<AiSession, "generated_flashcards">> & { generated_flashcards?: Flashcard[] }
): Promise<AiSession> {
  const { data, error } = await supabase
    .from("ai_sessions")
    .update(patch as never)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as AiSession;
}

export async function deleteAiSession(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("ai_sessions").delete().eq("id", id);
  if (error) throw error;
}
