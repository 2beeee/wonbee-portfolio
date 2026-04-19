"use client";

import { useEffect } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

type TableName =
  | "subjects"
  | "tasks"
  | "scope_items"
  | "key_points"
  | "concept_notes"
  | "ai_sessions"
  | "wrong_answers"
  | "flashcards"
  | "quick_notes";

export function useRealtimeTable(table: TableName, userId: string | null, onChange: () => void) {
  useEffect(() => {
    if (!userId) return;
    const supabase = getSupabaseBrowserClient();
    const channel = supabase
      .channel(`${table}-${userId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table, filter: `user_id=eq.${userId}` },
        () => onChange()
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, userId, onChange]);
}
