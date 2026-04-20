# Study CLI · context for Claude Code

You are a local Opus 4.7 worker. Your job is to read files in `inbox/`,
think hard, and produce structured rows in the user's Supabase database.
The web app at `wonbee.kr/study` reads those rows — that is the only
surface the user sees.

## User

- **이름**: 박원비 (Wonbee Park)
- **학년**: 배재고등학교 2학년
- **이메일 / 계정**: `wonbeepark@gmail.com` → maps to Supabase `auth.users.id`.
- Look up the UUID and put it in `.env.local` as `CLI_USER_ID`.

## 과목 (hardcoded — 2026년 1학기 중간고사)

| 과목 | 시험 날짜 | 교시 | 색상 |
|---|---|---|---|
| 문학 | 2026-04-22 | 1교시 08:20 | `#FF6B2B` |
| 지구과학 | 2026-04-22 | 2교시 09:30 | `#00D4FF` |
| 대수 | 2026-04-23 | 1교시 08:20 | `#C77DFF` |
| 화학 | 2026-04-23 | 2교시 09:30 | `#5CE1A6` |
| 영어 I | 2026-04-24 | 1교시 08:20 | `#F5C451` |
| 물리학 | 2026-04-27 | 1교시 08:20 | `#7FB7FF` |
| 기하 | 2026-04-28 | 1교시 08:20 | `#E86B8F` |

2학년은 08:00 등교. 시험 당일 아침에 벼락치기 할 시간이 거의 없음 — 전날 저녁까지 끝낼 것.

## Inbox 규칙

```
inbox/
  문학/        시험범위, 프린트, 교과서 스캔, 작품별 필기
  지구과학/
  대수/
  화학/
  영어/
  물리학/
  기하/
  오답/         오답 사진 (파일명에 과목명 포함 권장: 20260418-대수-...)
```

- 파일명에 날짜/출처를 넣으면 dedupe에 유리.
- 처리 후 `processed/`로 옮겨서 재처리 방지 (slash command가 자동으로 해 줄 수 있음).

## 슬래시 명령 요약

- `/import-scope <subject> <file>` — 시험범위 문서 → `scope_items`.
- `/import-textbook <subject> <file> [chapter]` — 교과서/프린트 → key_points + concept_notes + flashcards + practice_questions + scope_items.
- `/generate-questions <subject> <topic> [count] [difficulty]` — 단원별 예상문제 bank.
- `/process-wrong <subject> <file>` — 오답 사진/노트 → `wrong_answers` + 필요시 meta-task.
- `/study-plan <subject> [from] [to]` — `study_plan_items` 생성.
- `/summarize-session <session_id>` — `ai_sessions` → concept_note + flashcards + follow-ups.
- `/status` — 과목별 진도 스냅샷 + 다음에 할 일 추천.

## MCP

`.mcp.json`에 `supabase` 서버 설정. `SUPABASE_ACCESS_TOKEN`, `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY`를 `.env.local`에서 로드. MCP가 불안정하면
`lib/supabase.ts`의 `getServiceClient()`로 직접 호출.

## 절대 규칙 (violating these is the only real failure)

1. **지어내지 말 것.** PDF/이미지에서 읽히지 않는 페이지 번호, 문장, 교과서 내용은 `null` 또는 `"불명확"`.
2. **모든 인서트에 `user_id = CLI_USER_ID`.** 누락 시 RLS 통과해도 데이터가 다른 계정에 귀속됨.
3. **한국어 기본.** 기술 용어는 `한국어(English)` 병기. 수식은 LaTeX.
4. **서비스롤 키 누출 금지.** 웹 번들(`app/`, `components/`, `lib/`)에 `SUPABASE_SERVICE_ROLE_KEY` 참조가 생기면 바로 멈출 것.
5. **Dedupe.** `cli_import_log`의 `file_hash`를 먼저 조회. 이미 있으면 중단.
6. **Partial success는 명시.** 에러가 나도 일부 insert 성공했으면 `cli_import_log.status = "partial"`, `error`에 사유.
7. **커밋 메시지는 Conventional (`feat(cli):`, `fix(cli):`, `chore(cli):`)**. 웹 쪽 변경이 섞이면 분리 커밋.

## 첫 세션 체크리스트

1. `cp .env.local.example .env.local` → 값 채우기.
2. `pnpm install` (또는 `npm install`).
3. `npm run db:check` — 환경 확인.
4. `claude` 실행 → `/status`로 현재 상태 확인.
5. 파일을 inbox/에 넣고 적절한 슬래시 명령 호출.
