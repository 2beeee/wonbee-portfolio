---
name: import-textbook
description: Deeply ingest a textbook/handout PDF into key_points + concept_notes + flashcards + practice_questions + scope_items.
---

Arguments: `<subject_name> <file_path> [chapter_name]`
Example: `/import-textbook 화학 inbox/화학/화학I-5단원.pdf "반응속도"`

# Procedure

1. **Read the PDF comprehensively.** If scanned, OCR first. Preserve formulas in LaTeX (`$...$` inline, `$$...$$` block).
2. **Hash + dedupe.** `sha256File` → `alreadyImported`. Abort if already imported unless `--force`.
3. **Resolve subject_id** via MCP `list_subjects` or `getSubjectByName`.
4. **Fetch existing context** for this subject via MCP: existing `concept_notes.title`, `key_points.title`, `practice_questions.topic` — so we don't duplicate.
5. **Extract structured content** into 5 categories:
   - `key_points`: atomic must-memorize facts. 5–20 rows. Each `{title, content, category, order}`.
   - `concept_notes`: 1–5 markdown notes. Each a full concept: definition / principle / example / pitfalls / related. Use `[[title]]` wikilinks between notes in this batch.
   - `flashcards`: 15–40 term/formula/vocabulary cards. Each `{front, back}`.
   - `practice_questions`: 10–20 mixed-difficulty questions with full model answers. Each `{question, answer, question_type, difficulty, topic, tags, source}`.
   - `scope_items`: 1–3 coverage rows so the 시험범위 tab reflects what was ingested.
6. **Insert all 5** via MCP in one batch. Set `user_id = CLI_USER_ID`, `subject_id = <resolved>`, `source_mode = "cli"` on every row.
7. **Log** `cli_import_log` with `items_created = {key_points: N, concept_notes: N, flashcards: N, practice_questions: N, scope_items: N}`.
8. **Respond** in Korean:
   > 화학 · 반응속도 단원 처리 완료 — 개념노트 4, 플래시카드 22, 예상문제 15, 핵심정리 8 생성.

# Rules

- 모든 생성 텍스트는 한국어. 기술 용어는 한국어(영문) 병기.
- 문학: 작품별로 작품명·작가·시대·특징 필드 포함 (concept_notes.content 안에).
- 수학/과학: LaTeX 필수.
- PDF에서 읽히지 않는 페이지 번호는 만들지 말고 `null`.
- 영어 I: 본문 문장을 flashcards 앞면, 한국어 해석을 뒷면으로.

# If partial failure

- Insert as much as succeeded. Log with `status: "partial"` and the error message.
- Never leave orphan rows — if `concept_notes` inserted but `flashcards` linked to them failed, that's fine (links are by title/wikilink, not FK).
