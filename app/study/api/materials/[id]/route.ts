import { NextResponse } from "next/server";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";

const BUCKET = "study-materials";
const SIGNED_URL_TTL = 60 * 30; // 30 minutes

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = await getSupabaseServerClient();

  const { data: row, error: rowErr } = await supabase
    .from("reference_materials")
    .select("storage_path")
    .eq("id", id)
    .maybeSingle();

  if (rowErr || !row) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }

  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(row.storage_path as string, SIGNED_URL_TTL);

  if (signErr || !signed?.signedUrl) {
    console.error("[materials] sign failed:", signErr);
    return NextResponse.json({ error: "sign failed" }, { status: 500 });
  }

  return NextResponse.redirect(signed.signedUrl, 302);
}
