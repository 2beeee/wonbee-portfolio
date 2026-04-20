---
name: study-plan
description: Generate a day-by-day study plan for a subject up to exam date.
---

Arguments: `<subject_name> [from_date=today] [to_date=exam_date]`
Example: `/study-plan 지구과학`

# Procedure

1. **Resolve** subject_id. Default `from_date = today`, `to_date = subject.exam_date`.
2. **Fetch workload** via MCP:
   - Open tasks for this subject (`completed = false`). Sum `estimated_minutes` (default 30 if null).
   - Unattempted `practice_questions` (times_attempted = 0). Budget 5 min each.
   - `scope_items` not referenced by any completed `tasks`. Budget 15 min each.
3. **Calculate total minutes** needed.
4. **Distribute across days**:
   - Weekday cap: 120 min/day on this subject.
   - Weekend cap: 360 min/day on this subject.
   - Last 2 days (D-1, D-0): 플래시카드 + 오답 복습만 (no new practice).
   - D-3, D-2: 연습문제/기출 집중.
   - New material (scope_items) scheduled by D-4 at latest.
5. **Emit rows** to `study_plan_items`:
   ```json
   {
     "plan_date": "YYYY-MM-DD",
     "slot": "morning"|"afternoon"|"evening"|"late",
     "duration_minutes": <int>,
     "title": "<짧은 제목>",
     "detail": "<구체적인 지시, 예: 교과서 p.45~52 복습 + 플래시카드 10개>",
     "dependency_ids": [<선행 study_plan_item id>]?
   }
   ```
   One item per `slot` per day (max 4/day).
6. **Insert** to `study_plan_items`, all with `user_id = CLI_USER_ID`, `subject_id`, `source_mode = "cli"`, `status = "pending"`.
7. **Print terminal summary** (Korean, compact):
   ```
   지구과학 · D-2 plan (2026-04-20 → 2026-04-22)
    4/20 (월) · 120min · 오답 5개 + 플래시카드 15
    4/21 (화) · 60min  · 기출 2회차 (시간 측정)
    4/22 (수) · 시험
   ```

# Rules

- 이미 `study_plan_items`에 있는 날짜는 덮어쓰지 말고 추가 → 사용자가 직접 삭제하도록.
- slot 할당: 오전 개념, 오후 풀이, 저녁 복습 기본.
- 하루 합계 >= 가용 캡이면 넘치는 것은 다음 날로 이월.
