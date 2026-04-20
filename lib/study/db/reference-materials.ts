import type { ReferenceMaterial } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listReferenceMaterials(
  supabase: Client,
  subjectId: string
): Promise<ReferenceMaterial[]> {
  const { data, error } = await supabase
    .from("reference_materials")
    .select("*")
    .eq("subject_id", subjectId)
    .order("sort_order", { ascending: true });
  if (error) {
    // table may not exist yet in local dev; fail open.
    if ((error as { code?: string }).code === "42P01") return [];
    throw error;
  }
  return (data ?? []) as ReferenceMaterial[];
}
