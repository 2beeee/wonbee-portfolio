import type { StudyPlanItem } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listPlanForDate(
  supabase: Client,
  userId: string,
  date: string
): Promise<StudyPlanItem[]> {
  const { data, error } = await supabase
    .from("study_plan_items")
    .select("*")
    .eq("user_id", userId)
    .eq("plan_date", date)
    .order("slot", { ascending: true });
  if (error) {
    if (error.code === "42P01" || /does not exist/i.test(error.message)) return [];
    throw error;
  }
  return (data ?? []) as StudyPlanItem[];
}

export async function setPlanStatus(
  supabase: Client,
  id: string,
  status: "pending" | "done" | "skipped"
): Promise<StudyPlanItem> {
  const { data, error } = await supabase
    .from("study_plan_items")
    .update({ status })
    .eq("id", id)
    .select("*")
    .single();
  if (error) throw error;
  return data as StudyPlanItem;
}
