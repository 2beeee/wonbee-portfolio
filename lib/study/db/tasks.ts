import type { Task } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listTasksBySubject(supabase: Client, subjectId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("subject_id", subjectId)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Task[];
}

export async function listTasksForUser(supabase: Client, userId: string): Promise<Task[]> {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Task[];
}

export async function createTask(
  supabase: Client,
  input: { user_id: string; subject_id: string; title: string; detail?: string; priority?: 1 | 2 | 3; due_date?: string | null; order?: number }
): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .insert({
      user_id: input.user_id,
      subject_id: input.subject_id,
      title: input.title,
      detail: input.detail ?? null,
      priority: input.priority ?? 2,
      due_date: input.due_date ?? null,
      order: input.order ?? 0
    })
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}

export async function toggleTask(supabase: Client, id: string, completed: boolean): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update({ completed, completed_at: completed ? new Date().toISOString() : null })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}

export async function updateTask(supabase: Client, id: string, patch: Partial<Task>): Promise<Task> {
  const { data, error } = await supabase
    .from("tasks")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as Task;
}

export async function deleteTask(supabase: Client, id: string): Promise<void> {
  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;
}

export async function reorderTasks(
  supabase: Client,
  orderedIds: string[]
): Promise<void> {
  await Promise.all(
    orderedIds.map((id, idx) =>
      supabase.from("tasks").update({ order: idx }).eq("id", id)
    )
  );
}
