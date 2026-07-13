/**
 * All site copy lives here so pages stay presentational. Mirrors the structure
 * of the Ethical Tech CoLab site (NYU CGA × Microsoft).
 */

export const site = {
  name: "Ethical Tech CoLab",
  tagline: "Emerging tech, human condition.",
  linkedin: "https://www.linkedin.com/company/ethical-tech-lab/",
  email: "ethical-tech-colab@nyu.edu",
  partnersLine: "NYU SPS · CGA · Microsoft · New York",
  footerBlurb:
    "Exploring intervention opportunities at the intersection of emerging technologies and the human condition.",
  cohortRange: "Four cohorts · est. 2024-2026",
  // Social links. GitHub is the real org; instagram/twitter are placeholders —
  // swap in the real handles once the accounts exist. Set to "" to hide a link.
  social: {
    github: "https://github.com/Ethical-Tech-CoLab",
    // Hidden for now — the footer drops any social with an empty href. Restore
    // by pasting the real handle back in.
    instagram: "", // TODO: real Instagram handle (hidden until account exists)
    twitter: "", // TODO: real X/Twitter handle (hidden until account exists)
  },
  // Legal disclaimers shown in the footer footnote.
  legal: [
    "The Ethical Tech CoLab is a research initiative of the NYU School of Professional Studies Center for Global Affairs, conducted in collaboration with Microsoft. Views and findings expressed on this site are those of the researchers and do not represent the official positions of New York University, Microsoft, or any partner institution.",
    "Projects and prototypes are experimental applied research, provided “as is” without warranty of any kind. Nothing on this site constitutes legal, financial, or professional advice. Third-party names, logos, and trademarks are the property of their respective owners.",
  ],
};

// Newsletter signup — Mailchimp embedded form.
// Paste the `action` URL from your Mailchimp embedded-form code, and the hidden
// bot-protection field name Mailchimp generates (the `b_xxxx_yyyy` input `name`).
// Until these are filled the form renders in a disabled "coming soon" state.
export const newsletter = {
  eyebrow: "Stay in the loop",
  heading: "Join the Ethical Tech CoLab newsletter.",
  body: "Cohort openings, project launches, event invites, and research from the frontier of emerging tech and the human condition — a few times a semester, no noise.",
  action: "", // TODO: Mailchimp form action URL, e.g. https://nyu.us1.list-manage.com/subscribe/post?u=XXXX&id=YYYY
  hiddenField: "", // TODO: Mailchimp anti-bot hidden field name, e.g. b_XXXX_YYYY
  cta: "Subscribe",
};

export interface NavItem {
  label: string;
  href: string;
  /** Sub-tabs shown in a dropdown under this item (also mirrored by SectionTabs). */
  children?: { label: string; href: string }[];
}

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Portfolio",
    href: "/portfolio",
    // Live Demos and Publications live under Portfolio: a dropdown in the top
    // nav and the SectionTabs bar on the pages themselves.
    children: [
      { label: "Overview", href: "/portfolio" },
      { label: "Live Demos", href: "/demos" },
      { label: "Publications", href: "/publications" },
    ],
  },
  // Cohorts tab removed — its content now lives on the Home page.
  // About tab temporarily hidden — page preserved at src/app/about/page.tsx.
  // { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

/** A single project that lives under a research question. */
export interface SubProject {
  name: string;
  summary: string;
  status?: string;
  /** Full GitHub repo URL. Renders a "View code" link when present. */
  repo?: string;
  /**
   * Live, running URL for this project (GitHub Pages, Vercel, etc.). When set,
   * the card shows a "▶ Launch live demo" button and a LIVE badge. This lets any
   * project carry its own demo without needing to appear in the `products` list.
   */
  demo?: string;
}

/** A research question that opens to reveal the projects exploring it. */
export interface ResearchArea {
  index: string;
  key: string;
  question: string;
  tags: string[];
  summary: string;
  detail: string;
  stack: string[];
  projects: SubProject[];
}

export const researchAreas: ResearchArea[] = [
  {
    index: "01",
    key: "Evacuation",
    question: "How can AI inform evacuation decisions?",
    tags: ["Disaster response", "Civic tech", "Information equity"],
    summary:
      "Turning fragmented crisis signals into decisions, so responders and residents can act before information gaps cost lives.",
    detail:
      "Projects under this question measure and improve the quality, accessibility, and equity of the information people rely on when they have to leave.",
    stack: [
      "Geospatial analytics",
      "LLM signal extraction",
      "Open data pipelines",
      "React dashboards",
    ],
    projects: [
      {
        name: "Evacuation Information Index",
        summary:
          "A real-time index measuring the quality, accessibility, and equity of evacuation information during crises. It synthesizes signals from public agencies, social networks, and on-the-ground reports to surface where critical information is missing, helping responders close gaps before they cost lives.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/evacuation-inform-index-carolina",
      },
      {
        name: "Exodus — Civilian Evacuation Risk Platform",
        summary:
          "A platform unifying three civilian-evacuation risk tools: a crisis map of the INFORM Severity Index with live news and conflict timelines, a seven-dimension scenario risk model, and an endangerment-and-feasibility risk assessment, sharing one backend and design language.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/Exodus",
      },
      {
        name: "ERCF — Evacuation Risk & Cost Framework",
        summary:
          "A decision-support tool that estimates the human and financial cost of civilian evacuation in armed conflict, scoring scenarios across seven risk dimensions and comparing the cost of evacuating against the cost of staying in the zone.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/ercf",
      },
      {
        name: "Evacuation Behavior Simulator",
        summary:
          "An interactive, agent-based model of community evacuation behavior, modeling family clusters, information-seeking, neighbor social influence, and elder and child delays across an UNAWARE → SEEKING → MILLING → EVACUATING → DONE lifecycle.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie",
      },
      {
        name: "Evacuation Routing Simulator",
        summary:
          "An interactive evacuation simulator that models how routing and assignment choices shape who reaches safety, with shareable scenario state and a built-in explainer walkthrough.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/India-EvacSimulation",
      },
      {
        name: "Mariupol 2022 — Corridor Severity Model",
        summary:
          "A corridor-severity model reconstructing the 2022 Mariupol evacuation, scoring the risk and viability of humanitarian corridors under siege conditions.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model",
        demo: "https://ethical-tech-colab.github.io/mariupol-evacuation-model/",
      },
    ],
  },
  {
    index: "02",
    key: "Cultural heritage",
    question: "How can technology support the ethical return of cultural artifacts?",
    tags: ["Cultural heritage", "Provenance", "Restorative justice"],
    summary:
      "Giving institutions, source communities, and researchers a shared, verifiable record of an artifact's life across borders.",
    detail:
      "Projects under this question pair verifiable credentials with collaborative cataloguing to support repatriation, attribution, and ethical stewardship.",
    stack: [
      "Verifiable credentials",
      "IIIF imaging",
      "Ledger anchoring",
      "Knowledge graphs",
    ],
    projects: [
      {
        name: "Arts Provenance Agent — Digital Provenance Passport",
        summary:
          "An x402-native agent that traces the provenance of artworks and artifacts, flags looting, repatriation, and valuation risk, and issues a cryptographically signed, tamper-evident Passport (a JSON-LD Verifiable Credential) for each object. Every claim is grounded in an allowlist of authoritative sources — the Met, UNESCO, ICOM, the Art Loss Register — so a fact without a citation is never produced. Includes a dashboard for tracing where an object has been, its risk score, and repatriation status.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/arts-provenance-agent",
        demo: "https://ethical-tech-colab.github.io/arts-provenance-agent/",
      },
      {
        name: "Provenance Search — Provenance Intelligence",
        summary:
          "Looks up an artwork's ownership history across free public sources — Tavily search (restricted to the Met, Getty, INTERPOL, UNESCO, Art Loss Register and more), the Met and Art Institute of Chicago APIs, MoMA, Wikidata, and Europeana — and emits a provenance passport with a confidence score computed by a fixed algorithm, not the AI. Supports text, image upload, and live camera capture for use inside a museum.",
        status: "In development",
        repo: "https://github.com/Ethical-Tech-CoLab/provenance-search",
      },
      {
        name: "Digital Art Passport (VANGO)",
        summary:
          "A mobile-style digital passport for art experiences: scan a QR code or enter an artwork's code to collect a stamp — a vintage illustration of the piece with the artist, venue, and date. Stamps persist across sessions, with a collector bio and passport number, and a fully multilingual interface (English, French, Italian).",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/VANGO",
        demo: "https://ethical-tech-colab.github.io/VANGO/",
      },
      {
        name: "3D Online Gallery",
        summary:
          "An immersive 3D gallery for exploring provenance-tracked and repatriated works in a navigable virtual space. Placeholder for an upcoming build.",
        status: "Coming soon",
      },
    ],
  },
  {
    index: "03",
    key: "Traceability",
    question: "How can ethical claims in supply chains be made verifiable?",
    tags: ["Labor rights", "Climate accountability", "Trust infrastructure"],
    summary:
      "Auditable traceability for materials, labor, and impact, from origin to shelf.",
    detail:
      "Projects under this question build interoperable trace records that travel with goods, letting buyers and regulators verify ethical claims without exposing sensitive supplier data.",
    stack: [
      "Zero-knowledge proofs",
      "ERP integrations",
      "Standards (GS1, EPCIS)",
      "Edge attestation",
    ],
    projects: [
      {
        name: "Ethical Supply Chain & Traceability",
        summary:
          "Interoperable trace records that travel with goods, letting buyers and regulators verify ethical claims about materials, labor, and impact without exposing sensitive supplier data.",
        status: "Active",
      },
      {
        name: "Forced Labor Structural Risk Index",
        summary:
          "An interactive index that scores structural forced-labor risk across regions and sectors, turning scattered supply-chain and labor signals into a comparable measure buyers and regulators can act on. Built by Amanda Lindsey in the Fall 2025 cohort.",
        status: "Active",
        demo: "https://aml1045.github.io/forced-labor-structural-risk-index/",
      },
    ],
  },
  {
    index: "04",
    key: "Diplomacy",
    question: "How can AI help practitioners rehearse high-stakes diplomacy?",
    tags: ["Diplomacy", "AI safety", "Pedagogy"],
    summary:
      "An AI-mediated environment where negotiators rehearse high-stakes diplomacy with culturally grounded agents.",
    detail:
      "Projects under this question pair domain experts with adaptive agents that model historical context, incentives, and red lines, training practitioners for situations textbooks cannot capture.",
    stack: [
      "Multi-agent LLMs",
      "Scenario authoring tools",
      "Evaluation harnesses",
      "Voice interfaces",
    ],
    projects: [
      {
        name: "Diplomatic Simulator",
        summary:
          "An AI-mediated environment where negotiators rehearse high-stakes diplomacy with culturally grounded agents that model historical context, incentives, and red lines, training practitioners for situations textbooks cannot capture.",
        status: "Active",
      },
    ],
  },
];

/** An academic report / write-up tied to one of the research questions. */
export interface Publication {
  index: string;
  area: string;
  question: string;
  title: string;
  summary: string;
  status: string;
  /** Link to the published report/PDF. Empty string = placeholder, not yet out. */
  url: string;
}

export const publications = {
  eyebrow: "Publications · Academic reports",
  heading: "The research, written up.",
  intro:
    "Each research question the CoLab takes on is being written up as an academic report. Titles are working drafts; links go live here as each report is published.",
  items: [
    {
      index: "01",
      area: "Evacuation",
      question: "How can AI inform evacuation decisions?",
      title: "AI-Informed Evacuation Decision-Making Under Crisis Constraints",
      summary:
        "A write-up of the evacuation-risk models, information index, and behavioral simulations, and what they imply for who reaches safety.",
      status: "In preparation",
      url: "",
    },
    {
      index: "02",
      area: "Cultural heritage",
      question:
        "How can technology support the ethical return of cultural artifacts?",
      title:
        "Verifiable Provenance for the Ethical Return of Cultural Artifacts",
      summary:
        "A report on pairing verifiable credentials with grounded, cited provenance to support repatriation, attribution, and ethical stewardship.",
      status: "In preparation",
      url: "",
    },
    {
      index: "03",
      area: "Traceability",
      question: "How can ethical claims in supply chains be made verifiable?",
      title: "Making Ethical Supply-Chain Claims Verifiable",
      summary:
        "A report on structural forced-labor risk and interoperable trace records that let buyers and regulators verify claims without exposing supplier data.",
      status: "In preparation",
      url: "",
    },
    {
      index: "04",
      area: "Diplomacy",
      question: "How can AI help practitioners rehearse high-stakes diplomacy?",
      title:
        "Rehearsing High-Stakes Diplomacy with Culturally Grounded AI Agents",
      summary:
        "A report on AI-mediated environments where negotiators rehearse against agents that model historical context, incentives, and red lines.",
      status: "In preparation",
      url: "https://yorkerhodes3.github.io/nova-portfolio-ofsd7xep/diplomacy-session-report.html",
    },
  ] as Publication[],
};

/** A single labelled link (e.g. a live demo). */
export interface DemoLink {
  label: string;
  href: string;
}

/** The Avatar Storytelling live demos (D-ID), shared by the Spring 2025 cohort
 * card, the portfolio archive, and the Live Demos page so they never drift. */
export const avatarStorytellingDemos: DemoLink[] = [
  {
    label: "Live demo 1",
    href: "https://studio.d-id.com/share?id=f816a9fc31454c3b843cf577e9affc78&utm_source=copy",
  },
  {
    label: "Live demo 2",
    href: "https://studio.d-id.com/share?id=0e35cf3e8380a8436ddadf29838acf2e&utm_source=copy",
  },
  {
    label: "Live demo 3",
    href: "https://studio.d-id.com/share?id=6e23d48f51c352d58425aa6faf299ec8&utm_source=copy",
  },
  {
    label: "Live demo 4",
    href: "https://studio.d-id.com/share?id=6c979fe11446cabaa5988f0922f0bd33&utm_source=copy",
  },
];

/** Past projects from earlier cohorts — the portfolio archive. */
export interface ArchivedProject {
  name: string;
  term: string;
  summary: string;
  tags: string[];
  /** Source repo URL — renders a "View code" link when expanded. */
  repo?: string;
  /** Single live-demo URL — renders a "Launch live demo" button when expanded. */
  demo?: string;
  /** Several live demos (e.g. shared videos) — rendered as links when expanded. */
  demos?: DemoLink[];
}

export const archivedProjects: ArchivedProject[] = [
  {
    name: "Online Grooming Prevention",
    term: "Spring 2025",
    summary:
      "Repurposing existing detection technology to identify and interrupt grooming behavior in online spaces, protecting minors on platforms where predators operate.",
    tags: ["Online safety", "Child protection", "NLP"],
  },
  {
    name: "ESG Labels & Certificates Transparency",
    term: "Spring 2025",
    summary:
      "Standardizing ESG certificates and labels into a comparable, trustworthy signal so consumers can steer their behavior toward genuinely sustainable products.",
    tags: ["Sustainability", "Consumer trust", "Standardization"],
  },
  {
    name: "AI's Carbon Footprint",
    term: "Spring 2025",
    summary:
      "Measuring the energy and carbon cost of AI systems, with guidance for lower-impact, more accountable deployment.",
    tags: ["Sustainability", "AI impact", "Policy"],
  },
  {
    name: "Generative AI for Good — Avatar Storytelling",
    term: "Spring 2025",
    summary:
      "Human-condition storytelling with culturally grounded digital-human avatars — short pieces produced with generative media.",
    tags: ["Generative AI", "Storytelling", "Media"],
    demos: avatarStorytellingDemos,
  },
  {
    name: "Forced Labor Structural Risk Index",
    term: "Fall 2025",
    summary:
      "An interactive index mapping the structural conditions that enable forced labor across 184 countries on a 0–1 risk scale, with national and sub-national layers.",
    tags: ["Traceability", "Human rights", "Data"],
    repo: "https://github.com/aml1045/forced-labor-structural-risk-index",
    demo: "https://aml1045.github.io/forced-labor-structural-risk-index/",
  },
  {
    name: "Academic Research Tool",
    term: "Fall 2025",
    summary:
      "An LLM-assisted tool for accelerating literature review and research workflows through structured prompting.",
    tags: ["LLM", "Research", "Tooling"],
  },
];

/** A shipped repository/product, shown on the Repositories page. */
export interface Product {
  name: string;
  repoName: string;
  /** Source repo URL. Optional — some demos (e.g. shared videos) have no repo. */
  repo?: string;
  /** Live deployed URL, if the product is running somewhere embeddable. */
  demo?: string;
  /** A set of live demos shown as links (used when there are several, or when
   * the demo isn't embeddable as an iframe). */
  demos?: DemoLink[];
  blurb: string;
  language: string;
  theme: string;
  /** Cohort term this demo came out of, e.g. "Summer 2026". Used by the
   * per-semester filter on the Live Demos page. */
  term: string;
  featured?: boolean;
}

export const productThemes = [
  "Evacuation",
  "Cultural heritage",
  "Traceability",
  "Storytelling",
];

/** Semesters shown in the Live Demos filter, newest first. */
export const productTerms = ["Summer 2026", "Fall 2025", "Spring 2025"];

export const products: Product[] = [
  {
    name: "Exodus — Civilian Evacuation Risk Platform",
    repoName: "Exodus",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/Exodus",
    demo: "https://exodus-ruddy.vercel.app",
    blurb:
      "Three civilian-evacuation risk tools behind one backend and design language: a crisis map of the INFORM Severity Index with live news and conflict timelines, a seven-dimension scenario risk model, and an endangerment-and-feasibility assessment.",
    language: "TypeScript",
    theme: "Evacuation",
    featured: true,
  },
  {
    name: "Evacuation Information Index",
    repoName: "evacuation-inform-index-carolina",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/evacuation-inform-index-carolina",
    demo: "https://ethical-tech-colab.github.io/evacuation-inform-index-carolina/",
    blurb:
      "A real-time index measuring the quality, accessibility, and equity of evacuation information during crises — synthesizing agency, social, and on-the-ground signals to surface where critical information is missing.",
    language: "HTML",
    theme: "Evacuation",
    featured: true,
  },
  {
    name: "Evacuation Routing Simulator",
    repoName: "India-EvacSimulation",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/India-EvacSimulation",
    demo: "https://ethical-tech-colab.github.io/India-EvacSimulation/",
    blurb:
      "An interactive simulator modeling how routing and assignment choices shape who reaches safety, with shareable scenario state and a built-in explainer walkthrough.",
    language: "HTML",
    theme: "Evacuation",
  },
  {
    name: "Mariupol 2022 — Corridor Severity Model",
    repoName: "mariupol-evacuation-model",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model",
    demo: "https://ethical-tech-colab.github.io/mariupol-evacuation-model/",
    blurb:
      "A corridor-severity model reconstructing the 2022 Mariupol evacuation, scoring the risk and viability of humanitarian corridors under siege conditions.",
    language: "HTML",
    theme: "Evacuation",
  },
  {
    name: "Evacuation Behavior Simulator",
    repoName: "Evac-Sim-Melanie",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie",
    demo: "https://ethical-tech-colab.github.io/Evac-Sim-Melanie/",
    blurb:
      "An agent-based model of community evacuation behavior — family clusters, information-seeking, neighbor influence, and elder and child delays across an UNAWARE → SEEKING → MILLING → EVACUATING → DONE lifecycle.",
    language: "JavaScript",
    theme: "Evacuation",
  },
  {
    name: "Digital Art Passport (VANGO)",
    repoName: "VANGO",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/VANGO",
    demo: "https://ethical-tech-colab.github.io/VANGO/",
    blurb:
      "A digital provenance passport for cultural artifacts, pairing verifiable credentials with collaborative cataloguing to support repatriation, attribution, and ethical stewardship.",
    language: "HTML",
    theme: "Cultural heritage",
  },
  {
    name: "Evacuation Model",
    repoName: "evacmodel",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/evacmodel",
    demo: "https://ethical-tech-colab.github.io/evacmodel/",
    blurb:
      "An evacuation-modeling prototype exploring population movement and decision dynamics under crisis constraints.",
    language: "HTML",
    theme: "Evacuation",
  },
  {
    name: "ERCF — Evacuation Risk & Cost Framework",
    repoName: "ercf",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/ercf",
    blurb:
      "A decision-support framework estimating the human and financial cost of civilian evacuation in armed conflict, scoring scenarios across seven risk dimensions and comparing evacuating against staying.",
    language: "Python",
    theme: "Evacuation",
  },
  {
    name: "Arts Provenance Agent",
    repoName: "arts-provenance-agent",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/arts-provenance-agent",
    demo: "https://ethical-tech-colab.github.io/arts-provenance-agent/",
    blurb:
      "An x402-native agent that traces artwork provenance, flags looting and repatriation risk, and issues a signed, tamper-evident Passport for each object. This live demo runs on mock data — catalog dashboards, passport issue/verify, and a replayed agent trace.",
    language: "TypeScript",
    theme: "Cultural heritage",
    featured: true,
  },
  {
    name: "Forced Labor Structural Risk Index",
    repoName: "forced-labor-structural-risk-index",
    term: "Fall 2025",
    repo: "https://github.com/aml1045/forced-labor-structural-risk-index",
    demo: "https://aml1045.github.io/forced-labor-structural-risk-index/",
    blurb:
      "An interactive index mapping the structural conditions that enable forced labor across 184 countries on a 0–1 risk scale — with a choropleth world map, national and sub-national layers, rankings, and sources. Built by Amanda Lindsey in the Fall 2025 cohort.",
    language: "HTML",
    theme: "Traceability",
    featured: true,
  },
  {
    name: "Generative AI for Good — Avatar Storytelling",
    repoName: "avatar-storytelling",
    term: "Spring 2025",
    demos: avatarStorytellingDemos,
    blurb:
      "Human-condition storytelling with culturally grounded digital-human avatars — a set of short pieces produced with generative media in the Spring 2025 cohort.",
    language: "D-ID",
    theme: "Storytelling",
  },
];

/** A cohort highlight. A plain string is a static bullet; an object with an
 * href renders as a single link; an object with `links` renders a labelled
 * group with an indented list of sub-links (e.g. a project and its demos). */
export type CohortItem =
  | string
  | DemoLink
  | { label: string; links: DemoLink[] };

export interface Cohort {
  index: string;
  term: string;
  current?: boolean;
  title: string;
  body: string;
  items: CohortItem[];
  archive?: string;
}

export const cohorts: Cohort[] = [
  {
    index: "01",
    term: "Spring 2025",
    title: "First applied research projects.",
    body: "The lab's first applied research projects, spanning online safety, sustainability, AI's footprint, and generative storytelling.",
    items: [
      "9 researchers",
      "Online Grooming Prevention",
      "ESG Labels & Certificates Transparency",
      "AI's Carbon Footprint",
      "Generative AI for Good — Avatar Storytelling",
    ],
    archive: "Full archive coming soon",
  },
  {
    index: "02",
    term: "Fall 2025",
    title: "Prototyping and partner pilots.",
    body: "Technical spikes (multi-agent harnesses, verifiable credentials, geospatial pipelines) tested against real partner needs.",
    items: [
      "6 researchers",
      "Forced Labor Structural Risk Index",
      "Academic Research Tool",
    ],
    archive: "Full archive coming soon",
  },
  {
    index: "03",
    term: "Summer 2026",
    current: true,
    title: "Four projects, one frontier.",
    body: "The current cohort takes four research projects from question to fielded prototype.",
    items: [
      "7 researchers",
      "Evacuation Information Index",
      "Digital Art Passport",
      "Ethical Supply Chain & Traceability",
      "Diplomatic Simulator",
    ],
  },
];

/** A client, collaborator, or founding partner org shown on the About page. */
export interface PartnerOrg {
  name: string;
  about?: string;
  url?: string;
  /** Path under /public (e.g. "/nyu-sps-cga-logo.jpg"); empty falls back to a monogram. */
  logo?: string;
}

export const about = {
  eyebrow: "About",
  heading:
    "Exploring technology to improve the human condition.",
  intro:
    "The NYU Center for Global Affairs launched the Ethical Tech CoLab to focus on interventions in the human condition using emerging technologies, through interdisciplinary applied research that draws on students, faculty, and partners from across NYU and industry.",
  mission: {
    label: "Mission",
    heading:
      "Achieving full human potential through technology.",
    body: "We change the conversation on how people are informed and how emerging technology is used for good — translating frontier research into working tools that institutions and communities can actually use, from speculative possibility to deployable intervention on migration, forced labor, and the rights of displaced people.",
  },
  vision: {
    label: "Vision",
    heading:
      "Technology shaped by the people it affects, not the other way around.",
    body: "Humans should be able to own their digital identity and credentials regardless of regime change, and emerging tech, used well, can measurably reduce the volume of forced labor and the precarity of refugees and IDPs.",
  },
  director: {
    label: "Lab Director",
    name: "Prof. Yorke E. Rhodes III",
    summary:
      "NYU CGA Global Economy · Cofounder of Blockchain at Microsoft · Teaching at NYU for 12 years.",
    paragraphs: [
      'Professor Rhodes currently teaches "Beyond the Brand: Harnessing Emerging Technology in Ethical Sourcing" at CGA, and works on traceability for forced labor compliance.',
      "Earlier in his career, he was an initial funding partner of ID2020, an NGO focused on decentralized humanitarian identity for refugees and displaced people in partnership with UNHCR and the World Food Program, founded during the first Syrian refugee crisis on the premise that people should be able to prove their skills, history, and education across borders.",
      "The CoLab brings together his cross-organizational work in Forced Labor and Human Trafficking with Microsoft Tech for Fundamental Rights, and collaborations with Microsoft on proof-of-human, AI, web3, censorship-resistant security, and privacy-preserving technologies such as zero-knowledge proofs.",
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
        body: "Investigate and prepare data sources for interventions: job postings, online game streams, chat rooms, supply-chain signals.",
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
        body: "We ship working systems, not white papers, and we measure them in real conditions.",
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
    body: "We compose proven infrastructure with frontier capabilities, staying curious about what's new and rigorous about what's reliable.",
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
  clients: {
    label: "Clients",
    heading: "Clients & collaborators.",
    note: "Confirmed · Spring 2025",
    // `logo` is a path under /public (drop real logo files in and set it);
    // empty logo falls back to a monogram. Add real URLs as they're confirmed.
    items: [
      {
        name: "Generative AI for Good",
        about:
          "Uses generative media for human-condition storytelling — making lived experience legible to audiences and decision-makers.",
        url: "",
        logo: "",
      },
      {
        name: "D_ID",
        about:
          "Avatars and digital-human tooling for synthetic media, used to prototype human-condition storytelling.",
        url: "https://www.d-id.com",
        logo: "",
      },
      {
        name: "Mesur.io",
        about:
          "Risk inference in emerging markets, applied to signals of forced labor across supply chains and geographies.",
        url: "https://mesur.io",
        logo: "",
      },
      {
        name: "SupplyTrace",
        about:
          "An open data platform for supply-chain risk inference, surfacing exposure to forced labor and other harms.",
        url: "",
        logo: "",
      },
      {
        name: "Rivr",
        about:
          "Twitch livestreams, keyword tags, and chat-room activity as a real-time data source for detecting at-risk behavior online.",
        url: "",
        logo: "",
      },
      {
        name: "Human Generated by BlockApps",
        about:
          "Verifiable human attestations in the age of AI — proving that a person, not a machine, stands behind a claim.",
        url: "https://blockapps.net",
        logo: "",
      },
    ] as PartnerOrg[],
  },
  summit: {
    label: "Each semester",
    heading:
      "NYU Ethical Tech Summit: collaborator talks, CoLab reviews, and new partnerships.",
  },
  foundingPartners: [
    {
      name: "NYU School of Professional Studies",
      about:
        "The NYU school that houses the Center for Global Affairs and the Ethical Tech CoLab.",
      url: "https://www.sps.nyu.edu",
      logo: "/nyu-sps-cga-logo.jpg",
    },
    {
      name: "Center for Global Affairs (CGA)",
      about:
        "NYU SPS's Center for Global Affairs — the CoLab's academic home, focused on global policy and the human condition.",
      url: "https://www.sps.nyu.edu/homepage/academics/divisions-and-departments/center-for-global-affairs.html",
      logo: "/nyu-sps-cga-logo.jpg",
    },
    {
      name: "Microsoft",
      about:
        "Technology partner across proof-of-human, AI, web3, and privacy-preserving systems such as zero-knowledge proofs.",
      url: "https://www.microsoft.com",
      logo: "/logos/microsoft.svg",
    },
  ] as PartnerOrg[],
  partners: {
    label: "Partners",
    heading: "Partners & supporters.",
    note: "Click a partner to see their logo and details.",
    // Logos auto-load from /public/logos/<slug>.<ext> (see public/logos/README).
    // `about`/`url` left blank until confirmed — the modal shows the logo + name.
    items: [
      { name: "100x", about: "", url: "", logo: "" },
      {
        name: "Apne Aap Women Worldwide",
        about: "",
        url: "https://apneaap.org",
        logo: "",
      },
      { name: "Gaia", about: "", url: "", logo: "" },
      { name: "Grid Bank", about: "", url: "", logo: "" },
    ] as PartnerOrg[],
  },
};

export interface TeamMember {
  initials: string;
  name: string;
  role: string;
  /** Full LinkedIn profile URL. Shown as a link under the name. */
  linkedin?: string;
  /** An external profile/faculty page. Shown as a "Website ↗" link. */
  website?: string;
  org?: string;
  /** Path under /public, e.g. "/team/carolina.jpg". Falls back to initials. */
  photo?: string;
  /** One- or two-sentence bio shown under the name. */
  bio?: string;
  /** Cohort term this researcher belongs to, e.g. "Summer 2026". Defaults to the current cohort. */
  term?: string;
  /** URL slug for this person's /team/[slug] detail page. Omit to keep a card non-clickable (e.g. the founder). */
  slug?: string;
}

/** Cohort terms shown in the researchers dropdown, oldest first. */
export const cohortTerms = ["Spring 2025", "Fall 2025", "Summer 2026"];

export const team = {
  eyebrow: "Team",
  heading: "The people building this.",
  intro:
    "A small, selected team of graduate students working at the intersection of the human condition and emerging technology.",
  founder: {
    initials: "YR",
    name: "Yorke E Rhodes III",
    role: "Founder · Lab Director",
    org: "Microsoft Director of Traceability · Cofounder, Blockchain at Microsoft",
    linkedin: "https://www.linkedin.com/in/yorkerhodes/",
    photo: "/team/yorke.jpg",
    slug: "yorke-rhodes",
    bio: "Professor Yorke Rhodes is the Microsoft Director of Traceability, Cofounder of Blockchain at Microsoft, and Cofounder of the NYU Ethical Tech CoLab. A visionary technologist and strategic leader at the intersection of blockchain innovation, artificial intelligence, and ethical systems design. As Director of Traceability, he drives transformative initiatives that enhance traceability, transparency, and trust across global ecosystems. Yorke's work spans enterprise architecture, compliance frameworks, and humanitarian tech, with a focus on applying emerging technologies to real-world challenges, from forced labor mitigation to responsible AI deployment. He is also an educator and speaker, shaping the next generation of ethical technologists through hands-on learning and thought leadership.",
  } as TeamMember,
  advisorsLabel: "Advisors",
  advisors: [
    {
      initials: "TC",
      name: "Teresa Cantero",
      role: "Advisor · Civilian Protection & IHL",
      org: "PhD Candidate, UC3M · Adjunct Professor, IE University",
      linkedin: "https://www.linkedin.com/in/teresacantero/",
      photo: "/team/teresa.jpg",
      slug: "teresa-cantero",
      bio: "Teresa Cantero is a PhD Candidate at Universidad Carlos III de Madrid, where her doctoral research is based at the Human Rights Institute “Gregorio Peces-Barba.” She is also an Adjunct Professor at IE University and a Visiting Scholar at NYU's Center for Global Affairs, and she holds an M.S. in Global Affairs from New York University. Earlier in her career she worked at Human Rights Watch in Washington, DC, and in journalism and editing.\n\nHer doctoral research examines how artificial intelligence can and should be used to enhance the protection and evacuation of civilians during armed conflict — and how such tools support or challenge existing obligations under International Humanitarian Law (IHL). The work is deliberately multidisciplinary, bridging technical AI capabilities, IHL and legal obligations, and humanitarian operational practice, and draws on evacuation case studies from Srebrenica (1995) to the siege of Mariupol (2022).\n\nAt the Ethical Tech CoLab she advises on civilian protection, forced displacement, and the responsible use of AI for the human condition — work that sits directly alongside the lab's research on evacuation, migration, and internally displaced people.",
    },
    {
      initials: "SM",
      name: "Sylvia G. Maier",
      role: "Advisor · Principal Investigator, Refugee Project",
      org: "Clinical Professor, NYU SPS Center for Global Affairs",
      website:
        "https://www.sps.nyu.edu/faculty-directory/12308-sylvia-g-maier.html",
      photo: "/team/sylvia.jpg",
      slug: "sylvia-maier",
      bio: "Dr. Sylvia G. Maier is a Clinical Professor at NYU's Center for Global Affairs (SPS), where she serves as Academic Director of the MS in Global Affairs concentration in Global Gender Studies. She holds a PhD in Political Science and an MA from the University of Southern California.\n\nHer research and teaching center on women's rights and gender equality, LGBT rights, and gender-inclusive urban planning and design, with fieldwork spanning Western Europe, Latin America, the UAE and the GCC, Iraqi Kurdistan, and Afghanistan. She has examined the politics of gendered integration and multiculturalism in Western Europe, including legal responses to honor-based violence against women. She is co-founder and deputy editor-in-chief of Women Across Frontiers, has served as VP and Director of Education Programs for The Peace Project, and previously chaired the SPS Faculty Council.\n\nAt the Ethical Tech CoLab she is Principal Investigator (PI) for the refugee project, guiding its research on displacement and the human condition.",
    },
  ] as TeamMember[],
  residentFellowsLabel: "Staff",
  residentFellows: [
    {
      initials: "AD",
      name: "Alex Du",
      role: "Marketing & Community Lead",
      linkedin: "https://www.linkedin.com/in/alexandra-x-du/",
      photo: "/team/alex.jpg",
      slug: "alex-du",
    },
    {
      initials: "CM",
      name: "Carolina de Almeida Pernambuco Moron",
      role: "Grant Assistant",
      linkedin: "https://www.linkedin.com/in/carolina-pernambuco-moron/",
      photo: "/team/carolina.jpg",
      slug: "carolina-moron",
    },
  ] as TeamMember[],
  researchersLabel: "The Cohort",
  researchersCount: "7 researchers",
  researchers: [
    {
      initials: "CM",
      name: "Carolina de Almeida Pernambuco Moron",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/carolina-pernambuco-moron/",
      photo: "/team/carolina.jpg",
      slug: "carolina-moron",
      bio: "Carolina is a graduate student at NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis and the United Nations. Highlights in her professional experience include cross-sector project and partnership management, writing English, Portuguese, and Spanish risk reports in consultancy, and redesigning strategic planning for non-profits.\n\nShe has various field experiences under diverse environments. In 2018 and 2019, Carolina lived in Nairobi, Kenya, working at a grassroots organization called Mama Africa, where she managed micro financing of 30 women entrepreneurs and led a business workshop with techniques to solve social issues. More recently, she has been working to co-develop the MVDC project, the first AI voice-based system to improve early-warning systems embedded in a human-centered approach for data governance, ethically sourced data, and bias mitigation. While she was on the ground in Malawi, she established partnerships with the government, academia, civil society, and private sector.",
    },
    {
      initials: "CL",
      name: "Christine Lumen",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      // linkedin: "",
      photo: "/team/christine.jpg",
      slug: "christine-lumen",
      bio: "Christine Lumen studies the gap between how AI systems are governed on paper and how accountability actually functions in practice. Her work combines NLP, sentiment analysis, and spatial methods to measure where governance frameworks succeed or fail in real-world, often high-stakes settings: humanitarian crises, multilingual populations, and public perception of AI.\n\nHer research includes ForesightHub, a deployed early-warning pipeline for conflict and displacement signals, which she has presented at United Nations headquarters on two occasions. Other work includes a study of AI regulatory frameworks across the US, EU, and China, and research on consumer trust in autonomous vehicles. She has published in International Journal of Organizational Analysis (Emerald) and Journal of Advanced Artificial Intelligence, and will present her NLP and LLM research at an AI conference in Paris. She has also collaborated with Yale University on agricultural policy research.\n\nShe is currently pursuing an MS in Management of Technology at NYU Tandon School of Engineering, following degrees in data analytics (NYU), computer science (Miami Dade College), and international law and relations (Tallinn University of Technology).\n\nOriginally from Estonia, Christine has since lived in 12 countries, including Singapore, Australia, and Canada, and founded the nonprofit EducationX MTÜ, which raised over €100,000 to fund educational access and content in Ukraine.",
    },
    {
      initials: "AR",
      name: "Alana Robertson",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/alana-robertson-55a3b4256/",
      photo: "/team/alana.jpg",
      slug: "alana-robertson",
      bio: "Alana is currently completing her Master's at NYU Center for Global Affairs in Human Rights and International Law. She earned her undergraduate degree from the University of Edinburgh with Politics (MA). She is particularly interested in gender and sexuality issues, international humanitarian law, and the introduction of AI into the humanitarian sector.\n\nBefore joining NYU, Alana worked at the Legal Resources Centre, the oldest public interest law firm in South Africa, where she conducted extensive legal research and drafted memoranda on international human rights law spanning numerous focus areas, including anti-homosexuality legislation and sex worker rights. She co-authored an article for the Sur International Journal of Human Rights examining Big Tech's role in fuelling far-right extremism in the Global South, and contributed to two UN submissions on the impact of disinformation on the realisation of human rights in South Africa. She also prepared in-depth country of origin research to support the claims of asylum seeker clients.\n\nAlana has further legal experience in London, having worked at Peters and Peters Solicitors, where she supported casework on complex matters including a high-profile tax investigation, and most recently at Cape Law Chambers, where she gained exposure to barrister work during a multi-day arbitration involving a R25 million loan dispute.",
    },
    {
      initials: "MM",
      name: "Melanie MacKew",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/melanie-mackew",
      photo: "/team/melanie.jpg",
      slug: "melanie-mackew",
      bio: "Melanie is currently working to complete her M.S. in Global Affairs at NYU. Melanie earned her B.A. in Global and International Studies from Western Michigan University in 2021. She is particularly interested in forced migration and refugee integration. Her prior work experience includes facilitating an art program for children in Moria Refugee Camp, working with unaccompanied refugee minors in Michigan, and serving as a community liaison for a refugee employment program. Apart from school and work, Melanie has been a part of the board of a nonprofit concerned with refugee integration in Michigan and volunteered with the Literacy Center of West Michigan, where she worked with an English-learner to improve his literacy skills.",
    },
    {
      initials: "CR",
      name: "Carlos D. Ruiz",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/carlos-d-ruiz-b4b26a197/",
      photo: "/team/carlos.jpg",
      slug: "carlos-ruiz",
      bio: "Carlos D. Ruiz is a Venezuelan-born U.S. Air Force veteran who holds a Master of Science in Global Affairs with a concentration in Global Economy from New York University and a Bachelor of Arts in Economics from Fordham University.",
    },
    {
      initials: "IC",
      name: "India Clarke",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/indiaaclarke",
      photo: "/team/india.jpg",
      slug: "india-clarke",
      bio: "India is a graduate student NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis. She holds a Bachelor of Arts in International Relations and Political Science from Boston University.\n\nHer professional experience includes an internship at Talis Capital in London, where she conducted due diligence and ESG analysis on early stage startups across fintech, healthtech and consumer sectors. Earlier this year, she served as a graduate consultant to the Strong Cities Network, which included conducting interdisciplinary research on violent extremism prevention, and producing a guide for practitioners and policymakers on how law enforcement and mental health professionals can collaborate in secondary violence prevention.",
    },
    {
      initials: "YR",
      name: "Yago Rocha",
      role: "Applied AI Graduate Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/yagodrocha/",
      photo: "/team/yago.jpg",
      slug: "yago-rocha",
      bio: "Yago is a graduate student at NYU's Center for Global Affairs, concentrating in International Development and Humanitarian Assistance. His professional background spans both the private and international development sectors, with experience in project management, stakeholder engagement, strategic planning, and data-driven decision-making.\n\nBefore joining NYU, Yago held leadership positions in Brazil's financial sector, where he managed investment portfolios, led commercial teams, and developed strategic solutions for clients and organizations. His interest in global development led him to transition into the humanitarian field, gaining field experience in Dzaleka Refugee Camp, Malawi, where he supported initiatives focused on refugee livelihoods and financial inclusion.\n\nYago has also contributed to United Nations initiatives as a UN Volunteer and currently serves as an intern at the United Nations Development Programme (UNDP) in New York. His work and research focus on humanitarian assistance, refugee economic inclusion, international development, and the use of data and technology to support evidence-based policymaking and strengthen cross-sector collaboration. He is particularly interested in how artificial intelligence and innovative digital solutions can improve humanitarian response and sustainable development outcomes.",
    },
    {
      initials: "AS",
      name: "Alexa Shamie",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/alexa.jpeg",
      slug: "alexa-shamie",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort.",
    },
    {
      initials: "MT",
      name: "Mohagani Townsend",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/mohagani.jpg",
      slug: "mohagani-townsend",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort.",
    },
    {
      initials: "AL",
      name: "Amanda Lindsey",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/amanda.jpg",
      slug: "amanda-lindsey",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort. Built the Forced Labor Structural Risk Index.",
    },
    {
      initials: "TB",
      name: "Taylor Badt",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/taylor.jpg",
      slug: "taylor-badt",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort.",
    },
    {
      initials: "VJ",
      name: "Vedant Jain",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/vedant.png",
      slug: "vedant-jain",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort.",
    },
    {
      initials: "GD",
      name: "Grace Driscoll",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/grace.jpg",
      slug: "grace-driscoll",
      bio: "NYU student and Applied AI Graduate Researcher in the Ethical Tech CoLab's Fall 2025 cohort.",
    },
    {
      initials: "SS",
      name: "Smita Samanta",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/smita.jpg",
      slug: "smita-samanta",
      bio: "Smita Samanta is an MS in Global Affairs '25 (Global Economy) from New Delhi, India. In the Spring 2025 cohort she worked on Online Grooming Prevention, and her interests span venture capital, climate tech, AI, and emerging markets.",
    },
    {
      initials: "EM",
      name: "Elizabeth Matthews",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/elizabeth.jpg",
      slug: "elizabeth-matthews",
      bio: "Elizabeth Matthews is an MS in Global Affairs '25 (International Relations) from Omaha, Nebraska. In the Spring 2025 cohort she led the AI's Carbon Footprint research paper and contributed to Online Grooming Prevention, focused on ethical technology policy and digital development.",
    },
    {
      initials: "RG",
      name: "Renata Gladkikh",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/renata.jpg",
      slug: "renata-gladkikh",
      bio: "Renata Gladkikh is an MS in Global Affairs '25 (Global Economy) from Dubai, UAE. In the Spring 2025 cohort she led the AI's Carbon Footprint paper and contributed to ESG Labels & Certificates Transparency, focusing on ESG, sustainability, and the energy transition.",
    },
    {
      initials: "JH",
      name: "Jennifer Hofmann",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/jennifer.jpg",
      slug: "jennifer-hofmann",
      bio: "Jennifer Hofmann is an MS in Global Affairs '26 (Global Economy) from Marburg, Germany. In the Spring 2025 cohort she led the Online Grooming Prevention project, with interests in policy, public relations, and the global economy.",
    },
    {
      initials: "EH",
      name: "Emily Harrington",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/emily.jpg",
      slug: "emily-harrington",
      bio: "Emily Harrington is an MS in Global Security, Conflict, and Cybercrime '25 from Rockville, MD. In the Spring 2025 cohort she contributed to Online Grooming Prevention and ESG Labels & Certificates Transparency, focused on national security, cyber threat intelligence, and OSINT.",
    },
    {
      initials: "NN",
      name: "Natasha Nagarajan",
      role: "Applied AI Graduate Researcher",
      term: "Spring 2025",
      photo: "/team/natasha.jpg",
      slug: "natasha-nagarajan",
      bio: "Natasha Nagarajan is an MS in Global Security, Conflict, and Cybercrime '25 from Atlanta, Georgia. In the Spring 2025 cohort she contributed to Online Grooming Prevention, with interests in intelligence, space policy, and responsible innovation.",
    },
    {
      initials: "HZ",
      name: "Hannah Zhao",
      role: "3D Creative Designer",
      term: "Spring 2025",
      org: "Ethical Tech CoLab",
      photo: "/team/hannah.jpg",
      slug: "hannah-zhao",
    },
    {
      initials: "KC",
      name: "Kirsten Co",
      role: "Strategic Advisor",
      term: "Spring 2025",
      org: "Ethical Tech CoLab",
      linkedin: "https://www.linkedin.com/in/kirsten-co/",
      photo: "/team/kirsten.jpeg",
      slug: "kirsten-co",
    },
    {
      initials: "AD",
      name: "Alex Du",
      role: "Marketing & Community Lead",
      term: "Spring 2025",
      linkedin: "https://www.linkedin.com/in/alexandra-x-du/",
      photo: "/team/alex.jpg",
      slug: "alex-du",
    },
  ] as TeamMember[],
  collaboratorsLabel: "Other Members",
  collaborators: [
    {
      initials: "AD",
      name: "Adeline Daab",
      role: "Collaborator",
      org: "NYU Gallatin",
      // linkedin: "", // TODO: Adeline Daab LinkedIn URL
      slug: "adeline-daab",
    },
    {
      initials: "SD",
      name: "Susan deMenil",
      role: "Collaborator",
      org: "AABC",
      // linkedin: "", // TODO: Susan deMenil LinkedIn URL
      slug: "susan-deminil",
    },
  ] as TeamMember[],
};
