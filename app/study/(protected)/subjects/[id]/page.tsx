import { notFound, redirect } from "next/navigation";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { getSubject } from "@/lib/study/db/subjects";
import { listTasksBySubject } from "@/lib/study/db/tasks";
import { listScopeItems } from "@/lib/study/db/scope-items";
import { listKeyPoints } from "@/lib/study/db/key-points";
import { listConceptNotes } from "@/lib/study/db/concept-notes";
import { listAiSessions } from "@/lib/study/db/ai-sessions";
import { listWrongAnswers } from "@/lib/study/db/wrong-answers";
import { SubjectHeader } from "@/components/study/subject/subject-header";
import { SubjectProgress } from "@/components/study/subject/subject-progress";
import { SubjectTabs } from "@/components/study/subject/subject-tabs";

export default async function SubjectPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");
  const { id } = await params;

  const supabase = await getSupabaseServerClient();
  const subject = await getSubject(supabase, id);
  if (!subject || subject.user_id !== user.id) notFound();

  const [tasks, scope, keyPoints, conceptNotes, sessions, wrong] = await Promise.all([
    listTasksBySubject(supabase, id),
    listScopeItems(supabase, id),
    listKeyPoints(supabase, id),
    listConceptNotes(supabase, { subjectId: id, userId: user.id }),
    listAiSessions(supabase, { userId: user.id, subjectId: id }),
    listWrongAnswers(supabase, id)
  ]);

  return (
    <div className="space-y-4">
      <SubjectHeader subject={subject} />
      <SubjectProgress tasks={tasks} />
      <SubjectTabs
        subject={subject}
        tasks={tasks}
        scope={scope}
        keyPoints={keyPoints}
        conceptNotes={conceptNotes}
        sessions={sessions}
        wrong={wrong}
      />
    </div>
  );
}
