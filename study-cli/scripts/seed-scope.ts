// One-shot manual seeding helper — used only when the MCP pipeline is broken.
// Reads a JSON array from stdin or a file path and inserts into scope_items.
//
// Usage:
//   tsx scripts/seed-scope.ts <subject_name> <json_file_path>
//   cat items.json | tsx scripts/seed-scope.ts 문학 -

import { readFile } from "node:fs/promises";
import { getServiceClient, getCliUserId, getSubjectByName, logImport } from "../lib/supabase.js";
import type { ScopeSource } from "../../types/study-db";

interface Item {
  source_type: ScopeSource;
  title: string;
  page_range?: string | null;
  detail?: string | null;
  order?: number;
}

async function readInput(path: string): Promise<string> {
  if (path === "-") {
    const chunks: Buffer[] = [];
    for await (const chunk of process.stdin) chunks.push(chunk as Buffer);
    return Buffer.concat(chunks).toString("utf8");
  }
  return readFile(path, "utf8");
}

async function main() {
  const [, , subjectName, source] = process.argv;
  if (!subjectName || !source) {
    console.error("usage: tsx scripts/seed-scope.ts <subject_name> <json_file|-> ");
    process.exit(2);
  }

  const subject = await getSubjectByName(subjectName);
  if (!subject) {
    console.error(`no subject '${subjectName}' found for CLI_USER_ID.`);
    process.exit(1);
  }

  const raw = await readInput(source);
  const items = JSON.parse(raw) as Item[];
  if (!Array.isArray(items)) throw new Error("input must be a JSON array");

  const supabase = getServiceClient();
  const userId = getCliUserId();
  const rows = items.map((it, idx) => ({
    user_id: userId,
    subject_id: subject.id,
    source_type: it.source_type,
    title: it.title,
    page_range: it.page_range ?? null,
    detail: it.detail ?? null,
    order: it.order ?? idx
  }));

  const { error } = await supabase.from("scope_items").insert(rows);
  if (error) throw error;

  await logImport({
    subject_id: subject.id,
    file_path: source,
    file_hash: null,
    import_type: "scope",
    items_created: { scope_items: rows.length },
    status: "success"
  });

  console.log(`inserted ${rows.length} scope_items for ${subjectName}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
