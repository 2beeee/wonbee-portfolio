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
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-combustion">Liquid Propulsion</p>
        <h1 className="text-4xl font-bold tracking-tight text-warm-white">Liquid Propulsion</h1>
        <p className="leading-7 text-text-secondary">
          This section contains the deeper propulsion-specific work: core programs and the supporting technical projects
          that make those programs executable.
        </p>
      </div>

      {/* Data callout bar */}
      <div className="scroll-animate flex flex-wrap gap-6 rounded-xl border border-border-dark bg-surface px-6 py-4">
        {[
          { label: "THRUST CLASS", value: "70 N — 2.5 kN" },
          { label: "PROPELLANTS", value: "GOX/Ethanol, LOX/Ethanol" },
          { label: "CHAMBER P", value: "~7.2 bar" },
          { label: "PROGRAMS", value: "6 active" },
        ].map((item) => (
          <div key={item.label} className="flex items-baseline gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">{item.label}</span>
            <span className="font-mono text-xs text-combustion">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="space-y-8">
        {projectCategories.map((category) => {
          const groupedProjects = getProjectsByCategory(category.id);

          return (
            <section
              key={category.id}
              id={category.id}
              className="scroll-animate space-y-4 rounded-xl border border-border-dark bg-surface p-5 sm:p-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-xl font-semibold text-warm-white">{category.title}</h2>
                  <span className="font-mono text-[10px] text-text-muted">{groupedProjects.length} projects</span>
                </div>
                <p className="max-w-3xl text-sm leading-6 text-text-secondary">{category.summary}</p>
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
