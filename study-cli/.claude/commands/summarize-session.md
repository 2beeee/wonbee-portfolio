---
name: summarize-session
description: Polish an existing ai_sessions row into a concept note + flashcards + follow-ups.
---

Arguments: `<session_id>`
Example: `/summarize-session 9c0e5f2d-...`

# Procedure

1. **Fetch** `ai_sessions` row for `<session_id>` via MCP. Must belong to `CLI_USER_ID`.
2. Read `raw_content`. If empty, abort with "세션에 원문이 없음."
3. **Generate**:
   a. A clean markdown concept note (`title` inferred from session.title or topic; `content` full markdown).
   b. 3–10 flashcards `{front, back}`.
   c. 3 follow-up questions (unresolved).
   d. A 3-sentence Korean summary.
4. **Write back**:
   - UPDATE `ai_sessions` SET `summary`, `generated_flashcards` (append), `follow_up_questions` (append).
   - INSERT into `concept_notes`: `{subject_id: session.subject_id, title, content, tags: ["ai-session", "cli-summary"], source_mode: "cli"}` (if schema supports source_mode; otherwise omit).
   - INSERT into `flashcards` table: rows linked with `source_session_id = <session_id>`.
5. **Log** `cli_import_log` with `import_type: "session"`, `file_path: "ai_sessions/<session_id>"`.
6. **Respond** in Korean:
   > 세션 요약 완료 — 개념노트 1개, 플래시카드 6개, follow-up 3개.

# Rules

- 개념노트는 학생 본인이 나중에 읽어도 이해되도록 맥락 포함.
- follow-up 질문은 구체적으로 ("조건부 확률이 뭔가요?" ❌ → "조건부확률과 독립사건의 차이가 왜 P(B|A)=P(B)일 때 동치가 되는지" ✅).
- 기존 `concept_notes`에 동일 제목이 있으면 업데이트(append) 대신 새 row — 세션별 기록 유지.
