"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { runProvisionAction } from "@/app/study/actions/provision";

export function EmptyInitialize() {
  const [pending, startTransition] = useTransition();
  const [lastError, setLastError] = useState<string | null>(null);

  const handleInit = () => {
    setLastError(null);
    startTransition(async () => {
      const result = await runProvisionAction();
      if (result.ok) {
        toast.success("과목이 생성되었어요. 새로고침하세요.");
        window.location.reload();
      } else {
        setLastError(result.error);
        toast.error("초기화 실패", { description: result.error });
      }
    });
  };

  return (
    <div className="rounded-xl border border-combustion/30 bg-combustion/5 p-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-combustion">
        과목 초기화 필요
      </div>
      <p className="mt-2 text-sm text-warm-white/80">
        아직 과목이 없어요. 아래 버튼을 누르면 2026년 1학기 중간고사 과목(문학, 지구과학, 대수, 화학, 영어 I, 물리학, 기하) 7개와 기본 체크리스트가 자동 생성됩니다.
      </p>
      <button
        type="button"
        onClick={handleInit}
        disabled={pending}
        className="mt-4 rounded-lg border border-combustion/40 bg-combustion/10 px-4 py-2 font-mono text-[12px] uppercase tracking-[0.16em] text-combustion transition hover:bg-combustion/20 disabled:opacity-50"
      >
        {pending ? "초기화 중..." : "과목 초기화"}
      </button>
      {lastError ? (
        <pre className="mt-4 overflow-x-auto rounded-md border border-red-500/40 bg-red-500/10 p-3 font-mono text-[11px] text-red-300">
          {lastError}
        </pre>
      ) : null}
    </div>
  );
}
