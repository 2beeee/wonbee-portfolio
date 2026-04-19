import { redirect } from "next/navigation";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { provisionUserIfNeeded } from "@/lib/study/db/provisioning";
import { listSubjects } from "@/lib/study/db/subjects";
import { nextExamDateTime } from "@/lib/study/format";
import { StudyTopStrip } from "@/components/study/shared/top-strip";
import { SubjectSidebar } from "@/components/study/shared/subject-sidebar";
import { MobileSubjectBar } from "@/components/study/shared/mobile-subject-bar";
import { StudyToaster } from "@/components/study/shared/toast-provider";

export const metadata = { title: "Study Hub" };

export default async function ProtectedStudyLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");

  const supabase = await getSupabaseServerClient();
  await provisionUserIfNeeded(supabase, user.id);
  const subjects = await listSubjects(supabase, user.id);

  const now = Date.now();
  const nextExam =
    subjects
      .map((s) => ({ subj: s, dt: nextExamDateTime(s) }))
      .filter((x): x is { subj: typeof x.subj; dt: Date } => x.dt !== null && x.dt.getTime() >= now)
      .sort((a, b) => a.dt.getTime() - b.dt.getTime())[0]?.subj ?? null;

  return (
    <div className="-mx-4 -my-10 sm:-mx-6 sm:-my-12 lg:-mx-8">
      <StudyToaster />
      <StudyTopStrip
        email={user.email ?? ""}
        nextExam={
          nextExam && nextExam.exam_date
            ? {
                name: nextExam.name,
                exam_date: nextExam.exam_date,
                exam_start_time: nextExam.exam_start_time,
                color: nextExam.color
              }
            : null
        }
      />
      <MobileSubjectBar subjects={subjects} />
      <div className="mx-auto flex w-full max-w-7xl">
        <SubjectSidebar subjects={subjects} />
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
