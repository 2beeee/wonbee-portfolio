import "dotenv/config";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null = null;

export function getServiceClient(): SupabaseClient {
  if (cached) return cached;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in study-cli/.env.local"
    );
  }
  cached = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
  return cached;
}

export function getCliUserId(): string {
  const uid = process.env.CLI_USER_ID;
  if (!uid) throw new Error("CLI_USER_ID must be set in study-cli/.env.local");
  return uid;
}

export async function getSubjectByName(name: string) {
  const supabase = getServiceClient();
  const userId = getCliUserId();
  const { data, error } = await supabase
    .from("subjects")
    .select("id,name,color,exam_date,exam_period,exam_start_time")
    .eq("user_id", userId)
    .eq("name", name)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function listSubjectsForCli() {
  const supabase = getServiceClient();
  const userId = getCliUserId();
  const { data, error } = await supabase
    .from("subjects")
    .select("id,name,color,exam_date,exam_period,exam_start_time,order")
    .eq("user_id", userId)
    .order("order");
  if (error) throw error;
  return data ?? [];
}

export async function logImport(row: {
  subject_id: string | null;
  file_path: string;
  file_hash: string | null;
  import_type:
    | "scope"
    | "textbook"
    | "wrong"
    | "handout"
    | "session"
    | "plan"
    | "other";
  items_created: Record<string, number>;
  status: "success" | "partial" | "failed";
  error?: string | null;
}) {
  const supabase = getServiceClient();
  const userId = getCliUserId();
  const { error } = await supabase.from("cli_import_log").insert({
    user_id: userId,
    ...row,
    error: row.error ?? null
  });
  if (error) throw error;
}

export async function alreadyImported(fileHash: string): Promise<boolean> {
  const supabase = getServiceClient();
  const userId = getCliUserId();
  const { data, error } = await supabase
    .from("cli_import_log")
    .select("id")
    .eq("user_id", userId)
    .eq("file_hash", fileHash)
    .limit(1);
  if (error) throw error;
  return (data ?? []).length > 0;
}
