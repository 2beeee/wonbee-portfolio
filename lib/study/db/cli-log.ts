import type { CliImportLog } from "@/types/study-db";
import type { Client } from "./client-type";

export async function getLatestCliImport(
  supabase: Client,
  subjectId: string
): Promise<CliImportLog | null> {
  const { data, error } = await supabase
    .from("cli_import_log")
    .select("*")
    .eq("subject_id", subjectId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return (data as CliImportLog | null) ?? null;
}
