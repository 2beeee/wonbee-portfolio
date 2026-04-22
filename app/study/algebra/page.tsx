import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { AlgebraHub } from "./algebra-hub";

export const metadata: Metadata = {
  title: "대수 중간고사 · Cram Machine",
  description:
    "2026학년도 1학기 중간고사 대수 (미래엔 황선욱 ~97p) 학습 머신",
  robots: { index: false, follow: false }
};

const NOTE_FILES: { slug: string; file: string; label: string; icon: string }[] = [
  { slug: "overview", file: "00_overview.md", label: "Overview", icon: "▣" },
  { slug: "concepts", file: "01_core_concepts.md", label: "개념·공식", icon: "∑" },
  { slug: "playbook", file: "02_pattern_playbook.md", label: "유형 플레이북", icon: "★" },
  { slug: "traps", file: "03_trap_checklist.md", label: "함정 체크", icon: "⚠" },
  { slug: "drill", file: "04_drill_set.md", label: "드릴 20題", icon: "⚙" },
  { slug: "sprint", file: "05_final_sprint.md", label: "5h 스프린트", icon: "⏱" }
];

export default async function AlgebraCramPage() {
  const notesDir = path.join(process.cwd(), "app", "study", "algebra", "notes");

  const notes = await Promise.all(
    NOTE_FILES.map(async (n) => {
      const content = await fs.readFile(path.join(notesDir, n.file), "utf8");
      return { ...n, content };
    })
  );

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <AlgebraHub notes={notes} />
    </main>
  );
}
