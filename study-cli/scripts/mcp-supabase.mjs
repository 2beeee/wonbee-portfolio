#!/usr/bin/env node
// Thin launcher for @supabase/mcp-server-supabase that loads .env.local from
// study-cli/ so Claude Code doesn't need the shell to pre-export secrets.
import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { config as loadEnv } from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cliRoot = resolve(__dirname, "..");

loadEnv({ path: resolve(cliRoot, ".env.local") });
loadEnv({ path: resolve(cliRoot, ".env") });

const accessToken = process.env.SUPABASE_ACCESS_TOKEN;
if (!accessToken) {
  console.error(
    "[mcp-supabase] SUPABASE_ACCESS_TOKEN missing in study-cli/.env.local"
  );
  process.exit(1);
}

const args = [
  "-y",
  "@supabase/mcp-server-supabase@latest",
  "--access-token",
  accessToken
];

const child = spawn("npx", args, {
  stdio: "inherit",
  shell: process.platform === "win32",
  env: {
    ...process.env,
    SUPABASE_URL: process.env.SUPABASE_URL ?? "",
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  }
});

child.on("exit", (code) => process.exit(code ?? 0));
child.on("error", (err) => {
  console.error("[mcp-supabase] failed to launch:", err.message);
  process.exit(1);
});
