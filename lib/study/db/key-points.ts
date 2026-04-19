import type { KeyPoint } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listKeyPoints(supabase: Client, subjectId: string): Promise<KeyPoint[]> {
  const { data, error } = await supabase
    .from("key_points")
    .select("*")
    .eq("subject_id", subjectId)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as KeyPoint[];
}

export async function createKeyPoint(
  supabase: Client,
  input: { user_id: string; subject_id: string; title: string; content?: string | null; category?: string | null }
): Promise<KeyPoint> {
  const { data, error } = await supabase
    .from("key_points")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id,
      title: input.title,
      content: input.content ?? null,
      category: input.category ?? null
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as KeyPoint;
}

export async function updateKeyPoint(
  supabase: Client,
  id: string,
  patch: Partial<KeyPoint>
): Promise<KeyPoint> {
  const { data, error } = await supabase
    .from("key_points")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as KeyPoint;
}

export async function deleteKeyPoint(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("key_points").delete().eq("id", id);
  if (error) throw error;
}
