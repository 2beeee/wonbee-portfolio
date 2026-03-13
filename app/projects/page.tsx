import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Engineering project archive: propulsion, controls, electronics, and mechatronics work."
};

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="max-w-3xl space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
        <p className="leading-7 text-neutral-700">
          Selected engineering work with emphasis on technical constraints, implementation decisions, and measured outcomes.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
