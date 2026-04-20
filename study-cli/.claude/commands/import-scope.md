---
name: import-scope
description: Extract 시험범위 from a document and insert into scope_items.
---

Arguments: `<subject_name> <file_path>`
Example: `/import-scope 문학 inbox/문학/국어-시험범위안내.pdf`

# Procedure

1. **Read the file.** PDF → use the pdf-reading skill (or the Read tool if supported). Image → describe/transcribe every visible item. Markdown/txt → read raw.
2. **Resolve subject_id.** Call the MCP `supabase` tool (or `lib/supabase.ts` → `getSubjectByName`) with `<subject_name>`. Fail loudly if no subject matches for `CLI_USER_ID`.
3. **Hash the file.** Use `lib/hash.ts` → `sha256File`. Call `alreadyImported(hash)`; abort with a friendly message if it returns true (unless user passes `--force`).
4. **Extract scope items** into this shape:
   ```json
   {
     "source_type": "교과서" | "프린트" | "필기" | "문제집" | "기타",
     "title": "<short, specific>",
     "page_range": "<e.g. p.12~34>" | null,
     "detail": "<왜 시험에 나오는지 단서가 있으면 1문장>" | null,
     "order": <int, 0-based>
   }
   ```
5. **Dedupe** against existing `scope_items` for this subject. Skip any (source_type, title) pair already present.
6. **Insert** via MCP `supabase.insert_rows` (or `supabase.from("scope_items").insert`). Every row must set `user_id = CLI_USER_ID` and `subject_id = <resolved id>`.
7. **Log** to `cli_import_log` with `{import_type: "scope", items_created: {scope_items: N}, status: "success"}` and the file hash.
8. **Report** in Korean, grouped by `source_type`:
   ```
   문학 · 시험범위 12개 추가
   · 교과서 (7)
   · 프린트 (3)
   · 문제집 (2)
   ```

# Style rules

- **title**: 짧고 구체적. "현대시 · 김수영 <풀잎>" ✅, 그냥 "시" ❌.
- **detail**: 선생님이 강조, 기출 빈출 등 단서가 있으면 1문장.
- 원문에 페이지 번호가 없으면 `page_range: null`.
- 원본에 없는 내용은 만들어내지 말 것.

# If it fails

- Permission/RLS error → confirm `SUPABASE_SERVICE_ROLE_KEY` is set and valid.
- Subject not found → run `/status` to list known subjects, or fix the name argument.
- Partial success → log with `status: "partial"` and human-readable error in `error` column.
