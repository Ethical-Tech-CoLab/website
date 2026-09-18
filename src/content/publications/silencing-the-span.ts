// ─────────────────────────────────────────────────────────────────────────
// "Silencing the Span", a plain-language edition of the DUMBO / Manhattan
// Bridge rail-noise problem definition, transcribed from IDEA-CONCEPT.md
// (draft v1.2) in the manhattan-bridge-noise-dumbo repository, with a closing
// section on the datasets the same repository built afterwards (README.md and
// data-collection/README.md). Rendered by
// src/app/publications/silencing-the-span/page.tsx. Kept here so the page
// stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper does not follow those rules; they are applied here.
//
// The paper is unusually careful about what it does and does not claim, and
// it leaves its own corrections visible. That attribution is load-bearing.
// Where it says a claim is withdrawn, provisional, or a hypothesis rather
// than a finding, keep it that way. Do not flatten it into assertion.
// ─────────────────────────────────────────────────────────────────────────

import type { Citation, ReportSection } from "./types";

export const silencingTheSpanReport = {
  eyebrow: "Publications · Academic report",
  title: "Silencing the Span",
  subtitle:
    "Defining the Manhattan Bridge Rail-Noise Problem in DUMBO for a Design-Build Intervention",
  org: "Ethical Tech CoLab",
  advisor: "Pre-proposal problem definition and research-gap analysis",
  date: "August 2026",
  authors:
    "Yorke E. Rhodes III, Ethical Tech CoLab. Draft v1.2, revised after an adversarial review pass, with the corrections left visible in the text. Assembled with AI research assistance under the CoLab's research-question methodology.",
  thesis:
    "Noise from the B, D, N and Q trains crossing the Manhattan Bridge has been measured in DUMBO by two agencies eighteen years apart, and both found it severe. Nothing has been done about it in twenty-one years. This paper is not a design. It is the document that has to exist before a design can honestly be procured: a statement of what is known, what is claimed but unevidenced, and what has never been asked of this site. Its central finding is that the four things that would change the picture are records requests, not research.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "84.65",
      label:
        "dB(A) average Leq measured by the MTA at the Adams Street Library, a public receptor the City's own guidance rates clearly unacceptable above 80",
    },
    {
      value: "14 dB",
      label:
        "separation between trains and road traffic at John and Adams Streets in the 2005 park impact statement, meaning roughly 96 per cent of the acoustic energy is rail",
    },
    {
      value: "76 s",
      label:
        "between train crossings at 56 Adams Street over an eleven-hour session, each one an excursion of up to 48 dB above the baseline",
    },
    {
      value: "Blank",
      label:
        "the sound level the state's rapid transit noise code sets for elevated structures, written as to be established in 1982 and apparently never established",
    },
  ],

  sections: [
    {
      id: "how-to-read",
      number: "00",
      title: "How to read this document",
      paragraphs: [
        "This is not a design. It is the artifact that must exist before a design can be honestly procured: a rigorous statement of what is known, what is claimed but unevidenced, and what has never been asked. It is organised so that a reader can stop at any depth. Parts 1 to 9 are synthesis. Parts 10 and 13 are the contribution: the questions nobody has asked of this site, and the places where the document itself may be wrong.",
        "Part 13 is not a formality. The document was subjected to an adversarial review after drafting, and that review found real errors, including a materially wrong reading of the governing statute and an over-claimed structural constraint. Both are corrected in place, and both corrections are recorded rather than quietly absorbed. A reader who wants to know how much to trust this document should read Part 13 first.",
        {
          lead: "Method.",
          text: "The paper applies the research-question methodology from the CoLab's own report, AI-Powered Assistance in Formulating Research Questions, including its fixed one-to-five journal credibility rubric and its citation-verification discipline. Every citation carries a verification state. Verified means the full document text was retrieved and quoted. Snippet means only a search-index extract was seen, so the quote is real but its surrounding context was not read. Unverified means the source appeared in result listings only and is cited for traceability, not relied upon. No claim in Parts 1 to 6 rests on an unverified source.",
        },
        {
          lead: "Why the verification states matter.",
          text: "Two of the paper's original claims were wrong because a source was summarised rather than opened. The Rapid Transit Noise Code was characterised from the MTA's description of it rather than from the statute; reading the statute reversed the finding and strengthened it. And an assertion that no other systematic measurement existed was falsified by a 2005 environmental impact statement that had been in the public record for two decades. Both errors were the author's, both were caught adversarially, and both are left visible, because a methodology document that hides its own method failures is not evidence of the method working.",
        },
        {
          lead: "Notation.",
          text: "Acoustic descriptors are written in plain text. Leq is the equivalent continuous A-weighted level over a period, the energy average. L10 and L90 are statistical percentiles, the level exceeded 10 per cent and 90 per cent of the time; L10(1) is L10 on a one-hour basis, which is the descriptor the City's environmental review uses. Lmax is a time-weighted maximum, not a true acoustic peak. Ldn, Lden and Lnight are long-term day-night descriptors. These are not interchangeable, and where a source used one and a standard is written in another, the paper says so rather than converting silently.",
        },
      ],
    },
    {
      id: "problem-in-numbers",
      number: "01",
      title: "The problem, in numbers",
      paragraphs: [
        "The single most important document in the file is not an academic paper. It is the MTA New York City Transit Noise Reduction Report for calendar year 2023, published under New York Public Authorities Law section 1204-a and the Rapid Transit Noise Code. Its appendix contains the only systematic, agency-conducted acoustic survey of DUMBO's rail noise known to exist in the public record, conducted in November and December 2023 at twelve locations, after two years of resident and legislative pressure.",
        {
          table: {
            caption:
              "What the MTA measured, November to December 2023. From a memorandum of 18 January 2024 in the appendix to MTA document 138061. Levels in dB(A).",
            headers: [
              "Location",
              "Avg Leq",
              "Max Lmax",
              "Baseline",
              "Duration",
              "Trains",
            ],
            rows: [
              ["31 Washington Street", "54.54", "75.70", "43.1", "8:16:40", "423"],
              ["39 Pearl Street", "57.35", "71.88", "34.1", "7:03:15", "537"],
              ["56 Adams Street", "70.25", "94.66", "46.4", "11:00:03", "520"],
              ["68 Jay Street", "56.87", "90.37", "38.6", "14:37:12", "503"],
              ["98 Front Street", "46.57", "83.93", "32.8", "5:04:06", "323"],
              ["135 Plymouth Street", "53.42", "94.76", "44.5", "9:04:16", "357"],
              ["133 Water Street", "56.00", "80.36", "31.8", "4:12:40", "472"],
              ["177 Water Street", "51.96", "75.71", "33.5", "3:27:37", "389"],
              ["100 Jay Street", "50.21", "78.27", "33.4", "18:38:00", "292"],
              ["Adams Street Library (public)", "84.65", "98.10", "48.1", "0:18:56", "9"],
              ["DUMBO Archway (public)", "81.33", "91.80", "68.9", "0:25:35", "18"],
              ["Brooklyn Bridge Park dog run (public)", "87.50", "98.90", "65.0", "0:37:45", "26"],
            ],
          },
        },
        "The report's own summary of that table: on average, the difference between the baseline and the peak sound level is 43 dB(A). An earlier street-level measurement from June 2022, taken underneath the Brooklyn anchorage at Front and Pine Streets with the meter set to fast response for impulsive sound, recorded a highest level of 94.4 dB(A) against a background of 68.2 dB(A). The memorandum explains the meter setting was chosen due to indications that the noise impact is caused by sudden impact with a track element. The paper calls that sentence the most diagnostically valuable line in the entire public record.",
        {
          lead: "The two datasets say opposite things, and that is the point.",
          text: "Read carelessly, the residential rows look tolerable, with Leq between 46 and 70 dB(A). Read carefully, they are indoor measurements taken inside buildings whose occupants have already paid, privately, for acoustic isolation. The public rows are the unmitigated condition, because you cannot double-glaze a park. An average Leq of 84.65 dB(A) at a New York City public library is the headline number of the document.",
        },
        {
          lead: "What that number does and does not establish.",
          text: "The library session was short, a single session with nine trains logged, and the MTA report does not publish microphone position and height, indoor versus façade versus street placement, the integration method, or whether the session represents typical operating hours. Nor is it established that every sampled residence was in fact retrofitted; the double-glazing evidence is a market observation, not a per-unit survey. What the figure establishes is that a public institutional receptor recorded a level far above the City's own threshold for that receptor class, which is sufficient to justify investigation and insufficient by itself to prove chronic exposure.",
        },
        {
          lead: "Exposure is continuous, not episodic.",
          text: "Between 292 and 537 train passages were logged per monitoring session. At 56 Adams Street, 520 trains passed in eleven hours, roughly one every 76 seconds, each producing an excursion of up to about 48 dB above baseline. This is not a peak-hour problem. The four services run approximately 20 hours a day.",
        },
        {
          lead: "The second agency dataset is eighteen years older.",
          text: "The MTA survey is not, as an earlier draft asserted, the only systematic agency measurement. The Brooklyn Bridge Park Final Environmental Impact Statement of 2005 contains one that is more rigorous in three ways. It separated the sources: at the corner of John Street and Adams Street, the Leq from trains was 77 dBA but only 63 dBA from vehicular traffic, a 14 dB separation that means trains deliver roughly 96 per cent of the acoustic energy. It reported the correct regulatory descriptor: L10(1) of approximately 81 dBA at that site, against a City threshold of 80 for clearly unacceptable. And it quantified the impulsive character: a spread between L10 and L90 of 16 dBA near the bridge, against 4 dBA at a control site beside the Brooklyn-Queens Expressway. The bridge produces a fundamentally different kind of noise from the highway 600 metres away.",
        },
        {
          lead: "The finding that should have stopped everything.",
          text: "Having established that trains dominate, the same impact statement concluded there were no additional feasible and practicable mitigation measures that could reduce noise within the park, and discharged its obligation by requiring private buildings to fit 35 to 40 dBA acoustical glazing. The park users received nothing. The word infeasible is the same word the MTA's Maintenance of Way officers used to close a resident's rail-joint proposal in two days in 2022. In both instances the determinative finding in this seventy-year problem is an undocumented assertion of infeasibility.",
        },
      ],
    },
    {
      id: "derived-duration",
      number: "02",
      title: "A quantity nobody published, recovered from the numbers that were",
      paragraphs: [
        "This section, new in version 1.2, reports arithmetic performed for the paper, not a retrieved source. It is offered as a derivation to be checked, not as a measurement. The MTA survey reports, for each public-space session, four quantities: the session Leq, the peak Lmax, the train-free baseline, and a count of trains over a stated duration. It does not report how long a train event lasts. That omission matters, because event duration is what converts a peak level into an exposure, and it is the quantity every downstream transit-noise calculation needs.",
        "Those four numbers nonetheless determine it. If a session is modelled as its baseline interrupted by N equal events, each spending an equivalent time Te at the peak level, the energy balance rearranges to give Te directly.",
        {
          formula:
            "Te = ( T · 10^(Leq/10) − T · 10^(Lbase/10) ) / ( N · ( 10^(Lmax/10) − 10^(Lbase/10) ) )",
          note: "T is the session duration, N the number of trains logged, Lbase the train-free baseline. Te is an equivalent rectangular duration, not the time a train is audible.",
        },
        {
          table: {
            caption:
              "The derivation applied to the three public outdoor sessions.",
            headers: ["Location", "Leq", "Lmax", "Baseline", "Trains", "Session", "Derived Te", "Duty cycle"],
            rows: [
              ["Adams Street Library", "84.65", "98.10", "48.1", "9", "0:18:56", "5.70 s", "4.52%"],
              ["Brooklyn Bridge Park dog run", "87.50", "98.90", "65.0", "26", "0:37:45", "6.28 s", "7.21%"],
              ["DUMBO Archway", "81.33", "91.80", "68.9", "18", "0:25:35", "7.25 s", "8.51%"],
            ],
          },
        },
        "The three converge. They were recorded at different places, on different days, with different train counts and baselines that differ by nearly 21 dB, and they resolve to equivalent event durations spanning 5.70 to 7.25 seconds, a ratio of 1.27, which is 1.04 dB of event energy. Three independent sessions agreeing to within about one decibel is not what one expects from noise; it is what one expects when the sessions are measuring the same physical event.",
        {
          lead: "It independently corroborates the indoor and outdoor split.",
          text: "Run the same arithmetic on the indoor rows and it breaks. At 31 Washington Street the balance returns 0.50 seconds, an eighth of the outdoor figure, because across 423 passages the maximum Lmax is a rare outlier rather than a typical event. The outdoor sessions are stable under this test and the indoor ones are not, which is exactly what Part 1 argues on entirely separate grounds: the two datasets are not commensurable.",
        },
        {
          lead: "It surfaces a probable reporting artefact.",
          text: "At 56 Adams Street the table reports an average Leq of 70.25 and an average Lmax of also 70.25. The balance resolves that to a 100 per cent duty cycle, meaning the site would have to be at peak level continuously for eleven hours. That is not a physical result; it is a signal that the two columns for that row are not reporting what the headings say. It should be asked about.",
        },
        {
          lead: "Where the derivation is weak.",
          text: "It assumes every train event is identical, which they are not. It assumes a rectangular event. It assumes the published baseline is a true train-free floor, which at the Archway, with a baseline of 68.9 dB(A), is doubtful. And it depends entirely on the four published numbers being what their column headings say, which the 56 Adams row gives direct reason to doubt. None of these weaknesses is repaired by more reading. All are repaired by the source-apportionment measurement in Part 11, or more cheaply by the raw time histories.",
        },
      ],
    },
    {
      id: "what-it-feels-like",
      number: "03",
      title: "What it feels like",
      paragraphs: [
        "Decibels do not persuade. Displacement does. The Brooklyn Paper's article Deaf in DUMBO, cited as testimony of lived experience rather than as measurement, records that the neighbourhood association's own president moved away because the noise was too much, and that she had lost some hearing from living and working there. It records the habituation that suppresses complaint volume: when you live or work down here you get used to it. And it records sleep: if the noise wakes you up once or twice a night, you are ragged.",
        {
          lead: "The privatised burden.",
          text: "The same article reports that new and renovated buildings routinely install double-paned windows, and that a community website kept a running list of contractors who could insulate apartments from the noise. The paper calls this the single most important sociotechnical fact in the file. The cost of mitigation has been quietly transferred from the operator to the residents, at the household level, through the private glazing market. The MTA's own residential interior measurements then read back as acceptable, because the residents already paid. The externality has been internalised by the wrong party, and that internalisation is then used as evidence that no problem exists.",
        },
        {
          lead: "The residents are still asking.",
          text: "A petition created in November 2025 describes the relentless noise invading the library, the park and the dog run. Notably, the residents' proposed remedies, welding the tracks, lubrication, rubber insulation on tracks and wheels, covering below the tracks, lighter cars, map almost exactly onto the professional taxonomy in Part 5. The community has independently reconstructed the engineering option space. What it lacks is not insight; it is the feasibility analysis that has never been performed.",
        },
      ],
    },
    {
      id: "responsibility",
      number: "04",
      title: "Who is responsible, and under what law",
      paragraphs: [
        {
          table: {
            caption: "The jurisdictional split.",
            headers: ["Element", "Owner or operator", "Consequence"],
            rows: [
              ["Bridge structure", "NYC Department of Transportation", "Controls the deck, girders, and any structural attachment"],
              ["Track, trains, operations", "MTA New York City Transit", "Controls the source"],
              ["City noise code", "NYC Department of Environmental Protection", "Local Law 113 of 2005"],
              ["Environmental review standards", "Mayor's Office of Environmental Coordination (CEQR)", "Applies to proposed projects, not existing operations"],
              ["Statutory noise reporting", "MTA Construction and Development, under PAL 1204-a", "See the finding below"],
            ],
          },
        },
        "No single entity owns the outcome. The structure belongs to the City; the noise belongs to the State authority; the receptors belong to neither.",
        {
          lead: "The City's own yardstick says clearly unacceptable.",
          text: "The CEQR Technical Manual's noise exposure guidelines rate a residence, school, museum or library at L10 above 80 dBA as clearly unacceptable, and an outdoor area requiring serenity and quiet as acceptable only at L10 of 55 dBA or below. The 2005 impact statement measured L10(1) of approximately 81 dBA at John and Adams Streets, in the correct descriptor, on the correct one-hour basis, by a City-reviewed review. That site was already over the line in 2005, with no conversion, estimation or inference required. The paper calls this its single most defensible regulatory statement. The Adams Street Library's Leq of 84.65 is 4.65 dB above the threshold even unconverted, and since L10 is at or above Leq in any real environment, the unconverted comparison is conservative in the direction that matters.",
        },
        {
          lead: "On converting Leq to L10.",
          text: "The MTA published Leq; CEQR is written in L10. Applying the impact statement's own site-measured offset of plus 4 dB implies roughly L10 of 88.6 dBA at the library and 91.5 at the dog run. The paper states three limitations rather than burying them: these are estimates, the offset is borrowed from a site eighteen years earlier, and CEQR's descriptor is on a one-hour basis while the MTA's public sessions ran 19 to 38 minutes. The library exceedance survives all three because it holds unconverted; the converted figures should be treated as indicative. Recovering the raw time histories is a Phase 1 task.",
        },
        {
          lead: "The federal yardstick.",
          text: "The Federal Transit Administration's manual sets 65 dB Ldn as the threshold for a normally unacceptable living environment and 75 dB Ldn as unacceptable. Critically for how a design-build brief should be written, it says the goal of mitigation is to gain substantial noise reduction, not simply to reduce predicted levels to just below the severe impact threshold.",
        },
        {
          lead: "The gap: a compliance schedule whose standard was never established.",
          text: "An earlier draft claimed Public Authorities Law section 1204-a imposes only a reporting duty. That was wrong, and the correction is the most important legal finding in the paper. Read in full, the statute defines subways to include elevated structures. It protects any person who is within range of subway noise, not only riders. It prescribes measurement reflecting the worst case of noise exposure. And it required an abatement study against a sound level table with percentage-compliance milestones at four, eight and twelve years, with a duty to explain any failure to meet them.",
        },
        {
          table: {
            caption:
              "The statute's sound level table. Category IV is the category the Manhattan Bridge falls in.",
            headers: ["Category", "Sound level", "4 years", "8 years", "12 years"],
            rows: [
              ["I. Car interior, new cars", "80 dBA", "100%", "100%", "100%"],
              ["I. Car interior, old cars", "85 dBA", "20%", "40%", "70%"],
              ["II. Curve and brake screech", "No screech", "20 to 100%", "60 to 100%", "100%"],
              ["III. Station, trains entering, leaving, passing", "105 / 90 / 85 / 80 dBA", "85 / 70 / 50 / 5%", "90 / 80 / 60 / 15%", "100 / 95 / 80 / 60%"],
              ["IV. Elevated structures", "Sound level to be established", "10%", "30%", "60%"],
            ],
          },
        },
        "The legislature wrote a compliance percentage for elevated structures against a sound level it left blank, and no evidence was found that the level was ever established. The duty exists. The schedule exists. The receptor class explicitly includes neighbours. What is missing is the number, and without the number, 60 per cent compliance within twelve years is arithmetic performed on an empty set.",
        {
          lead: "Three substitutions in the MTA's reporting.",
          text: "Against that backdrop, the MTA's own benchmark reads differently. It reports that the noise exposure of the riding public is substantially less than the OSHA maximum acceptable dose for eight hours of continuous exposure. The receptor has been substituted, riders in place of the statute's broader class. The standard has been substituted, an occupational hearing-conservation criterion in place of community-noise health guidance. And the metric has been substituted, an eight-hour occupational dose applied to residents exposed far longer at one train every 76 seconds. What remains true from the earlier draft is the narrower claim that no presently enforceable receptor-based noise limit binding MTA operations at this location was located; the paper now flags even that as provisional, pending legal research it has not done.",
        },
      ],
    },
    {
      id: "physical-cause",
      number: "05",
      title: "What is physically causing it",
      paragraphs: [
        {
          lead: "A weight-optimised torsional machine with trains on its wingtips.",
          text: "The Manhattan Bridge was the first suspension bridge in the world to use a lightly-webbed weight-saving Warren truss, designed on deflection theory precisely so it could use lighter trusses. Its four subway tracks flank the outer edges of the deck, which causes torsional stress every time a train crosses. As built, the deck sagged by as much as 0.9 metres under a train and, before rehabilitation, twisted up to 2.4 metres, cracking floor beams and forcing a 22-year reconstruction between 1982 and 2004. The subway tracks sit exactly where added mass is most structurally punitive. These facts come from a tertiary source and must be re-sourced from record drawings before any design; the paper says so.",
        },
        {
          lead: "The source is impact-dominated, two agencies say so, and neither has proved it.",
          text: "The MTA's environmental engineers set their meter for impulsive sound because of indications that the noise is caused by sudden impact with a track element. The paper adds two honest caveats: the fast setting was statutorily required regardless, and fast time-weighting does not establish impulsiveness in the technical sense. What the memorandum supplies is a stated field hypothesis by the operator's own engineers, not a measurement. Independently, the 2005 impact statement identified the radiating mechanism: the bridge's rigid steel structure serves as an efficient radiator of the wheel-rail noise generated each time a train passes. The one measured support for the impact character is the 16 dBA spread between L10 and L90, the signature of an event-dominated source.",
        },
        {
          lead: "Continuous welded rail is excluded from precisely this class of structure.",
          text: "The MTA's report states that continuous welded rail, its own highest-rated treatment at 8 to 10 dBA of reduction with resilient fasteners, is installed underground and at grade but not on elevated track, due to thermal expansion and the need to modify structure and rail fixation. A systemwide policy statement implies the bridge is unlikely to carry welded rail; it does not document the bridge's actual joint inventory, and no located source does. Obtaining that inventory is a Phase 1 deliverable, not an established fact.",
        },
        {
          lead: "An operational lever hiding in the impact statement.",
          text: "The 2005 review observed that the evening peak train-only level was slightly lower than the midday level at the same site, despite more trains, and attributed the difference to reduced speeds in the peak. That is an observed speed-noise relationship at this site, produced incidentally by congestion. It implies a zero-capital, zero-mass operational mitigation: a modest speed restriction across the span. The paper does not recommend it, since the rider-time cost is real and the inference is hedged, but flags it as the only lever in the entire option space that requires no procurement at all, and one nobody has quantified.",
        },
        {
          lead: "The federal manual concedes the mechanism and declines to quantify it.",
          text: "The FTA's table of source treatments gives numbers for damped wheels, vehicle skirts and undercar absorption, and for movable-point frogs, the nearest analogue to gap elimination, says only that they reduce impact noise. The controlling federal design manual, which a US transit agency would ordinarily use to size and justify a mitigation, provides no insertion-loss figure for the treatment class this site appears to require. A designer following it cannot predict the benefit, and therefore cannot build a benefit-cost case.",
        },
        {
          lead: "The competing hypothesis nobody has tested: façade reflection.",
          text: "Residents told the Brooklyn Paper in 2008 that new high-rise condominiums had made the problem worse by bouncing train noise off their façades into lower buildings. If a material share of received energy is reflected rather than direct, source control still works, but barrier siting becomes non-obvious, predicted insertion loss becomes unreliable, and the worst-affected building may not be the nearest one. The 2005 impact statement did model reflection, but only for receivers beyond the expressway, never for the DUMBO street canyon. The technique has existed longer than the allegation and has never been applied here.",
        },
      ],
    },
    {
      id: "what-has-been-tried",
      number: "06",
      title: "What has been tried, and how well it works",
      paragraphs: [
        {
          table: {
            caption:
              "The MTA's own claimed reductions, from its statutory report. None carries a citation, a measurement date, a frequency band or a site.",
            headers: ["Treatment", "MTA's claimed reduction"],
            rows: [
              ["Traction motor noise reduction", "5 to 7 dBA"],
              ["Resilient rail fasteners on steel elevated structures (introduction)", "3 to 5 dBA"],
              ["Resilient rail fasteners (2023 progress section)", "3 to 5 dBA underground and 6 to 8 dBA on elevated tracks"],
              ["Ring damped wheels", "15 to 20 dBA screech reduction"],
              ["Rail welding", "9 to 10 dBA"],
              ["Continuous welded rail with resilient fasteners", "8 to 10 dBA"],
            ],
          },
        },
        "Contradiction detected. The same document, in two places, gives materially different figures for the same treatment on the same structure class. One of them is wrong, or they measure different things and the report does not say which. Under the credibility rubric these are unsourced agency assertions, yet they are the numbers on which the MTA's entire public account of its noise programme rests.",
        {
          lead: "What the MTA has and has not deployed.",
          text: "In 2022 and 2023 zero track-feet of low vibration track was added, and none was projected for 2024. Top-of-rail friction modifiers were added: 12 units in 2023, 4 in 2024, 23 in 2025. Systemwide noise-programme spend in 2023 was 32.8 million dollars on materials and 124.8 million on labour; in 2025, 19.6 million on materials and the same 124.8 million on labour. Labour is roughly four times material cost and flat year over year. Part 9 argues this ratio, not the acoustics, is the true governing constraint.",
        },
        {
          table: {
            caption:
              "The federal path-treatment catalogue, FTA Report 0123, Table 4-34.",
            headers: ["Mitigation measure", "Effectiveness"],
            rows: [
              ["Noise barriers close to vehicles", "6 to 15 dB"],
              ["Noise barriers at right-of-way line", "3 to 15 dB"],
              ["Alteration of horizontal and vertical alignments", "Varied"],
              ["Acquisition of buffer zones", "Varied"],
              ["Ballast on at-grade guideway", "3 dB"],
              ["Ballast on aerial guideway", "5 dB"],
              ["Resilient track support on aerial guideway", "Varied"],
              ["Vegetation and trees", "Varied"],
            ],
          },
        },
        "Ballast on an aerial guideway means adding dead load to the outer edges of a span designed to minimise weight; a floating slab trackbed means adding considerably more. Whether that is acceptable depends entirely on the current load rating, which nobody has obtained. Two rows are foreclosed for non-structural reasons: alignment alteration means moving a subway, and buffer-zone acquisition means buying DUMBO. What is available regardless of the mass answer is the highest-performing path treatment in the catalogue, barriers close to vehicles, and resilient track support.",
        {
          lead: "Treatments with better-evidenced performance.",
          text: "Rail dampers, a viscoelastic constrained-layer system applied to the rail web, report A-weighted reductions of 0.7 to 9.7 dB, and up to 11.8 dB in the 50 to 1000 Hz range with the caveat that tuning to the dominant noise matters. Acoustic rail grinding is reported to give up to 8 dB(A), with a further 4 dB(A) from wheel-tread roundness. These rest on snippet-level sources; the authoritative transit-sector reference, TCRP Report 23, should be obtained in full before any design work.",
        },
        {
          lead: "The accountability trail, and where it stops.",
          text: "In June 2022 a resident wrote to the MTA suggesting the joints between the rails be modified to eliminate impact sounds. Within two days, three Maintenance of Way officers determined the suggestion was infeasible. Environmental Services measured 94.4 dB(A) at Front and Pine on 10 June. A clarification went to Track Engineering on 14 June; thereafter, no further correspondence was conducted. In August 2023 Assembly Member Jo Anne Simon wrote to the MTA chair noting her office had been in contact since 2022 with limited progress. The twelve-location survey followed in November and December 2023. The 2024 statutory report records eight follow-up measurements in DUMBO. The 2025 report, searched for Manhattan Bridge, DUMBO, Jay Street, Front Street and anchorage, returns zero matches. DUMBO has disappeared from the statutory report entirely.",
        },
        {
          lead: "A juxtaposition worth noting, and it is not a controlled comparison.",
          text: "In the 2024 report, immediately after the DUMBO follow-ups, the MTA writes of a Coney Island complaint that progress is being made towards installing newer top-of-rail friction modifiers. Complaint, measurement, named treatment for one site; complaint, measurement, eight re-measurements, silence for the other. The paper is explicit that the sites differ in geometry and in whether the named treatment even applies, and that the juxtaposition is not evidence of neglect. What it shows is that the published record contains a committed action for one complaint and none for the other, in the same paragraph of the same report. That is a legitimate records question, and it is posed as one.",
        },
      ],
    },
    {
      id: "mass-constraint",
      number: "07",
      title: "The constraint nobody has named, and nobody has measured",
      paragraphs: [
        "Every prior treatment of this problem has implicitly asked which treatment is quietest. That is an incomplete question for this structure. The fuller one is: what is the maximum acoustic insertion loss achievable per kilogram of added mass, on the torsionally sensitive outer edge of a deliberately weight-minimised suspension bridge, installed within nightly engineering access windows, on a substrate subject to large live-load displacement, and surviving marine exposure for a fifty-year service life? The paper calls this the mass-constrained insertion-loss problem.",
        {
          lead: "A necessary correction: the mass constraint is a hypothesis, not a finding.",
          text: "An earlier draft treated mass as a binary disqualifier that eliminated dense barriers, ballast, floating slab and enclosure outright. That over-claimed, and the over-claim was the document's weakest link. What is established is the design philosophy and the torsional failure history. What is not established, and was not located in any source, is the current load rating after the 1982 to 2004 reconstruction, the allowable added dead load at the track zone, the allowable eccentric moment, the wind-area limits for any added vertical surface, attachment fatigue capacity, and present-day measured deflection. Weight-optimised in 1909 does not entail cannot accept added dead load in 2026.",
        },
        "So the honest formulation is a conditional, and it is still decision-relevant: until the allowable mass, moment, wind-area and attachment-fatigue budget at the track zone is known, no mitigation can be responsibly selected, because the entire heavy-treatment branch of the option space is neither available nor excluded. This is why obtaining the load rating is Phase 1, Task 1, ahead of acoustics. It is a records request and a structural review, not a research programme, and twenty-one years of record show no evidence it has been performed for acoustic purposes.",
        {
          intro: "The four coupled constraints, with the status of each:",
          list: [
            "C1, mass, moment and wind area. Unquantified. Treated as a live design variable to be budgeted, not a binary filter.",
            "C2, motion. Magnitude unknown at present. The historical sag figure is not a current one. What governs treatment durability is local strain, curvature and relative displacement at candidate attachment points, which has never been measured on this bridge.",
            "C3, access. Well evidenced. Installation and maintenance occur in night and weekend windows on a four-track river crossing with no practical bus substitution. This is the best-established constraint and does not depend on the mass question at all.",
            "C4, environment. Qualitatively certain, quantitatively unspecified. Marine salt exposure, on the order of 500 passages a day, and a structure the City intends to keep for many decades.",
          ],
        },
        "Of the four, only access is presently established. That asymmetry is itself a finding: the constraint most likely to govern what can actually be built is the one nobody has costed, and the constraint most often assumed, mass, is the one nobody has measured.",
      ],
    },
    {
      id: "materials-and-robotics",
      number: "08",
      title: "Materials and robotics, if the mass budget is tight",
      paragraphs: [
        "Parts 7 and 8 of the paper are conditional on the tight case. If the structural review returns a generous envelope, most of this becomes optional rather than necessary. If mass binds, it forces a search for acoustic performance decoupled from areal density, the one thing conventional barrier design cannot offer, since mass law ties transmission loss to mass per unit area.",
        {
          lead: "Acoustic metamaterials and sonic crystals.",
          text: "Locally resonant and periodic structures achieve attenuation through engineered resonance and band-gap physics rather than bulk mass. Sonic crystal barriers have been studied for train brake noise; low-height near-field barriers are an active challenge area; locally resonant metamaterials can be 3D-printed. Metamaterial performance is a function of geometry, and geometry is what additive manufacturing delivers cheaply, so a lattice barrier could be tuned to the actual measured spectrum of Manhattan Bridge impact noise. That requires the spectrum first. All of this rests on snippet-level sources and the paper says it should be read as a research agenda, not a finding.",
        },
        {
          lead: "Constrained-layer damping on the structure.",
          text: "The rail-web damping principle generalises to the radiating structure: the bridge's deep floor beams and stringers present a very large radiating surface, and a viscoelastic core with a thin constraining skin carries a small mass penalty. The unknown is durability. No fatigue or degradation law exists for such damping under a hundred million cycles of large-amplitude bridge deflection plus marine salt exposure.",
        },
        {
          table: {
            caption:
              "The candidate set, ordered by ascending mass. The last four rows were marked as failing the mass constraint in an earlier draft; they are unresolved, not eliminated.",
            headers: ["Option", "Mass penalty", "Evidence quality", "Verdict"],
            rows: [
              ["Rail dampers", "Very low", "Moderate, 0.7 to 11.8 dB reported", "Survives"],
              ["Acoustic rail grinding", "Zero", "Moderate, up to 8 dB(A)", "Survives, do first"],
              ["Top-of-rail friction modifiers", "Zero", "MTA already deploys", "Survives"],
              ["Joint elimination or gap engineering", "Zero to negative", "None quantified", "Survives, but unevidenced"],
              ["Metamaterial near-field barrier", "Low", "Emerging, not transit-proven", "Survives, needs development"],
              ["Damping on floor beams and stringers", "Low", "Principle sound, durability unknown", "Survives, needs qualification"],
              ["Under-deck absorptive treatment", "Low to moderate", "Referenced products exist", "Conditional"],
              ["Resilient fasteners", "Low", "MTA claims 6 to 8 dBA, contested", "Survives"],
              ["Conventional dense noise barrier", "High", "Well established", "Contingent on the mass budget"],
              ["Ballast on aerial guideway", "High", "FTA-quantified, 5 dB", "Contingent on the mass budget"],
              ["Floating slab trackbed", "Very high", "FTA-quantified, 15 dB", "Contingent on the mass budget"],
              ["Full enclosure", "Very high", "Effective elsewhere", "Contingent on mass budget and wind area"],
            ],
          },
        },
        "The strategy that emerges is not one treatment but a stacked, source-and-near-field package, sequenced by ascending mass, cost and irreversibility, so that the low-mass, high-certainty measures are taken while the structural envelope for the heavier ones is still being established. That sequencing is robust to the outcome of the mass question, which is its main virtue.",
        {
          lead: "Additive manufacturing on site is now field-demonstrated.",
          text: "In 2025 a cold-spray steel deposition repair was demonstrated on a corroded bridge in Great Barrington, Massachusetts, because stationary bridges cannot be brought to the printer, so the printer must be brought on site. Three limits must be stated plainly: it was demonstrated on a static, decommissioned bridge; for structural steel restoration, not acoustic geometry; and the relevant tolerance question is local relative displacement at the deposition interface, which has never been measured here. What it establishes is the general proposition that additive processes can now be brought to a bridge. Whether that generalises to acoustic geometries on a live, moving structure inside a three-to-four-hour window is unknown and, as far as the review can establish, unasked.",
        },
        {
          lead: "Robotic access and the maintenance thesis.",
          text: "Magnetic-adhesion climbing robots for steel bridge inspection are an established research area with field-deployed systems. The Manhattan Bridge is an unusually favourable target: continuous ferromagnetic steel, enormous surface area, and an underside largely inaccessible to humans without staging but fully accessible to a crawler. The value here is not novelty; it is that robotics changes the economics of reversibility. A treatment a crawler can inspect nightly and re-deposit locally can be deployed incrementally, evaluated against untreated control spans, maintained without consuming the access windows that installation needs, and abandoned cheaply if it fails, which is the single most important property for a first-of-kind treatment on a landmark structure.",
        },
      ],
    },
    {
      id: "labor-and-access",
      number: "09",
      title: "Labour, access and maintenance",
      paragraphs: [
        "Track work on New York City Transit requires General Orders and flagging protection. The MTA's own reform literature describes closing entire lines for 54 hours at a time on weekends with twelve- and sixteen-hour shifts to maximise productivity. The Manhattan Bridge is a four-track crossing carrying four services with no parallel capacity, and long closures are extraordinarily costly in rider-hours. The realistic envelope is nightly windows and occasional weekend outages, which caps installable length per shift and therefore drives total programme duration more than any material cost.",
        {
          lead: "The productivity inversion.",
          text: "This yields a design criterion absent from every mitigation catalogue reviewed: treatments should be ranked by decibels gained per available access-hour, not by decibels alone. Under that ranking, acoustic rail grinding, performed by on-track machines within routine maintenance windows, plausibly outranks a metamaterial barrier that must be fastened metre by metre, even if the barrier's peak insertion loss is higher. No published study ranks rail-noise treatments this way.",
        },
        {
          lead: "Whole-life cost.",
          text: "Systemwide, the MTA's noise programme is labour-dominated by roughly four to six times. A treatment that halves material cost while increasing maintenance labour is likely a net loss; a more expensive material that a robot can service is likely a net gain. Any business case built on capital cost alone will select the wrong option. The paper adds the caveat that these are aggregate figures, not marginal costs for this bridge, and that its argument needs only the weaker premise that access time on this structure is scarce and expensive.",
        },
      ],
    },
    {
      id: "questions-not-asked",
      number: "10",
      title: "The questions that have not been asked of this site",
      paragraphs: [
        "These were derived by applying the CoLab's gap-identification and contradiction-detection method to Parts 1 to 9. The title claim is deliberately narrowed. None of the questions asserts that its underlying research topic is novel; railway source separation, jointed-versus-welded rail noise, street-canyon reflection, railway annoyance corrections and vibroacoustic bridge optimisation are all mature fields. What is claimed is that no answer to these questions, for the Manhattan Bridge and the DUMBO receptor community, was located in the public record. That is a claim about a bounded, one-pass, English-language search, and the paper records that exactly such a claim already failed once. Every not-found is provisional.",
        {
          lead: "Q1. What is the quantified apportionment among sub-mechanisms? The keystone question.",
          text: "The 2005 impact statement settled the first-order question: trains dominate and the structure radiates. That is not the gap. Nobody has apportioned the train share among its sub-mechanisms. The impact statement asserted structural re-radiation qualitatively; the MTA asserted joint impact qualitatively; neither quantified either, and the two imply different treatments. An earlier draft asked for four percentages. That formulation is withdrawn as ill-posed, because the mechanisms are not disjoint and do not sum. The correct object is a source-radiator-path matrix, resolved by one-third-octave band and by receptor, in which each cell is a counterfactual contribution with cross terms reported rather than hidden. Neither institution had a reason to ask the question whose answer would obligate someone to act.",
        },
        {
          lead: "Q2. What is the insertion loss of rail-gap elimination on a large-movement structure?",
          text: "Jointed-versus-welded differences have been quantified elsewhere. What was not located is a figure for gap reduction where joints exist because the structure requires expansion capability. The MTA excludes welded rail from elevated track categorically without publishing the movement budget that justifies the exclusion, so the constraint cannot be checked or partially relaxed. A resident posed this question in 2022 and it was closed by email in two days.",
        },
        {
          lead: "Q3. How much received energy is reflected rather than direct?",
          text: "No 3D urban-acoustic model of the DUMBO canyon was located. It crosses a disciplinary boundary: reflection in canyons is an urban-acoustics question, rail noise is a transit-engineering question, and no party owns the intersection. It unblocks barrier siting and sizing, not barrier viability.",
        },
        {
          lead: "Q4. Which noise metric actually predicts harm for this stimulus?",
          text: "The field at this site is strongly event-dominated, yet the governing standards carry no information about event rate, crest factor or rise time. The paper corrects its own earlier terminology: L10 and L90 are percentiles, not energy averages, and do carry some intermittency information; Leq is not blind to loud events but discards their temporal pattern. The defensible claim is that equal-Leq exposures with very different temporal structure are not equally harmful, and no descriptor in the binding set resolves the difference. What must be measured replaces which metric is right: Leq, per-event maximum and peak, sound exposure level per event, event counts by hour, one-hour L10, spectra, and an accepted impulsiveness measure.",
        },
        {
          lead: "Q5. Should the standard apply to the public realm rather than private interiors?",
          text: "The residential figures are low because residents privately bought glazing. The public realm cannot be glazed and is the true unmitigated exposure. This has already been formally adjudicated in the wrong direction, in 2005. Noise policy has no natural instrument for the finding that the public realm is uninhabitable and no one caused it recently. It converts a nuisance complaint into a public-realm equity claim, and identifies the doctrinal move to contest: treating infeasible as a finding rather than a hypothesis.",
        },
        {
          lead: "Q6 to Q9. The engineering questions.",
          text: "What is the durability law for low-mass damping under a hundred million deflection cycles and marine exposure? Can additive manufacturing hold tolerance on a moving structure, posed in terms of local motion at the deposition interface? Can a long-span suspension bridge be acoustically re-tuned rather than clad, the only class of solution with a potentially negative mass penalty? And what is the decibel gain per access-hour for each candidate treatment, the question acousticians and operations staff never meet to ask?",
        },
        {
          lead: "Q10. What is the health and economic burden on the exposed community?",
          text: "Peer-reviewed work on New York transit noise exists, and it is good, but it measures riders and platform users, people inside the system briefly and by choice. No study measures the people the system is loud at. The rider is the transit agency's constituent; the neighbour is nobody's constituent, so nobody funds the study.",
        },
        {
          lead: "Q11. What legal instrument could create a receptor-based obligation?",
          text: "The question splits in two, and the first half is far cheaper. Could Category IV simply be filled in? The statutory machinery, measurement basis, protected class, compliance percentages and the duty to explain non-compliance, already exists and would activate the moment a number is set. Establishing that number may require no new legislation at all. The paper calls this the single highest-leverage legal question in the document. Only if that fails does the question become what new instrument would serve.",
        },
        {
          lead: "Q12. Why did DUMBO fall out of the statutory report?",
          text: "Eight follow-up measurements in 2024; zero mentions in 2025. Posed strictly as a records question: what internal decision, if any, closed the matter between the two reporting periods, and on what technical basis? If there was a determination, it should exist in writing. If there was none, that too is a finding. It is a directly answerable freedom-of-information request, costs nothing, and is the fastest available accountability lever.",
        },
        {
          lead: "Q13. What is the allowable mass, moment and wind-area budget at the track zone?",
          text: "Structural capacity is reviewed for structural purposes. Nobody has requested it for an acoustic purpose, because no acoustic project has ever reached the point of needing it. It unblocks roughly half the option space in one records request. The paper calls it the cheapest high-value question in the document, asked last only because its importance emerged from red-teaming rather than from the literature.",
        },
      ],
    },
    {
      id: "how-to-answer",
      number: "11",
      title: "How to answer them",
      paragraphs: [
        {
          lead: "Method 0, prerequisite. Documentary and structural envelope review.",
          text: "Not research. A records request, a structural review by a qualified bridge engineer, and a freedom-of-information filing. It requires no instrumentation, no access windows and no capital, and it resolves two of the document's largest uncertainties, the mass budget and the joint inventory, by paperwork. No amount of acoustic sophistication substitutes for it.",
        },
        {
          lead: "Method 1, most appropriate. Instrumented source apportionment.",
          text: "A synchronised multi-channel microphone array with acoustic beamforming at street-level and elevated positions, time-synchronised to accelerometers on rail, fastener, stringer and floor beam, capturing at least 200 passages across two seasons with consist and speed logged. Coherence between structural accelerometry and far-field pressure separates structure-borne re-radiation from airborne rolling noise. The paper withdraws an earlier claim that temperature is a clean instrument for joint-gap width; it affects too many other things at once. Direct measurement of gap width should be specified instead. It is the only method that makes every other decision non-arbitrary, and it is cheap relative to any construction.",
        },
        {
          lead: "Method 2. Staged treatment with untreated control spans.",
          text: "Treat contiguous span segments sequentially, grinding then friction modifiers then dampers then a near-field barrier, leaving matched segments untreated, with permanent monitoring throughout and a difference-in-differences design. The paper is honest about the threat: on a continuously connected steel structure with a shared acoustic field, spillover between segments is likely, biases estimates toward zero and can invalidate the design outright. Mitigations must be in the scope: substantial buffers, a measured spatial decay of the treatment effect, and a pre-registered decision rule for abandoning the design in favour of an interrupted time series on the whole span.",
        },
        {
          lead: "Method 3. A validated hybrid model of the bridge, track and canyon.",
          text: "Finite and boundary element modelling at low to mid frequency, statistical energy analysis above the modal overlap threshold, coupled to a 3D urban propagation model of DUMBO's built form. It is the only route to structural re-tuning and to counterfactual design testing, but it is worthless uncalibrated, so calibration against Method 1 is mandatory.",
        },
        {
          lead: "Method 4. A longitudinal health and exposure panel.",
          text: "Repeated measures on residents, workers and library users with personal dosimetry, actigraphy for sleep fragmentation, and validated annoyance instruments, exploiting service changes and planned outages as natural experiments. Any programmed bridge closure should be instrumented in advance. Highest value for the policy case, longest lead time, and dependent on Method 1 for a defensible exposure metric.",
        },
        {
          lead: "Method 5, least appropriate. Hedonic property-value analysis.",
          text: "DUMBO's residential market is dominated by waterfront and skyline amenity value that rises with bridge proximity. The noise disamenity and the view amenity increase together, so identification is likely infeasible without an unusually sharp instrument, and a naive regression would plausibly return a positive coefficient on noise. Report as supporting evidence only, or not at all.",
        },
      ],
    },
    {
      id: "project-to-procure",
      number: "12",
      title: "The project to procure",
      paragraphs: [
        {
          lead: "Delivery vehicle, and why the choice is not yet obvious.",
          text: "An earlier draft asserted that progressive design-build is the appropriate vehicle. That inference does not follow: unknown source apportionment implies scope cannot be fixed at award, but it does not by itself select a delivery method. Four options should be compared. An owner-led independent diagnostic followed by a separate delivery procurement keeps the diagnostician disinterested in the answer, at the cost of two procurements and the risk of a report nobody is contracted to act on. Progressive design-build handles undefined scope with a single accountable party, but carries a real conflict of interest: the party that diagnoses the problem also prices the cure. That must be answered, not waved at: procure the diagnostic separately, publish the raw data, require independent review before the Phase 2 gate, and pre-commit the gate criteria.",
        },
        {
          intro:
            "Phase 1, diagnose. Nine to twelve months, low capital. Ordered by prerequisite, not by discipline:",
          list: [
            "Structural envelope review, first and cheapest. Obtain the current load rating and produce an explicit budget for added dead load, eccentric moment, wind area and attachment fatigue.",
            "Local motion characterisation at candidate attachment points, replacing the historical deflection figures, which must not be relied on.",
            "Asset inventory from record drawings: actual joint type, count, condition and location across the four tracks, and the expansion-device movement budget.",
            "Method 1 source apportionment, including direct measurement of joint gap width.",
            "Data recovery: a freedom-of-information request for the raw 2022 to 2024 time histories, to compute one-hour L10 properly, with the measurement metadata the record currently lacks.",
            "Baseline permanent monitoring at the library, the Archway, the dog run and a residential sample, reporting the full descriptor set, not Leq alone.",
          ],
          ordered: true,
        },
        "The Phase 1 gate is the source-radiator-path matrix of Q1, by band and receptor, with counterfactual contributions and confidence intervals. Phase 2 is not priced until that exists and has been independently reviewed.",
        {
          intro:
            "Phase 2, treat, staged and instrumented, over several years. Sequenced by decibels per access-hour, cheapest and most reversible first:",
          list: [
            "Acoustic rail grinding: zero added mass, existing machinery, routine windows.",
            "Top-of-rail friction modifiers: zero mass, already in the MTA's catalogue and budget.",
            "Rail dampers: very low mass, reversible.",
            "Joint and gap engineering, subject to the answer to Q2; potentially the largest single win.",
            "A low-mass near-field barrier tuned to the Phase 1 spectrum, subject to durability qualification.",
            "Damping on floor beams or under-deck absorption, subject to Q1 showing structure-borne re-radiation is material.",
          ],
          ordered: true,
        },
        "Each stage retains untreated control spans. Each stage is measured before the next is authorised. A robotic inspection and service model is specified from the outset so that maintenance does not consume the access windows installation needs.",
        {
          lead: "Success criteria: attributable reduction, not absolute ambient.",
          text: "This section was rewritten after red-teaming. An earlier draft proposed bringing the public realm below the City's open-space threshold. That criterion is unachievable by a rail project and should never have been written: the dog run's background level with no train present was 65 dB(A), already 10 dB above the 55 dBA serenity threshold, so an intervention removing 100 per cent of train noise would still fail. Writing an unachievable criterion into a procurement guarantees the project is judged a failure however well it performs. The criteria are therefore counterfactual and attributable: a stated minimum reduction in the train-only contribution at named public receptors, measured by the same source-separation method used in Phase 1; stated reductions in sound exposure per event, per-event maximum, and the L10 to L90 spread; the train-attributable increment reported relative to the City's bands with the non-rail residual explicitly excluded; everything measured over a full seasonal cycle with published raw data; and a durable, receptor-based obligation that survives contract close-out.",
        },
        "The honest corollary: if the residual non-rail ambient in DUMBO is genuinely 65 dB(A), then even a fully successful rail project leaves the public realm above the City's serenity threshold. That is not an argument against doing it; trains are the dominant source by 14 dB and removing the dominant source is the largest single improvement available. It is an argument for saying so at the outset, so that success is defined in terms the project can deliver.",
      ],
    },
    {
      id: "red-team",
      number: "13",
      title: "Red team: where this document may be wrong",
      paragraphs: [
        "Per the CoLab's proposal that AI-assisted research should include a second, adversarial pass, applied to the paper's own claims. The first pass returned a verdict of not ready to justify procurement and nine blocking issues. All are corrected in place, with the original claim quoted and the reasoning shown. Nothing was quietly deleted.",
        {
          list: [
            "The Leq to L10 conversion is an estimate, not a computation. The clearly unacceptable finding at John and Adams no longer depends on it, but the library and dog-run figures are still converted. A referee may hold those two numbers as estimates.",
            "CEQR does not legally bind existing operations. The paper uses the City's thresholds as a yardstick of reasonableness, not an enforceable standard. The 2005 impact statement demonstrates the limit: it applied the criteria, found clearly unacceptable levels, and still required mitigation of no one.",
            "The structural facts come from a tertiary source, and the mass argument has been weakened accordingly. The historical sag and twist figures pre-date the reconstruction and are not current. Both earlier uses of them are withdrawn.",
            "Source apportionment might come back boring. If the noise is ordinary rolling noise rather than discontinuity impact, the priority order in Part 12 changes substantially. The MTA's impact remark is a field judgement recorded in a memo, not a measurement.",
            "The metamaterial option is the least evidenced thing in the document, and its motivating premise is now conditional. Nothing cited demonstrates a metamaterial barrier surviving a decade on a marine steel bridge. The paper recommends qualifying them, and only if the mass budget proves tight.",
            "The Coney Island juxtaposition is not a controlled comparison and no causal claim is made from it. Earlier causal language has been removed.",
            "Selection bias in the residential measurements. Households were recruited by a resident organiser; volunteers in a noise dispute are not a random sample, and the sample is restricted to residents who have not moved away. Survivorship bias plausibly makes these numbers conservative.",
            "Citation verification is incomplete by design. Thirteen sources are verified, twenty are snippet-level, five counter-citations are unverified. TCRP Report 23 and the WHO environmental noise guidelines are load-bearing and must be obtained in full before the document is used to justify expenditure.",
            "The document was assembled with AI research assistance, in English, via one search API, weighted toward open-access and government sources. Japanese, Chinese and German-language elevated-transit literature very likely contains directly relevant retrofit precedent and was not searched.",
            "A significant not-found claim and a significant legal claim in the first draft were both wrong. Both errors came from summarising a source rather than opening it. Every remaining not-found is a claim about what a bounded search retrieved, and given that two such claims already failed, the prior on others failing is not low. The document's novelty claims remain its most fragile component; its measured facts are its most solid.",
          ],
          ordered: true,
        },
        {
          lead: "Strongest, weakest, most useful.",
          text: "Strongest: the measured one-hour L10 of about 81 dBA at John and Adams Street against a clearly unacceptable threshold of 80, and the 14 dB train-versus-traffic separation at the same site. Neither requires conversion, inference or estimation. Weakest: the mass constraint, now correctly stated as an open question, and the novelty claims in Part 10. Most useful: not the mitigation proposals but the prerequisite list. The structural envelope, the joint inventory, the raw time histories and the Category IV records question are all obtainable by request rather than research, none has been done in twenty-one years, and each closes a larger uncertainty than any further reading could.",
        },
      ],
    },
    {
      id: "what-came-after",
      number: "14",
      title: "What the repository built afterwards",
      paragraphs: [
        "The problem definition was the first document in a repository that has since grown to twelve, with interactive demonstrations, runnable data-collection scripts, field captures, and its own usage and procurement ledgers. Four results from that later work bear directly on the paper above and are recorded here because two of them withdraw claims the programme had made.",
        {
          lead: "Rail noise in New York City is not under-reported. It is unreportable.",
          text: "A search for community recordings found none, and found the structural reason. Three instruments for recording urban noise in the city each contain no category for rail. NYC 311, the complaint system cited whenever anyone says noise is New York's top quality-of-life complaint, has no rail category: every complaint type matching subway, train or rail since 2020 is a guard rail or a trailer. The NYU sensor network SONYC, with 150 million recorded clips, has a class for dog and none for rail, and its taxonomy was built in consultation with the city's noise code, which also has none. Within 500 metres of the dog run where the MTA measured 87.50 dB(A), residents have filed 4,055 noise complaints since 2020, and not one of them can be about the train. That circle produced 95 complaints about barking dogs. This is a mechanism, not a motive: the category was never created and every downstream instrument inherited the absence. It also yields the first remedy a resident could act on this month, since amending a taxonomy is a far smaller ask than solving the noise.",
        },
        {
          lead: "How often a train actually crosses, derived exactly from the MTA's own feed.",
          text: "Every acoustic argument in the paper depends on the crossing rate, and until this dataset it was taken from three short sessions. It is derivable for every hour of every day type from the published schedule, free and in about a minute.",
        },
        {
          chart: {
            kind: "bars",
            caption:
              "Manhattan Bridge traversals by the B, D, N and Q services, from the MTA's published schedule feed.",
            rows: [
              { label: "Weekday", value: 1073, valueLabel: "1,073" },
              { label: "Saturday", value: 667, valueLabel: "667" },
              { label: "Sunday", value: 651, valueLabel: "651" },
            ],
            data: {
              caption: "Traversals per day type, with the weekday rate by standard noise period.",
              headers: ["Day type", "Traversals", "Peak hour", "Daytime per hour", "Evening per hour", "Night per hour"],
              rows: [
                ["Weekday", "1,073", "67 at 08:00, a 54-second headway", "61.6", "48.0", "17.8"],
                ["Saturday", "667", "", "", "", ""],
                ["Sunday", "651", "", "", "", ""],
              ],
            },
          },
        },
        "Two things fell out of it that were not being looked for. The schedule cannot answer the overlap question, because every departure in the feed sits on an exact zero or thirty seconds, so counting simultaneous crossings measures the scheduler's rounding rather than the railway; an earlier 6.2 per cent overlap figure is withdrawn on that basis. And the claim that peak park use is out of phase with peak train frequency has been narrowed, because the affected corridor is far larger than the park and two of its three receptor populations are in phase.",
        {
          lead: "A claim the repository disproved by counting.",
          text: "Having withdrawn the park-phase finding, the programme replaced it with a confident statement that the worst case is the weekday morning, when the train rate is at its maximum. Then the pedestrian data arrived, built from four public datasets, none of which counts a pedestrian directly, and starting by avoiding a trap: turnstile entries measure people leaving the corridor, not arriving. The corridor fills in the morning and empties in the evening, so at the 08:00 train peak only about 46 per cent of the day's eventual population is present. Multiply presence by train rate and the weekday 08:00 hour scores 50 out of 100 on the exposure index. The peak is 14:00, and on Saturday and Sunday it is 13:00 and 15:00. Train rate is nearly flat from 07:00 to 19:00 while the number of people underneath changes by a factor of four. The same error was made twice, in opposite directions: first optimising on attendance alone, then on train rate alone. Exposure is the product, and it peaks between them.",
        },
        {
          lead: "A model that found the limit of its own data.",
          text: "A cohort model fits workers, visitors, transients and residents to the observed departure curve, to get from a flow to a stock. It works, and then reports that it cannot do the thing it was built to do. The total number of non-residents present is pinned to about plus or minus 10 per cent. The split between workers and visitors inside that total is not identified at all, because a departure curve carries no job titles: someone present for eight hours looks identical whether they came to work or came for the day. On a Saturday the model is explicitly degenerate. Total non-resident presence may be quoted. The worker-visitor split may not.",
        },
        {
          lead: "A propagation model that was built and then rejected.",
          text: "A line-source propagation model fitted to the four MTA measurement sites agreed with ideal spreading to within 0.15 dB, which looked like a genuine result. It is not one: a Monte Carlo test jittering the eye-digitised positions by ten metres puts the fitted decay exponent anywhere between 0.7 and 22.3. The model was deleted before publication rather than after. What survived is more useful. Distance does not order the measurements. The Archway, directly under the structure, is the quietest of the four sites, and the park's Main Street section, several hundred metres away across open water, is the loudest. Under-deck treatment, the intervention most often proposed and the first item in the residents' petition, would be applied where the measured problem is smallest. That is a cheap claim to test: one afternoon, a meter and a tape measure.",
        },
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "MTA New York City Transit. Noise Reduction Report, calendar year 2023, prepared pursuant to the Rapid Transit Noise Code and Public Authorities Law 1204-a. MTA document 138061. Verified. The primary evidence: all DUMBO measurements, the accountability trail, and the MTA's treatment claims.",
      url: "https://www.mta.info/document/138061",
    },
    {
      ref: "MTA New York City Transit. Noise Reduction Report, calendar year 2024. MTA document 189311. Verified. Eight DUMBO follow-up measurements; the Coney Island paragraph.",
      url: "https://www.mta.info/document/189311",
    },
    {
      ref: "MTA New York City Transit. Noise Reduction Report, calendar year 2025. MTA document 199371. Verified. Absence of DUMBO; 2025 financials.",
      url: "https://www.mta.info/document/199371",
    },
    {
      ref: "Brooklyn Bridge Park Final Environmental Impact Statement, Chapter 17, Noise. Measurements of 3, 4 and 8 May 2005. Verified. Source separation, L10(1) of about 81 dBA at John and Adams, the 16 dBA L10 to L90 spread, the efficient-radiator mechanism, and the no-feasible-mitigation finding.",
    },
    {
      ref: "New York Public Authorities Law section 1204-a, Rapid transit noise code. Full statutory text. Verified. Sound Level Table Category IV, elevated structures: sound level to be established.",
      url: "https://law.justia.com/codes/new-york/pba/article-5/title-9/1204-a/",
    },
    {
      ref: "NYC Mayor's Office of Environmental Coordination. CEQR Technical Manual, Chapter 19, Noise. December 2025 edition. Verified.",
      url: "https://www.nyc.gov/site/oec/environmental-quality-review/technical-manual.page",
    },
    {
      ref: "Federal Transit Administration. Transit Noise and Vibration Impact Assessment Manual, FTA Report 0123. Verified. Tables 4-33 and 4-34, mitigation effectiveness.",
      url: "https://www.transit.dot.gov/research-innovation/transit-noise-and-vibration-impact-assessment-manual-fta-report-no-0123",
    },
    {
      ref: "Neitzel, R., Gershon, R. R. M., Zeltser, M., Canton, A. and Akram, M. Noise levels associated with New York City's mass transit systems. American Journal of Public Health, 2009. Verified. Measures riders and platforms, not the exposed community.",
      url: "https://doi.org/10.2105/AJPH.2008.138297",
    },
    {
      ref: "Portlock, S. Deaf in DUMBO. Brooklyn Paper. Verified. Cited as testimony of lived experience, not as measurement.",
    },
    {
      ref: "Change.org. Reduce noise pollution in DUMBO from Manhattan Bridge train. Petition created 16 November 2025. Verified. Cited as evidence of community position and of the lay solution space.",
    },
    {
      ref: "Manhattan Bridge. Wikipedia. Verified. Used only for uncontested structural-historical facts, each separately footnoted there to ASCE and New York Times primary sources; see red-team item 3.",
      url: "https://en.wikipedia.org/wiki/Manhattan_Bridge",
    },
    {
      ref: "MIT News. Cold spray 3D printing technique proves effective for on-site bridge repair. 20 June 2025. Verified.",
    },
    {
      ref: "CHI Consulting Engineers. Bridging Gaps on the Manhattan Bridge. 26 October 2021. Verified. Movement-budget context for roadway joints, not track joints.",
    },
    {
      ref: "Transportation Research Board. TCRP Report 23, Wheel/Rail Noise Control Manual. Snippet. Load-bearing for Part 5; obtain in full before design.",
    },
    {
      ref: "World Health Organization. Environmental Noise Guidelines for the European Region, 2018. Snippet. Railway Lnight recommendation of 44 dB; obtain in full.",
      url: "https://www.who.int/europe/publications/i/item/9789289053563",
    },
    {
      ref: "MTA Office of the Inspector General. Maximizing Track Access Opportunities in Elevated Structures. Snippet. Access-window productivity.",
    },
    {
      ref: "NCDOT Research Report TA 2024-01, jointed versus welded rail noise. Unverified counter-citation bearing on Q2.",
    },
    {
      ref: "Liu, Q. et al. Vibroacoustics of steel railway bridges. Journal of Sound and Vibration, 2020. Unverified counter-citation bearing on Q8.",
    },
    {
      ref: "International Union of Railways. The Railway Noise Bonus. Unverified counter-citation bearing on Q4.",
    },
    {
      ref: "Rhodes, Y. E. III, Fossella, N., Shamie, A., Co, K., Badt, T., Lindsey, A., Driscoll, G., Townsend, M., Bracaj, P. and Jain, V. AI-Powered Assistance in Formulating Research Questions. Ethical Tech CoLab. The research-question methodology, journal rubric, citation-verification discipline and red-team concept applied throughout.",
      url: "/publications/ai-research-assistant",
    },
    {
      ref: "Ethical Tech CoLab. Silencing the Span: project repository, with the full problem definition, the five further documents, the interactive demonstrations, and the data-collection scripts and tables cited in Part 14.",
      url: "https://github.com/Ethical-Tech-CoLab/manhattan-bridge-noise-dumbo",
    },
  ] as Citation[],

  // The published site and the source repository.
  liveUrl: "https://ethical-tech-colab.github.io/manhattan-bridge-noise-dumbo/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/manhattan-bridge-noise-dumbo",
};
