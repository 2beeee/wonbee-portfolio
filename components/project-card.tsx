import Link from "next/link";
import { getProjectCategory, type Project } from "@/data/projects";
import { MediaFrame } from "@/components/media-frame";

export function ProjectCard({ project }: { project: Project }) {
  const category = getProjectCategory(project.categoryId);
  const cover = project.media?.[0];

  return (
    <article className="group rounded-xl border border-border-dark bg-surface p-4 card-glow sm:p-5">
      {cover && cover.type === "image" ? (
        <div className="mb-4">
          <MediaFrame media={cover} compact />
        </div>
      ) : null}

      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-combustion">
            {category.title}
          </p>
          <h3 className="text-base font-semibold text-warm-white">{project.title}</h3>
        </div>
        <span className="whitespace-nowrap font-mono text-[10px] text-text-muted">
          {project.yearOrStatus}
        </span>
      </div>

      <p className="mb-3 text-sm leading-6 text-text-secondary">{project.summary}</p>

      <ul className="mb-4 flex flex-wrap gap-2" aria-label="Project tags">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded border border-border-dark px-2 py-0.5 font-mono text-[10px] text-text-muted"
          >
            {tag}
          </li>
        ))}
      </ul>

      <Link
        href={`/projects/${project.slug}`}
        className="font-mono text-xs tracking-wider text-text-secondary transition group-hover:text-combustion"
      >
        Open details &rarr;
      </Link>
    </article>
  );
}
