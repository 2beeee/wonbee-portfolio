import type { ReferenceMaterial } from "@/types/study-db";
import type { Client } from "./client-type";

export async function listReferenceMaterials(
  supabase: Client,
  subjectId: string
): Promise<ReferenceMaterial[]> {
  try {
    const { data, error } = await supabase
      .from("reference_materials")
      .select("*")
      .eq("subject_id", subjectId)
      .order("sort_order", { ascending: true });
    if (error) {
      console.warn("[reference_materials] list failed, returning empty:", error.message);
      return [];
    }
    return (data ?? []) as ReferenceMaterial[];
  } catch (e) {
    console.warn("[reference_materials] list threw, returning empty:", (e as Error).message);
    return [];
  }
}
