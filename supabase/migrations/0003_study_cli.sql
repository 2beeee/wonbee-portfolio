-- ============================================================================
-- Study CLI layer — practice_questions, study_plan_items, cli_import_log
-- All tables scoped to auth.uid() = user_id via RLS.
-- CLI writes using the service role key (bypasses RLS); web reads via anon.
-- ============================================================================

-- ---------- practice_questions ----------
create table if not exists public.practice_questions (
  id uuid primary key default gen_random_uuid(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  topic text,
  question text not null,
  answer text,
  question_type text not null default 'short' check (question_type in ('short','multiple','long','proof')),
  difficulty text not null default 'medium' check (difficulty in ('easy','medium','hard')),
  source text,
  tags text[] not null default '{}',
  times_attempted int not null default 0,
  times_correct int not null default 0,
  last_attempted_at timestamptz,
  source_mode text not null default 'cli' check (source_mode in ('cli','web','manual')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists practice_questions_subject_idx on public.practice_questions(subject_id);
create index if not exists practice_questions_user_idx on public.practice_questions(user_id);
create index if not exists practice_questions_topic_idx on public.practice_questions(topic);
create trigger practice_questions_set_updated_at
  before update on public.practice_questions
  for each row execute function public.tg_set_updated_at();

alter table public.practice_questions enable row level security;
create policy practice_questions_select_own on public.practice_questions for select
  using (auth.uid() = user_id);
create policy practice_questions_insert_own on public.practice_questions for insert
  with check (auth.uid() = user_id);
create policy practice_questions_update_own on public.practice_questions for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy practice_questions_delete_own on public.practice_questions for delete
  using (auth.uid() = user_id);

-- ---------- study_plan_items ----------
create table if not exists public.study_plan_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete cascade,
  plan_date date not null,
  slot text not null default 'afternoon' check (slot in ('morning','afternoon','evening','late')),
  duration_minutes int not null default 30,
  title text not null,
  detail text,
  dependency_ids uuid[] not null default '{}',
  status text not null default 'pending' check (status in ('pending','done','skipped')),
  source_mode text not null default 'cli' check (source_mode in ('cli','web','manual')),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists study_plan_items_user_date_idx on public.study_plan_items(user_id, plan_date);
create index if not exists study_plan_items_subject_idx on public.study_plan_items(subject_id);
create trigger study_plan_items_set_updated_at
  before update on public.study_plan_items
  for each row execute function public.tg_set_updated_at();

alter table public.study_plan_items enable row level security;
create policy study_plan_items_select_own on public.study_plan_items for select
  using (auth.uid() = user_id);
create policy study_plan_items_insert_own on public.study_plan_items for insert
  with check (auth.uid() = user_id);
create policy study_plan_items_update_own on public.study_plan_items for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy study_plan_items_delete_own on public.study_plan_items for delete
  using (auth.uid() = user_id);

-- ---------- cli_import_log ----------
create table if not exists public.cli_import_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid references public.subjects(id) on delete set null,
  file_path text not null,
  file_hash text,
  import_type text not null check (import_type in ('scope','textbook','wrong','handout','session','plan','other')),
  items_created jsonb not null default '{}'::jsonb,
  status text not null default 'success' check (status in ('success','partial','failed')),
  error text,
  created_at timestamptz not null default timezone('utc', now())
);
create index if not exists cli_import_log_user_idx on public.cli_import_log(user_id);
create index if not exists cli_import_log_subject_idx on public.cli_import_log(subject_id);
create unique index if not exists cli_import_log_user_hash_uniq
  on public.cli_import_log(user_id, file_hash)
  where file_hash is not null;

alter table public.cli_import_log enable row level security;
create policy cli_import_log_select_own on public.cli_import_log for select
  using (auth.uid() = user_id);
create policy cli_import_log_insert_own on public.cli_import_log for insert
  with check (auth.uid() = user_id);
create policy cli_import_log_update_own on public.cli_import_log for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy cli_import_log_delete_own on public.cli_import_log for delete
  using (auth.uid() = user_id);
