/**
 * All site copy lives here so pages stay presentational. Mirrors the structure
 * of the Ethical Tech CoLab site (NYU CGA × Microsoft Research).
 */

export const site = {
  name: "Ethical Tech CoLab",
  tagline: "Emerging tech, human condition.",
  email: "yorker@nyu.edu",
  linkedin: "https://www.linkedin.com/company/ethical-tech-lab/",
  summitUrl: "https://blocklive.io/event/ethical-tech-summit",
  partnersLine: "NYU SPS · CGA · Microsoft · New York",
  footerBlurb:
    "Exploring intervention opportunities at the intersection of emerging technologies and the human condition.",
  cohortRange: "Four cohorts · 2024 — 2026",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Cohorts", href: "/cohorts" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

export interface Project {
  index: string;
  key: string;
  name: string;
  tags: string[];
  title: string;
  summary: string;
  detail: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    index: "01",
    key: "EII",
    name: "Evacuation Information Index",
    tags: ["Disaster response", "Civic tech", "Information equity"],
    title: "Evacuation Information Index",
    summary:
      "A real-time index measuring the quality, accessibility, and equity of evacuation information during crises.",
    detail:
      "EII synthesizes signals from public agencies, social networks, and on-the-ground reports to surface where critical information is missing — helping responders close gaps before they cost lives.",
    stack: [
      "Geospatial analytics",
      "LLM signal extraction",
      "Open data pipelines",
      "React dashboards",
    ],
  },
  {
    index: "02",
    key: "Digital Art Passport",
    name: "Arts & Artifacts Repatriation",
    tags: ["Cultural heritage", "Provenance", "Restorative justice"],
    title: "Arts & Artifacts Repatriation",
    summary:
      "A digital provenance passport for cultural artifacts — supporting repatriation, attribution, and ethical stewardship.",
    detail:
      "Combining verifiable credentials with collaborative cataloguing, the Digital Art Passport gives institutions, source communities, and researchers a shared record of an object's life across borders.",
    stack: [
      "Verifiable credentials",
      "IIIF imaging",
      "Ledger anchoring",
      "Knowledge graphs",
    ],
  },
  {
    index: "03",
    key: "Traceability",
    name: "Ethical Supply Chain & Traceability",
    tags: ["Labor rights", "Climate accountability", "Trust infrastructure"],
    title: "Ethical Supply Chain & Traceability",
    summary:
      "Auditable traceability for materials, labor, and impact — from origin to shelf.",
    detail:
      "We prototype interoperable trace records that travel with goods, letting buyers and regulators verify ethical claims without exposing sensitive supplier data.",
    stack: [
      "Zero-knowledge proofs",
      "ERP integrations",
      "Standards (GS1, EPCIS)",
      "Edge attestation",
    ],
  },
  {
    index: "04",
    key: "Simulation",
    name: "Diplomatic Simulator",
    tags: ["Diplomacy", "AI safety", "Pedagogy"],
    title: "Diplomatic Simulator",
    summary:
      "An AI-mediated environment where negotiators rehearse high-stakes diplomacy with culturally grounded agents.",
    detail:
      "The simulator pairs domain experts with adaptive agents that model historical context, incentives, and red lines — training practitioners for situations textbooks cannot capture.",
    stack: [
      "Multi-agent LLMs",
      "Scenario authoring tools",
      "Evaluation harnesses",
      "Voice interfaces",
    ],
  },
];

export interface Cohort {
  index: string;
  term: string;
  current?: boolean;
  title: string;
  body: string;
  items: string[];
  archive?: string;
}

export const cohorts: Cohort[] = [
  {
    index: "01",
    term: "Spring 2025",
    title: "First applied research projects.",
    body: "Two projects took shape: detecting and preventing grooming in online spaces, and standardizing ESG certificates & labels to drive consumer behavior toward sustainability.",
    items: [
      "Online Grooming Prevention — repurposing existing tech for online safety",
      "ESG Labels & Certificates Transparency — standardization for consumer trust",
    ],
    archive: "Full archive — coming soon",
  },
  {
    index: "02",
    term: "Fall 2025",
    title: "Prototyping and partner pilots.",
    body: "Technical spikes — multi-agent harnesses, verifiable credentials, geospatial pipelines — tested against real partner needs.",
    items: ["Tech spikes shipped", "Evaluation harnesses", "Partner pilots scoped"],
    archive: "Full archive — coming soon",
  },
  {
    index: "03",
    term: "Summer 2026",
    current: true,
    title: "Four projects, one frontier.",
    body: "The current cohort takes four research projects to fielded prototypes: Evacuation Information Index, Digital Art Passport, Ethical Supply Chain & Traceability, and Diplomatic Simulator.",
    items: [
      "8 applied researchers",
      "4 active projects",
      "3 institutional partners (NYU SPS · CGA · Microsoft)",
    ],
  },
];

export const about = {
  eyebrow: "About",
  heading:
    "Exploring tech interventions for migration, forced labor, IDPs and refugees.",
  intro:
    "The NYU Center for Global Affairs launched the Ethical Tech CoLab to focus on interventions in the human condition using emerging technologies — interdisciplinary applied research that draws on students, faculty, and partners from across NYU and industry.",
  mission: {
    label: "Mission",
    heading:
      "Explore intervention opportunities at the intersection of emerging technologies and the human condition.",
    body: "We translate frontier research into prototypes that institutions and communities can actually use — moving from speculative possibilities to deployable interventions on migration, forced labor, and the rights of displaced people.",
  },
  vision: {
    label: "Vision",
    heading:
      "Technology shaped by the people it affects, not the other way around.",
    body: "Humans should be able to own their digital identity and credentials regardless of regime change — and emerging tech, used well, can measurably reduce the volume of forced labor and the precarity of refugees and IDPs.",
  },
  director: {
    label: "Lab Director",
    name: "Prof. Yorke E. Rhodes III",
    summary:
      "NYU CGA Global Economy · Cofounder of Blockchain at Microsoft · Teaching at NYU for 12 years.",
    paragraphs: [
      'Professor Rhodes currently teaches "Beyond the Brand: Harnessing Emerging Technology in Ethical Sourcing" at CGA, and works on traceability for forced labor compliance.',
      "He was an initial funding partner of ID2020, an NGO focused on decentralized humanitarian identity for refugees and displaced people in partnership with UNHCR and the World Food Program — founded during the first Syrian refugee crisis on the premise that people should be able to prove their skills, history, and education across borders.",
      "The CoLab brings together his cross-organizational work in Forced Labor and Human Trafficking with Microsoft Tech for Fundamental Rights, and collaborations with Microsoft Research on proof-of-human, AI, web3, censorship-resistant security, and privacy-preserving technologies such as zero-knowledge proofs.",
    ],
  },
  whatWeDo: {
    label: "What we do",
    heading: "Research, prototypes, publication.",
    items: [
      {
        index: "01",
        title: "Research & investigation design",
        body: "Papers and proposals on using AI and emerging tech for preventative interventions and awareness of forced labor.",
      },
      {
        index: "02",
        title: "Source evaluation",
        body: "Investigate and prepare data sources for interventions — job postings, online game streams, chat rooms, supply-chain signals.",
      },
      {
        index: "03",
        title: "Proofs of concept",
        body: "Build PoCs that test the effectiveness of data sources, intervention tactics, and awareness campaigns.",
      },
      {
        index: "04",
        title: "Publish & scale",
        body: "Document interventions and propose scaled-up tests with the goal of meaningfully reducing the volume of forced labor.",
      },
    ],
  },
  principles: {
    label: "Principles",
    heading: "How we work.",
    items: [
      {
        index: "01",
        title: "Field-grounded",
        body: "Every project begins with the practitioners and communities who will live with the outcome.",
      },
      {
        index: "02",
        title: "Prototype-first",
        body: "We ship working systems, not white papers — and we measure them in real conditions.",
      },
      {
        index: "03",
        title: "Open by default",
        body: "Methods, evaluations, and lessons are shared so others can extend the work.",
      },
    ],
  },
  stack: {
    label: "Stack",
    heading: "The technologies we work with.",
    body: "We compose proven infrastructure with frontier capabilities — staying curious about what's new and rigorous about what's reliable.",
    groups: [
      {
        name: "AI & ML",
        items: [
          "Large Language Models",
          "Multi-agent systems",
          "Retrieval-augmented generation",
          "Evaluation harnesses",
        ],
      },
      {
        name: "Data & Infra",
        items: [
          "Knowledge graphs",
          "Geospatial pipelines",
          "Vector databases",
          "Event streaming",
        ],
      },
      {
        name: "Trust Layer",
        items: [
          "Verifiable credentials",
          "Zero-knowledge proofs",
          "Ledger anchoring",
          "Open standards (GS1, IIIF)",
        ],
      },
      {
        name: "Product",
        items: ["React / TanStack", "TypeScript", "Design systems", "Realtime dashboards"],
      },
    ],
  },
  collaborators: {
    label: "Collaborators",
    heading: "Confirmed & in conversation.",
    confirmedLabel: "Confirmed — Spring 2025",
    confirmed: [
      "Generative AI for Good — Avatars for human-condition storytelling",
      "D_ID — Avatars tooling",
      "Mesur.io — Risk inference in emerging markets on forced labor",
      "SupplyTrace — Open data platform for risk inference",
      "Rivr.com — Twitch livestreams, keyword tags, chat-room data source",
      "Human Generated by BlockApps — Verifiable human attestations in the age of AI",
    ],
    inConversationLabel: "In conversation",
    inConversation: [
      "ao & Arweave (Community Labs) — Permanent censorship-resistant storage",
      "Circle — Payments and financial inclusion",
      "ConsenSys — Blockchain, identity",
      "OpenAI — Responsible AI tools",
      "World Coin — Proof of unique human",
      "Gaia — Decentralized AI workloads",
    ],
  },
  summit: {
    label: "Each semester",
    heading:
      "NYU Ethical Tech Summit — collaborator talks, CoLab reviews, and new partnerships.",
  },
  foundingPartners: [
    "NYU School of Professional Studies",
    "Center for Global Affairs (CGA)",
    "Microsoft Research",
  ],
};

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  email?: string;
  org?: string;
  /** Path under /public, e.g. "/team/carolina.jpg". Falls back to initials. */
  photo?: string;
  /** One- or two-sentence bio shown under the name. */
  bio?: string;
}

export const team = {
  eyebrow: "Team · Current cohort",
  heading: "The people building this.",
  intro:
    "A small, deliberate team pairing applied AI research with design, policy, and field expertise.",
  founder: {
    initials: "YR",
    name: "Yorke E Rhodes III",
    role: "Founder",
    email: "yorker@nyu.edu",
    body: "Founder of the Ethical Tech CoLab. Convenes the cohort, sets the research agenda, and steers each project from frontier idea to fielded prototype.",
  } as {
    initials: string;
    name: string;
    role: string;
    email: string;
    body: string;
    photo?: string;
  },
  researchersLabel: "The cohort.",
  researchersCount: "7 researchers",
  researchers: [
    {
      initials: "CM",
      name: "Carolina de Almeida Pernambuco Moron",
      role: "Applied AI Researcher",
      email: "cd3823@nyu.edu",
      photo: "/team/carolina.jpg",
      bio: "Carolina is a graduate student at NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis and the United Nations. Highlights in her professional experience include cross-sector project and partnership management, writing English, Portuguese, and Spanish risk reports in consultancy, and redesigning strategic planning for non-profits.\n\nShe has various field experiences under diverse environments. In 2018 and 2019, Carolina lived in Nairobi, Kenya, working at a grassroots organization called Mama Africa, where she managed micro financing of 30 women entrepreneurs and led a business workshop with techniques to solve social issues. More recently, she has been working to co-develop the MVDC project — the first AI voice-based system to improve early-warning systems embedded in a human-centered approach for data governance, ethically sourced data, and bias mitigation. While she was on the ground in Malawi, she established partnerships with the government, academia, civil society, and private sector.",
    },
    {
      initials: "CL",
      name: "Christine Lumen",
      role: "Applied AI Researcher",
      email: "cl4767@nyu.edu",
      // photo: "/team/christine.jpg",
      bio: "Applied AI researcher in the CoLab's Summer 2026 cohort. Full bio coming soon.",
    },
    {
      initials: "AR",
      name: "Alana Robertson",
      role: "Applied AI Researcher",
      email: "ar10166@nyu.edu",
      // photo: "/team/alana.jpg",
      bio: "Applied AI researcher in the CoLab's Summer 2026 cohort. Full bio coming soon.",
    },
    {
      initials: "MM",
      name: "Melanie MacKew",
      role: "Applied AI Researcher",
      email: "mcm9106@nyu.edu",
      // photo: "/team/melanie.jpg",
      bio: "Applied AI researcher in the CoLab's Summer 2026 cohort. Full bio coming soon.",
    },
    {
      initials: "CR",
      name: "Carlos Ruiz",
      role: "Applied AI Researcher",
      email: "cdr9688@nyu.edu",
      // photo: "/team/carlos.jpg",
      bio: "Applied AI researcher in the CoLab's Summer 2026 cohort. Full bio coming soon.",
    },
    {
      initials: "IC",
      name: "India Clarke",
      role: "Applied AI Researcher",
      email: "iac9310@nyu.edu",
      photo: "/team/india.jpg",
      bio: "India is a graduate student NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis. She holds a Bachelor of Arts in International Relations and Political Science from Boston University.\n\nHer professional experience includes an internship at Talis Capital in London, where she conducted due diligence and ESG analysis on early stage startups across fintech, healthtech and consumer sectors. Earlier this year, she served as a graduate consultant to the Strong Cities Network, which included conducting interdisciplinary research on violent extremism prevention, and producing a guide for practitioners and policymakers on how law enforcement and mental health professionals can collaborate in secondary violence prevention.",
    },
    {
      initials: "YR",
      name: "Yago Rocha",
      role: "Applied AI Researcher",
      email: "ydr2006@nyu.edu",
      photo: "/team/yago.jpg",
      bio: "Yago is a graduate student at NYU's Center for Global Affairs, concentrating in International Development and Humanitarian Assistance. His professional background spans both the private and international development sectors, with experience in project management, stakeholder engagement, strategic planning, and data-driven decision-making.\n\nBefore joining NYU, Yago held leadership positions in Brazil's financial sector, where he managed investment portfolios, led commercial teams, and developed strategic solutions for clients and organizations. His interest in global development led him to transition into the humanitarian field, gaining field experience in Dzaleka Refugee Camp, Malawi, where he supported initiatives focused on refugee livelihoods and financial inclusion.\n\nYago has also contributed to United Nations initiatives as a UN Volunteer and currently serves as an intern at the United Nations Development Programme (UNDP) in New York. His work and research focus on humanitarian assistance, refugee economic inclusion, international development, and the use of data and technology to support evidence-based policymaking and strengthen cross-sector collaboration. He is particularly interested in how artificial intelligence and innovative digital solutions can improve humanitarian response and sustainable development outcomes.",
    },
  ] as TeamMember[],
  collaboratorsLabel: "Other members.",
  collaborators: [
    {
      initials: "AD",
      name: "Alex Dantas",
      role: "Creative Designer",
      org: "Ethical Tech CoLab",
    },
  ] as TeamMember[],
};
