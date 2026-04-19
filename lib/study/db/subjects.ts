import type { Subject } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listSubjects(supabase: Client, userId: string): Promise<Subject[]> {
  const { data, error } = await supabase
    .from("subjects")
    .select("*")
    .eq("user_id", userId)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Subject[];
}

export async function getSubject(supabase: Client, id: string): Promise<Subject | null> {
  const { data, error } = await supabase.from("subjects").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Subject | null) ?? null;
}

export async function updateSubject(
  supabase: Client,
  id: string,
  patch: Partial<Subject>
): Promise<Subject> {
  const { data, error } = await supabase
    .from("subjects")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Subject;
}
