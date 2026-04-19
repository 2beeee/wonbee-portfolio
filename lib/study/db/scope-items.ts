import type { ScopeItem, ScopeSource } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listScopeItems(supabase: Client, subjectId: string): Promise<ScopeItem[]> {
  const { data, error } = await supabase
    .from("scope_items")
    .select("*")
    .eq("subject_id", subjectId)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as ScopeItem[];
}

export async function createScopeItem(
  supabase: Client,
  input: { user_id: string; subject_id: string; source_type: ScopeSource; title: string; page_range?: string | null; detail?: string | null }
): Promise<ScopeItem> {
  const { data, error } = await supabase
    .from("scope_items")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id,
      source_type: input.source_type,
      title: input.title,
      page_range: input.page_range ?? null,
      detail: input.detail ?? null
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as ScopeItem;
}

export async function updateScopeItem(
  supabase: Client,
  id: string,
  patch: Partial<ScopeItem>
): Promise<ScopeItem> {
  const { data, error } = await supabase
    .from("scope_items")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as ScopeItem;
}

export async function deleteScopeItem(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("scope_items").delete().eq("id", id);
  if (error) throw error;
}
