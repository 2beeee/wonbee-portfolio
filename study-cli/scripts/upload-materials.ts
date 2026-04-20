/**
 * materials-extracted/manifest.json 을 읽어 각 PDF를 Supabase Storage에
 * 업로드하고 reference_materials 테이블에 행을 insert한다.
 * 재실행 안전: upsert + (user_id, storage_path) 기준 dedupe.
 */
import { readFile, stat } from "node:fs/promises";
import { resolve } from "node:path";
import { getServiceClient, getCliUserId, getSubjectByName } from "../lib/supabase.js";

type ReferenceKind = "교과서" | "부교재" | "프린트" | "기타";

interface ManifestEntry {
  subject: string;
  kind: ReferenceKind;
  title: string;
  file: string;
  storageSlug: string;
  pageLabel: string;
  sourceFile: string;
}

async function main() {
  const root = resolve(import.meta.dirname, "..");
  const manifestPath = resolve(root, "materials-extracted/manifest.json");
  const manifest: ManifestEntry[] = JSON.parse(await readFile(manifestPath, "utf8"));

  const supabase = getServiceClient();
  const userId = getCliUserId();

  let sortOrder = 0;
  for (const entry of manifest) {
    const subject = await getSubjectByName(entry.subject);
    if (!subject) {
      console.error(`[skip] subject not found: ${entry.subject}`);
      continue;
    }

    const filePath = resolve(root, "materials-extracted", entry.file);
    const bytes = await readFile(filePath);
    const { size } = await stat(filePath);

    // storage path: {user_id}/{subject_id}/{ascii-slug}
    // Supabase Storage keys reject non-ASCII; DB 'title' keeps the Korean name.
    const storagePath = `${userId}/${subject.id}/${entry.storageSlug}`;

    console.log(`[upload] ${entry.subject} · ${entry.kind} · ${(size / 1024).toFixed(0)}KB → ${storagePath}`);

    const { error: upErr } = await supabase.storage
      .from("study-materials")
      .upload(storagePath, bytes, {
        contentType: "application/pdf",
        upsert: true
      });
    if (upErr) {
      console.error(`  upload failed: ${upErr.message}`);
      continue;
    }

    const { error: rowErr } = await supabase.from("reference_materials").upsert(
      {
        user_id: userId,
        subject_id: subject.id,
        title: entry.title,
        kind: entry.kind,
        storage_path: storagePath,
        page_label: entry.pageLabel,
        source_file_name: entry.sourceFile,
        file_size: size,
        sort_order: sortOrder++
      },
      { onConflict: "storage_path" }
    );
    if (rowErr) {
      console.error(`  row upsert failed: ${rowErr.message}`);
      continue;
    }
    console.log(`  ok`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
