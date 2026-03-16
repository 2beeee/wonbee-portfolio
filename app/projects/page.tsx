import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { ReturnLink } from "@/components/return-link";
import { getProjectsByCategory, projectCategories } from "@/data/projects";

export const metadata: Metadata = {
  title: "Liquid Propulsion",
  description:
    "Liquid propulsion deep-dive including Kimchi Project, 70 N milestone, and related technical work supporting propulsion execution."
};

export default function ProjectsPage() {
  return (
    <section className="space-y-10">
      <ReturnLink href="/" label="Back to Home" />

      <div className="max-w-4xl space-y-3">
        <p className="font-[var(--font-mono)] text-xs uppercase tracking-[0.16em] text-neutral-500">Liquid Propulsion</p>
        <h1 className="text-3xl font-semibold tracking-tight">Liquid Propulsion</h1>
        <p className="leading-7 text-neutral-700">
          This section contains the deeper propulsion-specific work: core programs and the supporting technical projects
          that make those programs executable.
        </p>
      </div>

      <div className="space-y-8">
        {projectCategories.map((category) => {
          const groupedProjects = getProjectsByCategory(category.id);

          return (
            <section
              key={category.id}
              id={category.id}
              className="space-y-4 rounded-2xl border border-neutral-200/80 bg-white/92 p-5 sm:p-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-neutral-900">{category.title}</h2>
                  <span className="text-xs text-neutral-500">{groupedProjects.length} projects</span>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-neutral-700">{category.summary}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {groupedProjects.map((project) => (
                  <ProjectCard key={project.slug} project={project} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
