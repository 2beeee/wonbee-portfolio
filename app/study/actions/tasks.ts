"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import * as TasksDb from "@/lib/study/db/tasks";

export async function createTaskAction(input: {
  subject_id: string;
  title: string;
  detail?: string;
  priority?: 1 | 2 | 3;
  due_date?: string | null;
}) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  const existing = await TasksDb.listTasksBySubject(supabase, input.subject_id);
  const task = await TasksDb.createTask(supabase, {
    user_id: user.id,
    subject_id: input.subject_id,
    title: input.title,
    detail: input.detail,
    priority: input.priority ?? 2,
    due_date: input.due_date ?? null,
    order: existing.length
  });
  revalidatePath(`/study/subjects/${input.subject_id}`);
  revalidatePath("/study");
  return task;
}

export async function toggleTaskAction(id: string, completed: boolean, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await TasksDb.toggleTask(supabase, id, completed);
  revalidatePath(`/study/subjects/${subjectId}`);
  revalidatePath("/study");
}

export async function updateTaskAction(
  id: string,
  subjectId: string,
  patch: Partial<{ title: string; detail: string | null; priority: 1 | 2 | 3; due_date: string | null }>
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await TasksDb.updateTask(supabase, id, patch);
  revalidatePath(`/study/subjects/${subjectId}`);
}

export async function deleteTaskAction(id: string, subjectId: string) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await TasksDb.deleteTask(supabase, id);
  revalidatePath(`/study/subjects/${subjectId}`);
  revalidatePath("/study");
}

export async function reorderTasksAction(subjectId: string, orderedIds: string[]) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const supabase = await getSupabaseServerClient();
  await TasksDb.reorderTasks(supabase, orderedIds);
  revalidatePath(`/study/subjects/${subjectId}`);
}
