import type { ConceptNote } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listConceptNotes(
  supabase: Client,
  opts: { subjectId?: string; userId: string }
): Promise<ConceptNote[]> {
  let q = supabase.from("concept_notes").select("*").eq("user_id", opts.userId);
  if (opts.subjectId) q = q.eq("subject_id", opts.subjectId);
  const { data, error } = await q.order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ConceptNote[];
}

export async function getConceptNote(supabase: Client, id: string): Promise<ConceptNote | null> {
  const { data, error } = await supabase.from("concept_notes").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as ConceptNote | null) ?? null;
}

export async function createConceptNote(
  supabase: Client,
  input: { user_id: string; subject_id?: string | null; title: string; content?: string | null; tags?: string[] }
): Promise<ConceptNote> {
  const { data, error } = await supabase
    .from("concept_notes")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id ?? null,
      title: input.title,
      content: input.content ?? null,
      tags: input.tags ?? []
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as ConceptNote;
}

export async function updateConceptNote(
  supabase: Client,
  id: string,
  patch: Partial<ConceptNote>
): Promise<ConceptNote> {
  const { data, error } = await supabase
    .from("concept_notes")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as ConceptNote;
}

export async function deleteConceptNote(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("concept_notes").delete().eq("id", id);
  if (error) throw error;
}
