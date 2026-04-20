---
name: status
description: Show per-subject snapshot (D-day, tasks, flashcards, practice, inbox, last CLI run).
---

No arguments.

# Procedure

Fetch per subject via MCP (or `lib/supabase.ts`):

- `subjects`: exam_date, exam_period, name, color.
- `tasks` counts: `completed=true` vs total.
- `flashcards` counts: `last_reviewed` not null vs total; avg `confidence`.
- `practice_questions`: total vs `times_attempted > 0`.
- `inbox/<subject>/` file count (ignore .gitkeep).
- Latest `cli_import_log` entry for this subject.

# Output (Korean, terminal table)

```
📚 Study CLI · 상태 2026-04-20

과목        D-day  과제      플래시     연습문제   받은 파일   마지막 처리
문학        D-2    3/21      12/40 · 2.1 avg   5/30      2          4/18 prints.pdf · 2d 전
지구과학     D-2    1/21      0/0               0/0       1          —
대수        D-3    5/21      8/25 · 3.4 avg    4/20      0          —
...

다음에 할 일 (자동 추천):
→ 지구과학 인박스에 파일이 있고 아직 처리되지 않음. /import-textbook 지구과학 inbox/지구과학/...
```

# Rules

- 정렬: D-day 오름차순.
- 플래시 avg confidence는 `last_reviewed IS NOT NULL`인 것만.
- 마지막 처리 "N시간 전" / "N일 전" human-readable.
- 다음 추천 액션 1개: 가장 임박한 과목에 (a) 처리되지 않은 inbox 파일 > (b) 낮은 복습률 > (c) 연습문제 없음 > (d) 추가 필요 없음 순.
