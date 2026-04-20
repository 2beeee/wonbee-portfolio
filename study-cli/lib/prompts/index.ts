// Reusable prompt building blocks for CLI commands.
// Each command composes these with the subject/file context.

export const KOREAN_STYLE = `모든 결과는 한국어로 출력. 필수 기술 용어는
한국어(영문 원어 병기) 형식으로 작성. 수학/과학 수식은 $...$ 또는 $$...$$
LaTeX. 존재하지 않는 페이지 번호나 교과서 내용은 절대 추정하지 말고 null
로 둘 것.`;

export const NEVER_FABRICATE = `PDF/이미지에서 읽을 수 없는 내용은 만들어내지
말 것. 불분명한 경우 "불명확" 또는 null로 표시할 것.`;

export function buildScopePrompt(subjectName: string, rawText: string) {
  return `다음은 '${subjectName}' 과목의 시험범위 안내입니다. 내용을 읽고
scope_items 레코드로 변환할 JSON 배열을 생성하세요.

각 항목:
{ "source_type": "교과서" | "프린트" | "필기" | "문제집" | "기타",
  "title": string,
  "page_range": string | null,
  "detail": string | null,
  "order": int }

${KOREAN_STYLE}
${NEVER_FABRICATE}

--- 원문 ---
${rawText}
--- 끝 ---`;
}

export function buildTextbookPrompt(subjectName: string, chapter: string, rawText: string) {
  return `'${subjectName}' 과목의 교과서/프린트 자료(단원: ${chapter || "미지정"})를
깊이 분석하여 다음 5개 테이블로 변환하세요:

1) key_points: 반드시 외워야 하는 핵심 사실 5~20개
2) concept_notes: 정의/원리/예시/함정/관련개념을 포함한 1~5개 노트 (마크다운, [[wikilink]] 허용)
3) flashcards: 용어, 공식, 연도, 어휘 등 15~40개
4) practice_questions: 난이도 혼합 10~20문제 (서술형 모범답안 포함)
5) scope_items: 이 자료의 커버리지 메타데이터

${KOREAN_STYLE}
${NEVER_FABRICATE}

--- 원문 ---
${rawText}
--- 끝 ---`;
}

export function buildQuestionPrompt(
  subjectName: string,
  topic: string,
  count: number,
  difficulty: string,
  contextSummary: string
) {
  return `'${subjectName}' 과목의 '${topic}' 단원에 대해 ${count}개의 연습문제를
생성하세요. 난이도: ${difficulty}.

구성:
- 30% short (개념 확인)
- 40% medium (계산/적용)
- 30% long/proof (서술형/증명)

각 문제에는 질문, 모범답안(풀이 과정 포함), tags 배열, question_type, difficulty
를 포함. source는 "cli-generated-<오늘 YYYYMMDD>".

${KOREAN_STYLE}
${NEVER_FABRICATE}

--- 참고 컨텍스트 ---
${contextSummary}
--- 끝 ---`;
}

export function buildWrongAnswerPrompt(subjectName: string, rawInput: string) {
  return `'${subjectName}' 과목의 오답 사진/노트입니다. 문제별로 다음을 추출:

1) question (LaTeX 보존)
2) correct_answer (직접 풀어서 생성)
3) my_answer (사진에서 추론, 불명확하면 "불명확")
4) reason_tags: 개념부족/계산실수/문제이해/시간부족/기타 중 선택
5) explanation (2~4 문장, 왜 정답이 맞는지)

${KOREAN_STYLE}
${NEVER_FABRICATE}

--- 원문 ---
${rawInput}
--- 끝 ---`;
}

export function buildPlanPrompt(
  subjectName: string,
  daysLeft: number,
  workloadSummary: string
) {
  return `'${subjectName}' 과목의 D-${daysLeft} 학습 계획을 하루 단위로 작성.

제약:
- 평일 2시간, 주말 6시간 가용
- 신규 학습은 D-4까지 완료
- D-3~D-2는 기출/연습문제 집중
- D-1~D-0은 플래시카드/오답 복습만

각 항목: plan_date, slot(morning/afternoon/evening/late), duration_minutes,
title, detail, dependency_ids. status는 'pending'.

${KOREAN_STYLE}

--- 워크로드 요약 ---
${workloadSummary}
--- 끝 ---`;
}

export function buildSessionSummaryPrompt(rawConversation: string) {
  return `아래 학습 대화를 정리하여:
1) 마크다운 개념노트(제목 + 핵심 정리)
2) 플래시카드 3~10개
3) 아직 해소되지 않은 follow-up 질문 3개
4) 3문장 요약

${KOREAN_STYLE}

--- 대화 원문 ---
${rawConversation}
--- 끝 ---`;
}
