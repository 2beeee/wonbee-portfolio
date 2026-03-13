export type Project = {
  slug: string;
  title: string;
  summary: string;
  yearOrStatus: string;
  tags: string[];
  role: string;
  challenge: string;
  approach: string;
  result: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "liquid-rocket-propulsion",
    title: "Liquid Rocket Propulsion",
    summary: "Preliminary design and test planning for a small liquid propulsion system.",
    yearOrStatus: "2025 - Ongoing",
    tags: ["Propulsion", "Combustion", "Test Stand"],
    role: "System Design / Analysis / Test Planning",
    challenge:
      "Translate performance targets into a design that can be fabricated, instrumented, and safely tested under constrained resources.",
    approach:
      "Built feed-system and chamber-level trade studies, estimated injector/chamber operating windows, and defined an incremental hot-fire test sequence with risk controls.",
    result:
      "Established a defensible baseline architecture and an executable test roadmap; current work is focused on validation hardware and instrumentation readiness.",
    featured: true
  },
  {
    slug: "vtvl-control-simulation",
    title: "VTVL / Control Simulation",
    summary: "Modeling and control experiments for vertical landing dynamics.",
    yearOrStatus: "2024 - Ongoing",
    tags: ["Control", "Simulation", "Guidance"],
    role: "Modeling / Control Design",
    challenge:
      "Create a simulation environment that is simple enough to iterate quickly, but representative enough to expose meaningful stability and robustness limits.",
    approach:
      "Implemented rigid-body dynamics with actuator constraints, evaluated baseline controllers, and ran disturbance and parameter-sensitivity sweeps.",
    result:
      "Identified controller regimes with acceptable transient response and recovery margins; simulation now serves as a decision tool for future hardware experiments.",
    featured: true
  },
  {
    slug: "daq-test-electronics",
    title: "DAQ & Test Electronics",
    summary: "Instrumentation and data acquisition for repeatable subsystem testing.",
    yearOrStatus: "2024",
    tags: ["Electronics", "DAQ", "Instrumentation"],
    role: "Electronics Design / Integration",
    challenge:
      "Collect reliable sensor data in noisy test environments while keeping hardware maintainable and debuggable.",
    approach:
      "Designed signal conditioning and acquisition paths, established wiring and grounding rules, and standardized logging formats for analysis.",
    result:
      "Improved data consistency and reduced setup friction between tests, enabling faster iteration on propulsion and controls experiments.",
    featured: true
  },
  {
    slug: "robot-arm-mechatronics",
    title: "Robot Arm / Mechatronics",
    summary: "End-to-end mechatronics build combining structure, actuation, and control.",
    yearOrStatus: "2023",
    tags: ["Mechatronics", "Embedded", "Control"],
    role: "Mechanical/Electrical Integration",
    challenge:
      "Balance precision, stiffness, and actuator limits in a compact platform while preserving practical manufacturability.",
    approach:
      "Iterated on mechanical geometry, tuned actuator/control parameters, and validated repeatability through task-based tests.",
    result:
      "Delivered a functional prototype with measurable improvements across stability and motion consistency over multiple design iterations.",
    featured: false
  },
  {
    slug: "tedx-communication",
    title: "TEDx / Communication",
    summary: "Technical storytelling and communication under public presentation constraints.",
    yearOrStatus: "2022",
    tags: ["Communication", "Leadership", "Outreach"],
    role: "Speaker / Content Development",
    challenge:
      "Present complex engineering ideas with precision and clarity for mixed technical and non-technical audiences.",
    approach:
      "Structured content around assumptions, tradeoffs, and evidence; iterated narrative with feedback loops before final delivery.",
    result:
      "Produced a focused talk that improved technical communication discipline and strengthened cross-domain collaboration skills.",
    featured: false
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
