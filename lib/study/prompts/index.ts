import type { ConceptNote, KeyPoint, Task, WrongAnswer } from "@/types/study-db";

export function promptForWrongAnswer(wa: Pick<WrongAnswer, "question" | "correct_answer" | "my_answer">): string {
  return [
    "이 문제를 풀이 과정과 함께 설명해줘.",
    "",
    `문제: ${wa.question}`,
    `내 답: ${wa.my_answer ?? "(작성 없음)"}`,
    `정답: ${wa.correct_answer ?? "(작성 없음)"}`,
    "내가 이해 못 한 부분: ...",
    "",
    "풀이 과정, 핵심 개념, 비슷한 변형 문제 1개도 함께 만들어줘."
  ].join("\n");
}

export function promptForConceptNote(note: Pick<ConceptNote, "title" | "content">): string {
  return [
    "이 개념을 고2 수준으로 예시와 함께 다시 설명해줘.",
    "",
    `주제: ${note.title}`,
    "",
    "내 정리:",
    note.content ?? "(비어 있음)"
  ].join("\n");
}

export function promptForKeyPoint(kp: Pick<KeyPoint, "title" | "content">): string {
  return [
    "이 핵심 내용에서 예상 시험 문제 3개(객관식 2 + 서술형 1)를 만들어줘.",
    "각 문제에 정답과 해설도 같이 붙여줘.",
    "",
    `주제: ${kp.title}`,
    "",
    "내용:",
    kp.content ?? "(비어 있음)"
  ].join("\n");
}

export function promptForTaskDetail(task: Pick<Task, "title" | "detail">): string {
  return [
    "이 할 일을 완수하기 위해 필요한 구체적 학습 계획과 참고 자료를 알려줘.",
    "",
    `할 일: ${task.title}`,
    "",
    "세부 내용:",
    task.detail ?? "(없음)"
  ].join("\n");
}

export function promptForSessionSummary(raw: string): string {
  return [
    "다음 대화를 3문장으로 요약하고, 핵심 개념을 태그(#개념명) 형태로 5개 이내 추출해줘.",
    "출력 형식:",
    "요약: ...",
    "태그: #개념1 #개념2 ...",
    "",
    "대화 원문:",
    raw
  ].join("\n");
}

export function promptForFlashcards(raw: string): string {
  return [
    "다음 대화에서 중요한 개념을 골라 플래시카드 JSON 배열을 만들어줘.",
    "각 원소는 { \"front\": \"앞면 질문\", \"back\": \"뒷면 정답/설명\" } 형태.",
    "6~10장 사이로 만들어줘. JSON만 출력.",
    "",
    "대화 원문:",
    raw
  ].join("\n");
}
