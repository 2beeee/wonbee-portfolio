export type ProjectCategoryId = "liquid-propulsion-core" | "liquid-propulsion-related";

export type ProjectCategory = {
  id: ProjectCategoryId;
  title: string;
  summary: string;
};

export type ProjectMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  width?: number;
  height?: number;
  orientation?: "landscape" | "portrait" | "square";
  caption?: string;
  autoplay?: boolean;
};

export type ProjectLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type Project = {
  slug: string;
  title: string;
  categoryId: ProjectCategoryId;
  summary: string;
  yearOrStatus: string;
  tags: string[];
  role: string;
  challenge: string;
  approach: string;
  result: string;
  progression: string;
  milestones?: string[];
  sourceMaterial?: string[];
  links?: ProjectLink[];
  media?: ProjectMedia[];
  featured?: boolean;
};

export const projectCategories: ProjectCategory[] = [
  {
    id: "liquid-propulsion-core",
    title: "Core Programs",
    summary: "Primary propulsion build efforts including Kimchi and the 70 N-class development milestone."
  },
  {
    id: "liquid-propulsion-related",
    title: "Related Technical Work",
    summary: "Research and systems work that supports propulsion readiness, control insight, and verification quality."
  }
];

export const projects: Project[] = [
  {
    slug: "kimchi-2-5kn-lander-program",
    title: "Kimchi Project: 2.5 kN LOX/Ethanol Lander Program",
    categoryId: "liquid-propulsion-core",
    summary:
      "Flagship pressure-fed lander effort centered on a throttleable 2.5 kN-class LOX/Ethanol engine and vertical-landing trajectory.",
    yearOrStatus: "2025 - Ongoing",
    tags: ["LOX/Ethanol", "2.5 kN", "Lander", "Throttleable Engine"],
    role: "Propulsion development and system-level integration planning",
    challenge:
      "Connect ambitious mission targets with realistic student-team build limits while preserving testability and safety margins.",
    approach:
      "Used project presentation material to define mass budget, feed architecture, throttle envelope, and phased test milestones.",
    result:
      "Established a coherent propulsion direction with clear system targets and an executable path toward landing-oriented test gates.",
    progression:
      "Represents a shift from early engine builds into a larger mission-framed propulsion program.",
    milestones: [
      "Nominal thrust target: 2.5 kN",
      "Pressure-fed LOX/Ethanol baseline",
      "Throttle target down to 40% (program goal)",
      "Lander constraints mapped to test sequence requirements"
    ],
    sourceMaterial: ["Presentation.pptx (used as source)", "kimchi project pic1.png", "kimchi project pic2.png"],
    media: [
      {
        type: "image",
        src: "/assets/images/kimchi/kimchi-project-1.png",
        alt: "Kimchi Project system visual showing lander program context.",
        width: 3839,
        height: 1973,
        orientation: "landscape"
      },
      {
        type: "image",
        src: "/assets/images/kimchi/kimchi-project-2.png",
        alt: "Kimchi Project technical visual from LOX/Ethanol lander presentation material.",
        width: 1692,
        height: 1331,
        orientation: "square"
      }
    ],
    featured: true
  },
  {
    slug: "70n-gox-ethanol-liquid-rocket",
    title: "70 N GOX/Ethanol Liquid Rocket Milestone",
    categoryId: "liquid-propulsion-core",
    summary:
      "Self-driven 2024 liquid rocket project built around a 70 N-class GOX/Ethanol engine and practical static-test execution.",
    yearOrStatus: "2024",
    tags: ["GOX/Ethanol", "70 N", "Static Test"],
    role: "Hands-on build, test preparation, and iteration owner",
    challenge:
      "Deliver meaningful propulsion outcomes with limited resources while developing practical confidence across fabrication and operations.",
    approach:
      "Focused on buildable hardware, short iteration loops, and careful hot-fire preparation.",
    result:
      "Produced a foundational propulsion baseline that directly informed later higher-thrust system planning.",
    progression:
      "An early but high-impact milestone showing the transition from simple experimentation to structured propulsion development.",
    sourceMaterial: ["70NLRE1.jpg", "70NLRE2.jpg", "70NLRE3.mp4"],
    media: [
      {
        type: "image",
        src: "/assets/images/rocket-70n/rocket-70n-1.jpg",
        alt: "70 N GOX/Ethanol liquid rocket hardware from 2024 milestone project.",
        width: 2347,
        height: 1320,
        orientation: "landscape"
      },
      {
        type: "image",
        src: "/assets/images/rocket-70n/rocket-70n-2.jpg",
        alt: "Blue-flame 70 N-class liquid rocket image after clean crop.",
        width: 2559,
        height: 1440,
        orientation: "landscape"
      },
      {
        type: "video",
        src: "/assets/videos/rocket-70n/rocket-70n-test.mp4",
        alt: "70 N-class liquid rocket test video.",
        orientation: "landscape",
        caption: "Hot-fire clip from the 2024 70 N engine project."
      },
      {
        type: "video",
        src: "/assets/videos/rocket-70n/rocket-70n-showoff.mp4",
        alt: "Cinematic 70 N test stand showoff clip.",
        orientation: "landscape",
        caption: "Cinematic setup pass of the 70 N test stand."
      },
      {
        type: "video",
        src: "/assets/videos/rocket-70n/rocket-70n-injector-coldflow.mp4",
        alt: "70 N injector cold-flow video.",
        orientation: "landscape",
        caption: "Injector cold-flow verification."
      },
      {
        type: "video",
        src: "/assets/videos/propulsion/cayman-launch-loop.mp4",
        alt: "Short shoulder-fired tiny model rocket launch loop.",
        orientation: "portrait",
        caption: "Short loop from a playful micro-launch moment.",
        autoplay: true
      }
    ],
    featured: true
  },
  {
    slug: "vtvl-edf-gnc-demonstrator",
    title: "EDF-based VTVL GNC Demonstrator",
    categoryId: "liquid-propulsion-related",
    summary:
      "Research platform exploring low-cost VTVL architecture with custom onboard computing, TVC logic, and staged control validation.",
    yearOrStatus: "2025",
    tags: ["VTVL", "GNC", "Teensy 4.1", "TVC"],
    role: "System concept framing and control-oriented experimentation",
    challenge:
      "Build a technically credible VTVL test platform without relying on high-cost black-box flight control hardware.",
    approach:
      "Applied the 72-page report as source baseline: quaternion attitude handling, IMU/GNSS/ToF fusion, and TVC mechanism validation.",
    result:
      "Created a practical pathway from simulation assumptions to low-altitude controlled experiments.",
    progression:
      "Moves propulsion work upstream into control architecture and test-method rigor.",
    milestones: [
      "Teensy 4.1-based flight computer and custom sensor stack",
      "Quaternion attitude representation to avoid gimbal lock",
      "Layered navigation architecture for fast and slow sensor loops",
      "Hover and control trials in low-altitude conditions"
    ],
    sourceMaterial: ["1st-year autonomous VTVL report PDF"],
    links: [{ label: "Read VTVL Reference Report (PDF)", href: "/assets/docs/vtvl-reference-report.pdf" }],
    featured: true
  },
  {
    slug: "samsung-humantech-gold-paper",
    title: "Samsung Humantech Gold Prize Paper",
    categoryId: "liquid-propulsion-related",
    summary:
      "32nd Samsung Humantech Paper Awards Gold Prize work on PINTOSWIRL injector development for small liquid rocket engines.",
    yearOrStatus: "2025",
    tags: ["Humantech Gold", "Injector Research", "Combustion", "PINTOSWIRL"],
    role: "Co-development and technical paper contribution",
    challenge:
      "Improve spray performance under difficult momentum-ratio conditions in mixed-density propellant combinations.",
    approach:
      "Integrated pintle and swirl concepts, then evaluated behavior using P-LIF, schlieren imaging, backlit tests, and hot-fire verification.",
    result:
      "Demonstrated practical injector performance gains and received the 32nd Samsung Humantech Paper Awards Gold Prize.",
    progression:
      "A major credibility marker connecting hands-on propulsion work with recognized research output.",
    sourceMaterial: ["T2025129000719_T.docx"],
    links: [{ label: "Open Award-winning Paper Source (DOCX)", href: "/assets/docs/samsung-humantech-gold-paper.docx" }]
  },
  {
    slug: "gasturbine-turbocharger-milestone",
    title: "Automotive Turbocharger Gas Turbine Build",
    categoryId: "liquid-propulsion-related",
    summary:
      "2023 milestone project building a small gas turbine using an automotive turbocharger platform as an early systems-build experiment.",
    yearOrStatus: "2023",
    tags: ["Gas Turbine", "Turbocharger", "Early Milestone"],
    role: "Build execution and practical subsystem experimentation",
    challenge:
      "Translate early enthusiasm into a functioning rotating machinery project with limited tooling and limited prior experience.",
    approach:
      "Iterated through practical setup constraints, component fit issues, and operational safety checks to reach a runnable demonstrator.",
    result:
      "Established foundational confidence in high-energy hardware handling and reinforced progression toward more advanced propulsion systems.",
    progression:
      "An earlier hands-on milestone that set the tone for later propulsion-focused programs.",
    sourceMaterial: ["gasturbine1.mp4"],
    media: [
      {
        type: "video",
        src: "/assets/videos/projects/gasturbine-turbo-prototype.mp4",
        alt: "2023 gas turbine prototype clip using an automotive turbocharger.",
        orientation: "landscape",
        caption: "Early milestone: turbocharger-based gas turbine experiment."
      }
    ]
  },
  {
    slug: "daq-and-test-electronics-stack",
    title: "DAQ and Test Electronics Stack",
    categoryId: "liquid-propulsion-related",
    summary:
      "Instrumentation and logging architecture designed for repeatable propulsion testing in noisy real-world environments.",
    yearOrStatus: "2024 - Ongoing",
    tags: ["DAQ", "Signal Integrity", "Test Operations"],
    role: "Instrumentation architecture and integration",
    challenge:
      "Capture reliable data during transient events while preserving maintainability across frequent setup changes.",
    approach:
      "Standardized sensor interfaces, grounding and wiring discipline, and logging format conventions.",
    result:
      "Reduced setup friction and improved confidence in cross-test data comparisons.",
    progression:
      "Converted ad-hoc wiring and logging into a stable system that supports faster propulsion iteration."
  }
];

const projectCategoryMap = Object.fromEntries(projectCategories.map((category) => [category.id, category])) as Record<
  ProjectCategoryId,
  ProjectCategory
>;

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByCategory(categoryId: ProjectCategoryId): Project[] {
  return projects.filter((project) => project.categoryId === categoryId);
}

export function getProjectCategory(categoryId: ProjectCategoryId): ProjectCategory {
  return projectCategoryMap[categoryId];
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
