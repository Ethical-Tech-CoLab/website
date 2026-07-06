/**
 * All site copy lives here so pages stay presentational. Mirrors the structure
 * of the Ethical Tech CoLab site (NYU CGA × Microsoft Research).
 */

export const site = {
  name: "Ethical Tech CoLab",
  tagline: "Emerging tech, human condition.",
  linkedin: "https://www.linkedin.com/company/ethical-tech-lab/",
  partnersLine: "NYU SPS · CGA · Microsoft · New York",
  footerBlurb:
    "Exploring intervention opportunities at the intersection of emerging technologies and the human condition.",
  cohortRange: "Four cohorts · 2024-2026",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Cohorts", href: "/cohorts" },
  { label: "About", href: "/about" },
  { label: "Team", href: "/team" },
];

/** A single project that lives under a research question. */
export interface SubProject {
  name: string;
  summary: string;
  status?: string;
  /** Full GitHub repo URL. Renders a "View code" link when present. */
  repo?: string;
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
        name: "Digital Art Passport",
        summary:
          "A digital provenance passport for cultural artifacts that supports repatriation, attribution, and ethical stewardship. Combining verifiable credentials with collaborative cataloguing, it gives institutions, source communities, and researchers a shared record of an object's life across borders.",
        status: "Active",
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
      "Online Grooming Prevention: repurposing existing tech for online safety",
      "ESG Labels & Certificates Transparency: standardization for consumer trust",
    ],
    archive: "Full archive coming soon",
  },
  {
    index: "02",
    term: "Fall 2025",
    title: "Prototyping and partner pilots.",
    body: "Technical spikes (multi-agent harnesses, verifiable credentials, geospatial pipelines) tested against real partner needs.",
    items: ["Tech spikes shipped", "Evaluation harnesses", "Partner pilots scoped"],
    archive: "Full archive coming soon",
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
    "The NYU Center for Global Affairs launched the Ethical Tech CoLab to focus on interventions in the human condition using emerging technologies, through interdisciplinary applied research that draws on students, faculty, and partners from across NYU and industry.",
  mission: {
    label: "Mission",
    heading:
      "Explore intervention opportunities at the intersection of emerging technologies and the human condition.",
    body: "We translate frontier research into simulations that institutions and communities can actually use, moving from speculative possibilities to deployable interventions on migration, forced labor, and the rights of displaced people.",
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
  collaborators: {
    label: "Collaborators",
    heading: "Confirmed collaborators.",
    confirmedLabel: "Confirmed · Spring 2025",
    confirmed: [
      "Generative AI for Good: Avatars for human-condition storytelling",
      "D_ID: Avatars tooling",
      "Mesur.io: Risk inference in emerging markets on forced labor",
      "SupplyTrace: Open data platform for risk inference",
      "Rivr.com: Twitch livestreams, keyword tags, chat-room data source",
      "Human Generated by BlockApps: Verifiable human attestations in the age of AI",
    ],
  },
  summit: {
    label: "Each semester",
    heading:
      "NYU Ethical Tech Summit: collaborator talks, CoLab reviews, and new partnerships.",
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
  /** Full LinkedIn profile URL. Shown as a link under the name. */
  linkedin?: string;
  org?: string;
  /** Path under /public, e.g. "/team/carolina.jpg". Falls back to initials. */
  photo?: string;
  /** One- or two-sentence bio shown under the name. */
  bio?: string;
  /** Cohort term this researcher belongs to, e.g. "Summer 2026". Defaults to the current cohort. */
  term?: string;
}

/** Cohort terms shown in the researchers dropdown, oldest first. */
export const cohortTerms = ["Spring 2025", "Fall 2025", "Summer 2026"];

export const team = {
  eyebrow: "Team · Current cohort",
  heading: "The people building this.",
  intro:
    "A small, deliberate team pairing applied AI research with design, policy, and field expertise.",
  founder: {
    initials: "YR",
    name: "Yorke E Rhodes III",
    role: "Founder",
    linkedin: "https://www.linkedin.com/in/yorkerhodes/",
    photo: "/team/yorke.jpg",
    body: "Professor Yorke Rhodes is the Microsoft Director of Traceability, Cofounder of Blockchain at Microsoft, and Cofounder of the NYU Ethical Tech CoLab. A visionary technologist and strategic leader at the intersection of blockchain innovation, artificial intelligence, and ethical systems design. As Director of Traceability, he drives transformative initiatives that enhance traceability, transparency, and trust across global ecosystems. Yorke's work spans enterprise architecture, compliance frameworks, and humanitarian tech, with a focus on applying emerging technologies to real-world challenges, from forced labor mitigation to responsible AI deployment. He is also an educator and speaker, shaping the next generation of ethical technologists through hands-on learning and thought leadership.",
  } as {
    initials: string;
    name: string;
    role: string;
    linkedin?: string;
    body: string;
    photo?: string;
  },
  residentFellowsLabel: "Staff",
  residentFellows: [
    {
      initials: "F1",
      name: "Staff 1",
      role: "Placeholder",
      bio: "Bio coming soon.",
    },
    {
      initials: "F2",
      name: "Staff 2",
      role: "Placeholder",
      bio: "Bio coming soon.",
    },
  ] as TeamMember[],
  researchersLabel: "The cohort.",
  researchersCount: "7 researchers",
  researchers: [
    {
      initials: "CM",
      name: "Carolina de Almeida Pernambuco Moron",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/carolina-pernambuco-moron/",
      photo: "/team/carolina.jpg",
      bio: "Carolina is a graduate student at NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis and the United Nations. Highlights in her professional experience include cross-sector project and partnership management, writing English, Portuguese, and Spanish risk reports in consultancy, and redesigning strategic planning for non-profits.\n\nShe has various field experiences under diverse environments. In 2018 and 2019, Carolina lived in Nairobi, Kenya, working at a grassroots organization called Mama Africa, where she managed micro financing of 30 women entrepreneurs and led a business workshop with techniques to solve social issues. More recently, she has been working to co-develop the MVDC project, the first AI voice-based system to improve early-warning systems embedded in a human-centered approach for data governance, ethically sourced data, and bias mitigation. While she was on the ground in Malawi, she established partnerships with the government, academia, civil society, and private sector.",
    },
    {
      initials: "CL",
      name: "Christine Lumen",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      // linkedin: "",
      photo: "/team/christine.jpg",
      bio: "Christine Lumen studies the gap between how AI systems are governed on paper and how accountability actually functions in practice. Her work combines NLP, sentiment analysis, and spatial methods to measure where governance frameworks succeed or fail in real-world, often high-stakes settings: humanitarian crises, multilingual populations, and public perception of AI.\n\nHer research includes ForesightHub, a deployed early-warning pipeline for conflict and displacement signals, which she has presented at United Nations headquarters on two occasions. Other work includes a study of AI regulatory frameworks across the US, EU, and China, and research on consumer trust in autonomous vehicles. She has published in International Journal of Organizational Analysis (Emerald) and Journal of Advanced Artificial Intelligence, and will present her NLP and LLM research at an AI conference in Paris. She has also collaborated with Yale University on agricultural policy research.\n\nShe is currently pursuing an MS in Management of Technology at NYU Tandon School of Engineering, following degrees in data analytics (NYU), computer science (Miami Dade College), and international law and relations (Tallinn University of Technology).\n\nOriginally from Estonia, Christine has since lived in 12 countries, including Singapore, Australia, and Canada, and founded the nonprofit EducationX MTÜ, which raised over €100,000 to fund educational access and content in Ukraine.",
    },
    {
      initials: "AR",
      name: "Alana Robertson",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/alana-robertson-55a3b4256/",
      photo: "/team/alana.jpg",
      bio: "Alana is currently completing her Master's at NYU Center for Global Affairs in Human Rights and International Law. She earned her undergraduate degree from the University of Edinburgh with Politics (MA). She is particularly interested in gender and sexuality issues, international humanitarian law, and the introduction of AI into the humanitarian sector.\n\nBefore joining NYU, Alana worked at the Legal Resources Centre, the oldest public interest law firm in South Africa, where she conducted extensive legal research and drafted memoranda on international human rights law spanning numerous focus areas, including anti-homosexuality legislation and sex worker rights. She co-authored an article for the Sur International Journal of Human Rights examining Big Tech's role in fuelling far-right extremism in the Global South, and contributed to two UN submissions on the impact of disinformation on the realisation of human rights in South Africa. She also prepared in-depth country of origin research to support the claims of asylum seeker clients.\n\nAlana has further legal experience in London, having worked at Peters and Peters Solicitors, where she supported casework on complex matters including a high-profile tax investigation, and most recently at Cape Law Chambers, where she gained exposure to barrister work during a multi-day arbitration involving a R25 million loan dispute.",
    },
    {
      initials: "MM",
      name: "Melanie MacKew",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/melanie-mackew",
      photo: "/team/melanie.jpg",
      bio: "Melanie is currently working to complete her M.S. in Global Affairs at NYU. Melanie earned her B.A. in Global and International Studies from Western Michigan University in 2021. She is particularly interested in forced migration and refugee integration. Her prior work experience includes facilitating an art program for children in Moria Refugee Camp, working with unaccompanied refugee minors in Michigan, and serving as a community liaison for a refugee employment program. Apart from school and work, Melanie has been a part of the board of a nonprofit concerned with refugee integration in Michigan and volunteered with the Literacy Center of West Michigan, where she worked with an English-learner to improve his literacy skills.",
    },
    {
      initials: "CR",
      name: "Carlos D. Ruiz",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/carlos-d-ruiz-b4b26a197/",
      photo: "/team/carlos.jpg",
      bio: "Carlos D. Ruiz is a Venezuelan-born U.S. Air Force veteran who holds a Master of Science in Global Affairs with a concentration in Global Economy from New York University and a Bachelor of Arts in Economics from Fordham University.",
    },
    {
      initials: "IC",
      name: "India Clarke",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/indiaaclarke",
      photo: "/team/india.jpg",
      bio: "India is a graduate student NYU Center for Global Affairs with a concentration in Global Economy and specialization in Data Analysis. She holds a Bachelor of Arts in International Relations and Political Science from Boston University.\n\nHer professional experience includes an internship at Talis Capital in London, where she conducted due diligence and ESG analysis on early stage startups across fintech, healthtech and consumer sectors. Earlier this year, she served as a graduate consultant to the Strong Cities Network, which included conducting interdisciplinary research on violent extremism prevention, and producing a guide for practitioners and policymakers on how law enforcement and mental health professionals can collaborate in secondary violence prevention.",
    },
    {
      initials: "YR",
      name: "Yago Rocha",
      role: "Applied AI Researcher",
      term: "Summer 2026",
      linkedin: "https://www.linkedin.com/in/yagodrocha/",
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
    {
      initials: "M3",
      name: "Member 3",
      role: "Placeholder",
      org: "Ethical Tech CoLab",
    },
  ] as TeamMember[],
};
