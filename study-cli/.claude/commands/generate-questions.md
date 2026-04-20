---
name: generate-questions
description: Generate a topic-focused practice question bank for a subject.
---

Arguments: `<subject_name> <topic> [count=15] [difficulty=mixed]`
Example: `/generate-questions 대수 "수열의 극한" 20 mixed`

# Procedure

1. **Resolve** subject_id. Default count=15, difficulty=mixed.
2. **Fetch context** via MCP:
   - `scope_items` for this subject where `detail` or `title` mentions the topic.
   - `concept_notes` with matching tag or title.
   - `key_points` in the same category.
   Build a one-paragraph Korean summary string of what the student has already covered for this topic.
3. **Generate `<count>` questions** in the following mix (rounded to count):
   - 30% `short` — 개념 확인, 1–2줄 답.
   - 40% `medium` — 계산/적용, 풀이 3–5줄.
   - 30% `long`/`proof` — 서술형 또는 증명, 풀이 6줄 이상.
4. Each row:
   ```json
   {
     "topic": "<topic>",
     "question": "...",
     "answer": "<풀이 전 과정 포함된 모범답안>",
     "question_type": "short" | "medium" | "long" | "proof",
     "difficulty": "easy" | "medium" | "hard",
     "tags": ["topic:<topic>", "concept:<주요개념>", "type:<q_type>"],
     "source": "cli-generated-YYYYMMDD",
     "source_mode": "cli"
   }
   ```
5. **Insert** to `practice_questions`. Every row must carry `user_id = CLI_USER_ID`.
6. **Log** to `cli_import_log` with `import_type: "other"` (no file path — use `file_path = "cli:generate-questions/<subject>/<topic>"`).
7. **Respond** in Korean:
   > 대수 · 수열의 극한 — 연습문제 20개 생성 (short 6 / medium 8 / long 6). 'cli-generated-20260420' 태그.

# Rules

- `answer`는 단답이 아니라 학생이 혼자 채점할 수 있는 전 풀이.
- 계산 문제: 중간 수식을 LaTeX로 보여줄 것.
- 증명: 각 단계에 간단한 이유 표기.
- `source`에 날짜를 꼭 포함 — 실전 기출과 구분할 근거.
