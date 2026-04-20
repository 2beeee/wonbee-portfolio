import type { CliImportLog } from "@/types/study-db";
import type { Client } from "./client-type";

export async function getLatestCliImport(
  supabase: Client,
  subjectId: string
): Promise<CliImportLog | null> {
  try {
    const { data, error } = await supabase
      .from("cli_import_log")
      .select("*")
      .eq("subject_id", subjectId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) {
      console.warn("[cli_import_log] fetch failed, returning null:", error.message);
      return null;
    }
    return (data as CliImportLog | null) ?? null;
  } catch (e) {
    console.warn("[cli_import_log] fetch threw, returning null:", (e as Error).message);
    return null;
  }
}
