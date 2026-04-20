// Typed database shape for the Study Hub.
// Replace with `supabase gen types typescript` output once the project is linked.

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type AiTool = "claude" | "gpt" | "gemini" | "other";
export type ReviewStatus = "미복습" | "복습중" | "해결";
export type ScopeSource = "교과서" | "프린트" | "필기" | "문제집" | "기타";

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  color: string;
  exam_date: string | null;
  exam_period: string | null;
  exam_start_time: string | null;
  location: string | null;
  weight: number;
  score_breakdown: Record<string, number> | null;
  notes: string | null;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface ScopeItem {
  id: string;
  subject_id: string;
  user_id: string;
  source_type: ScopeSource;
  title: string;
  page_range: string | null;
  detail: string | null;
  order: number;
  created_at: string;
}

export interface Task {
  id: string;
  subject_id: string;
  user_id: string;
  title: string;
  detail: string | null;
  completed: boolean;
  completed_at: string | null;
  due_date: string | null;
  priority: 1 | 2 | 3;
  estimated_minutes: number | null;
  order: number;
  created_at: string;
}

export interface KeyPoint {
  id: string;
  subject_id: string;
  user_id: string;
  title: string;
  content: string | null;
  category: string | null;
  order: number;
  created_at: string;
}

export interface ConceptNote {
  id: string;
  subject_id: string | null;
  user_id: string;
  title: string;
  content: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface AiSession {
  id: string;
  subject_id: string;
  user_id: string;
  ai_tool: AiTool;
  title: string;
  topic: string | null;
  conversation_url: string | null;
  raw_content: string | null;
  summary: string | null;
  key_concepts: string[];
  generated_flashcards: Flashcard[];
  follow_up_questions: string[];
  created_at: string;
  updated_at: string;
}

export interface WrongAnswer {
  id: string;
  subject_id: string;
  user_id: string;
  question: string;
  correct_answer: string | null;
  my_answer: string | null;
  reason_tags: string[];
  source: string | null;
  review_status: ReviewStatus;
  linked_concept_id: string | null;
  created_at: string;
}

export interface FlashcardRow {
  id: string;
  subject_id: string;
  user_id: string;
  front: string;
  back: string;
  source_session_id: string | null;
  last_reviewed: string | null;
  confidence: number;
  created_at: string;
}

export interface QuickNote {
  id: string;
  user_id: string;
  subject_id: string | null;
  content: string;
  created_at: string;
}

export type QuestionType = "short" | "multiple" | "long" | "proof";
export type Difficulty = "easy" | "medium" | "hard";
export type SourceMode = "cli" | "web" | "manual";
export type PlanSlot = "morning" | "afternoon" | "evening" | "late";
export type PlanStatus = "pending" | "done" | "skipped";
export type ImportType = "scope" | "textbook" | "wrong" | "handout" | "session" | "plan" | "other";
export type ImportStatus = "success" | "partial" | "failed";
export type ReferenceKind = "교과서" | "부교재" | "프린트" | "기타";

export interface ReferenceMaterial {
  id: string;
  user_id: string;
  subject_id: string;
  title: string;
  kind: ReferenceKind;
  storage_path: string;
  page_label: string | null;
  source_file_name: string | null;
  file_size: number | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface PracticeQuestion {
  id: string;
  subject_id: string;
  user_id: string;
  topic: string | null;
  question: string;
  answer: string | null;
  question_type: QuestionType;
  difficulty: Difficulty;
  source: string | null;
  tags: string[];
  times_attempted: number;
  times_correct: number;
  last_attempted_at: string | null;
  source_mode: SourceMode;
  created_at: string;
  updated_at: string;
}

export interface StudyPlanItem {
  id: string;
  user_id: string;
  subject_id: string | null;
  plan_date: string;
  slot: PlanSlot;
  duration_minutes: number;
  title: string;
  detail: string | null;
  dependency_ids: string[];
  status: PlanStatus;
  source_mode: SourceMode;
  created_at: string;
  updated_at: string;
}

export interface CliImportLog {
  id: string;
  user_id: string;
  subject_id: string | null;
  file_path: string;
  file_hash: string | null;
  import_type: ImportType;
  items_created: Record<string, number>;
  status: ImportStatus;
  error: string | null;
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      subjects: { Row: Subject; Insert: Partial<Subject> & { user_id: string; name: string }; Update: Partial<Subject> };
      scope_items: { Row: ScopeItem; Insert: Partial<ScopeItem> & { user_id: string; subject_id: string; source_type: ScopeSource; title: string }; Update: Partial<ScopeItem> };
      tasks: { Row: Task; Insert: Partial<Task> & { user_id: string; subject_id: string; title: string }; Update: Partial<Task> };
      key_points: { Row: KeyPoint; Insert: Partial<KeyPoint> & { user_id: string; subject_id: string; title: string }; Update: Partial<KeyPoint> };
      concept_notes: { Row: ConceptNote; Insert: Partial<ConceptNote> & { user_id: string; title: string }; Update: Partial<ConceptNote> };
      ai_sessions: { Row: AiSession; Insert: Partial<AiSession> & { user_id: string; subject_id: string; title: string }; Update: Partial<AiSession> };
      wrong_answers: { Row: WrongAnswer; Insert: Partial<WrongAnswer> & { user_id: string; subject_id: string; question: string }; Update: Partial<WrongAnswer> };
      flashcards: { Row: FlashcardRow; Insert: Partial<FlashcardRow> & { user_id: string; subject_id: string; front: string; back: string }; Update: Partial<FlashcardRow> };
      quick_notes: { Row: QuickNote; Insert: Partial<QuickNote> & { user_id: string; content: string }; Update: Partial<QuickNote> };
      rsschool_imports: {
        Row: { id: string; user_id: string; import_type: string; raw_data: Json; processed: boolean; created_at: string };
        Insert: { user_id: string; import_type: string; raw_data: Json; processed?: boolean };
        Update: Partial<{ import_type: string; raw_data: Json; processed: boolean }>;
      };
      practice_questions: { Row: PracticeQuestion; Insert: Partial<PracticeQuestion> & { user_id: string; subject_id: string; question: string }; Update: Partial<PracticeQuestion> };
      study_plan_items: { Row: StudyPlanItem; Insert: Partial<StudyPlanItem> & { user_id: string; plan_date: string; title: string }; Update: Partial<StudyPlanItem> };
      cli_import_log: { Row: CliImportLog; Insert: Partial<CliImportLog> & { user_id: string; file_path: string; import_type: ImportType }; Update: Partial<CliImportLog> };
      reference_materials: { Row: ReferenceMaterial; Insert: Partial<ReferenceMaterial> & { user_id: string; subject_id: string; title: string; kind: ReferenceKind; storage_path: string }; Update: Partial<ReferenceMaterial> };
    };
  };
}
