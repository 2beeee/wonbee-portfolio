# wonbee.kr repo

Two co-located layers in one repository.

## 1. Web — wonbee-portfolio (Next.js 15 App Router)

Public portfolio at `wonbee.kr` plus the protected Study Hub at `wonbee.kr/study`.

- Stack: Next.js 15, React 19, TypeScript strict, Tailwind 3.4, Supabase (Auth + Postgres + Realtime).
- Deploy: Vercel, auto-deploys from `main`.
- Folders: `app/`, `components/`, `lib/`, `types/`, `public/`.
- In-browser AI: **Gemini 2.5 Pro (free tier)** only. No Opus/Claude-level calls from the web layer.
- Key routes: `/` `/about` `/projects` `/skills` `/recap` `/contact` `/tedx` `/study/*`.
- Auth: email/password via Supabase, allowlist gated (`lib/study/auth.ts`, defaults to `wonbeepark@gmail.com`).

## 2. Study CLI — `study-cli/`

Local worker that runs under the user's Claude Max subscription (zero marginal cost).

- Stack: Opus 4.7 via Claude Code CLI, Supabase MCP server, Node 22, tsx.
- Purpose: heavy PDF/image ingestion → structured `concept_notes`, `key_points`, `flashcards`, `practice_questions`, `scope_items`, `wrong_answers`, `study_plan_items`.
- Slash commands: `/import-scope`, `/import-textbook`, `/generate-questions`, `/process-wrong`, `/study-plan`, `/summarize-session`, `/status`.
- Writes via the **service role key** (bypasses RLS). That key lives only in `study-cli/.env.local` and must never reach the web bundle.
- See `study-cli/CLAUDE.md` for subject list, inbox conventions, and per-command rules.

## Working rule

- **Web changes** → `cd` to repo root, work with `app/`, `components/`, `lib/`.
- **Study content ingestion** → `cd study-cli/`, start Claude Code, use slash commands.
- Never add LLM API calls to the web layer beyond Gemini free tier. Opus/Claude-level work belongs in the CLI.
- Service role key is never imported into `app/`, `components/`, `lib/` — anon key only.

## Shared schema

Database migrations live at `supabase/migrations/`. Both layers consume `types/study-db.ts` as the single source of truth for table shapes.
