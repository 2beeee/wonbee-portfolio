"use client";

import { useMemo, useState } from "react";
import { parseISO } from "date-fns";
import { PrimaryCountdown } from "./primary-countdown";
import { ExamTimeline } from "./exam-timeline";
import { OverallProgress } from "./overall-progress";
import { FocusList } from "./focus-list";
import { RecentSessions } from "./recent-sessions";
import { EmptyInitialize } from "./empty-initialize";
import { TodayPlan } from "./today-plan";
import type { AiSession, StudyPlanItem, Subject, Task } from "@/types/study-db";

interface Props {
  userId: string;
  subjects: Subject[];
  tasks: Task[];
  sessions: AiSession[];
  todayPlan: StudyPlanItem[];
  nextExam:
    | { name: string; exam_date: string; exam_start_time: string | null; color: string; exam_period: string | null }
    | null;
}

export function DashboardShell({ userId, subjects, tasks, sessions, todayPlan, nextExam }: Props) {
  const [selectedIso, setSelectedIso] = useState<string | null>(null);
  const selectedDate = useMemo(
    () => (selectedIso ? parseISO(selectedIso) : null),
    [selectedIso]
  );

  return (
    <div className="space-y-6">
      {subjects.length === 0 ? <EmptyInitialize /> : null}
      <PrimaryCountdown nextExam={nextExam} />
      <OverallProgress subjects={subjects} tasks={tasks} />
      <TodayPlan initial={todayPlan} subjects={subjects} />
      <ExamTimeline
        subjects={subjects}
        tasks={tasks}
        selectedIso={selectedIso}
        onSelectDate={setSelectedIso}
      />
      <div className="grid gap-4 lg:grid-cols-2">
        <FocusList initialTasks={tasks} subjects={subjects} userId={userId} selectedDate={selectedDate} />
        <RecentSessions sessions={sessions} subjects={subjects} />
      </div>
    </div>
  );
}
