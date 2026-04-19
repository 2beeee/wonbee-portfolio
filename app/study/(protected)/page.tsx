import { redirect } from "next/navigation";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { listSubjects } from "@/lib/study/db/subjects";
import { listTasksForUser } from "@/lib/study/db/tasks";
import { listAiSessions } from "@/lib/study/db/ai-sessions";
import { nextExamDateTime } from "@/lib/study/format";
import { DashboardShell } from "@/components/study/dashboard/dashboard-shell";

export default async function StudyDashboard() {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");

  const supabase = await getSupabaseServerClient();
  const [subjects, tasks, sessions] = await Promise.all([
    listSubjects(supabase, user.id),
    listTasksForUser(supabase, user.id),
    listAiSessions(supabase, { userId: user.id, limit: 5 })
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
