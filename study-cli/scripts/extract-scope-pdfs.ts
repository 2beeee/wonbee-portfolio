/**
 * 시험범위에 해당하는 페이지만 잘라서 materials-extracted/ 에 저장한다.
 * PDF 페이지 번호 기준 (1-indexed).
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PDFDocument } from "pdf-lib";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT_DIR = join(ROOT, "materials-extracted");

type PageRange = [number, number]; // [start, end] inclusive, 1-indexed

interface Job {
  src: string;
  out: string;
  storageSlug: string; // ASCII-only filename for Supabase Storage
  subject: string;
  kind: "교과서" | "부교재" | "프린트";
  title: string;
  ranges: PageRange[];
  pageLabel: string; // 책 페이지 기준 설명 (DB에 저장)
}

const jobs: Job[] = [
  {
    src: "inbox/지구과학/2026-2학년-학습자료.pdf",
    out: "지구과학/2026-학습자료-1-40p.pdf",
    storageSlug: "earth-science-handout-p1-40.pdf",
    subject: "지구과학",
    kind: "프린트",
    title: "2026 2학년 지구과학 학습자료 (처음~40p)",
    ranges: [[1, 40]],
    pageLabel: "1-40"
  },
  {
    src: "inbox/대수/미래엔-대수-교과서-홍보용.pdf",
    out: "대수/미래엔-대수-교과서.pdf",
    storageSlug: "algebra-textbook-mirae-sample.pdf",
    subject: "대수",
    kind: "교과서",
    title: "미래엔 대수 교과서 (홍보용 샘플 전체)",
    ranges: [[1, 101]],
    pageLabel: "1-101 (홍보용 샘플)"
  },
  {
    src: "inbox/기하/지학사-2022개정-기하-교과서.pdf",
    out: "기하/지학사-기하-교과서-범위.pdf",
    storageSlug: "geometry-textbook-jihak-p1-78-93-95.pdf",
    subject: "기하",
    kind: "교과서",
    title: "지학사 기하 교과서 (처음~78p, 93~95p)",
    ranges: [
      [1, 78],
      [93, 95]
    ],
    pageLabel: "1-78, 93-95"
  },
  {
    src: "inbox/기하/2026-수능특강-기하.pdf",
    out: "기하/수능특강-기하-1-3강-6강.pdf",
    storageSlug: "geometry-supp-suneung-ch1-3-6.pdf",
    subject: "기하",
    kind: "부교재",
    title: "2026 수능특강 기하 (1~3강 + 6강)",
    // 01 포물선 p.4~, 02 타원 p.15~, 03 쌍곡선 p.27~ (before 04 at p.37)
    // 06 공간도형 p.65~ (before 07 at p.81)
    ranges: [
      [4, 36],
      [64, 80]
    ],
    pageLabel: "1-3강 + 6강 (PDF p.4-36, 64-80)"
  }
];

async function run() {
  await mkdir(OUT_DIR, { recursive: true });
  for (const job of jobs) {
    const srcPath = join(ROOT, job.src);
    const outPath = join(OUT_DIR, job.out);
    await mkdir(dirname(outPath), { recursive: true });

    const srcBytes = await readFile(srcPath);
    const src = await PDFDocument.load(srcBytes);
    const total = src.getPageCount();
    const dest = await PDFDocument.create();

    // 0-indexed page indices from 1-indexed ranges
    const indices: number[] = [];
    for (const [start, end] of job.ranges) {
      for (let p = start; p <= end; p++) {
        if (p < 1 || p > total) {
          throw new Error(`${job.src}: 페이지 ${p} 가 총 페이지 수 ${total} 를 벗어남`);
        }
        indices.push(p - 1);
      }
    }

    const copied = await dest.copyPages(src, indices);
    for (const page of copied) dest.addPage(page);

    const outBytes = await dest.save({ useObjectStreams: true });
    await writeFile(outPath, outBytes);

    const srcKb = (srcBytes.byteLength / 1024).toFixed(0);
    const outKb = (outBytes.byteLength / 1024).toFixed(0);
    console.log(
      `[${job.subject}] ${job.kind} · ${indices.length}p · ${srcKb}KB → ${outKb}KB · ${job.out}`
    );
  }

  // manifest for the uploader
  const manifestPath = join(OUT_DIR, "manifest.json");
  await writeFile(
    manifestPath,
    JSON.stringify(
      jobs.map((j) => ({
        subject: j.subject,
        kind: j.kind,
        title: j.title,
        file: j.out,
        storageSlug: j.storageSlug,
        pageLabel: j.pageLabel,
        sourceFile: j.src.split("/").pop()
      })),
      null,
      2
    )
  );
  console.log(`\nmanifest → ${manifestPath}`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
