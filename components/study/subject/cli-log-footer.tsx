import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";
import type { CliImportLog } from "@/types/study-db";

function summarize(items: Record<string, number> | null | undefined) {
  if (!items) return "";
  const parts = Object.entries(items)
    .filter(([, v]) => typeof v === "number" && v > 0)
    .map(([k, v]) => `${k} ${v}`);
  return parts.length > 0 ? parts.join(" · ") : "";
}

export function CliLogFooter({ log }: { log: CliImportLog | null }) {
  if (!log) return null;
  const when = formatDistanceToNow(new Date(log.created_at), {
    addSuffix: true,
    locale: ko
  });
  const summary = summarize(log.items_created);
  const file = log.file_path.split(/[\\/]/).pop() ?? log.file_path;
  return (
    <div className="rounded-lg border border-border-dark/60 bg-surface/50 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
      마지막 CLI 처리 · {file} · {when}
      {summary ? <span className="ml-2 normal-case tracking-normal text-text-secondary">({summary})</span> : null}
      {log.status !== "success" && (
        <span className="ml-2 rounded-full border border-red-500/40 px-1.5 py-0.5 text-red-300">
          {log.status}
        </span>
      )}
    </div>
  );
}
