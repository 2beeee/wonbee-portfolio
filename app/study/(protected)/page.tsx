import { redirect } from "next/navigation";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { listSubjects } from "@/lib/study/db/subjects";
import { listTasksForUser } from "@/lib/study/db/tasks";
import { listAiSessions } from "@/lib/study/db/ai-sessions";
import { listPlanForDate } from "@/lib/study/db/study-plan";
import { nextExamDateTime } from "@/lib/study/format";
import { DashboardShell } from "@/components/study/dashboard/dashboard-shell";

function todayIsoDate() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default async function StudyDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");

  const supabase = await getSupabaseServerClient();
  const [subjects, tasks, sessions, todayPlan] = await Promise.all([
    listSubjects(supabase, user.id),
    listTasksForUser(supabase, user.id),
    listAiSessions(supabase, { userId: user.id, limit: 5 }),
    listPlanForDate(supabase, user.id, todayIsoDate())
  ]);

  const now = Date.now();
  const upcoming = subjects
    .map((s) => ({ subj: s, dt: nextExamDateTime(s) }))
    .filter((x): x is { subj: typeof x.subj; dt: Date } => x.dt !== null && x.dt.getTime() >= now)
    .sort((a, b) => a.dt.getTime() - b.dt.getTime())[0]?.subj ?? null;

  return (
    <DashboardShell
      userId={user.id}
      subjects={subjects}
      tasks={tasks}
      sessions={sessions}
      todayPlan={todayPlan}
      nextExam={
        upcoming && upcoming.exam_date
          ? {
              name: upcoming.name,
              exam_date: upcoming.exam_date,
              exam_start_time: upcoming.exam_start_time,
              color: upcoming.color,
              exam_period: upcoming.exam_period
            }
          : null
      }
    />
  );
}
