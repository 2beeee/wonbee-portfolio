export type ShowcaseMedia = {
  type: "image" | "video";
  src: string;
  alt: string;
  caption?: string;
};

export const tedxShowcase = {
  title: "TEDx",
  summary:
    "Technical storytelling work focused on making ambitious engineering ideas understandable, accurate, and meaningful for broad audiences.",
  talkUrl: "https://www.youtube.com/watch?v=_ugRmLdd2nQ&t=4770s",
  media: [
    {
      type: "image",
      src: "/assets/images/tedx/tedx-stage-1.png",
      alt: "TEDx stage photo during speaking session."
    },
    {
      type: "image",
      src: "/assets/images/tedx/tedx-stage-2.jpg",
      alt: "TEDx audience-facing stage photo."
    },
    {
      type: "image",
      src: "/assets/images/tedx/tedx-stage-3.jpg",
      alt: "TEDx speaking close-up."
    }
  ] as ShowcaseMedia[],
  communityImage: {
    src: "/assets/images/community/cayman-community.jpg",
    alt: "Photo with Cayman, founder of a Purdue rocket community, highlighting international exchange."
  }
};

export const awardShowcase = {
  title: "Samsung Humantech Paper Awards",
  subtitle: "32nd Gold Prize",
  summary:
    "Award-winning liquid rocket injector research on the PINTOSWIRL concept, integrating pintle and swirl methods for difficult momentum-ratio conditions.",
  paperUrl: "/assets/docs/samsung-humantech-gold-paper.docx",
  media: [
    {
      src: "/assets/images/humantech/humantech-1.jpg",
      alt: "Samsung Humantech ceremony image 1.",
      caption: "Award moment"
    },
    {
      src: "/assets/images/humantech/humantech-2.jpg",
      alt: "Samsung Humantech ceremony image 2.",
      caption: "Presentation context"
    },
    {
      src: "/assets/images/humantech/humantech-3.jpg",
      alt: "Samsung Humantech ceremony image 3.",
      caption: "Recognition highlight"
    }
  ],
  highlights: [
    "Experimental and analytical injector validation",
    "Combustion-focused engineering contribution with practical build context",
    "Recognized with Samsung Humantech Gold distinction"
  ]
};

export const skillsShowcase = {
  overview:
    "A dedicated practical capability layer covering fabrication and machine-shop execution that supports reliable engineering delivery.",
  capabilityItems: [
    "TIG welding",
    "Machining and machine tool operation",
    "Fabrication fit-up and process discipline",
    "Design-for-buildability judgment under time constraints"
  ],
  earlyMechanical: {
    image: {
      src: "/assets/images/skills/early-car-maintenance.jpg",
      alt: "Early photo showing practical car maintenance exposure."
    },
    video: {
      src: "/assets/videos/skills/car-maintenance-time.mp4",
      alt: "Automotive maintenance short clip."
    }
  },
  tigGallery: [
    {
      type: "video",
      src: "/assets/videos/fabrication/tig-welding-process.mp4",
      alt: "TIG welding short loop.",
      caption: "TIG welding loop"
    },
    {
      type: "image",
      src: "/assets/images/fabrication/tig-welding-1-portrait.jpg",
      alt: "Portrait fabrication still from TIG process.",
      caption: "Process still"
    },
    {
      type: "image",
      src: "/assets/images/fabrication/tig-welding-2-portrait.jpg",
      alt: "Portrait TIG welding image.",
      caption: "Weld quality practice"
    },
    {
      type: "image",
      src: "/assets/images/fabrication/tig-welding-3-portrait.jpg",
      alt: "Portrait TIG welding close-up image.",
      caption: "Fit-up and control"
    }
  ] as ShowcaseMedia[]
};

export const personalMoments = [
  {
    src: "/assets/images/personal/niagara-face.jpg",
    alt: "Personal photo at Niagara."
  },
  {
    src: "/assets/images/personal/us-museum.jpg",
    alt: "Personal photo at a museum in the US."
  },
  {
    src: "/assets/images/personal/childhood-santa.jpg",
    alt: "Childhood memory photo."
  },
  {
    src: "/assets/images/personal/childhood-bike.jpg",
    alt: "Childhood bicycle photo."
  },
  {
    src: "/assets/images/personal/childhood-play.jpg",
    alt: "Childhood playful moment."
  }
] as const;

export const recapYears = [
  {
    year: "2025",
    title: "2025 Recap",
    summary: "A high-intensity year focused on scaling scope, raising technical rigor, and refining execution under pressure.",
    video: "/assets/videos/recaps/year-recap-2025.mp4"
  },
  {
    year: "2024",
    title: "2024 Recap",
    summary: "The year where foundational propulsion and build-test habits were formed through repeated hands-on iteration.",
    video: "/assets/videos/recaps/year-recap-2024.mp4"
  }
] as const;
