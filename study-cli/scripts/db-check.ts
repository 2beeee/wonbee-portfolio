import { getServiceClient, getCliUserId, listSubjectsForCli } from "../lib/supabase.js";

async function main() {
  console.log("[db-check] resolving environment...");
  const userId = getCliUserId();
  console.log("  CLI_USER_ID:", userId);

  const supabase = getServiceClient();
  console.log("[db-check] pinging auth.users...");
  const { data: authUser, error: authErr } = await supabase.auth.admin.getUserById(userId);
  if (authErr) {
    console.error("  FAIL:", authErr.message);
    process.exit(1);
  }
  console.log("  OK — user email:", authUser.user?.email);

  console.log("[db-check] listing subjects...");
  const subjects = await listSubjectsForCli();
  console.log(`  OK — ${subjects.length} subject(s)`);
  for (const s of subjects) {
    console.log(`    · ${s.name.padEnd(10)} exam ${s.exam_date ?? "-"} ${s.exam_period ?? ""}`);
  }

  console.log("[db-check] writing probe row to cli_import_log...");
  const probePath = `_probe_${Date.now()}`;
  const { error: insErr } = await supabase.from("cli_import_log").insert({
    user_id: userId,
    file_path: probePath,
    file_hash: null,
    import_type: "other",
    items_created: { probe: 1 },
    status: "success"
  });
  if (insErr) {
    console.error("  FAIL:", insErr.message);
    process.exit(1);
  }
  await supabase.from("cli_import_log").delete().eq("file_path", probePath);
  console.log("  OK — write + delete round-trip successful.");

  console.log("\n[db-check] all systems green.");
}

main().catch((e) => {
  console.error("[db-check] unexpected error:", e);
  process.exit(1);
});
