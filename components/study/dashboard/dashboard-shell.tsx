"use client";

import { useState } from "react";
import { PrimaryCountdown } from "./primary-countdown";
import { MiniCalendar } from "./mini-calendar";
import { SubjectGrid } from "./subject-grid";
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
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  return (
    <div className="space-y-6">
      {subjects.length === 0 ? <EmptyInitialize /> : null}
      <PrimaryCountdown nextExam={nextExam} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MiniCalendar subjects={subjects} onSelectDate={setSelectedDate} />
        </div>
        <OverallProgress subjects={subjects} tasks={tasks} />
      </div>
      <TodayPlan initial={todayPlan} subjects={subjects} />
      <SubjectGrid subjects={subjects} tasks={tasks} />
      <div className="grid gap-4 lg:grid-cols-2">
        <FocusList initialTasks={tasks} subjects={subjects} userId={userId} selectedDate={selectedDate} />
        <RecentSessions sessions={sessions} subjects={subjects} />
      </div>
    </div>
  );
}
