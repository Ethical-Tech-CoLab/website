// ─────────────────────────────────────────────────────────────────────────
// "The Civilian Evacuation Risk Anticipation Index (CERAI)": plain-language
// research report on the CERAI prototype, transcribed from CERAI-Paper.md in
// the CERAI_AR repository. Rendered by src/app/publications/cerai/page.tsx.
// Kept here so the page stays presentational, matching the site's content/
// convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is plain prose, prose introduced by a bold lead-in (used for
 *  the labelled limitation entries), or a bulleted list. The source paper
 *  uses lists for the endangerment risk factors, the feasibility
 *  sub-questions, the live data sources, and the IHL provisions; those are
 *  reference material a reader scans rather than reads, so they are kept as
 *  lists here. */
export type Paragraph =
  | string
  | { lead: string; text: string }
  | { intro?: string; list: string[]; ordered?: boolean };

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

export const ceraiReport = {
  eyebrow: "Publications · Academic report",
  title: "The Civilian Evacuation Risk Anticipation Index",
  subtitle:
    "A Decision-Support Tool for Protecting Civilians During Evacuations in Armed Conflict",
  org: "Ethical Tech CoLab",
  advisor: "Advised by Teresa Cantero",
  date: "2026",
  authors:
    "Development advised by Teresa Cantero, PhD candidate in Spain and an alum of the NYU Center for Global Affairs, as part of masters research on International Humanitarian Law and artificial intelligence.",
  thesis:
    "When war forces people to flee, the decision to move a community or shelter it in place is made under extreme time pressure, with incomplete information, and with lives hanging on the outcome. CERAI keeps two questions apart that other tools tend to blend together: how dangerous it is for civilians to remain where they are, and whether an organised evacuation is actually possible right now. Keeping them apart matters legally, because the obligation to protect arises from the danger civilians face, not from whether an evacuation happens to be operationally easy.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "75%",
      label:
        "endangerment threshold on the gauge, marking conditions that resemble those triggering Article 49 obligations",
    },
    {
      value: "3",
      label:
        "connected dimensions: endangerment, feasibility, and vulnerability, each scored separately",
    },
    {
      value: "4",
      label:
        "external live data sources connected to the prototype, covering location, weather, conflict events, and news",
    },
    {
      value: "7",
      label:
        "limitations the prototype states about itself, including that its weights remain provisional",
    },
  ],

  sections: [
    {
      id: "foreword",
      number: "00",
      title: "Foreword",
      paragraphs: [
        "When war forces people to flee their homes, the decisions that follow are among the most consequential a humanitarian actor or a government can make. Should a community be moved now, or is it safer to shelter in place? Is a corridor genuinely open, or open only on paper? Who among the population, such as children, the elderly, and the sick, will be least able to make the journey? These questions are usually answered under extreme time pressure, with incomplete information, and with lives hanging on the outcome.",
        "The Civilian Evacuation Risk Anticipation Index, known as CERAI, is a research prototype built to make this reasoning more structured, more transparent, and more open to scrutiny. This report explains, in non-technical language, what CERAI is, what it does, how it works, and, just as important, what it does not claim to do. It is intended for a policy, humanitarian, and legal audience rather than a technical one.",
      ],
    },
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "CERAI is a research prototype, an experimental software tool, that helps analysts think through the risks civilians face during an evacuation in an armed conflict. It does not make decisions. It organises evidence and expert judgment into a clear, repeatable structure so that human decision-makers can see how a conclusion was reached.",
        "The tool asks a set of structured questions across several categories of risk: the intensity of fighting, the proximity of armed groups, the condition of escape routes, the vulnerability of the affected population, the weather, the availability of food and water, and the capacity of the place people would move to. It then combines these inputs into clear summary scores.",
        "CERAI's central and most distinctive idea is to keep two questions separate that other tools tend to blend together. Endangerment asks how dangerous it is for civilians to remain where they are. Feasibility asks whether an organised, safe evacuation is actually possible right now.",
        "Keeping these apart matters for legal reasons. Under International Humanitarian Law, the obligation to protect and consider moving civilians arises from the danger they face, not from whether an evacuation happens to be convenient or operationally easy. A situation that is extremely dangerous but where evacuation is currently blocked does not remove the obligation to protect civilians; it makes the case for urgent political and diplomatic action even stronger.",
        "The tool is explicitly aligned with well-established humanitarian and legal frameworks, and it draws comparisons to a database of documented real-world evacuation operations since the year 2000, for example the sieges of Aleppo and Mariupol, the battle of Mosul, and the evacuation of Kabul.",
        "CERAI is delivered as a single self-contained web page that runs in an ordinary browser and is published as a live public demonstration. It is intended for academic demonstration only and is not authorised for operational use without expert validation.",
        "The tool was developed as part of masters research at the New York University Center for Global Affairs, focused on the intersection of International Humanitarian Law and artificial intelligence, with the stated aim of making evacuation-risk reasoning more transparent and auditable for humanitarian and legal audiences such as the United Nations and the International Committee of the Red Cross.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Evacuation decisions in conflict are high-stakes and made under pressure. Experienced humanitarian coordinators rely heavily on accumulated judgment and memory of past operations. This expertise is invaluable, but it is often implicit, held in the minds of individuals, and therefore difficult to review, to explain to others, or to reproduce consistently across different teams and situations.",
        },
        {
          lead: "The gap.",
          text: "Existing humanitarian severity tools, such as the widely used INFORM Severity Index, are designed to measure the overall intensity of a humanitarian crisis. They are not built specifically around the legal and operational logic of an evacuation decision, and they tend to merge the question of how bad the situation is with the question of how accessible it is. For an evacuation decision, blending these can be misleading and, in a legal sense, dangerous.",
        },
        {
          lead: "The response.",
          text: "CERAI proposes a purpose-built framework for the evacuation question. Its guiding principle is that a good decision-support tool should be transparent, so that every number can be traced back to the inputs and reasoning that produced it; structured, so that it forces the analyst to consider the right questions in the right order; and reproducible, so that the same inputs always produce the same outputs and the reasoning can be checked by others.",
        },
        "CERAI describes itself as a structured aid rather than a successor to expert judgment. It preserves what works in expert practice, namely recognising patterns from past operations, while making that pattern recognition visible and open to challenge.",
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        {
          intro: "The tool is designed to do the following.",
          list: [
            "Provide a transparent and repeatable method for assessing civilian risk during a potential evacuation.",
            "Separate the assessment of danger, or endangerment, from the assessment of operational possibility, or feasibility, so that legal obligations are not obscured by practical constraints.",
            "Make explicit how population vulnerability, including the presence of children, elderly people, people at risk of gender-based violence, and those with limited resources or mobility, changes the real level of risk faced by a community.",
            "Anchor each assessment against documented historical cases, surfacing which past operations most resemble the current situation.",
            "Communicate the resulting analysis in a form useful to humanitarian coordinators, political decision-makers, and legal reviewers, including explicit references to the relevant IHL obligations.",
            "Be honest about uncertainty, by showing how confident the assessment is and how sensitive the conclusion is to assumptions.",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How CERAI Works",
      paragraphs: [
        "The tool is organised around three connected dimensions. A user works through them by answering structured questions, and the tool presents the results on a set of easy-to-read dials and summaries.",
        {
          lead: "Dimension 1, endangerment.",
          text: "How dangerous is it to remain? The analyst provides information across a range of risk factors, including the following.",
        },
        {
          list: [
            "The intensity of ongoing hostilities.",
            "How close armed groups are to the civilian population.",
            "Indicators that an attack may be imminent.",
            "The risk of the conflict escalating.",
            "The presence of chemical or biological threats.",
            "Non-conflict hazards, such as extreme weather or disease.",
            "The availability of food, water, and energy.",
            "The proportion of the population that is especially vulnerable.",
          ],
        },
        "Each factor is weighted according to how central it is to the corresponding legal obligation. For example, the intensity of hostilities carries the largest single weight, reflecting the core IHL protection of civilians from attack. The tool combines these into a single endangerment score, displayed on a gauge with a clearly marked threshold.",
        {
          lead: "Dimension 2, feasibility.",
          text: "Is an organised evacuation possible now? This dimension assesses whether an evacuation could actually be carried out safely, broken into three sub-questions.",
        },
        {
          list: [
            "Zone exit asks whether people can get out of the danger zone at all: is a corridor open, have armed groups consented, are routes mined, is an attack imminent.",
            "Route conditions asks whether the journey is survivable, covering weather, daylight, availability of transport, mines along the route, and the distance to safety.",
            "Protection at destination asks whether the place people are moving to is actually safe and able to receive them, covering shelter, medical capacity, security, willingness to receive, and consent of relevant actors.",
          ],
        },
        "Each sub-question produces its own score, and the three are combined into a composite feasibility score.",
        {
          lead: "Dimension 3, vulnerability.",
          text: "Who is most at risk, and how does that change the picture? The same objective situation is not equally dangerous for everyone. A route that an able-bodied adult can walk may be impassable for young children, the elderly, or the chronically ill. This dimension captures the make-up of the affected population and produces an adjustment multiplier that can raise or lower the risk picture within defined bounds.",
        },
        "Importantly, vulnerability affects both of the other dimensions, but for different reasons: it increases the harm a given hazard causes, which is endangerment, and it reduces the navigability of a given route, which is feasibility. The tool treats these as two distinct effects rather than double-counting the same factor.",
        "Beyond the scores, CERAI generates a written briefing aimed at humanitarian and political decision-makers. It highlights which IHL obligations are triggered, what the scores mean in practice, and where the greatest uncertainties or blocking constraints lie.",
      ],
    },
    {
      id: "reading-the-results",
      number: "05",
      title: "Reading the Results",
      paragraphs: [
        {
          lead: "Risk gauges.",
          text: "The endangerment and feasibility scores are shown on colour-coded dials running from low risk in green to extreme risk in deep red and purple, with intermediate bands for moderate, elevated, high, and critical.",
        },
        {
          lead: "The 75 per cent threshold.",
          text: "The endangerment gauge carries a marker at 75 per cent. This represents the point at which conditions are considered to demand evacuation under Article 49 of the Fourth Geneva Convention, which requires evacuation where the security of the population or imperative military reasons so demand. The threshold is indicative only. It flags that conditions resemble those which have historically triggered legal obligations; it does not itself create a legal obligation, and human legal judgment is always required.",
        },
        {
          lead: "Confidence bar.",
          text: "The tool shows how much of the assessment is based on real, entered data versus cautious worst-case default assumptions. When information is missing, CERAI deliberately assumes a higher-risk default, in keeping with the precautionary logic of IHL, and lowers the displayed confidence accordingly. A higher confidence figure means the conclusion rests on specific evidence rather than assumptions.",
        },
        {
          lead: "Trajectory and time-to-threshold.",
          text: "The tool tracks how the danger score is changing over the course of a session, whether deteriorating, stable, or improving, and offers a rough projection of how many days it might take to reach the 75 per cent obligation threshold if current trends continue. This is described explicitly as a planning aid only, since real situations rarely change in a straight line.",
        },
        {
          lead: "Historical comparisons.",
          text: "CERAI compares the current situation against a database of documented evacuation operations and surfaces the closest historical analogues. This mirrors how experienced coordinators reason, saying that a situation looks like Mariupol or resembles Mosul, but it makes that comparison explicit and open to challenge.",
        },
      ],
    },
    {
      id: "sensitivity",
      number: "06",
      title: "Testing Assumptions",
      paragraphs: [
        {
          lead: "Monte Carlo sensitivity analysis.",
          text: "Because many inputs are uncertain, CERAI can run a simulation that repeatedly varies the uncertain inputs within plausible ranges and observes how often the conclusion changes. This shows the decision-maker whether the assessment is robust or whether it hinges on a few uncertain assumptions.",
        },
        {
          lead: "What-if pressure test.",
          text: "The tool identifies the handful of variables that most strongly influence the outcome and lets the user adjust them to see the effect immediately. This supports scenario planning without altering the main assessment.",
        },
      ],
    },
    {
      id: "live-data",
      number: "07",
      title: "Connections to Live Data",
      paragraphs: [
        {
          intro:
            "To move beyond manual entry, the prototype connects to several external, publicly available data sources.",
          list: [
            "Location look-up, using Nominatim and OpenStreetMap, converts a place name into coordinates.",
            "Weather, using Open-Meteo, retrieves current weather conditions for the assessed location.",
            "Conflict events, using ACLED, retrieves recorded conflict-event data, which can drive a data-based trajectory calculation.",
            "News signals, using GDELT, surface recent news articles relevant to the location.",
          ],
        },
        "The documentation also describes planned future connections to established humanitarian data systems, including UN OCHA and ReliefWeb access monitoring, the EU Global Conflict Risk Index, FEWS NET and IPC food-security data, and the INFORM Severity Index, as pathways to make the tool more automatically data-driven over time.",
        "Each manually entered figure can also be tagged with a source credibility level, ranging from unverified, through media and NGO reporting, to UN and ICRC verified, and with a data-freshness indicator, so that the reliability and age of the underlying evidence are visible in the assessment itself.",
      ],
    },
    {
      id: "ihl-grounding",
      number: "08",
      title: "Grounding in International Humanitarian Law",
      paragraphs: [
        "A defining feature of CERAI is that its structure is tied directly to specific IHL obligations. The weighting of each risk factor is justified by reference to the legal provision it relates to.",
        {
          intro: "Examples cited in the tool include the following.",
          list: [
            "Fourth Geneva Convention, Article 49: evacuation where security demands.",
            "Additional Protocol I, Article 51: protection of civilians from attack.",
            "Additional Protocol I, Article 57: precautions in attack, including effective advance warning.",
            "Additional Protocol I, Article 58: passive precautions, keeping civilians away from military objectives.",
            "Fourth Geneva Convention, Article 54, and Additional Protocol I, Article 70: prohibition of starvation and provision of relief.",
            "Special protections for children and the elderly: Fourth Geneva Convention, Articles 16 and 24, and Additional Protocol I, Articles 77 and 78.",
            "Principles of non-refoulement and the safety of the receiving location.",
          ],
        },
        "The tool references established humanitarian doctrine and coordination frameworks from bodies including the ICRC, UN OCHA, UNHCR, WHO, IOM, and UN mine-action services, as well as the Ottawa Treaty on landmines and the Chemical Weapons Convention.",
        "The legal design principle is stated plainly: low feasibility must never be allowed to appear to extinguish the obligation to protect civilians. A high-danger, low-feasibility situation is precisely the case that should escalate political engagement rather than be quietly resolved by an algorithm.",
      ],
    },
    {
      id: "methodology",
      number: "09",
      title: "Methodological Choices",
      paragraphs: [
        {
          lead: "Why a geometric mean rather than a simple average.",
          text: "CERAI deliberately combines sub-scores in a way that penalises a single very bad factor heavily. In plain terms: if the escape corridor is essentially closed, the overall feasibility should be critically low no matter how good the weather is. A simple average would let good factors cancel out a fatal blocking constraint; CERAI's approach does not allow that.",
        },
        {
          lead: "Why vulnerability is a multiplier.",
          text: "Vulnerability changes how the objective conditions actually affect people, so it is applied as an adjustment within bounded limits to the objective scores rather than being averaged in alongside them as just another added factor.",
        },
        {
          lead: "Where the weights come from.",
          text: "The current weights were assigned by the researcher based on a review of IHL doctrine and checked for face validity against documented historical cases. The tool is candid that this is the same evidentiary standard used by established operational indices such as INFORM Severity in their early stages, and that a more rigorous, expert-panel-based weighting exercise using the Analytic Hierarchy Process is a planned next step.",
        },
        {
          lead: "What the historical cases are for.",
          text: "The database of past operations is used as a reference check on whether the tool's outputs align with the retrospective consensus about how dangerous those situations were, not as a statistical training set. The tool is explicit that no true statistical ground truth exists for civilian evacuation decisions.",
        },
      ],
    },
    {
      id: "limitations",
      number: "10",
      title: "Limitations and Caveats",
      paragraphs: [
        "The prototype is unusually transparent about what it cannot do. Its stated limitations are reproduced here because they are the most important part of the document for any reader considering what weight to give the tool.",
        {
          lead: "It cannot read political intent.",
          text: "Sudden shifts in the behaviour of warring parties, or the collapse of an agreement, are outside the model.",
        },
        {
          lead: "It is only as current as its inputs.",
          text: "Static entries cannot capture rapidly changing battlefield conditions in real time.",
        },
        {
          lead: "It does not model armed-group behaviour.",
          text: "Command fragmentation among armed groups is likewise outside its scope.",
        },
        {
          lead: "The historical dataset is small.",
          text: "It holds a few dozen documented cases. This is enough to sanity-check the framework but not enough for robust statistical generalisation. CERAI is a structured analytic framework, not a statistical prediction model.",
        },
        {
          lead: "Correlation is not causation.",
          text: "Alignment between inputs and past outcomes does not prove a causal relationship.",
        },
        {
          lead: "It cannot always distinguish voluntary from coerced evacuation.",
          text: "The difference between a population choosing to leave and a population being displaced under duress is not something the model reliably detects.",
        },
        {
          lead: "The weights are provisional.",
          text: "They remain pending expert-panel validation.",
        },
        "Above all, the tool repeatedly states that its outputs are indicative and are not a substitute for human judgment, legal expertise, or operational assessment by qualified humanitarian and IHL professionals.",
      ],
    },
    {
      id: "practical-nature",
      number: "11",
      title: "Practical Nature of the Tool",
      paragraphs: [
        "CERAI is delivered as a single self-contained web page that runs in an ordinary web browser, with no installation required. It can be opened directly or served locally, and it is published as a live public demonstration via GitHub Pages.",
        "Users can save snapshots of an assessment, export results, and load pre-built example scenarios spanning moderate to extreme risk bands, making the tool suitable for teaching, demonstration, and structured discussion.",
      ],
    },
    {
      id: "audience",
      number: "12",
      title: "Intended Audience and Use",
      paragraphs: [
        "CERAI is aimed at humanitarian coordinators, political decision-makers, and legal reviewers, the people who must weigh whether and how to move civilians, and who must be able to justify those decisions afterward.",
        "Its value is framed not as predictive accuracy but as decision support: making reasoning visible, structured, reproducible, and open to challenge. It is designed to complement, not replace, the expertise of ICRC delegates, UN coordinators, and IHL practitioners.",
      ],
    },
    {
      id: "conclusion",
      number: "13",
      title: "Conclusion",
      paragraphs: [
        "CERAI represents a thoughtful attempt to bring structure and transparency to one of the hardest categories of decision in armed conflict: whether, when, and how to move civilians out of danger. Its most important contribution is conceptual rather than technical. It insists on separating the danger of remaining from the possibility of leaving, so that the legal duty to protect civilians is never quietly overridden by operational difficulty.",
        "The tool is deliberately modest about its status. It is a research prototype, its weights are provisional, its dataset is small, and it is not authorised for operational use without expert validation. But by making every score traceable, every assumption visible, and every historical comparison explicit, it offers a model for how automated tools can support humanitarian and legal judgment responsibly, assisting human experts while keeping them firmly in control of the decision.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "International Committee of the Red Cross. Article 49, Geneva Convention (IV) relative to the Protection of Civilian Persons in Time of War, 1949. Evacuation where the security of the population or imperative military reasons so demand.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-49",
    },
    {
      ref: "International Committee of the Red Cross. Article 54, Geneva Convention (IV), 1949.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-54",
    },
    {
      ref: "International Committee of the Red Cross. Articles 16 and 24, Geneva Convention (IV), 1949. Special protections for the wounded, the sick, children, and the elderly.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-24",
    },
    {
      ref: "International Committee of the Red Cross. Article 51, Additional Protocol I, 1977. Protection of the civilian population from attack.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-51",
    },
    {
      ref: "International Committee of the Red Cross. Article 57, Additional Protocol I, 1977. Precautions in attack, including effective advance warning.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-57",
    },
    {
      ref: "International Committee of the Red Cross. Article 58, Additional Protocol I, 1977. Precautions against the effects of attacks.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-58",
    },
    {
      ref: "International Committee of the Red Cross. Article 70, Additional Protocol I, 1977. Relief actions.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-70",
    },
    {
      ref: "International Committee of the Red Cross. Articles 77 and 78, Additional Protocol I, 1977. Protection of children and evacuation of children.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-77",
    },
    {
      ref: "Convention on the Prohibition of the Use, Stockpiling, Production and Transfer of Anti-Personnel Mines and on their Destruction (Ottawa Treaty), 1997.",
    },
    {
      ref: "Organisation for the Prohibition of Chemical Weapons. Chemical Weapons Convention, 1993.",
      url: "https://www.opcw.org/chemical-weapons-convention",
    },
    {
      ref: "United Nations Mine Action Service. Mine-action coordination and survey standards.",
      url: "https://www.unmas.org",
    },
    {
      ref: "ACAPS and the Joint Research Centre of the European Commission. INFORM Severity Index.",
      url: "https://www.acaps.org/en/thematics/all-topics/inform-severity-index",
    },
    {
      ref: "ACLED. Armed Conflict Location and Event Data, conflict events and fatalities.",
      url: "https://acleddata.com",
    },
    {
      ref: "Open-Meteo. Current weather conditions for the assessed location.",
      url: "https://open-meteo.com",
    },
    {
      ref: "Nominatim and OpenStreetMap. Place name to coordinate look-up.",
      url: "https://nominatim.openstreetmap.org",
    },
    {
      ref: "The GDELT Project. Global news signals relevant to the assessed location.",
      url: "https://www.gdeltproject.org",
    },
    {
      ref: "UN OCHA. ReliefWeb, humanitarian access monitoring and situation reporting.",
      url: "https://reliefweb.int",
    },
    {
      ref: "FEWS NET. Famine Early Warning Systems Network, food-security outlooks.",
      url: "https://fews.net",
    },
    {
      ref: "Integrated Food Security Phase Classification. IPC acute food insecurity analysis.",
      url: "https://www.ipcinfo.org",
    },
    {
      ref: "European Commission Joint Research Centre. Global Conflict Risk Index (GCRI).",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/CERAI_AR/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/CERAI_AR",
};
