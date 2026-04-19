"use client";

import { toast } from "sonner";

export async function copyPromptToClipboard(text: string, label?: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    toast.success(label ?? "프롬프트 복사됨", {
      description: "Claude/GPT에 붙여넣고 돌아와서 결과를 저장하세요."
    });
  } catch {
    toast.error("클립보드 복사 실패", { description: "브라우저 권한을 확인해 주세요." });
  }
}
