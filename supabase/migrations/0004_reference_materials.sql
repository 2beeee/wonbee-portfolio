-- ============================================================================
-- reference_materials — 교과서/부교재/프린트 PDF 원본 메타데이터
-- 실제 파일은 Supabase Storage 'study-materials' 버킷에 저장.
-- RLS: owner only. Web은 서버사이드에서 signed URL 발급해서 iframe으로 노출.
-- ============================================================================

create table if not exists public.reference_materials (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  subject_id uuid not null references public.subjects(id) on delete cascade,
  title text not null,
  kind text not null check (kind in ('교과서','부교재','프린트','기타')),
  storage_path text not null,
  page_label text,
  source_file_name text,
  file_size bigint,
  sort_order int not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);
create index if not exists reference_materials_subject_idx on public.reference_materials(subject_id);
create index if not exists reference_materials_user_idx on public.reference_materials(user_id);
create unique index if not exists reference_materials_storage_path_uniq
  on public.reference_materials(storage_path);
create trigger reference_materials_set_updated_at
  before update on public.reference_materials
  for each row execute function public.tg_set_updated_at();

alter table public.reference_materials enable row level security;
create policy reference_materials_select_own on public.reference_materials for select
  using (auth.uid() = user_id);
create policy reference_materials_insert_own on public.reference_materials for insert
  with check (auth.uid() = user_id);
create policy reference_materials_update_own on public.reference_materials for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy reference_materials_delete_own on public.reference_materials for delete
  using (auth.uid() = user_id);

-- ============================================================================
-- Storage bucket for the actual PDFs.
-- 'study-materials' is private; objects keyed as {user_id}/{subject}/{filename}.
-- ============================================================================
insert into storage.buckets (id, name, public)
values ('study-materials', 'study-materials', false)
on conflict (id) do nothing;

drop policy if exists study_materials_select_own on storage.objects;
create policy study_materials_select_own on storage.objects for select
  using (
    bucket_id = 'study-materials'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists study_materials_insert_own on storage.objects;
create policy study_materials_insert_own on storage.objects for insert
  with check (
    bucket_id = 'study-materials'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists study_materials_update_own on storage.objects;
create policy study_materials_update_own on storage.objects for update
  using (
    bucket_id = 'study-materials'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

drop policy if exists study_materials_delete_own on storage.objects;
create policy study_materials_delete_own on storage.objects for delete
  using (
    bucket_id = 'study-materials'
    and auth.uid()::text = (storage.foldername(name))[1]
  );
