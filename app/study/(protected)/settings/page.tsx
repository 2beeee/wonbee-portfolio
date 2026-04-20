import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/study/login");

  return (
    <div className="space-y-6">
      <header>
        <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted">
          Settings
        </div>
        <h1 className="mt-1 text-2xl font-semibold text-warm-white">환경 정보</h1>
      </header>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
          계정
        </div>
        <p className="mt-2 text-sm text-warm-white">{user.email}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          user_id · {user.id}
        </p>
      </section>

      <section className="rounded-xl border border-combustion/30 bg-combustion/5 p-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-combustion">
          Study CLI 레이어
        </div>
        <p className="mt-2 text-sm text-warm-white/90">
          이 웹 앱과 별도로, 노트북에 로컬 CLI 레이어가 있어요. PDF, 이미지, 오답 사진 같은 무거운 자료는 CLI에서 Opus 4.7이 처리한 뒤 Supabase에 직접 기록합니다. 웹은 결과물만 보여주는 가벼운 UI입니다.
        </p>
        <dl className="mt-4 grid gap-3 text-xs text-text-secondary sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">위치</dt>
            <dd className="mt-1 font-mono text-warm-white">
              wonbee-portfolio/study-cli/
            </dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">사용 모델</dt>
            <dd className="mt-1">Claude Opus 4.7 (Max 구독)</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">쓰기 권한</dt>
            <dd className="mt-1">Supabase service role (CLI 전용, 웹 번들 미포함)</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-wider text-text-muted">슬래시 명령</dt>
            <dd className="mt-1 font-mono">
              /import-scope · /import-textbook · /generate-questions ·
              /process-wrong · /study-plan · /summarize-session · /status
            </dd>
          </div>
        </dl>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-wider text-text-muted">
          사용법: README-STUDY-CLI.md (리포지토리 루트)
        </p>
      </section>

      <section className="rounded-xl border border-border-dark bg-surface p-5">
        <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
          웹 AI 정책
        </div>
        <p className="mt-2 text-sm text-warm-white/90">
          브라우저 내 빠른 질의는 Gemini 2.5 Pro 무료 티어만 사용합니다. Opus/Claude 수준의 처리는 모두 CLI로 위임돼 API 비용이 들지 않아요.
        </p>
      </section>
    </div>
  );
}
