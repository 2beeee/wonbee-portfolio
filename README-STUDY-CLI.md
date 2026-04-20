# Study CLI — Quick Start (Windows / PowerShell)

A local Claude Code worker that processes PDFs, images, and notes into the
Supabase database that powers `wonbee.kr/study`. Uses Opus 4.7 under the
user's Claude Max subscription (no pay-per-token from the web app).

## Prerequisites

- Node.js 22+ (check: `node --version`)
- Claude Code CLI installed (`npm install -g @anthropic-ai/claude-code` or via the installer)
- A Supabase project with migrations `0001_study_hub.sql` and `0003_study_cli.sql` applied
- A Supabase personal access token (https://supabase.com/dashboard/account/tokens)
- Your `auth.users.id` UUID from Supabase (Authentication → Users → click your email)

## One-time setup

```powershell
cd D:\wonbe\바탕화면\wonbee-portfolio\study-cli
Copy-Item .env.local.example .env.local
notepad .env.local
```

Fill in:

```
SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role key from Supabase Dashboard → API>
SUPABASE_ACCESS_TOKEN=<personal access token from /account/tokens>
CLI_USER_ID=<your auth.users.id UUID>
```

Install deps:

```powershell
npm install
npm run db:check
```

`db:check` should print your subjects and a green OK. If it fails, the
error message tells you what env var is missing or what permission is wrong.

## Daily usage

```powershell
cd D:\wonbe\바탕화면\wonbee-portfolio\study-cli
# Drop files into inbox/<subject>/... first
claude
```

Inside Claude Code:

```
/status
/import-scope 문학 inbox/문학/2026-1학기-시험범위.pdf
/import-textbook 화학 inbox/화학/5단원-반응속도.pdf 반응속도
/generate-questions 대수 "수열의 극한" 20
/process-wrong 기하 inbox/오답/20260418-기하-쪽지.jpg
/study-plan 지구과학
```

Every slash command writes to Supabase via MCP (or the fallback client in
`lib/supabase.ts`) and then logs to `cli_import_log`. Within seconds,
`wonbee.kr/study` reflects the new rows (realtime subscription).

## Where the files go

```
study-cli/
├── inbox/<subject>/   ← drop raw files here
├── processed/         ← (optional) archive after successful import
└── .claude/commands/  ← edit these markdown files to adjust slash command behaviour
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| `CLI_USER_ID must be set` | Fill `.env.local`. |
| `relation "practice_questions" does not exist` | Run `supabase/migrations/0003_study_cli.sql` in the Supabase SQL editor. |
| `new row violates row-level security` | You used the anon key — the CLI must use `SUPABASE_SERVICE_ROLE_KEY`. |
| Web UI doesn't update | Check `cli_import_log` for a recent row; confirm your Supabase project URL in both `.env.local` files (root `.env` for web, `study-cli/.env.local` for CLI) points to the *same* project. |

## Architecture reminder

- The web app (`app/`, `components/`, `lib/`) uses the **anon key** only.
- The CLI (`study-cli/`) uses the **service role key** to bypass RLS.
- Never import `lib/supabase.ts` from `study-cli/` into the web app, and never reference `SUPABASE_SERVICE_ROLE_KEY` from any file under `app/`, `components/`, or `lib/`.
