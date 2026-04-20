/**
 * 스캔본 PDF를 JPEG 재인코딩으로 압축한다.
 * pdf-to-img 로 페이지별 PNG 버퍼 얻음 → sharp 로 JPEG 압축 → pdf-lib 로 재조립.
 */
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pdf } from "pdf-to-img";
import { PDFDocument } from "pdf-lib";
import sharp from "sharp";

async function compress(inPath: string, outPath: string, opts: { scale?: number; quality?: number } = {}) {
  const { scale = 2.0, quality = 72 } = opts;
  const srcBytes = await readFile(inPath);
  const srcKb = (srcBytes.byteLength / 1024).toFixed(0);

  const doc = await PDFDocument.create();
  const pages = await pdf(inPath, { scale });
  let i = 0;
  for await (const pngBuf of pages) {
    i++;
    const jpeg = await sharp(pngBuf).jpeg({ quality, mozjpeg: true }).toBuffer();
    const { width, height } = await sharp(jpeg).metadata();
    const img = await doc.embedJpg(jpeg);
    const page = doc.addPage([width!, height!]);
    page.drawImage(img, { x: 0, y: 0, width: width!, height: height! });
    if (i % 10 === 0) console.log(`  ${i} pages processed...`);
  }

  const outBytes = await doc.save({ useObjectStreams: true });
  await writeFile(outPath, outBytes);
  const outKb = (outBytes.byteLength / 1024).toFixed(0);
  console.log(`${inPath.split(/[\\/]/).pop()}: ${srcKb}KB → ${outKb}KB (${i} pages, scale=${scale}, q=${quality})`);
}

async function main() {
  const root = resolve(import.meta.dirname, "..");
  // 대수 교과서만 압축 (가장 큼)
  await compress(
    resolve(root, "materials-extracted/대수/미래엔-대수-교과서.pdf"),
    resolve(root, "materials-extracted/대수/미래엔-대수-교과서.pdf"),
    { scale: 2.0, quality: 72 }
  );
  // 기하 교과서도 스캔본이라 압축 (27MB)
  await compress(
    resolve(root, "materials-extracted/기하/지학사-기하-교과서-범위.pdf"),
    resolve(root, "materials-extracted/기하/지학사-기하-교과서-범위.pdf"),
    { scale: 2.0, quality: 75 }
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
