export type ProjectCategoryId =
  | "propulsion-liquid-rocketry"
  | "engineering-systems-hardware-development"
  | "research-experimental-work"
  | "fabrication-hands-on-skills"
  | "communication-community-public-sharing";

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
    id: "propulsion-liquid-rocketry",
    title: "Propulsion / Liquid Rocketry",
    summary:
      "Program-level propulsion work spanning injector concepts, engine architecture, and flight-oriented lander system planning."
  },
  {
    id: "engineering-systems-hardware-development",
    title: "Engineering Systems / Hardware Development",
    summary:
      "Integration-heavy work across sensors, electronics, controls, and test infrastructure that keeps experiments executable."
  },
  {
    id: "research-experimental-work",
    title: "Research / Experimental Work",
    summary:
      "Analysis-driven and experiment-backed studies used to reduce uncertainty before committing to higher-cost hardware loops."
  },
  {
    id: "fabrication-hands-on-skills",
    title: "Fabrication / Hands-on Skills",
    summary:
      "Practical shop-floor capabilities that improve build quality, schedule realism, and confidence during fast iteration."
  },
  {
    id: "communication-community-public-sharing",
    title: "Communication / Community / Public Sharing",
    summary:
      "Public and team-facing communication that translates complex engineering into clear decisions and shared momentum."
  }
];

export const projects: Project[] = [
  {
    slug: "kimchi-2-5kn-lander-program",
    title: "Kimchi Project: 2.5 kN LOX/Ethanol Lander Program",
    categoryId: "propulsion-liquid-rocketry",
    summary:
      "Flagship pressure-fed lander effort centered on a throttleable 2.5 kN-class LOX/Ethanol engine and vertical-landing mission profile.",
    yearOrStatus: "2025 - Ongoing",
    tags: ["LOX/Ethanol", "2.5 kN", "Lander", "Throttleable Engine"],
    role: "Propulsion development and system-level integration planning",
    challenge:
      "Connect ambitious mission targets with realistic student-team build limits while preserving testability and safety margins.",
    approach:
      "Used the project presentation as the working baseline to define mass budget, feed architecture, throttle envelope, and phased test milestones.",
    result:
      "Established a coherent lander development direction with clear propulsion targets and a practical progression toward TVC and landing demonstrations.",
    progression:
      "Represents a jump from earlier small-engine experimentation into coordinated, mission-driven propulsion system work.",
    milestones: [
      "Nominal thrust target: 2.5 kN",
      "Engine cycle baseline: pressure-fed LOX/Ethanol",
      "Throttle target down to 40% (program goal)",
      "Lander configuration and challenge requirements mapped from competition context"
    ],
    sourceMaterial: [
      "Project deck: Presentation.pptx (internal source material)",
      "Kimchi project visuals (pic1, pic2)"
    ],
    media: [
      {
        type: "image",
        src: "/assets/images/kimchi/kimchi-project-1.png",
        alt: "Kimchi Project system presentation visual showing 2.5 kN-class lander program context.",
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
    categoryId: "propulsion-liquid-rocketry",
    summary:
      "Self-driven 2024 liquid rocket project built around a 70 N-class GOX/Ethanol engine and practical static-test execution.",
    yearOrStatus: "2024",
    tags: ["GOX/Ethanol", "70 N", "Static Test", "Early Propulsion Milestone"],
    role: "Hands-on build, test preparation, and iteration owner",
    challenge:
      "Deliver meaningful propulsion test outcomes with limited resources while learning fast across mechanics, plumbing, and operation discipline.",
    approach:
      "Focused on buildable hardware, short feedback loops, and careful hot-fire preparation; documented what worked and what needed redesign.",
    result:
      "Produced an important propulsion baseline and practical experience that directly informed later higher-thrust program decisions.",
    progression:
      "A foundational step that demonstrates growth from early personal build effort into larger and more structured propulsion work.",
    sourceMaterial: ["70NLRE1.jpg, 70NLRE2.jpg, 70NLRE3.mp4"],
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
        alt: "Close-up of 70 N-class rocket system and test preparation setup.",
        width: 2559,
        height: 2239,
        orientation: "square"
      },
      {
        type: "video",
        src: "/assets/videos/rocket-70n/rocket-70n-test.mp4",
        alt: "70 N-class liquid rocket test video.",
        orientation: "landscape",
        caption: "Test clip from the 2024 70 N-class engine project."
      }
    ],
    featured: true
  },
  {
    slug: "vtvl-edf-gnc-demonstrator",
    title: "EDF-based VTVL GNC Demonstrator",
    categoryId: "research-experimental-work",
    summary:
      "Research project on low-cost VTVL architecture using an EDF propulsion setup, custom onboard computing, and TVC-driven control logic.",
    yearOrStatus: "2025",
    tags: ["VTVL", "GNC", "Teensy 4.1", "TVC"],
    role: "System concept framing and control-oriented experimentation",
    challenge:
      "Build an educational yet technically credible VTVL test platform without relying on expensive closed flight-control solutions.",
    approach:
      "Used the 72-page VTVL report as a source baseline: quaternion attitude handling, IMU/GNSS/ToF state estimation, and hardware TVC mechanism studies.",
    result:
      "Formed a reproducible framework for student-scale VTVL testing and highlighted a practical path from simulation to low-altitude controlled experiments.",
    progression:
      "Shows a shift from component-focused builds toward full control-stack thinking and validation workflows.",
    milestones: [
      "Teensy 4.1-based flight computer and custom sensor stack",
      "Quaternion-based attitude representation to avoid gimbal lock",
      "Hierarchical navigation structure combining fast and slow sensor loops",
      "Hover and control validation experiments in low-altitude conditions"
    ],
    sourceMaterial: ["1학년_자연과학분야_자율탐구_보고서_직상직하_11309.pdf"],
    links: [{ label: "Read VTVL Reference Report (PDF)", href: "/assets/docs/vtvl-reference-report.pdf" }],
    featured: true
  },
  {
    slug: "samsung-humantech-gold-paper",
    title: "Samsung Humantech Gold Prize Paper",
    categoryId: "research-experimental-work",
    summary:
      "32nd Samsung Humantech Paper Awards Gold Prize work on PINTOSWIRL injector development for small liquid rocket engines.",
    yearOrStatus: "2025",
    tags: ["Humantech Gold", "Injector Research", "Combustion", "PINTOSWIRL"],
    role: "Co-development and technical paper contribution",
    challenge:
      "Improve spray performance under difficult momentum-ratio conditions in mixed-density propellant combinations.",
    approach:
      "Integrated pintle and swirl concepts, then evaluated behavior using P-LIF, schlieren imaging, backlit tests, and hot-fire verification logic.",
    result:
      "Demonstrated practical injector performance gains and earned the 32nd Samsung Humantech Paper Awards Gold Prize.",
    progression:
      "A major credibility marker showing transition from project execution into recognized research-grade output.",
    sourceMaterial: ["T2025129000719_T.docx"],
    links: [
      {
        label: "Open Award-winning Paper Source (DOCX)",
        href: "/assets/docs/samsung-humantech-gold-paper.docx"
      }
    ]
  },
  {
    slug: "daq-and-test-electronics-stack",
    title: "DAQ and Test Electronics Stack",
    categoryId: "engineering-systems-hardware-development",
    summary:
      "Measurement and logging infrastructure for propulsion and controls tests, designed for repeatability in noisy real-world setups.",
    yearOrStatus: "2024 - Ongoing",
    tags: ["DAQ", "Signal Integrity", "Test Operations"],
    role: "Instrumentation architecture and integration",
    challenge:
      "Collect reliable data during transient events while keeping hardware maintainable under frequent setup changes.",
    approach:
      "Standardized sensor interfaces, grounding/wiring discipline, and logging format conventions across test campaigns.",
    result:
      "Reduced setup friction and improved confidence in cross-test data comparisons.",
    progression:
      "Converted ad-hoc test wiring into a more robust engineering system that supports faster and safer iteration."
  },
  {
    slug: "tig-welding-and-fabrication-practice",
    title: "TIG Welding and Fabrication Practice",
    categoryId: "fabrication-hands-on-skills",
    summary:
      "Practical fabrication track focused on TIG welding quality, fit-up consistency, and manufacturability-aware build decisions.",
    yearOrStatus: "2024 - Ongoing",
    tags: ["TIG Welding", "Fabrication", "Shop Skills", "Build Quality"],
    role: "Hands-on fabrication and process refinement",
    challenge:
      "Develop shop-floor reliability that can support propulsion and hardware timelines without quality drift.",
    approach:
      "Practiced repeatable welding and fit-up methods, then fed fabrication lessons back into design-for-buildability choices.",
    result:
      "Strengthened execution confidence during physical build phases and reduced rework in downstream assembly.",
    progression:
      "Highlights uncommon practical capability that complements analytical and simulation-focused work.",
    sourceMaterial: ["tigwelding.mp4, tigwelding2.jpg, tigwelding3.jpg"],
    media: [
      {
        type: "image",
        src: "/assets/images/fabrication/tig-welding-2.jpg",
        alt: "TIG welding fabrication work in progress.",
        width: 4000,
        height: 2252,
        orientation: "landscape"
      },
      {
        type: "image",
        src: "/assets/images/fabrication/tig-welding-3.jpg",
        alt: "Detailed TIG welding and fabrication setup view.",
        width: 4000,
        height: 2252,
        orientation: "landscape"
      },
      {
        type: "video",
        src: "/assets/videos/fabrication/tig-welding-process.mp4",
        alt: "Vertical TIG welding process clip.",
        orientation: "portrait",
        caption: "Short fabrication clip from practical welding sessions."
      }
    ]
  },
  {
    slug: "tedx-talk-and-public-communication",
    title: "TEDx Talk and Technical Communication",
    categoryId: "communication-community-public-sharing",
    summary:
      "Public speaking and technical storytelling work centered on clear delivery of engineering ideas to broad audiences.",
    yearOrStatus: "2025",
    tags: ["TEDx", "Public Speaking", "Knowledge Sharing"],
    role: "Speaker and content structuring lead",
    challenge:
      "Convey technical thinking precisely without losing non-specialist audiences in complexity.",
    approach:
      "Built the talk around framing, constraints, and learnings rather than hype; iterated delivery with timing and message clarity in mind.",
    result:
      "Produced a high-clarity public presentation and strengthened communication quality for both technical and mixed audiences.",
    progression:
      "Extends engineering work beyond build/test by improving collaboration and public trust through communication quality.",
    sourceMaterial: ["TEDx.png, TEDx2.jpg, TEDx3.jpg, YouTube talk"],
    links: [
      {
        label: "Watch TEDx Talk (starts at 1:19:30)",
        href: "https://www.youtube.com/watch?v=_ugRmLdd2nQ&t=4770s",
        external: true
      }
    ],
    media: [
      {
        type: "image",
        src: "/assets/images/tedx/tedx-stage-1.png",
        alt: "TEDx stage photo featuring Wonbee Park's speaking session.",
        width: 3839,
        height: 2159,
        orientation: "landscape"
      },
      {
        type: "image",
        src: "/assets/images/tedx/tedx-stage-2.jpg",
        alt: "TEDx audience-facing stage image during talk delivery.",
        width: 2560,
        height: 1440,
        orientation: "landscape"
      },
      {
        type: "image",
        src: "/assets/images/tedx/tedx-stage-3.jpg",
        alt: "TEDx speaking close-up photo.",
        width: 4000,
        height: 2252,
        orientation: "landscape"
      }
    ]
  },
  {
    slug: "annual-recap-reels",
    title: "Annual Recap Reels (2024 / 2025)",
    categoryId: "communication-community-public-sharing",
    summary:
      "Short yearly recap reels documenting pivotal build, test, and learning moments shared through Instagram.",
    yearOrStatus: "2024 - 2025",
    tags: ["Recap", "Storytelling", "Yearly Progression"],
    role: "Curator of yearly engineering journey highlights",
    challenge:
      "Capture technical intensity and emotional momentum without reducing the work to casual social snippets.",
    approach:
      "Structured each reel as a compact yearly narrative with selected project moments and clear progression.",
    result:
      "Created concise public-facing capsules that communicate growth, initiative, and execution continuity over time.",
    progression:
      "Provides an accessible visual timeline of increasing project scope and confidence under pressure.",
    sourceMaterial: ["2024recap.mp4, 2025recap.mp4"],
    media: [
      {
        type: "video",
        src: "/assets/videos/recaps/year-recap-2024.mp4",
        alt: "2024 annual recap reel.",
        orientation: "portrait",
        caption: "2024 recap reel."
      },
      {
        type: "video",
        src: "/assets/videos/recaps/year-recap-2025.mp4",
        alt: "2025 annual recap reel.",
        orientation: "portrait",
        caption: "2025 recap reel."
      }
    ]
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
