---
name: process-wrong
description: Turn a wrong-answer photo/list into structured wrong_answers rows + meta-task if a pattern emerges.
---

Arguments: `<subject_name> <file_path>`
Example: `/process-wrong 대수 inbox/오답/20260415-대수-쪽지시험.jpg`

# Procedure

1. **Read the file.** Image → list every visible problem and my written answer/mark. Markdown/text → parse problem-by-problem.
2. **Resolve** subject_id.
3. **Hash + dedupe** via `sha256File`.
4. **For each problem:**
   a. Transcribe the question (Korean, LaTeX preserved).
   b. Solve it yourself → `correct_answer` (with full working).
   c. Infer `my_answer` from photo marks. If unclear → `"불명확"`.
   d. Choose `reason_tags` from: `개념부족`, `계산실수`, `문제이해`, `시간부족`, `기타`.
   e. Write 2–4 sentence Korean `explanation` (in the `correct_answer` field after the solution — or as a separate paragraph).
   f. Search `concept_notes` for a matching title (via MCP query). If found, set `linked_concept_id`.
5. **Insert** to `wrong_answers` with `review_status = "미복습"`, `source_mode = "cli"`, and the original `source` path/string.
6. **Pattern detection:** if 3+ rows in this batch share a single `reason_tag` (e.g., all `계산실수`), insert a task to `tasks`:
   - `title = "계산실수 패턴 — 연습문제 10개 추가 풀이"`
   - `priority = 1`
   - `detail = "오답노트 {file_path} 기준, 최근 X문제에서 계산실수 반복"`
7. **Log** to `cli_import_log` with `import_type: "wrong"`.
8. **Respond** in Korean:
   > 대수 · 오답 8문제 등록 · 반복 reason_tag: 계산실수 (5회) → 추가 과제 생성.

# Rules

- 사진에서 답이 안 읽히면 반드시 `불명확`으로 표기 — 추측 금지.
- 정답 풀이는 학생이 이해 가능하도록 단계별로.
- `concept_notes` 링크는 제목이 80% 이상 매칭될 때만.
