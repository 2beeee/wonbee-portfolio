"use client";

import { Tabs } from "./tabs";
import { ExamInfoTab } from "./exam-info-tab";
import { ScopeTab } from "./scope-tab";
import { ChecklistTab } from "./checklist-tab";
import { KeyPointsTab } from "./key-points-tab";
import { ConceptNotesTab } from "./concept-notes-tab";
import { AiSessionsTab } from "./ai-sessions-tab";
import { WrongAnswersTab } from "./wrong-answers-tab";
import { PracticeTab } from "./practice-tab";
import type {
  AiSession,
  ConceptNote,
  KeyPoint,
  PracticeQuestion,
  ScopeItem,
  Subject,
  Task,
  WrongAnswer
} from "@/types/study-db";

interface Props {
  subject: Subject;
  tasks: Task[];
  scope: ScopeItem[];
  keyPoints: KeyPoint[];
  conceptNotes: ConceptNote[];
  sessions: AiSession[];
  wrong: WrongAnswer[];
  practice: PracticeQuestion[];
}

export function SubjectTabs({
  subject,
  tasks,
  scope,
  keyPoints,
  conceptNotes,
  sessions,
  wrong,
  practice
}: Props) {
  return (
    <Tabs
      tabs={[
        { key: "info", label: "시험정보", content: <ExamInfoTab subject={subject} /> },
        { key: "scope", label: "시험범위", content: <ScopeTab subjectId={subject.id} initial={scope} /> },
        {
          key: "checklist",
          label: "체크리스트",
          content: <ChecklistTab subjectId={subject.id} initial={tasks} />
        },
        {
          key: "keypoints",
          label: "핵심정리",
          content: <KeyPointsTab subjectId={subject.id} initial={keyPoints} />
        },
        {
          key: "notes",
          label: "개념노트",
          content: <ConceptNotesTab subjectId={subject.id} initial={conceptNotes} />
        },
        {
          key: "sessions",
          label: "AI 세션",
          content: <AiSessionsTab subjectId={subject.id} initial={sessions} />
        },
        {
          key: "wrong",
          label: "오답노트",
          content: <WrongAnswersTab subjectId={subject.id} initial={wrong} />
        },
        {
          key: "practice",
          label: "연습문제",
          content: <PracticeTab subjectId={subject.id} initial={practice} />
        }
      ]}
    />
  );
}
