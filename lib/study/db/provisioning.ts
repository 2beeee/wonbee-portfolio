import type { Client } from "./client-type";

const SEED_SUBJECTS: Array<{
  name: string;
  color: string;
  exam_date: string;
  exam_period: string;
  exam_start_time: string;
  order: number;
}> = [
  { name: "문학",      color: "#FF6B2B", exam_date: "2026-04-22", exam_period: "1교시", exam_start_time: "08:20:00", order: 1 },
  { name: "지구과학",  color: "#00D4FF", exam_date: "2026-04-22", exam_period: "2교시", exam_start_time: "09:30:00", order: 2 },
  { name: "대수",      color: "#C77DFF", exam_date: "2026-04-23", exam_period: "1교시", exam_start_time: "08:20:00", order: 3 },
  { name: "화학",      color: "#5CE1A6", exam_date: "2026-04-23", exam_period: "2교시", exam_start_time: "09:30:00", order: 4 },
  { name: "영어 I",    color: "#F5C451", exam_date: "2026-04-24", exam_period: "1교시", exam_start_time: "08:20:00", order: 5 },
  { name: "물리학",    color: "#7FB7FF", exam_date: "2026-04-27", exam_period: "1교시", exam_start_time: "08:20:00", order: 6 },
  { name: "기하",      color: "#E86B8F", exam_date: "2026-04-28", exam_period: "1교시", exam_start_time: "08:20:00", order: 7 }
];

const STARTER_TASKS = ["교과서 단원 정리", "프린트 복습", "기출 풀이"];

export async function provisionUserIfNeeded(supabase: Client, userId: string): Promise<void> {
  const { data: existing, error: selErr } = await supabase
    .from("subjects")
    .select("id")
    .eq("user_id", userId)
    .limit(1);
  if (selErr) throw selErr;
  if (existing && existing.length > 0) return;

  for (const subj of SEED_SUBJECTS) {
    const { data: inserted, error } = await supabase
      .from("subjects")
      .insert({
        user_id: userId,
        name: subj.name,
        color: subj.color,
        exam_date: subj.exam_date,
        exam_period: subj.exam_period,
        exam_start_time: subj.exam_start_time,
        order: subj.order,
        weight: 1
      })
      .select("id")
      .single();
    if (error) throw error;
    const subjectId = inserted.id as string;

    const taskRows = STARTER_TASKS.map((title, idx) => ({
      user_id: userId,
      subject_id: subjectId,
      title,
      priority: 2 as const,
      order: idx
    }));
    const { error: tErr } = await supabase.from("tasks").insert(taskRows);
    if (tErr) throw tErr;
  }
}
