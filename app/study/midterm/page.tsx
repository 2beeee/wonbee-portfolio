import type { Metadata } from "next";
import { MidtermHub } from "./midterm-hub";

export const metadata: Metadata = {
  title: "26 중간고사 학습 허브",
  description: "문학 + 지구과학 cram machine 허브",
  robots: { index: false, follow: false }
};

export default function MidtermHubPage() {
  return <MidtermHub />;
}
