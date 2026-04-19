-- ============================================================================
-- Study Hub — seed for a specific user.
-- Usage: replace :user_id with the authenticated user's uuid (or run the
-- idempotent provisioning server action from lib/study/db/provisioning.ts
-- which executes equivalent logic per user on first dashboard load).
--
-- 2026학년도 1학기 중간고사 2학년 시간표
-- 등교 시간: 08:00
-- ============================================================================

-- Example: psql "..." -v user_id="'YOUR-UUID'" -f supabase/seed.sql

do $$
declare
  uid uuid := :user_id;
  subj_id uuid;
  subjects_seed record;
begin
  -- Skip if this user already has subjects
  if exists (select 1 from public.subjects where user_id = uid) then
    raise notice 'Subjects already exist for user %, skipping', uid;
    return;
  end if;

  for subjects_seed in
    select * from (values
      ('문학',       '#FF6B2B', '2026-04-22'::date, '1교시', '08:20'::time, 1),
      ('지구과학',   '#00D4FF', '2026-04-22'::date, '2교시', '09:30'::time, 2),
      ('대수',       '#C77DFF', '2026-04-23'::date, '1교시', '08:20'::time, 3),
      ('화학',       '#5CE1A6', '2026-04-23'::date, '2교시', '09:30'::time, 4),
      ('영어 I',     '#F5C451', '2026-04-24'::date, '1교시', '08:20'::time, 5),
      ('물리학',     '#7FB7FF', '2026-04-27'::date, '1교시', '08:20'::time, 6),
      ('기하',       '#E86B8F', '2026-04-28'::date, '1교시', '08:20'::time, 7)
    ) as t(name, color, exam_date, exam_period, exam_start_time, ord)
  loop
    insert into public.subjects
      (user_id, name, color, exam_date, exam_period, exam_start_time, "order")
    values
      (uid, subjects_seed.name, subjects_seed.color, subjects_seed.exam_date,
       subjects_seed.exam_period, subjects_seed.exam_start_time, subjects_seed.ord)
    returning id into subj_id;

    insert into public.tasks (user_id, subject_id, title, priority, "order")
    values
      (uid, subj_id, '교과서 단원 정리', 2, 0),
      (uid, subj_id, '프린트 복습',      2, 1),
      (uid, subj_id, '기출 풀이',        2, 2);
  end loop;
end $$;
