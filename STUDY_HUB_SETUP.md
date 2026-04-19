# Study Hub — Setup Guide

The Study Hub is a protected `/study/*` section of the existing wonbee.kr portfolio. It reuses the site's design system; only the data layer (Supabase) and routing (middleware-guarded) are new.

---

## 1. Create a Supabase project

1. Sign in at https://supabase.com and click **New Project**.
2. Pick a region close to Seoul (e.g. `Northeast Asia (Seoul)`).
3. Save the database password to your password manager.
4. After the project boots, copy these from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` *(server-only; never expose to the browser)*

## 2. Environment variables

Copy `.env.example` → `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

`ALLOWED_EMAILS` is a comma-separated list of lowercase emails that are permitted to sign up or log in. Everyone else is rejected at three layers (UI, server action, and — with a matching Supabase policy — at the DB level). For a single-user deployment just set your own address:

```
ALLOWED_EMAILS=wonbeepark@gmail.com
```

## 3. Apply the migration

Supabase CLI is the recommended path. Install if you don't have it:

```bash
npm i -g supabase
```

Then link the repo to your project and push the migration:

```bash
supabase login
supabase link --project-ref YOUR-PROJECT-REF
supabase db push
```

This applies `supabase/migrations/0001_study_hub.sql`, which creates all 10 tables, enables RLS, and installs per-user select/insert/update/delete policies.

**No CLI?** Paste the migration SQL into the Supabase SQL Editor (**Database → SQL Editor → New query**) and run it.

## 4. Seed data

Seeding happens automatically. The Study layout (`app/study/(protected)/layout.tsx`) calls `provisionUserIfNeeded()` the first time an authenticated user visits `/study`, which inserts the 7 midterm subjects and 3 starter tasks per subject. Idempotent — won't duplicate if you already have subjects.

If you prefer to seed via SQL (e.g. for a different user UUID), use:

```bash
psql "postgresql://postgres:YOUR-DB-PASSWORD@db.YOUR-REF.supabase.co:5432/postgres" \
  -v user_id="'YOUR-AUTH-USER-UUID'" \
  -f supabase/seed.sql
```

## 5. Enable email/password auth

1. In Supabase Studio go to **Authentication → Providers**.
2. Make sure **Email** is enabled. Disable email confirmation for fast local testing if desired (`Auth → Settings → "Confirm email"` → off).
3. Create your account at https://wonbee.kr/study/signup — only `ALLOWED_EMAILS` can pass.

## 6. Local development

```bash
npm install
npm run dev
# open http://localhost:3000/study
```

You will be redirected to `/study/login`. Sign up, sign in, and the 7 subjects will auto-provision.

## 7. Deploy to Vercel

In the Vercel project settings **Environment Variables** tab, add the four variables from `.env.local` to **Production + Preview + Development**:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ALLOWED_EMAILS`

Push the branch; Vercel builds and deploys. Production will be `https://wonbee.kr/study`.

## 8. Optional — regenerate types

Once the migration is in place you can regenerate the typed schema:

```bash
supabase gen types typescript --project-id YOUR-PROJECT-REF --schema public > types/study-db.ts
```

The current hand-written `types/study-db.ts` mirrors the migration shape so you can ship without running this.

---

## Feature map

| Route | Purpose |
|-------|---------|
| `/study/login` `/study/signup` | Gated auth, public routes within the /study/* tree |
| `/study` | Dashboard: countdown, calendar, subject grid, focus list, recent AI sessions |
| `/study/subjects/[id]` | 7-tab detail view (시험정보 · 범위 · 체크리스트 · 핵심정리 · 개념노트 · AI 세션 · 오답노트) |
| `/study/subjects/[id]/sessions/[sessionId]` | AI session detail with markdown, summary, flashcards, promote-to-concept-note |

## Access control

- **Middleware** (`middleware.ts`) matches only `/study/:path*` — the public portfolio is untouched.
- Unauthenticated requests to a protected route are redirected to `/study/login?next=…`.
- Server actions validate `ALLOWED_EMAILS` before every sign-in / sign-up.
- All tables have `user_id = auth.uid()` RLS policies; even with the anon key, users see only their own rows.

## Phase 2+ (not built yet)

- Full calendar view (`/study/calendar`)
- SRS flashcard review
- Pomodoro + time tracking
- Backlink graph for concept notes
- Weighted progress
- 리로스쿨 adapter (table `rsschool_imports` is ready)
- Direct Anthropic API integration (to replace the clipboard flow)
