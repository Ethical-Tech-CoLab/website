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
      { label: "Media", href: "/media" },
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
  /**
   * Route of this project's written-up report, e.g. "/publications/ercf".
   * Set it where a report exists so the portfolio card can link straight to the
   * reading, rather than making someone find it again on the publications page.
   */
  publication?: string;
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

/**
 * URL fragment for a research area, e.g. "cultural-heritage". The home page
 * links each question card to `/portfolio#<slug>`, and the portfolio explorer
 * opens and scrolls to the matching question.
 */
export const areaSlug = (key: string) =>
  key.toLowerCase().replace(/\s+/g, "-");

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
        name: "Evacuation Inform Index",
        summary:
          "Humanitarian practice tends to treat evacuation as the obvious good, but the journey carries its own risk, and a crisis can be both catastrophic to endure and impossible to escape. This index scores 104 active crises on those two risks separately, drawing on INFORM Severity data, a twelve-factor vulnerability profile, and live conflict reporting, so that the comparison between leaving and staying becomes visible rather than assumed.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/evacuation-inform-index-carolina",
        publication: "/publications/evacuation-inform-index",
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
        publication: "/publications/ercf",
      },
      {
        name: "Evacuation Behavior Simulator",
        summary:
          "An interactive, agent-based model of community evacuation behavior, modeling family clusters, information-seeking, neighbor social influence, and elder and child delays across an UNAWARE → SEEKING → MILLING → EVACUATING → DONE lifecycle.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie",
        publication: "/publications/evacuation-simulation",
      },
      {
        name: "Evacuation Routing Simulator",
        summary:
          "An interactive evacuation simulator that models how routing and assignment choices shape who reaches safety, with shareable scenario state and a built-in explainer walkthrough.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/India-EvacSimulation",
        publication: "/publications/erus",
      },
      {
        name: "Mariupol 2022 — Corridor Severity Model",
        summary:
          "A corridor-severity model reconstructing the 2022 Mariupol evacuation, scoring the risk and viability of humanitarian corridors under siege conditions.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model",
        demo: "https://ethical-tech-colab.github.io/mariupol-evacuation-model/",
        publication: "/publications/mariupol-severity-model",
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
        publication: "/publications/digital-provenance-passport",
      },
      {
        name: "Provenance Search — Provenance Intelligence",
        summary:
          "Looks up an artwork's ownership history across free public sources — Tavily search (restricted to the Met, Getty, INTERPOL, UNESCO, Art Loss Register and more), the Met and Art Institute of Chicago APIs, MoMA, Wikidata, and Europeana — and emits a provenance passport with a confidence score computed by a fixed algorithm, not the AI. Supports text, image upload, and live camera capture for use inside a museum.",
        status: "In development",
        repo: "https://github.com/Ethical-Tech-CoLab/provenance-search",
        publication: "/publications/provenance-search",
      },
      {
        name: "Digital Art Passport (VANGO)",
        summary:
          "A mobile-style digital passport for art experiences: scan a QR code or enter an artwork's code to collect a stamp — a vintage illustration of the piece with the artist, venue, and date. Stamps persist across sessions, with a collector bio and passport number, and a fully multilingual interface (English, French, Italian).",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/VANGO",
        demo: "https://ethical-tech-colab.github.io/VANGO/",
        publication: "/publications/vango",
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
        publication: "/publications/forced-labor-structural-risk-index",
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
          "A multi-party AI negotiation table where each delegation argues from its own confidential 'privileged instructions.' Five crises — Arctic, Central Asia (Fergana Valley), Cyprus, South China Sea, and Iran–US Strait of Hormuz — each with a live-negotiation replay, an interactive analysis dashboard (parties' strategy, proposals, detector hits), and Monte Carlo runs over randomized conditions.",
        status: "Active",
        repo: "https://github.com/Ethical-Tech-CoLab/diplomatic-simulator",
        demo: "https://ethical-tech-colab.github.io/diplomatic-simulator/",
        publication: "/publications/diplomatic-simulator",
      },
    ],
  },
];

/** An academic report / write-up tied to one of the research questions. */
/** Topics shown in the publications filter, in the order the chips render.
 *  A topic groups reports by what they are *for*, which is not always the
 *  research area they came out of: the two AI-practice write-ups sit under
 *  Guidelines because they are advice on doing the work, not findings about a
 *  domain. Every publication must carry one of these. */
export const publicationTopics = [
  // Guidelines lead: they are the how-to material, written for someone
  // arriving without the background, so they are the right first thing for a
  // reader who does not yet know which of the research below they want.
  "Guidelines",
  "Evacuation",
  "Cultural heritage",
  "Traceability",
  "Diplomacy",
  "Sustainability",
  "Disaster response",
];

export interface Publication {
  /** A stable unique key, nothing more. It is no longer shown on the card and
   *  does not set display order — that comes from `publicationTopics` and from
   *  the order entries appear in `items`. */
  index: string;
  area: string;
  /** Filter bucket on the publications page. See `publicationTopics`. */
  topic: string;
  question: string;
  title: string;
  summary: string;
  status: string;
  /** Publication date, e.g. "May 2025". Shown on the card and report page. */
  date?: string;
  /** Link to the published report/PDF. Empty string = placeholder, not yet out. */
  url: string;
  /** Direct PDF, when the report is also distributed as one. Offered as a
   *  second action in the catalogue sheet, next to reading it on the site. */
  pdf?: string;
  /** Repository holding the report's source, when it has its own. */
  repo?: string;
  /**
   * Set on write-ups that live in a private CoLab repo. The card then says so
   * and labels the link honestly, instead of showing "Published" over a link
   * that 404s for everyone outside the org.
   */
  access?: "internal";
}

export const publications = {
  eyebrow: "Publications · Academic reports",
  heading: "The research, written up.",
  intro:
    "Each research question the CoLab takes on is written up as an academic report. Browse the catalogue by topic, pick a title to read what it asks and what it found, then open the report itself. Titles still in preparation are shelved alongside the published ones, so you can see where the work is going.",
  items: [
    {
      index: "01",
      area: "Evacuation",
      topic: "Evacuation",
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
      topic: "Cultural heritage",
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
      topic: "Traceability",
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
      topic: "Diplomacy",
      question: "How can AI help practitioners rehearse high-stakes diplomacy?",
      title:
        "Rehearsing High-Stakes Diplomacy with Culturally Grounded AI Agents",
      summary:
        "A report on AI-mediated environments where negotiators rehearse against agents that model historical context, incentives, and red lines.",
      status: "In preparation",
      url: "https://ethical-tech-colab.github.io/diplomatic-simulator/methodology.html",
    },
    {
      index: "05",
      area: "Sustainability",
      topic: "Sustainability",
      question:
        "How large is AI's environmental footprint — and how can it be reduced?",
      title: "AI's Carbon Footprint: The Environmental Impact of AI",
      summary:
        "A CoLab report on AI's energy use across training and inference, the data-center and hardware toll, and the mitigation strategies, regulations, and policies that could bend the curve.",
      status: "Published",
      date: "May 2025",
      // Internal route (starts with "/") — rendered on-site, see the card logic.
      url: "/publications/ai-carbon-footprint",
    },
    {
      // The Summer 2026 cohort's synthesis report. It leads the Evacuation
      // section because it reads the whole portfolio at once and then carries
      // it past the corridor, so it is the right entry point for a reader who
      // has not met the individual prototypes yet.
      index: "27",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "How can AI inform evacuation decisions, and what happens after?",
      title:
        "After the Corridor: From AI-Informed Evacuation to Digital Public Goods for Refugee Economic Inclusion",
      summary:
        "The Summer 2026 cohort's synthesis report. It reads the five fielded evacuation prototypes and the forced-labour risk index together, states plainly what is validated and what is not, and extends the arc to the camp: the measurement, financial-modeling, and rights infrastructure that can shorten protracted displacement, grounded at Dzaleka Refugee Camp, Malawi. It also names the one thing the lab refuses to build, biometric identity for displaced people, and says why that refusal is itself a public good.",
      status: "Published",
      date: "July 2026",
      // Internal route (starts with "/") — rendered on-site, see the card logic.
      url: "/publications/after-the-corridor",
      pdf: "https://ethical-tech-colab.github.io/after-the-corridor-report/pdf/After-the-Corridor-ETC-Research-Report.pdf",
      repo: "https://github.com/Ethical-Tech-CoLab/after-the-corridor-report",
    },
    {
      index: "07",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "Is leaving actually safer than staying, and how would anyone know?",
      title:
        "The Evacuation Inform Index: Weighing the Risk of Leaving Against the Risk of Staying",
      summary:
        "A plain-language report on a decision support prototype that scores 104 active crises on two risks at once, keeping danger and feasibility deliberately apart so that operational difficulty cannot quietly cancel out a legal obligation. Prepared as masters research at the NYU Center for Global Affairs.",
      status: "Published",
      date: "July 2026",
      // Internal route (starts with "/") — rendered on-site, see the card logic.
      url: "/publications/evacuation-inform-index",
    },
    {
      index: "08",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "How dangerous is it to stay, and is leaving actually possible?",
      title:
        "The Civilian Evacuation Risk Anticipation Index: A Decision-Support Tool for Protecting Civilians During Evacuations in Armed Conflict",
      summary:
        "A plain-language report on a prototype that keeps two questions apart: how dangerous it is for civilians to remain, and whether an organised evacuation is possible at all. Separating them matters legally, because the duty to protect arises from danger, not from operational convenience.",
      status: "Published",
      date: "2026",
      url: "/publications/cerai",
    },
    {
      index: "09",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "What does it actually cost to move a besieged population, and what does staying cost?",
      title:
        "The Evacuation Risk and Cost Framework: Estimating the Human and Financial Cost of Civilian Evacuation in Armed Conflict",
      summary:
        "A report on a framework that scores seven weighted risk dimensions, estimates the cost of evacuating against the cost of staying, and finds the point at which those two curves cross. Calibrated against 31 documented historical operations.",
      status: "Published",
      date: "2026",
      url: "/publications/ercf",
    },
    {
      index: "10",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "How much does poor field information degrade an evacuation decision?",
      title:
        "The Evacuation Readiness and Uncertainty Simulator: Showing How Poor Field Information Degrades Evacuation Decisions",
      summary:
        "A report on a simulator that models what happens when planners act on incomplete intelligence. All data is synthetic and reproducible from a seed, so the mechanism rather than any particular place is what is on display.",
      status: "Published",
      date: "2026",
      url: "/publications/erus",
    },
    {
      index: "11",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "How do information and demographics decide who actually leaves?",
      title:
        "The Evacuation Simulator: An Agent-Based Model of How Civilians Decide to Leave During Armed Conflict",
      summary:
        "A report on an agent-based model of household evacuation behaviour, tracing how warnings spread through a community and how age, mobility, and trust shape who reaches safety and who does not.",
      status: "Published",
      date: "2026",
      url: "/publications/evacuation-simulation",
    },
    {
      index: "12",
      area: "Evacuation",
      topic: "Evacuation",
      question:
        "Could a daily severity measure have shown the danger in Mariupol as it unfolded?",
      title:
        "The Mariupol Corridor Severity Model: A Daily Measure of Civilian Danger During the Siege of Mariupol, March to May 2022",
      summary:
        "A retrospective report scoring 77 days of the siege on a daily severity measure built from open sources. Conduct descriptions are attributed to their sources rather than adjudicated, and contested figures are left contested.",
      status: "Published",
      date: "July 2026",
      url: "/publications/mariupol-severity-model",
    },
    {
      index: "13",
      area: "Cultural heritage",
      topic: "Cultural heritage",
      question:
        "Can an artwork's ownership history be checked automatically, and how far should that be trusted?",
      title:
        "The Digital Provenance Passport: An Automated Assistant for Tracing the Ownership History of Artworks and Cultural Objects",
      summary:
        "A report on an assistant that assembles a provenance timeline, flags looting and valuation risk, and issues a signed record. Candid about how much of the demonstration runs on fixtures rather than live sources.",
      status: "Published",
      date: "July 2026",
      url: "/publications/digital-provenance-passport",
    },
    {
      index: "14",
      area: "Cultural heritage",
      topic: "Cultural heritage",
      question:
        "What can be established about an object's history from free public sources alone?",
      title:
        "Provenance Search: An Automated Ownership-History Check for Artworks and Cultural Objects",
      summary:
        "A report on a tool that queries seven public sources and scores confidence with a fixed, inspectable algorithm, deliberately flagging what cannot be verified rather than filling the gaps.",
      status: "Published",
      date: "July 2026",
      url: "/publications/provenance-search",
    },
    {
      index: "15",
      area: "Cultural heritage",
      topic: "Cultural heritage",
      question:
        "What is worth recording about a visit to a work of art?",
      title:
        "VANGO: A Digital Passport for Recording Visits to Works of Art",
      summary:
        "A report on a digital souvenir passport that records attendance at art experiences. It performs no provenance or authenticity checking, and the report is explicit that nothing it records is evidence of ownership or lawful origin.",
      status: "Published",
      date: "2026",
      url: "/publications/vango",
    },
    {
      index: "16",
      area: "Traceability",
      topic: "Traceability",
      question:
        "Where are the conditions that make forced labour likely, before any case is detected?",
      title:
        "The Forced Labor Structural Risk Index: A Country-Level Measure of the Conditions Under Which Forced Labour Becomes More Likely",
      summary:
        "A report on an index scoring 184 countries across 11 domains and 43 indicators, measuring the conditions that enable forced labour rather than counting cases. Ships with uncertainty bands and is meant to be read in tiers, not as a league table.",
      status: "Published",
      date: "2026",
      url: "/publications/forced-labor-structural-risk-index",
    },
    {
      index: "17",
      area: "Diplomacy",
      topic: "Diplomacy",
      question:
        "Can practitioners rehearse a multi-party negotiation against AI agents?",
      title:
        "The Diplomatic Simulator: A Multi-Party Negotiation Simulator Driven by Artificial Intelligence Agents",
      summary:
        "A report on a simulator in which AI delegations negotiate a live crisis, producing a structured record of positions, concessions, and tactics. Across every Monte Carlo trial run, no comprehensive settlement was reached.",
      status: "Published",
      date: "July 2026",
      url: "/publications/diplomatic-simulator",
    },
    {
      index: "18",
      area: "Disaster response",
      topic: "Disaster response",
      question:
        "How fast can building damage be assessed after a disaster, and with how few labels?",
      title:
        "HASTE: High-speed Assessment and Satellite Tracking for Emergencies",
      summary:
        "A plain-language report on a satellite damage-assessment platform built by the Microsoft AI for Good Lab, used in 31 field deployments. The software is Microsoft's; only this report is the CoLab's.",
      status: "Published",
      date: "2026",
      url: "/publications/haste",
    },
    
    // ── Practice guides ──────────────────────────────────────────────────
    // The CoLab's how-to material, written for people arriving without the
    // background rather than for readers of the research. These live in the
    // Getting-Going and CloudGPU repos, both of which are PRIVATE — hence
    // access: "internal" on each, so the card says so instead of advertising
    // a link that 404s for anyone outside the org. Make those repos public
    // (or transcribe the guides on-site) and these become ordinary entries.
    {
      index: "20",
      area: "Guidelines",
      topic: "Guidelines",
      question: "How does someone with no Git background start contributing?",
      title: "GitHub 101: Getting Started with Git and GitHub",
      summary:
        "A beginner's reference for Git and GitHub from day one — what the two actually are and how they differ, the key concepts, setting up, and the handful of commands that cover almost everything you will do in the first months.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-101.md",
    },
    {
      index: "21",
      area: "Guidelines",
      topic: "Guidelines",
      question: "How does a team actually collaborate in a shared repository?",
      title: "GitHub Workflow: Branching, Pull Requests and Code Review",
      summary:
        "The collaborative loop, step by step: the GitHub flow at a glance, creating and managing branches, opening a pull request that can be reviewed, and what to look for when reviewing someone else's.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-workflow.md",
    },
    {
      index: "22",
      area: "Guidelines",
      topic: "Guidelines",
      question: "How do you put a project on the web without paying for hosting?",
      title: "GitHub Pages 101",
      summary:
        "Publishing a free site straight from a repository, written for first-time users — no server to rent, nothing to install. Includes an honest account of what GitHub Pages can and cannot do, which is where most first attempts come unstuck.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-pages-101.md",
    },
    {
      index: "23",
      area: "Guidelines",
      topic: "Guidelines",
      question:
        "How do you build and test a data product before you have real data?",
      title: "Creating Synthetic Data and Seeding Models: A Beginner's Guide",
      summary:
        "Generating data algorithmically rather than collecting it: why you would (developing before real data exists, forcing edge cases, sharing something realistic without privacy exposure, reproducing a dataset from a seed), and how to do it without fooling yourself about what the results mean.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/synthetic-data/SYNTHETIC_DATA_GUIDE.md",
    },
    {
      index: "24",
      area: "Guidelines",
      topic: "Guidelines",
      question:
        "How do you teach synthetic-data generation to a room of beginners?",
      title: "Synthetic Data: Training Deck",
      summary:
        "The companion training material to the synthetic-data guide — a self-contained walkthrough for running the topic as a session rather than reading it alone.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/synthetic-data/synthetic-data-training.html",
    },
    {
      index: "25",
      area: "Guidelines",
      topic: "Guidelines",
      question:
        "How can an agent do live web research from any runtime, including locked-down ones?",
      title: "tavily-research: A Portable Agent Skill for Live Web Research",
      summary:
        "A cross-agent skill wrapping the Tavily REST API — search, extract, crawl and map — with a dependency-free client in both Python and Node. It calls the API directly, so it still works where a Tavily MCP server cannot be launched, such as under IT policy that blocks local npx.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-Going/tree/main/tavily-research",
    },
    {
      index: "26",
      area: "Guidelines",
      topic: "Guidelines",
      question: "How do you get a terminal on the CoLab's GPU machine?",
      title: "Getting Started on Cloud GPU: SSH Access to the B3IQ Machine",
      summary:
        "One-time setup, about five minutes: installing cloudflared for the secure tunnel, creating an SSH key if you do not have one, and connecting from macOS, Windows or Linux.",
      status: "Internal guide",
      access: "internal",
      url: "https://github.com/Ethical-Tech-CoLab/Getting-started-on-CloudGPU-/blob/main/remote-gpu-how-to-guide.md",
    },
{
      index: "06",
      area: "Research",
      topic: "Guidelines",
      question:
        "How can AI help researchers formulate rigorous research questions?",
      title: "AI-Powered Assistance in Formulating Research Questions",
      summary:
        "A survey of how AI supports researchers across the question-formulation workflow — finding gaps, generating candidate questions, summarizing the state of the art, and flagging contradictions — with guardrails against hallucinated citations and a red-team verification model. Ships with a reusable Copilot 'Researcher' prompt and a journal-credibility rubric.",
      status: "Published",
      date: "October 2025",
      // Internal route (starts with "/") — rendered on-site, see the card logic.
      // The published Google Doc is linked from the report page itself.
      url: "/publications/ai-research-assistant",
    },
{
      index: "19",
      area: "AI systems",
      topic: "Guidelines",
      question:
        "Which AI model should be selected for a task, and on what evidence?",
      title:
        "AI Model Performance: Capabilities, Accuracy, Speed, Energy Use, and Token Economics",
      summary:
        "A comparative review of frontier, open-weight, and efficient model families, separating independently verified measurement from provider marketing. Every figure carries its source, its date, and its evidence grade. Ships with a live cost-per-accepted-task calculator and a validated data layer.",
      status: "Published",
      date: "July 2026",
      // Internal route (starts with "/") — rendered on-site, see the card logic.
      url: "/publications/ai-models-research",
    },
  ] as Publication[],
};

/** A single labelled link (e.g. a live demo). */
export interface DemoLink {
  label: string;
  href: string;
}

/** The Avatar Storytelling demos, shared by the Spring 2025 cohort card, the
 * portfolio archive, and the Live Demos page so they never drift.
 *
 * Demos 1-4 are the D-ID avatar pieces themselves. The impact dashboard is a
 * recorded walkthrough rather than an interactive avatar, so it is labelled for
 * what it is instead of continuing the "Live demo N" numbering — and it is kept
 * last so the first entry, which the poster card uses as the project's primary
 * link, remains an actual avatar piece. */
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
  {
    label: "Impact dashboard walkthrough",
    href: "https://drive.google.com/file/d/1DlPUT1UUuEdgB40p2cHeOjpULopAPIEC/view",
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
  /**
   * Route of this project's written-up report, e.g. "/publications/ercf".
   * Archived work is the most likely to be looked up for its writing rather
   * than its demo, so the report gets a link of its own here too.
   */
  publication?: string;
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
    repo: "https://github.com/Ethical-Tech-CoLab/ai-carbon-footprint",
    demo: "https://ethical-tech-colab.github.io/ai-carbon-footprint/",
    publication: "/publications/ai-carbon-footprint",
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
    publication: "/publications/forced-labor-structural-risk-index",
  },
  {
    name: "AI Research Question Assistant",
    term: "Fall 2025",
    summary:
      "A survey and toolkit for how AI helps researchers formulate rigorous, original research questions — finding gaps, generating candidate questions, summarizing the state of the art, and flagging contradictions, with guardrails against hallucinated citations. Ships with a reusable Copilot 'Researcher' prompt and a journal-credibility rubric.",
    tags: ["LLM", "Research", "Tooling"],
    repo: "https://github.com/Ethical-Tech-CoLab/ai-research-question-assistant",
    demo: "https://ethical-tech-colab.github.io/ai-research-question-assistant/",
    publication: "/publications/ai-research-assistant",
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
  /**
   * Route of this project's written-up report, e.g. "/publications/ercf".
   * The runner links to it under the demo, so someone who has just played
   * with a tool can go straight to the research behind it.
   */
  publication?: string;
  /**
   * Set on entries whose source lives in a private CoLab repo. The poster then
   * reads "CoLab only" instead of "Live", and the runner labels its link as
   * needing sign-in, rather than offering a link that 404s for the public.
   * Mirrors the same field on Publication.
   */
  access?: "internal";
}

/** Subject rails on the Live Demos page, in the order they stack. A theme not
 *  listed here renders no rail, so a product carrying one would vanish from the
 *  catalogue — add the theme here whenever you add the first product using it. */
export const productThemes = [
  "Evacuation",
  "Cultural heritage",
  "Traceability",
  "Early warning",
  "Diplomacy",
  "Research",
  "Storytelling",
];

/** Semesters shown in the Live Demos filter, newest first. */
export const productTerms = ["Summer 2026", "Fall 2025", "Spring 2025"];

export const products: Product[] = [
  {
    name: "Diplomatic Simulator",
    repoName: "diplomatic-simulator",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/diplomatic-simulator",
    demo: "https://ethical-tech-colab.github.io/diplomatic-simulator/live.html",
    demos: [
      {
        label: "Watch a live negotiation",
        href: "https://ethical-tech-colab.github.io/diplomatic-simulator/live.html",
      },
      {
        label: "Interactive dashboard",
        href: "https://ethical-tech-colab.github.io/diplomatic-simulator/dashboard.html",
      },
      {
        label: "Monte Carlo analysis",
        href: "https://ethical-tech-colab.github.io/diplomatic-simulator/montecarlo.html",
      },
      {
        label: "Methodology & AI use",
        href: "https://ethical-tech-colab.github.io/diplomatic-simulator/methodology.html",
      },
    ],
    blurb:
      "A multi-party AI negotiation table where each delegation argues from its own confidential 'privileged instructions.' Five crises — Arctic, Central Asia, Cyprus, South China Sea, and Iran–US Strait of Hormuz — each with a live-negotiation replay, an interactive analysis dashboard (parties' strategy, proposals, detector hits), and Monte Carlo runs over randomized conditions.",
    language: "HTML",
    theme: "Diplomacy",
    featured: true,
    publication: "/publications/diplomatic-simulator",
  },
  {
    name: "AI Models Research",
    repoName: "AI-Models-Research",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/AI-Models-Research",
    demo: "https://ethical-tech-colab.github.io/AI-Models-Research/",
    demos: [
      {
        label: "Read the handbook",
        href: "https://ethical-tech-colab.github.io/AI-Models-Research/",
      },
      {
        label: "Cost-per-accepted-task calculator",
        href: "https://ethical-tech-colab.github.io/AI-Models-Research/interactive/",
      },
    ],
    blurb:
      "A comparative review of frontier, open-weight, and efficient model families across benchmark performance, factual accuracy, latency, token economics, and energy use. Three evidence grades separate independently verified measurement from institutional research and from provider marketing, and every figure names the party that produced it. Ships with a live cost-per-accepted-task calculator over a validated data layer.",
    language: "Python",
    theme: "Research",
    featured: true,
    publication: "/publications/ai-models-research",
  },
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
    name: "Evacuation Inform Index",
    repoName: "evacuation-inform-index-carolina",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/evacuation-inform-index-carolina",
    demo: "https://ethical-tech-colab.github.io/evacuation-inform-index-carolina/",
    blurb:
      "A composite index scoring 104 active crises on the risk of staying and the risk of leaving, side by side, so the comparison between them can be argued with. Built on INFORM Severity data with live news and an ACLED conflict timeline, filterable by crisis type, and with every one of its thirteen legal citations explained — including how far each one is actually justified.",
    language: "HTML",
    theme: "Evacuation",
    featured: true,
    publication: "/publications/evacuation-inform-index",
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
    publication: "/publications/erus",
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
    publication: "/publications/mariupol-severity-model",
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
    publication: "/publications/evacuation-simulation",
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
    publication: "/publications/vango",
  },
  {
    name: "ERCF — Evacuation Risk & Cost Framework",
    repoName: "ercf",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/ercf",
    demo: "https://ercf-production.up.railway.app",
    blurb:
      "A decision-support framework estimating the human and financial cost of civilian evacuation in armed conflict, scoring scenarios across seven risk dimensions and comparing evacuating against staying.",
    language: "Python",
    theme: "Evacuation",
    publication: "/publications/ercf",
  },
  {
    name: "CERAI — Civilian Evacuation Risk Anticipation Index",
    repoName: "CERAI_AR",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/CERAI_AR",
    demo: "https://ethical-tech-colab.github.io/CERAI_AR/",
    blurb:
      "A composite index anticipating civilian risk during evacuation operations, scoring weighted categories — hazards, infrastructure, population vulnerability, information environment, and weather — with Monte Carlo sensitivity analysis, ACLED conflict-event lookup, and source-credibility tagging on every indicator, so evacuation-risk reasoning stays auditable for IHL compliance review. Built by Alana Robertson in the Summer 2026 cohort, on Teresa Cantero's doctoral research into AI and the protection and evacuation of civilians under IHL.",
    language: "HTML",
    theme: "Evacuation",
    publication: "/publications/cerai",
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
    publication: "/publications/digital-provenance-passport",
  },
  {
    name: "Provenance Search — Arts & Artifacts",
    repoName: "provenance-search",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/provenance-search",
    // The Pages URL is a meta-refresh stub pointing here. Framing the stub
    // would redirect inside the iframe, so link the app the redirect lands on.
    demo: "https://provenance-search-production.up.railway.app",
    blurb:
      "Traces the ownership chain of an artwork across museum collections, cultural archives and loss registries, then issues a provenance passport carrying a rule-based confidence score you can inspect rather than a verdict you have to trust. Seven sources checked, three ways to search, no sign-up.",
    language: "HTML",
    theme: "Cultural heritage",
    publication: "/publications/provenance-search",
  },
  {
    name: "Digital Passport for Artworks",
    repoName: "digital-passport-artworks",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/digital-passport-artworks",
    demo: "https://ethical-tech-colab.github.io/digital-passport-artworks/",
    blurb:
      "Upload one photograph and watch the whole chain run in order: fingerprint the image, search for a prior record, score it for forgery risk, and only once it clears — or a reviewer overrides — sign and issue the passport. Real ECDSA cryptography, entirely in the browser. Originally by Christine Lumen.",
    language: "HTML",
    theme: "Cultural heritage",
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
    publication: "/publications/forced-labor-structural-risk-index",
  },
  {
    name: "AI Research Question Assistant",
    repoName: "ai-research-question-assistant",
    term: "Fall 2025",
    repo: "https://github.com/Ethical-Tech-CoLab/ai-research-question-assistant",
    demo: "https://ethical-tech-colab.github.io/ai-research-question-assistant/",
    blurb:
      "A survey and toolkit for how AI helps researchers move from a broad interest to a well-formed research question — finding gaps, generating candidate questions, summarizing the state of the art, and flagging contradictions, with guardrails against hallucinated citations. Ships with a reusable Copilot 'Researcher' prompt and a journal-credibility rubric. Built by the Fall 2025 cohort.",
    language: "HTML",
    theme: "Research",
    publication: "/publications/ai-research-assistant",
  },
  {
    name: "AI's Carbon Footprint",
    repoName: "ai-carbon-footprint",
    term: "Spring 2025",
    repo: "https://github.com/Ethical-Tech-CoLab/ai-carbon-footprint",
    demo: "https://ethical-tech-colab.github.io/ai-carbon-footprint/",
    blurb:
      "A report on what artificial intelligence costs the environment: energy drawn across training and inference, the data-center and hardware toll behind it, and the mitigations, regulations and policies that could bend the curve. 1,287 MWh went into training GPT-3 alone — roughly what 130 US households use in a year.",
    language: "HTML",
    theme: "Research",
    publication: "/publications/ai-carbon-footprint",
  },

  // ── Practice guides ──────────────────────────────────────────────────
  // The CoLab's how-to material, alongside the research on the Research
  // rail. These are documents rather than running demos, so the poster is
  // the guide itself rendered, and each is marked access: "internal"
  // because both source repos are private: the poster reads "CoLab only"
  // and the link says sign-in is needed rather than 404ing the public.
  // Same seven entries appear under Guidelines on the publications page.
  {
    name: "GitHub 101",
    repoName: "github-101",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-101.md",
    blurb:
      "A beginner's reference for Git and GitHub from day one: what the two actually are and how they differ, the key concepts, setting up, and the handful of commands that cover almost everything you will do in the first months.",
    language: "Markdown",
    theme: "Research",
  },
  {
    name: "GitHub Workflow",
    repoName: "github-workflow",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-workflow.md",
    blurb:
      "The collaborative loop, step by step: the GitHub flow at a glance, creating and managing branches, opening a pull request that can actually be reviewed, and what to look for when reviewing someone else's.",
    language: "Markdown",
    theme: "Research",
  },
  {
    name: "GitHub Pages 101",
    repoName: "github-pages-101",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/docs/github-pages-101.md",
    blurb:
      "Publishing a free site straight from a repository, for first-time users — no server to rent, nothing to install. Includes an honest account of what GitHub Pages can and cannot do, which is where most first attempts come unstuck.",
    language: "Markdown",
    theme: "Research",
  },
  {
    name: "Synthetic Data Guide",
    repoName: "synthetic-data-guide",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/synthetic-data/SYNTHETIC_DATA_GUIDE.md",
    blurb:
      "Generating data algorithmically rather than collecting it: why you would — developing before real data exists, forcing edge cases, sharing something realistic without privacy exposure, reproducing a dataset from a seed — and how to do it without fooling yourself about what the results mean.",
    language: "Markdown",
    theme: "Research",
  },
  {
    name: "Synthetic Data — Training Deck",
    repoName: "synthetic-data-training",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/blob/main/synthetic-data/synthetic-data-training.html",
    blurb:
      "The companion training material to the synthetic-data guide — a self-contained walkthrough for running the topic as a session rather than reading it alone.",
    language: "HTML",
    theme: "Research",
  },
  {
    name: "tavily-research",
    repoName: "tavily-research",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-Going/tree/main/tavily-research",
    blurb:
      "A cross-agent skill wrapping the Tavily REST API — search, extract, crawl and map — with a dependency-free client in both Python and Node. It calls the API directly, so it still works where a Tavily MCP server cannot be launched, such as under IT policy that blocks local npx.",
    language: "Python · Node",
    theme: "Research",
  },
  {
    name: "Getting Started on Cloud GPU",
    repoName: "cloud-gpu-guide",
    term: "Summer 2026",
    access: "internal",
    repo: "https://github.com/Ethical-Tech-CoLab/Getting-started-on-CloudGPU-/blob/main/remote-gpu-how-to-guide.md",
    blurb:
      "Getting a terminal on the CoLab's B3IQ machine over SSH. One-time setup, about five minutes: installing cloudflared for the secure tunnel, creating an SSH key if you do not have one, and connecting from macOS, Windows or Linux.",
    language: "Markdown",
    theme: "Research",
  },
  {
    name: "War Games",
    repoName: "War-Games",
    term: "Summer 2026",
    repo: "https://github.com/Ethical-Tech-CoLab/War-Games",
    demo: "https://ethical-tech-colab.github.io/War-Games/",
    blurb:
      "A terminal thriller in the shape of WarGames (1983), reframed around a modern AI agent: the only winning move is to understand the machine. Ships with a Monte Carlo simulation harness and a written case study behind the fiction.",
    language: "JavaScript",
    theme: "Diplomacy",
  },
  {
    name: "Malawi Prevention Platform (MVDC)",
    repoName: "MVDC",
    term: "Summer 2026",
    repo: "https://github.com/carolina-moron/MVDC",
    demo: "https://hilarious-llama-c8e989.netlify.app",
    blurb:
      "Gathers publicly reported conflict and human-rights incidents across Malawi, classifies each against a rights-based taxonomy, traces it to a likely root cause, and matches it to the Malawian organisation best placed to respond. 258 incidents across 26 of 28 districts, with 46 response actors. The working half of the Malawi Voice Data Commons, which aims to let someone report by voice, in Chichewa, from a basic phone.",
    language: "TypeScript",
    theme: "Early warning",
    access: "internal",
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
      "8 researchers",
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
      "7 researchers",
      "Forced Labor Structural Risk Index",
      "AI Research Question Assistant",
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
      "Evacuation Inform Index",
      "Digital Art Passport",
      "Ethical Supply Chain & Traceability",
      "Diplomatic Simulator",
      "AI Models Research",
      {
        label: "Publications",
        links: [
          {
            label: "After the Corridor — synthesis report",
            href: "/publications/after-the-corridor",
          },
          { label: "All publications", href: "/publications" },
        ],
      },
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
      {
        name: "OSCE / ODIHR Anti-Trafficking",
        about:
          "Multilateral partner on anti-trafficking, platform safety, and human rights — a recurring voice at the Ethical Tech Summit.",
        url: "https://www.osce.org/odihr",
        logo: "",
      },
      {
        name: "UN Commission on the Status of Women (CSW)",
        about:
          "Community-of-practice partner on human rights and platform safety, engaged through the Ethical Tech Summit.",
        url: "",
        logo: "",
      },
      {
        name: "Coinbase & x402 Foundation",
        about:
          "Industry partners on agentic commerce and micropayment rails (x402), engaged through the Ethical Tech Summit.",
        url: "https://www.x402.org",
        logo: "",
      },
    ] as PartnerOrg[],
  },
};

/** Ethical Tech Summit — media, past events, and moments (Portfolio › Media). */
export const media = {
  eyebrow: "Media · Ethical Tech Summit",
  heading: "The Summit, in the room.",
  intro:
    "The Ethical Tech Summit is the public-facing capstone of the graduate course Harnessing Emerging Technology in Ethical Sourcing at the NYU SPS Center for Global Affairs. Each semester the Ethical Tech CoLab convenes students, technologists, and policy practitioners for a Summit and Hackathon on the live boundary between emerging technology and global affairs.",
  threads:
    "Recurring threads: agentic systems and the future of work; verifiable supply chains under UFLPA / NDAA; online grooming and platform safety; forced labor and human trafficking; and micropayment rails for vulnerable populations and creator economies.",
  pastSummits: [
    { term: "Spring 2026 · NYC", title: "Agentic Commerce & the Human Condition", blurb: "Student-led applied work on x402, agent-to-agent micropayments, and downstream effects on vulnerable populations and creator economies. Industry roundtable on responsible deployment.", tags: ["x402", "Agentic Commerce"] },
    { term: "Fall 2025 · NYC", title: "Verifiable Supply Chains: From Compliance to Trust", blurb: "UFLPA / NDAA practitioner panel; demos of attestation patterns over the Supplychain Graph; student briefs on traceability gaps in critical-mineral pathways.", tags: ["UFLPA", "Traceability"] },
    { term: "Spring 2025 · NYC", title: "Online Grooming, Platform Safety & Policy", blurb: "Joint session with multilateral and civil-society partners; student demos on detection patterns and trauma-informed design; closing panel on platform accountability.", tags: ["Platform Safety", "OSCE/ODIHR"] },
    { term: "Fall 2024 · NYC", title: "Forced Labor, Structural Risk & Applied Research", blurb: "Launch of student-led applied-research projects on forced-labor structural risk; introduction of the Forced Labor Structural Risk Index methodology.", tags: ["Human Rights", "FLSRI"] },
    { term: "Spring 2024 · NYC", title: "Inaugural Summit, Emerging Tech & Ethical Sourcing", blurb: "First convening of the Ethical Tech CoLab; framing session on how engineering practice can inform sourcing policy, and how policy can inform engineering boundaries.", tags: ["Inaugural", "Curriculum"] },
  ],
  gallery: [
    { src: "/summit/speaker-amanda-lindsey.jpg", caption: "Speaker · Amanda Lindsey" },
    { src: "/summit/speaker-deborah-berebichez.jpg", caption: "Speaker · Deborah Berebichez" },
    { src: "/summit/speaker-ruchira-gupta.jpg", caption: "Speaker · Ruchira Gupta" },
    { src: "/summit/ai-researcher.jpg", caption: "AI Researcher track" },
    { src: "/summit/summit-floor.jpg", caption: "Summit floor" },
    { src: "/summit/working-session.jpg", caption: "Working session" },
    { src: "/summit/panel.jpg", caption: "Panel discussion" },
    { src: "/summit/student-demo.jpg", caption: "Student demo" },
    { src: "/summit/hackathon.jpg", caption: "Hackathon" },
    { src: "/summit/convening.jpg", caption: "Convening" },
    { src: "/summit/moment-1.jpg", caption: "Summit moment" },
    { src: "/summit/moment-2.jpg", caption: "Summit moment" },
  ],
  cambridge:
    "A next step is a Belfer-co-hosted edition scoped around one of three themes — critical supply chains, agentic governance, or AI-mediated diplomacy — producing a structured recommendations memo and a published convening summary.",
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
    "A small, selected team of graduate students working at the intersection of the human condition and emerging technology. Alongside them, faculty advisors, industry partners, and collaborators mentor, guide, and build the work together.",
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
    },
    {
      initials: "MT",
      name: "Mohagani Townsend",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/mohagani.jpg",
      slug: "mohagani-townsend",
    },
    {
      initials: "AL",
      name: "Amanda Lindsey",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/amanda.jpg",
      slug: "amanda-lindsey",
    },
    {
      initials: "TB",
      name: "Taylor Badt",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/taylor.jpg",
      slug: "taylor-badt",
    },
    {
      initials: "VJ",
      name: "Vedant Jain",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/vedant.png",
      slug: "vedant-jain",
    },
    {
      initials: "GD",
      name: "Grace Driscoll",
      role: "Applied AI Graduate Researcher",
      term: "Fall 2025",
      photo: "/team/grace.jpg",
      slug: "grace-driscoll",
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
      bio: "Artist and engineer. She uses multi-media installations and infrastructures to highlight and explore human conditions and interaction immersion.",
    },
    {
      initials: "KC",
      name: "Kirsten Co",
      role: "Strategic Advisor",
      term: "Fall 2025",
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
      org: "AABC Co-Founder · Cultural Heritage Thought Leader",
      // linkedin: "", // TODO: Susan deMenil LinkedIn URL
      photo: "/team/susan.jpg",
      slug: "susan-deminil",
      bio: "Susan de Menil is currently the founding co-president of the Art, Antiquities, and Blockchain Consortium (AABC), a nonprofit 501(c)3 that uses blockchain-based infrastructure to guide the future of cultural heritage repatriation. Since 1991, Susan has worked as the director of marketing, administration, and interior design for Francois de Menil, Architect, P.C. From 1999-2012, she served as the president and executive director of the Byzantine Fresco Foundation, the nonprofit organization that oversaw the acquisition, conservation, exhibition, stewardship, and return of frescoes that had been taken from the Church at Lysi in Cyprus. During that time, de Menil conducted in-depth ethnographic interviews with the many stakeholders in a complex international negotiation over the frescoes. Susan is the director of the forthcoming documentary on this project, 38 Pieces.\n\nIn her research and curatorial work, de Menil co-curated Angels & Franciscans: Innovative Architecture from Los Angeles and San Francisco, an exhibition which was awarded Best Architecture show by the International Association of Art Critics. The catalogue (with Bill Lacey) was published by Rizzoli. She is also co-editor of the book Sanctuary: The Spirit In/Of Architecture based on a symposium at the Menil Collection organized in conjunction with the exhibition Sanctuaries: The Last Works of John Hejduk.",
    },
  ] as TeamMember[],
};
