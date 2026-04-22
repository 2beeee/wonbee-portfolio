import type { Metadata } from "next";
import { promises as fs } from "node:fs";
import path from "node:path";
import { ChemistryHub } from "./chemistry-hub";

export const metadata: Metadata = {
  title: "화학 번개특훈 · Cram Machine",
  description:
    "2026학년도 2학년 1학기 중간고사 화학 50분 시험 집중 학습 대시보드 (4/23 목 2교시)",
  robots: { index: false, follow: false }
};

const NOTE_FILES: {
  slug: string;
  file: string;
  label: string;
  icon: string;
  title: string;
  summary: string;
  priority: "S" | "A" | "B" | "C";
  minutes: number;
}[] = [
  {
    slug: "overview",
    file: "00_overview.md",
    label: "Overview",
    icon: "▣",
    title: "00. 개요 · 시험범위 · 시간배분",
    summary: "4/23 목 09:30~10:20 · 교과서 ~93p · 유인물 1~3회 · 85+15점",
    priority: "S",
    minutes: 15
  },
  {
    slug: "concepts",
    file: "01_core_concepts.md",
    label: "개념 정리",
    icon: "∑",
    title: "01. 핵심 개념 정리",
    summary: "몰 · 반응식 · 양적관계 · 전기음성도 · 루이스 · VSEPR · 극성 (15섹션)",
    priority: "S",
    minutes: 60
  },
  {
    slug: "memorize",
    file: "02_memorize_deck.md",
    label: "암기 덱",
    icon: "★",
    title: "02. 암기 덱",
    summary: "상수 · 원자량 · 이온식 · 전기음성도 · VSEPR 치트표 · 함정 TOP 10",
    priority: "A",
    minutes: 45
  },
  {
    slug: "playbook",
    file: "03_pattern_playbook.md",
    label: "유형 플레이북",
    icon: "◆",
    title: "03. 유형 플레이북",
    summary: "12개 유형 · 식별신호 · 4-step 해법 · 대표 문제 · 유형 매칭 치트시트",
    priority: "A",
    minutes: 60
  },
  {
    slug: "traps",
    file: "04_trap_checklist.md",
    label: "함정 체크",
    icon: "⚠",
    title: "04. 실수 체크리스트",
    summary: "4대 킬러 실수 · 빈출 함정 10 · 단위 환산 · 서논술 답안 템플릿",
    priority: "B",
    minutes: 20
  },
  {
    slug: "drill",
    file: "05_drill_set.md",
    label: "드릴 36題",
    icon: "⚙",
    title: "05. 드릴 세트",
    summary: "유형 12개 × 3단계 난이도 = 36문제 · 접힌 해설 포함",
    priority: "B",
    minutes: 45
  },
  {
    slug: "sprint",
    file: "06_final_sprint.md",
    label: "스프린트",
    icon: "⏱",
    title: "06. 최종 스프린트",
    summary: "4/22 저녁 ~ 4/23 아침 · 분 단위 플랜 · 시험 직전 30초 루틴",
    priority: "S",
    minutes: 20
  }
];

function stripFrontmatter(md: string): string {
  if (!md.startsWith("---")) return md;
  const end = md.indexOf("\n---", 3);
  if (end === -1) return md;
  return md.slice(end + 4).replace(/^\s*\n/, "");
}

export default async function ChemistryCramPage({
  searchParams
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const notesDir = path.join(process.cwd(), "app", "study", "chemistry", "notes");

  const notes = await Promise.all(
    NOTE_FILES.map(async (n) => {
      const raw = await fs.readFile(path.join(notesDir, n.file), "utf8");
      return { ...n, content: stripFrontmatter(raw) };
    })
  );

  const { tab } = await searchParams;
  const initialSlug =
    tab && notes.some((n) => n.slug === tab) ? tab : notes[0].slug;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <ChemistryHub notes={notes} initialSlug={initialSlug} />
    </main>
  );
}
