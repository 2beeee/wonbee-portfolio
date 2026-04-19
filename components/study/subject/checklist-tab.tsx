"use client";

import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  createTaskAction,
  deleteTaskAction,
  reorderTasksAction,
  toggleTaskAction
} from "@/app/study/actions/tasks";
import { copyPromptToClipboard } from "@/lib/study/hooks/use-clipboard";
import { promptForTaskDetail } from "@/lib/study/prompts";
import type { Task } from "@/types/study-db";
import { cn } from "@/lib/study/cn";

type Filter = "all" | "open" | "done";

export function ChecklistTab({
  subjectId,
  initial
}: {
  subjectId: string;
  initial: Task[];
}) {
  const [tasks, setTasks] = useState(initial);
  const [filter, setFilter] = useState<Filter>("all");
  const [newTitle, setNewTitle] = useState("");
  const [, startTransition] = useTransition();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const visible = useMemo(() => {
    const arr = [...tasks].sort((a, b) => a.order - b.order);
    if (filter === "open") return arr.filter((t) => !t.completed);
    if (filter === "done") return arr.filter((t) => t.completed);
    return arr;
  }, [tasks, filter]);

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const title = newTitle.trim();
    setNewTitle("");
    startTransition(async () => {
      try {
        const row = await createTaskAction({ subject_id: subjectId, title });
        setTasks((prev) => [...prev, row]);
      } catch (e) {
        toast.error("추가 실패", { description: (e as Error).message });
      }
    });
  }

  async function handleToggle(t: Task) {
    const next = !t.completed;
    setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, completed: next } : x)));
    try {
      await toggleTaskAction(t.id, next, subjectId);
    } catch (e) {
      setTasks((prev) => prev.map((x) => (x.id === t.id ? { ...x, completed: !next } : x)));
      toast.error("업데이트 실패", { description: (e as Error).message });
    }
  }

  async function handleDelete(id: string) {
    const prev = tasks;
    setTasks((p) => p.filter((x) => x.id !== id));
    try {
      await deleteTaskAction(id, subjectId);
    } catch (e) {
      setTasks(prev);
      toast.error("삭제 실패", { description: (e as Error).message });
    }
  }

  async function handleDragEnd(e: DragEndEvent) {
    if (!e.over || e.active.id === e.over.id) return;
    const ids = visible.map((t) => t.id);
    const oldIdx = ids.indexOf(String(e.active.id));
    const newIdx = ids.indexOf(String(e.over.id));
    if (oldIdx < 0 || newIdx < 0) return;
    const reordered = arrayMove(visible, oldIdx, newIdx);
    // Rebuild a full orderedIds taking into account hidden tasks
    const visibleSet = new Set(ids);
    const fullOrder = tasks
      .map((t) => t.id)
      .filter((id) => !visibleSet.has(id))
      .concat(reordered.map((t) => t.id));
    const reorderedTasks = tasks.map((t) => {
      const idx = fullOrder.indexOf(t.id);
      return { ...t, order: idx };
    });
    setTasks(reorderedTasks);
    try {
      await reorderTasksAction(subjectId, fullOrder);
    } catch (err) {
      toast.error("정렬 저장 실패", { description: (err as Error).message });
    }
  }

  const done = tasks.filter((t) => t.completed).length;
  const pct = tasks.length === 0 ? 0 : Math.round((done / tasks.length) * 100);

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border-dark bg-surface p-4">
        <div className="flex items-center justify-between text-xs">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
            Progress · {done}/{tasks.length} · {pct}%
          </p>
          <div className="flex gap-1">
            {(["all", "open", "done"] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-wider transition",
                  filter === f
                    ? "bg-combustion/15 text-combustion"
                    : "text-text-secondary hover:bg-white/5"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-border-dark">
          <div
            className="h-full rounded-full bg-combustion transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <form
        onSubmit={add}
        className="flex gap-2 rounded-lg border border-border-dark bg-surface p-3"
      >
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="새로운 할 일..."
          className="flex-1 rounded-md border border-border-dark bg-base-black px-3 py-2 text-sm text-warm-white"
        />
        <button
          type="submit"
          className="rounded-md border border-combustion/40 bg-combustion/15 px-4 py-2 font-mono text-xs uppercase tracking-wider text-combustion hover:bg-combustion/25"
        >
          Add
        </button>
      </form>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visible.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <ul className="divide-y divide-border-dark rounded-lg border border-border-dark bg-surface">
            {visible.map((t) => (
              <SortableRow
                key={t.id}
                task={t}
                onToggle={() => handleToggle(t)}
                onDelete={() => handleDelete(t.id)}
              />
            ))}
            {visible.length === 0 && (
              <li className="px-4 py-6 text-center text-xs text-text-muted">
                표시할 항목이 없어요.
              </li>
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableRow({
  task,
  onToggle,
  onDelete
}: {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: task.id
  });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1
  };

  return (
    <li ref={setNodeRef} style={style} className="flex items-center gap-3 px-3 py-2">
      <button
        type="button"
        className="cursor-grab px-1 font-mono text-[10px] text-text-muted"
        {...attributes}
        {...listeners}
        aria-label="Drag"
      >
        ⋮⋮
      </button>
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "h-4 w-4 shrink-0 rounded border transition",
          task.completed
            ? "border-combustion bg-combustion/40"
            : "border-border-hover hover:border-combustion"
        )}
        aria-label="Toggle"
      />
      <p
        className={cn(
          "flex-1 truncate text-sm",
          task.completed ? "text-text-muted line-through" : "text-warm-white"
        )}
      >
        {task.title}
      </p>
      <button
        type="button"
        onClick={() => copyPromptToClipboard(promptForTaskDetail(task), "Claude 질문 프롬프트 복사됨")}
        className="font-mono text-[10px] uppercase tracking-wider text-text-muted transition hover:text-lox"
      >
        Claude에 질문
      </button>
      <button
        type="button"
        onClick={onDelete}
        className="font-mono text-[10px] uppercase tracking-wider text-text-muted transition hover:text-combustion"
      >
        Del
      </button>
    </li>
  );
}
