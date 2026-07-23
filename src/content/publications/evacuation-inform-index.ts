// ─────────────────────────────────────────────────────────────────────────
// "The Evacuation Inform Index" — plain-language research report on the EII
// prototype, transcribed from EII-Paper.md in the evacuation-inform-index
// repository. Rendered by
// src/app/publications/evacuation-inform-index/page.tsx. Kept here so the
// page stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is either plain prose, or prose introduced by a bold lead-in
 *  (used for the labelled limitation entries). */
export type Paragraph = string | { lead: string; text: string };

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  paragraphs: Paragraph[];
}

export interface Citation {
  ref: string;
  url?: string;
}

export const evacuationIndexReport = {
  eyebrow: "Publications · Academic report",
  title: "The Evacuation Inform Index",
  subtitle:
    "Weighing the Risk of Leaving Against the Risk of Staying",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "Carolina Morón. Prepared as masters research at the NYU Center for Global Affairs.",
  thesis:
    "Humanitarian practice tends to treat evacuation as the obvious good. In practice the journey carries its own risk, and a crisis can be both catastrophic to endure and impossible to escape. The Evacuation Inform Index scores those two risks separately, side by side, so that the comparison between them becomes visible and can be argued with.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "104",
      label:
        "active crises scored on both the risk of staying and the risk of leaving",
    },
    {
      value: "75%",
      label:
        "endangerment threshold, drawn from the obligation to protect civilians in danger",
    },
    {
      value: "12",
      label:
        "vulnerability factors, ten that raise assessed risk and two that lower it",
    },
    {
      value: "10",
      label:
        "limitations the prototype states about itself, including that its weights are unvalidated",
    },
  ],

  sections: [
    {
      id: "problem",
      number: "01",
      title: "The Question Nobody Asks",
      paragraphs: [
        "Every displacement crisis contains a question that is rarely asked out loud: is leaving actually safer than staying? Roads are mined or blockaded. Checkpoints separate families. The elderly and the sick do not survive transit that a healthy adult would manage. A destination that looked open on Monday has closed by Thursday.",
        "Existing humanitarian indices measure how bad a situation is. They rank crises by severity so that funding and attention can be allocated. What they do not do is model the alternative. A crisis scored as extremely severe tells a planner that people are suffering; it does not tell them whether moving those people would reduce or increase the harm.",
        "That gap matters because the two risks move independently. A siege can be catastrophic to endure and simultaneously impossible to escape. A drought can be survivable in place while the routes out remain open and safe. Treating severity as a proxy for a decision to evacuate conflates conditions that need to be distinguished.",
        "International humanitarian law makes the distinction consequential rather than merely analytical. Under Article 49 of the Fourth Geneva Convention, an Occupying Power may undertake total or partial evacuation of a given area where the security of the population or imperative military reasons so demand, must return those evacuated to their homes once hostilities have ceased, and must ensure proper accommodation, satisfactory conditions of hygiene, health, safety and nutrition, and that members of the same family are not separated. Evacuation is a regulated act with conditions attached, not a self evidently benign one.",
      ],
    },
    {
      id: "what-it-is",
      number: "02",
      title: "What the Index Is",
      paragraphs: [
        "The Evacuation Inform Index is a browser based research prototype. It presents a world map of active crises, a panel of live developments for each one, a methodology section, a catalogue of data sources, and a reference list.",
        "It scores 104 active humanitarian crises on two dimensions: the risk of remaining in place, and the risk of attempting to leave. It expresses the relationship between them as a single ratio, while always displaying the two component scores that produced it.",
        "The map can be filtered to a crisis type. INFORM's driver labels are grouped into four families: environmental, covering floods, drought, cyclone and earthquake; conflict and violence; international displacement; and political or economic crisis. Crises routinely carry several drivers, so the groups overlap deliberately and a crisis appears whenever any of its drivers is selected. All four are selected by default and every crisis belongs to at least one, so the unfiltered map is the whole dataset, and whenever a filter narrows the view the legend says how many crises are being shown.",
        "Two further layers address the roads. A transparent road network overlay can be switched on over any base layer, so streets and highways read against the satellite imagery rather than replacing it. Separately, the road access reports gathered for each crisis can be pinned on the map. A pin marks the crisis a report belongs to and never the blockage itself, because news prose carries no coordinates: a report that a named road has been cut identifies no point that can be plotted.",
        "Every legal provision cited in the methodology section is clickable and opens an explanation written for a reader with no legal training. Each has four parts: what the provision requires in plain words, its operative text so that the plain language rendering can be checked against the source, why this index invokes it, and how far that invocation is justified. The fourth part is the reason the feature exists. A citation that is only ever displayed reads as authority the model has not earned, and several of these do not survive the examination. The endangerment threshold is labelled with Article 49 of the Fourth Geneva Convention on every crisis, including floods and droughts where an article governing occupied territory has no application, and Article 17 of Additional Protocol II is the more relevant rule for most of the armed conflicts shown and goes unused.",
        "It is not deployed in any operational setting, has no institutional mandate, and produces no output that any organisation is obliged to act upon. The distinction between what is implemented and what is planned is marked throughout the interface rather than left to the reader to infer.",
      ],
    },
    {
      id: "how-it-works",
      number: "03",
      title: "How It Works",
      paragraphs: [
        "The index expresses its result as a ratio: the risk score for evacuating divided by the risk score for staying. A value above 1.0 indicates that evacuation carries more risk than remaining. A value below 1.0 indicates the reverse. A value near 1.0 indicates that the two courses of action carry comparable risk, which is itself a meaningful finding rather than an absence of one.",
        "Ratios become unstable as the denominator approaches zero, so a floor is applied to the staying score. And the ratio is never shown alone: both component scores accompany it wherever it appears.",
        "The component scores are not invented for the prototype. They derive from the INFORM Severity Index, the monthly crisis severity model produced by ACAPS with the Joint Research Centre of the European Commission. INFORM assembles 31 core indicators into three weighted dimensions: the impact of the crisis at 20 per cent, the conditions of the affected people at 50 per cent, and the complexity of the situation at 30 per cent.",
        "The index maps two of those dimensions onto its own question. The conditions of affected people become the risk of staying, measuring how severe it is to remain in place. The complexity of the crisis, which covers access constraints, safety, and the operating environment, becomes the risk of evacuating, measuring how difficult and dangerous it is to move. The substitution is defensible on its face, since complexity measures precisely the conditions that obstruct movement, and the prototype labels it as a substitution rather than a measurement.",
        "Indicators combine by weighted geometric mean rather than arithmetic mean. The practical consequence is that a catastrophic score on one component cannot be averaged away by comfortable scores elsewhere. If every evacuation route is closed, no amount of favourable weather or food security compensates for it. This is the same non compensatory logic used by the Human Development Index, and it reflects a judgement about the world rather than a mathematical preference: some failures are absolute.",
      ],
    },
    {
      id: "danger-and-feasibility",
      number: "04",
      title: "Keeping Danger and Feasibility Apart",
      paragraphs: [
        "The prototype adopts a structural argument from the CERAI framework, which holds that danger and feasibility must never be collapsed into one score.",
        "The reasoning is legal as much as analytical. The obligation to protect civilians arises from the danger they face. Operational difficulty does not extinguish that obligation. A single blended number would allow low feasibility to drag down the composite, making a desperate situation appear less urgent precisely because it is hard to resolve.",
        "Keeping the two visible produces the opposite effect. High danger combined with low feasibility raises a protection gap flag, signalling that the problem has moved beyond operational reach and requires political engagement rather than a logistical answer.",
        "Endangerment is drawn from the INFORM conditions score and expressed as a percentage, with a 75 per cent obligation threshold marked and a trajectory drawn from recent conflict fatality trends. Feasibility inverts the complexity score and reduces it by live route weather. A trajectory indicator compares fatalities in the most recent three months against the preceding three, answering whether a situation is deteriorating or stabilising, which a static severity score cannot convey.",
      ],
    },
    {
      id: "vulnerability",
      number: "05",
      title: "Who Is Exposed",
      paragraphs: [
        "A crisis score describes a population. It does not describe a person within it. The prototype therefore offers an interactive profile of twelve factors that a user can switch on to represent a particular group, bounded between a multiplier of 0.7 and 1.3.",
        "The multiplier raises endangerment and lowers feasibility, on the reasoning that these are two causally distinct pathways rather than one effect measured twice. A personal characteristic does not add a fixed quantity of risk; it scales the risk already present in the environment. Being elderly in a stable region and being elderly under bombardment are not the same increment.",
        "The twelve factors extend well beyond mobility. Young children, the elderly, the disabled and medically dependent, the wounded and acutely sick, and pregnant women and new mothers all bear on the physical capacity to travel. Unaccompanied and separated minors, people facing gendered violence risk, members of targeted ethnic, religious or political groups, undocumented people with identity gaps, and linguistic minorities with low literacy face a different kind of exposure: they are endangered by targeting, detention, or exclusion rather than by the difficulty of walking. Two factors work in the opposite direction, reducing assessed risk: prior evacuation experience and available financial resources.",
        "The distinction matters. A demographic list alone would treat vulnerability as a question of who moves slowly. The protection based additions treat it as a question of who is hunted, who is turned back, and who cannot read the sign telling them where to go.",
      ],
    },
    {
      id: "evidence",
      number: "06",
      title: "How the Index Treats Evidence",
      paragraphs: [
        "The laboratory hosting this work has a lineage in supply chain traceability and forced labour mitigation, and several practices carry over into how the index treats evidence.",
        "A two witness standard separates a fact corroborated by two or more independent reports from a single unverified claim, turning source credibility into a graded ladder rather than a binary.",
        "The score is deterministic rather than generated. Every number comes from a fixed, auditable formula. Where a language model is involved, it supplies source grounded facts and never overrides the arithmetic. A reader can reconstruct any score by hand.",
        "An evidence gap is treated as a risk signal rather than a neutral absence. An unverified corridor segment is penalised, not assumed safe. This inverts the common default in which missing information quietly reads as an acceptable situation. Where the tool falls back to background knowledge rather than a live verified source, that fallback is labelled, capped below verified status, and flagged.",
        "The optional satellite damage layer follows the same discipline. It stays empty until a user connects their own deployment, and the interface reports the real state of that connection rather than assuming it: green only once imagery actually arrives, failure when none does, and partial coverage distinguished from failure. Nothing about the connection is asserted before it is observed.",
      ],
    },
    {
      id: "limitations",
      number: "07",
      title: "What the Index Does Not Do",
      paragraphs: [
        "The repository states ten limitations. The most consequential are reproduced here, because they are the most important part of the document for any reader considering what weight to give the tool.",
        {
          lead: "Proxy construct.",
          text: "Endangerment and feasibility derive from INFORM sub scores supplemented by conflict and weather data. They should be read as a faithful architectural proxy, not a validated instrument.",
        },
        {
          lead: "Researcher assigned weights.",
          text: "Every weight is a best estimate pending expert validation. This places them at the same evidentiary level as INFORM's own initial weights, which ACAPS likewise describes as a current best estimate to be refined by expert analysis.",
        },
        {
          lead: "No ground truth calibration.",
          text: "Independent ground truth for evacuation decisions does not exist. There is no register of correct historical calls against which the index could be scored.",
        },
        {
          lead: "Population level vulnerability.",
          text: "The demographic profile is a scenario the user sets, not measured household data. It cannot capture individual circumstance.",
        },
        {
          lead: "Static snapshot.",
          text: "The endangerment and feasibility pair has no corridor dynamics, ceasefire windows, or modelling of misinformation. When hosted as a static site, news and conflict data are captured rather than live.",
        },
        {
          lead: "No modelling of political will.",
          text: "The index cannot represent actor behaviour, negotiation status, sudden shifts in belligerent intent, or the granting and withdrawal of consent. In many real evacuations these are the determining factors.",
        },
        {
          lead: "Partial road access coverage.",
          text: "The road access search has been run for 42 of the 104 crises, and the remaining 62 have never been searched at all. An absence of road reports therefore carries two entirely different meanings the data cannot distinguish: searched and nothing found, or never looked at. On a tool about whether people can leave, the silent reading of a crisis with no reports, that its roads are passable, is the dangerous one, so both the map layer and the crisis panel state the coverage split rather than presenting an unpinned crisis as a clear one.",
        },
        {
          lead: "Correlation, not causation.",
          text: "The index prioritises attention. It is decision support and must not be the sole basis for an evacuation decision.",
        },
      ],
    },
    {
      id: "conclusion",
      number: "08",
      title: "What It Contributes",
      paragraphs: [
        "The contribution of this prototype is not a novel algorithm. It is a reframing. By insisting that the risk of leaving be scored separately from the risk of staying, and that danger be scored separately from feasibility, it makes visible a comparison that humanitarian assessment usually leaves implicit.",
        "Its second contribution is its treatment of its own uncertainty. The weights are labelled as unvalidated. The proxies are labelled as proxies. The absent capabilities are listed rather than omitted. The satellite overlay reports honestly that it is not connected. For a tool that touches decisions about who moves and who remains, this reticence is not a weakness in the work; it is a substantial part of what the work is demonstrating.",
        "The index does not know whether anyone should evacuate. It is built to make the question harder to answer carelessly.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "ACAPS and the Joint Research Centre of the European Commission. INFORM Severity Index, April 2026 release, 104 crises.",
      url: "https://www.acaps.org/en/thematics/all-topics/inform-severity-index",
    },
    {
      ref: "International Committee of the Red Cross. Article 49, Geneva Convention (IV) relative to the Protection of Civilian Persons in Time of War, 1949.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-49",
    },
    {
      ref: "ACLED. Armed Conflict Location and Event Data, conflict events and fatalities.",
      url: "https://acleddata.com",
    },
    {
      ref: "Open-Meteo. Route weather and daylight data.",
      url: "https://open-meteo.com",
    },
    {
      ref: "Microsoft and Planet. HASTE, satellite damage assessment framework.",
      url: "https://aka.ms/HASTE",
    },
    {
      ref: "International Organization for Migration. Risk Index for Climate Displacement, two tier macro and micro model.",
      url: "https://environmentalmigration.iom.int/CMIL-AP/RICD",
    },
    {
      ref: "Centers for Disease Control and Prevention. Social Vulnerability Index.",
      url: "https://www.atsdr.cdc.gov/placeandhealth/svi/index.html",
    },
    {
      ref: "Fund for Peace. Fragile States Index.",
      url: "https://fragilestatesindex.org",
    },
    {
      ref: "OECD and the Joint Research Centre. (2008). Handbook on Constructing Composite Indicators. OECD Publishing.",
      url: "https://publications.jrc.ec.europa.eu/repository/handle/JRC31473",
    },
    {
      ref: "Saaty, T.L. (1990). How to Make a Decision: The Analytic Hierarchy Process. European Journal of Operational Research, volume 48, issue 1, pages 9 to 26.",
    },
    {
      ref: "Beccari, B. (2016). A Comparative Analysis of Disaster Risk, Vulnerability and Resilience Composite Indicators. PLoS Currents Disasters.",
    },
    {
      ref: "Al Fozaie, M. (2022). A Guide to Integrating Expert Opinion and Fuzzy AHP When Generating Weights for Composite Indices. Advances in Fuzzy Systems.",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl:
    "https://ethical-tech-colab.github.io/evacuation-inform-index-carolina/",
  repoUrl:
    "https://github.com/Ethical-Tech-CoLab/evacuation-inform-index-carolina",
};
