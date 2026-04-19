-- ============================================================================
-- Study Hub — initial schema
-- All tables are user-scoped via RLS. Every policy uses auth.uid() = user_id.
-- ============================================================================

-- ---------- updated_at trigger ----------
create or replace function public.tg_set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

-- ============================================================================
-- subjects
-- ============================================================================
create table if not exists public.subjects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  color text not null default '#FF6B2B',
  exam_date date,
  exam_period text,
  exam_start_time time,
  location text,
  weight numeric not null default 1,
  score_breakdown jsonb,
  notes text,
  "order" int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists subjects_user_id_idx on public.subjects(user_id);
create index if not exists subjects_exam_date_idx on public.subjects(exam_date);
create trigger subjects_set_updated_at
  before update on public.subjects
  for each row execute function public.tg_set_updated_at();

alter table public.subjects enable row level security;
create policy subjects_select_own on public.subjects for select
  using (auth.uid() = user_id);
create policy subjects_insert_own on public.subjects for insert
  with check (auth.uid() = user_id);
create policy subjects_update_own on public.subjects for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy subjects_delete_own on public.subjects for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- scope_items (시험범위)
-- ============================================================================
create table if not exists public.scope_items (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  source_type text not null check (source_type in ('교과서','프린트','필기','문제집','기타')),
  title text not null,
  page_range text,
  detail text,
  "order" int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists scope_items_subject_idx on public.scope_items(subject_id);
create index if not exists scope_items_user_idx on public.scope_items(user_id);

alter table public.scope_items enable row level security;
create policy scope_items_select_own on public.scope_items for select
  using (auth.uid() = user_id);
create policy scope_items_insert_own on public.scope_items for insert
  with check (auth.uid() = user_id);
create policy scope_items_update_own on public.scope_items for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy scope_items_delete_own on public.scope_items for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- tasks (체크리스트)
-- ============================================================================
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  detail text,
  completed boolean not null default false,
  completed_at timestamptz,
  due_date date,
  priority int not null default 2 check (priority between 1 and 3),
  estimated_minutes int,
  "order" int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists tasks_subject_idx on public.tasks(subject_id);
create index if not exists tasks_user_idx on public.tasks(user_id);
create index if not exists tasks_user_completed_idx on public.tasks(user_id, completed);

alter table public.tasks enable row level security;
create policy tasks_select_own on public.tasks for select using (auth.uid() = user_id);
create policy tasks_insert_own on public.tasks for insert with check (auth.uid() = user_id);
create policy tasks_update_own on public.tasks for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy tasks_delete_own on public.tasks for delete using (auth.uid() = user_id);

-- ============================================================================
-- key_points (핵심정리)
-- ============================================================================
create table if not exists public.key_points (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  category text,
  "order" int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists key_points_subject_idx on public.key_points(subject_id);
create index if not exists key_points_user_idx on public.key_points(user_id);

alter table public.key_points enable row level security;
create policy key_points_select_own on public.key_points for select using (auth.uid() = user_id);
create policy key_points_insert_own on public.key_points for insert with check (auth.uid() = user_id);
create policy key_points_update_own on public.key_points for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy key_points_delete_own on public.key_points for delete using (auth.uid() = user_id);

-- ============================================================================
-- concept_notes (개념노트, Obsidian-style)
-- ============================================================================
create table if not exists public.concept_notes (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid references public.subjects(id) on delete set null,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  content text,
  tags text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists concept_notes_subject_idx on public.concept_notes(subject_id);
create index if not exists concept_notes_user_idx on public.concept_notes(user_id);
create trigger concept_notes_set_updated_at
  before update on public.concept_notes
  for each row execute function public.tg_set_updated_at();

alter table public.concept_notes enable row level security;
create policy concept_notes_select_own on public.concept_notes for select using (auth.uid() = user_id);
create policy concept_notes_insert_own on public.concept_notes for insert with check (auth.uid() = user_id);
create policy concept_notes_update_own on public.concept_notes for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy concept_notes_delete_own on public.concept_notes for delete using (auth.uid() = user_id);

-- ============================================================================
-- ai_sessions
-- ============================================================================
create table if not exists public.ai_sessions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  ai_tool text not null default 'claude' check (ai_tool in ('claude','gpt','gemini','other')),
  title text not null,
  topic text,
  conversation_url text,
  raw_content text,
  summary text,
  key_concepts text[] not null default '{}',
  generated_flashcards jsonb not null default '[]'::jsonb,
  follow_up_questions text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists ai_sessions_subject_idx on public.ai_sessions(subject_id);
create index if not exists ai_sessions_user_idx on public.ai_sessions(user_id);
create trigger ai_sessions_set_updated_at
  before update on public.ai_sessions
  for each row execute function public.tg_set_updated_at();

alter table public.ai_sessions enable row level security;
create policy ai_sessions_select_own on public.ai_sessions for select using (auth.uid() = user_id);
create policy ai_sessions_insert_own on public.ai_sessions for insert with check (auth.uid() = user_id);
create policy ai_sessions_update_own on public.ai_sessions for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy ai_sessions_delete_own on public.ai_sessions for delete using (auth.uid() = user_id);

-- ============================================================================
-- wrong_answers (오답노트)
-- ============================================================================
create table if not exists public.wrong_answers (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  question text not null,
  correct_answer text,
  my_answer text,
  reason_tags text[] not null default '{}',
  source text,
  review_status text not null default '미복습' check (review_status in ('미복습','복습중','해결')),
  linked_concept_id uuid references public.concept_notes(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists wrong_answers_subject_idx on public.wrong_answers(subject_id);
create index if not exists wrong_answers_user_idx on public.wrong_answers(user_id);

alter table public.wrong_answers enable row level security;
create policy wrong_answers_select_own on public.wrong_answers for select using (auth.uid() = user_id);
create policy wrong_answers_insert_own on public.wrong_answers for insert with check (auth.uid() = user_id);
create policy wrong_answers_update_own on public.wrong_answers for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy wrong_answers_delete_own on public.wrong_answers for delete using (auth.uid() = user_id);

-- ============================================================================
-- flashcards (Phase 2 feature surface, table ready now)
-- ============================================================================
create table if not exists public.flashcards (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  front text not null,
  back text not null,
  source_session_id uuid references public.ai_sessions(id) on delete set null,
  last_reviewed timestamptz,
  confidence int not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists flashcards_subject_idx on public.flashcards(subject_id);
create index if not exists flashcards_user_idx on public.flashcards(user_id);

alter table public.flashcards enable row level security;
create policy flashcards_select_own on public.flashcards for select using (auth.uid() = user_id);
create policy flashcards_insert_own on public.flashcards for insert with check (auth.uid() = user_id);
create policy flashcards_update_own on public.flashcards for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy flashcards_delete_own on public.flashcards for delete using (auth.uid() = user_id);

-- ============================================================================
-- quick_notes (스크래치패드)
-- ============================================================================
create table if not exists public.quick_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  content text not null,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists quick_notes_user_idx on public.quick_notes(user_id);

alter table public.quick_notes enable row level security;
create policy quick_notes_select_own on public.quick_notes for select using (auth.uid() = user_id);
create policy quick_notes_insert_own on public.quick_notes for insert with check (auth.uid() = user_id);
create policy quick_notes_update_own on public.quick_notes for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy quick_notes_delete_own on public.quick_notes for delete using (auth.uid() = user_id);

-- ============================================================================
-- rsschool_imports (future 리로스쿨 adapter staging)
-- ============================================================================
create table if not exists public.rsschool_imports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  import_type text not null,
  raw_data jsonb not null,
  processed boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists rsschool_imports_user_idx on public.rsschool_imports(user_id);

alter table public.rsschool_imports enable row level security;
create policy rsschool_imports_select_own on public.rsschool_imports for select using (auth.uid() = user_id);
create policy rsschool_imports_insert_own on public.rsschool_imports for insert with check (auth.uid() = user_id);
create policy rsschool_imports_update_own on public.rsschool_imports for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy rsschool_imports_delete_own on public.rsschool_imports for delete using (auth.uid() = user_id);
