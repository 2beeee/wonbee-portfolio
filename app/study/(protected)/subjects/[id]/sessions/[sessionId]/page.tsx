import { notFound, redirect } from "next/navigation";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { getAiSession } from "@/lib/study/db/ai-sessions";
import { SessionDetail } from "@/components/study/ai-session/session-detail";

export default async function SessionPage({
  params
}: {
  params: Promise<{ id: string; sessionId: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");
  const { id, sessionId } = await params;

  const supabase = await getSupabaseServerClient();
  const session = await getAiSession(supabase, sessionId);
  if (!session || session.user_id !== user.id || session.subject_id !== id) {
    notFound();
  }

  return <SessionDetail session={session} />;
}
