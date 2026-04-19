import type { SupabaseClient } from "@supabase/supabase-js";

// Row types are enforced at every boundary via explicit `as Row` casts.
// The client generics themselves are intentionally permissive because the
// Database type in types/study-db.ts is hand-written and doesn't perfectly
// match Supabase's GenericSchema shape (missing Views / Functions / etc.).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Client = SupabaseClient<any, any, any>;
