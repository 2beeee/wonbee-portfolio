import type { Metadata } from "next";
import { Dashboard } from "./components/dashboard";

export const metadata: Metadata = {
  title: "지구과학 번개특훈 · Cram Machine",
  description:
    "2026학년도 2학년 1학기 중간고사 지구과학 2시간+30분 집중 학습 대시보드"
};

export default function EarthScienceCramPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <Dashboard />
    </main>
  );
}
