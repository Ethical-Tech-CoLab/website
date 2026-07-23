// ─────────────────────────────────────────────────────────────────────────
// "After the Corridor", the Summer 2026 cohort's research report, carrying
// the evacuation portfolio past the corridor and into the camp. Transcribed
// from the source document. Rendered by
// src/app/publications/after-the-corridor/page.tsx. Kept here so the page
// stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

import type { Citation, Paragraph, ReportSection } from "./types";

export const afterTheCorridorReport = {
  eyebrow: "Publications · Academic report",
  title: "After the Corridor",
  subtitle:
    "From AI-Informed Evacuation to Digital Public Goods for Refugee Economic Inclusion",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "Carolina de Almeida Pernambuco Moron, Christine Lumen, Alana Robertson, Melanie MacKew, Carlos D. Ruiz, India Clarke, and Yago Rocha, with Teresa Cantero (PhD Candidate, Universidad Carlos III de Madrid; Adjunct Professor, IE University; Visiting Scholar, NYU CGA). Faculty directors: Prof. Yorke E. Rhodes III and Sylvia Maier.",
  repoUrl: "https://github.com/Ethical-Tech-CoLab",
  disclaimer:
    "The Ethical Tech CoLab is a research initiative of the NYU School of Professional Studies Center for Global Affairs, conducted in collaboration with Microsoft. Views and findings are those of the researchers and do not represent the official positions of New York University, Microsoft, UNHCR, WFP, or any partner institution. External programs cited are referenced as evidence, not as CoLab partnerships.",

  thesis:
    "How can AI inform evacuation decisions, and what happens after? This report examines the CoLab's five fielded evacuation prototypes, their limitations and research frontiers, and extends the arc to the camp: the measurement, financial-modeling, and rights infrastructure that can shorten protracted displacement and improve lives. Dzaleka Refugee Camp in Malawi is the case study ground.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "6",
      label:
        "built instruments: five fielded evacuation prototypes and a completed forced-labour risk index, all open source",
    },
    {
      value: "53k",
      label:
        "people now at Dzaleka, a camp built in 1994 for 10,000 to 12,000",
    },
    {
      value: "90%",
      label:
        "cut to UNHCR's Malawi budget, from about US$8 million to about US$1 million",
    },
    {
      value: "0",
      label:
        "biometric identity systems: the category the CoLab refuses to build, recorded as a versioned decision pattern",
    },
  ],

  sections: [
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "The Ethical Tech CoLab's evacuation portfolio was built to answer a protection question: how can and should AI tools be used to enhance the protection and evacuation of civilians during armed conflict, and in what ways do they support or challenge existing obligations under International Humanitarian Law?",
        "Across five fielded prototypes, a crisis-information index, a unified risk platform, a calibrated cost-and-risk decision framework, an agent-based behavior model, and a readiness-under-uncertainty simulator, one finding recurred: the binding constraint on protection is rarely the absence of a route or a resource, but the quality, accessibility, and equity of the information people and responders act on. IHL frames evacuation as a last-resort duty; the technology's job is to make that duty implementable under uncertainty.",
        "What happens after the evacuation? A successful evacuation typically ends in a camp, where the modal outcome is years of protracted displacement. Using Dzaleka Refugee Camp, Malawi, where humanitarian financing has collapsed while an encampment policy bars residents from work, we show that the same measurement discipline, financial modeling, and uncertainty methods that served evacuation convert directly into durable-solutions infrastructure: an open Livelihoods Information and Access Index, a resettlement-and-inclusion financial model built on the CoLab's operational evacuation cost engine, privacy-preserving cash and credential rails, and a civil-society legal-assistance map. We also state what we will not build, biometric identity for displaced people, and why that refusal is itself a public good.",
        "Most of the world's refugees live in protracted situations, and the modal outcome of reaching safety is years, sometimes decades, inside a camp or settlement. The legal architecture that governs what comes next is the Geneva refugee-protection consensus: the 1951 Convention relating to the Status of Refugees and its 1967 Protocol, the doctrine of durable solutions that UNHCR administers, and the 2018 Global Compact on Refugees. That consensus recognizes three ways a displacement can end well, voluntary repatriation, local integration, and resettlement, and each of them is gated far more by information and legal status than by physical capacity.",
        "The CoLab's built work already reaches beyond the evacuation corridor. The same measurement discipline produced the Forced Labor Structural Risk Index, a completed instrument that maps the structural risk of forced labour across countries and sub-national regions, the exploitation that displacement, encampment, and the loss of the right to work make more likely. Read together, the evacuation models and the risk index share one purpose: to improve the information on which protection depends, and through it to reduce forced labour and the vulnerabilities that displaced people carry.",
        "This report keeps three registers distinct throughout: what is built and validated, what is built but not yet validated, and what is proposed. No claim in these pages exceeds the register of the tool it describes.",
        {
          lead: "The ask, in one paragraph.",
          text: "The Ethical Tech CoLab seeks grant funding to develop this technology infrastructure work as open, portable public goods, to improve the lives of displaced communities. It would be validated first at Dzaleka with the field partner Fraternidade Sem Fronteiras, and we are open to other partners with the same mission-driven motivations. Our intent is developing tools and releasing them to the public so that any research or practitioner team can adopt them. One possibility is the Displaced Livelihoods Initiative run by Innovations for Poverty Action and J-PAL, in its Infrastructure and Public Goods track. The report is written to align with that submission and to stand on its own for any peer funder or academic reviewer.",
        },
      ],
    },
    {
      id: "research-question",
      number: "02",
      title: "The Research Question, and Why It Runs Past the Corridor",
      paragraphs: [
        {
          lead: "The protection question and the accounting gap.",
          text: "The portfolio's organizing question comes from Teresa Cantero's doctoral research at the Instituto de Derechos Humanos Gregorio Peces-Barba, Universidad Carlos III de Madrid: how can and should artificial intelligence be used to enhance the protection and evacuation of civilians during armed conflict, and in what ways does it support or challenge the implementation of existing obligations under international humanitarian law.",
        },
        "Under that law, evacuation is not discretionary. When the security of the population or imperative military reasons demand it, moving civilians out of danger is a binding duty under Article 49 of the Fourth Geneva Convention, Articles 57 and 58 of Additional Protocol I, and Article 17 of Additional Protocol II. A movement into which people are coerced is forcible transfer, a war crime regardless of motive. The duty runs wider than the battlefield: the doctrine of the responsibility to protect holds that where a state cannot or will not shield its population from mass atrocity, that responsibility passes to the international community, which frames protection as an obligation rather than a matter of goodwill.",
        "Two structural facts motivate the program. The first is a protection gap. States move quickly to adopt AI for targeting and operational advantage, yet rarely operationalize computational models to protect civilians or to make an evacuation decision legible under the incomplete, fast-changing information those decisions face. The second is an accounting gap. Displacement is tracked in detail, on the order of 117 million people forcibly displaced worldwide by 2025, yet there is no global count of evacuated civilians, because evacuation is fragmented across militaries, governments, humanitarian agencies, volunteers, and civilians acting on their own.",
        {
          lead: "The legal and institutional architecture.",
          text: "The 1951 Convention and its 1967 Protocol define who is a refugee and fix the cornerstone duty of non-refoulement, that no one may be returned to a place where they face persecution. The 2018 Global Compact on Refugees adds a cooperative framework organized around four objectives: easing pressure on host countries, enhancing refugee self-reliance, expanding access to third-country solutions, and supporting conditions for return in safety and dignity. International humanitarian law governs conduct in armed conflict, and the responsibility to protect frames the state's duty toward its own population.",
        },
        "The institutions matter as much as the instruments. UNHCR leads protection and durable solutions for refugees; the International Organization for Migration is the United Nations migration agency; the Office for the Coordination of Humanitarian Affairs coordinates emergency response through the cluster approach; and the Office of the High Commissioner for Human Rights anchors the broader human-rights instruments that apply regardless of a person's status. One structural limitation shapes everything downstream: many host states are not parties to the 1951 Convention or maintain significant reservations, so the protection a displaced person actually receives depends heavily on where they land.",
        {
          lead: "The three durable solutions.",
          text: "The arc does not end when the shooting stops. An evacuation succeeds when a person reaches relative safety, and safety, in practice, usually means a camp. There the analytical problem inverts. The question is no longer whether to move and how, but how to leave well now that one has arrived.",
        },
        "The three durable solutions recognized by the refugee-protection regime, voluntary repatriation to the country of origin, local integration in the country of asylum, and resettlement to a third country, are the recognized routes out. Each is gated by information and legal status as much as by physical or economic capacity, a point the regime's own scholarship makes plainly. Resettlement reaches only a small fraction of those who need it, and complementary pathways such as labour or study routes remain modest in scale, which is why local integration and the conditions for safe return carry most of the weight in practice. This report treats the durable-solutions phase as the natural continuation of the evacuation research question, and asks what open measurement and modeling infrastructure would help displaced people and the organizations serving them find the fastest defensible route out.",
      ],
    },
    {
      id: "built-portfolio",
      number: "03",
      title: "The Built Portfolio",
      paragraphs: [
        "This section describes what the CoLab has already built, and is candid about how mature each piece is, because a reader deciding whether to fund the work is owed that precision. Three registers are kept distinct. The Evacuation Risk and Cost Framework is built and validated in its evacuation form. The Evacuation Information Index, the Exodus platform, and the two simulators are built and operational but not yet expert-validated or calibrated. The Forced Labor Structural Risk Index is built and completed, documented in a methodology page and an associated publication. The livelihoods instruments the report proposes, the Livelihoods Information and Access Index and the Resettlement and Inclusion Capacity Simulator, together with the value-transfer and legal-map builds, are proposed, and their validation is future work. All are open source.",
        {
          table: {
            caption:
              "The five fielded evacuation prototypes. All are open source at github.com/Ethical-Tech-CoLab.",
            headers: ["Prototype", "Function", "Core method"],
            rows: [
              [
                "Evacuation Information Index (EII)",
                "Scores quality, accessibility, and equity of crisis information by geography",
                "Composite index on INFORM, ACLED, and FSI logic; live news and conflict feeds",
              ],
              [
                "Exodus, Civilian Evacuation Risk Platform",
                "Unifies EII, the cost model, and endangerment and feasibility assessment",
                "FastAPI backend; shared calculators and data layer",
              ],
              [
                "ERCF, Evacuation Risk and Cost Framework",
                "Estimates human and financial cost of evacuating against staying",
                "Seven-dimension scoring; calibrated cost model; break-even analysis",
              ],
              [
                "Evacuation Behavior Simulator",
                "Models how information and demographics shape who leaves, and when",
                "Agent-based model; probabilistic status lifecycle",
              ],
              [
                "Readiness and Uncertainty Simulator",
                "Models how intelligence uncertainty degrades destination choices",
                "Monte Carlo; gatekeeper factors; uncertainty slider",
              ],
            ],
          },
        },
        {
          lead: "The Evacuation Information Index.",
          text: "The index treats crisis information itself as the object of measurement. It scores three families of factors, impact, conditions, and complexity, on a scale of 1 to 5, using weights synthesized from the INFORM Severity Index, the Armed Conflict Location and Event Data project, and the Fragile States Index. A live backend adds current news and a conflict timeline for each crisis, and a map layer can overlay AI-derived building-damage and route-damage tiles from Microsoft HASTE and Planet imagery. The design is deliberately transparent: weights are labeled provisional pending expert validation, and where the hosted site cannot run the live backend, responses are baked into a clearly labeled static snapshot so that nothing is presented as live when it is not.",
        },
        {
          intro:
            "The index has real limits, and the report states them rather than hiding them.",
          list: [
            "Weights are borrowed by analogy, not yet expert-validated or sensitivity-tested; a reviewer will read pre-validation weights as pre-evidence.",
            "Source and language bias: feeds skew to English-language, internationally indexed reporting, so the populations with the worst information access are least visible to the instrument that scores information access. The index must correct for this, not inherit it.",
            "The damage overlay is currently self-hosted with no public interface, so for most users the combined information-and-damage view is empty until it is connected.",
          ],
        },
        {
          lead: "Future research on the index.",
          text: "Run the three-phase validation the CoLab's methodology work already specifies, budget-allocation and Delphi elicitation with 8 to 12 domain experts, Fuzzy-AHP on contested weights, then historical case calibration, and add an equity layer measuring who receives information, disaggregated by gender, age, nationality, and residence inside or outside a camp. That equity layer is the move that turns the index into the livelihoods instrument described later in this report.",
        },
        {
          lead: "Exodus, the integration layer.",
          text: "Exodus unifies the crisis map, the cost-and-scenario model, and an endangerment-and-feasibility assessment behind a single backend, design language, and interface, including calculators for the cost of staying, the cost of evacuating, resource needs, and scenario management. Integration is not validation. Unifying three research prototypes behind a more authoritative interface inherits their uncalibrated assumptions, which raises rather than lowers the duty to label confidence honestly. The same interface is the seam where the durable-solutions module plugs in. Its stated limitation is that it is not automatically updated; its future research is to validate the approaches, weights, and measurements.",
        },
        {
          lead: "The Evacuation Risk and Cost Framework.",
          text: "Now at version 7.2, the framework is the CoLab's calibrated decision-support tool for the human and financial cost of civilian evacuation, and it is the one component of the portfolio that is validated rather than provisional, in its evacuation form. It scores scenarios across seven dimensions, kinetic threat, mobility, authorization, logistics, destination, urgency, and information, estimates evacuation resources and in-situ assistance costs, and produces a break-even analysis: the day after which a one-time evacuation becomes cheaper than the mounting daily cost of sustaining a population in place. Its cost parameters are sourced to humanitarian standards and individually tagged as Validated, Estimated, or Unvalidated, drawing on UNHCR water and sanitation guidance, the Sphere standards, and World Food Programme figures.",
        },
        "The mortality model is disclosed as indicative rather than predictive, with a reported log-log fit of 0.855, a leave-one-out cross-validation of 0.807, and a documented case where the structure fails. The financial estimates are substantially more reliable than the mortality figures, which is why the durable-solutions adaptation leads with cost. The framework's ethical architecture is explicit: it does not place a monetary value on a human life. Its figures are logistics estimates, its labels are descriptive rather than prescriptive, and it presents data to support a decision rather than issuing one. That framing carries verbatim into every extension in this report.",
        {
          intro: "The framework's limitations are equally explicit.",
          list: [
            "It models the immediate field operation only, on the order of US$134 per person at moderate risk over 50 kilometers by ground. Real operations, Kosovo 1999 at about US$562 per person and Lebanon 2006 at about US$4,500 to US$5,700, add international transport, reception, and hosting. Extending the cost boundary to the full displacement journey, including protracted encampment, is the frontier the durable-solutions model takes up.",
            "Ground-truthing against OCHA's Financial Tracking Service is on the backlog and belongs in the funded work plan.",
          ],
        },
        {
          lead: "The Evacuation Behavior Simulator.",
          text: "An agent-based model of how information spread and demographics shape who leaves and when. Agents move through a lifecycle from unaware to seeking, milling, evacuating, and done, with family clusters that wait for all members, confirmation loops whose speed depends on how clear the information is, neighbor influence, and calibrated delays for elders, young children, pregnant individuals, and unaccompanied minors. It is pedagogical rather than predictive, and its household-composition logic transfers directly to modeling who is left behind by information failures inside a camp. Its behavior may vary by society, culture, location, personality, income, and education, and the future research is to build intersectionality between behavior simulations.",
        },
        {
          lead: "The Readiness and Uncertainty Simulator.",
          text: "A seeded, fully reproducible instrument that models how uncertainty in field intelligence degrades an evacuation decision. Destinations are scored across seven factors, 500 Monte Carlo trials per group-and-destination pair convert readiness into a distribution of success probabilities, and an uncertainty control degrades every factor's confidence at once, so a user can watch predicted outcomes collapse while nothing on the ground has changed.",
        },
        "Two design choices carry into the rest of this report. First, three factors are non-substitutable gatekeepers, security, the consent of the local authority, and the willingness of the host community, any of which caps readiness: a destination that is dangerous, legally closed, or unwelcoming cannot be redeemed by good logistics. Second, the model insists on the difference between a factor that is unknown, a gap that better information can close, and a factor that is a confirmed refusal, a settled political exclusion. Treating the two as the same would make an unresolvable refusal look like a solvable data problem. Structurally, assigning groups to destinations under consent, willingness, security, and capacity constraints, in the presence of uncertainty, is resettlement matching, which is the transfer the durable-solutions model makes. The simulator has not yet been stress tested with different AI models.",
        {
          lead: "The Forced Labor Structural Risk Index.",
          text: "The index applies the same composite-index method to a different harm. It is a completed, interactive index that maps the structural conditions enabling forced labour across 184 countries on a scale from 0 to 1, with national and sub-national layers, so that the risk can be seen and compared rather than assumed. It belongs in this report because displacement is a forced-labour risk multiplier: the loss of legal status and the right to work, the collapse of assistance, and weakened oversight are precisely the conditions under which exploitation grows, and forced labour is a defined harm in international law with an estimated 27.6 million people subject to it worldwide.",
        },
        "Its significance for the durable-solutions argument is conceptual: measuring structural forced-labour risk and measuring livelihoods-information access are two halves of one protective picture, one showing where exploitation is likely, the other showing whether the information that could prevent it is reaching people. As a composite index its weights remain open to expert re-elicitation, it is not automatically updated, and sponsorship mechanisms remain unsourced at country scale while an eight-country hand-coded kafala signal feeds two domains in the shipped build. Writing an ILO-endorsed kafala passage on top of that unresolved discrepancy would have overstated the index's grounding.",
        {
          lead: "Cross-cutting synthesis.",
          text: "Read together, the built prototypes yield a short set of lessons. Information access is the binding constraint, and it is the thread that carries from the corridor into the camp. Uncertainty has to be modeled explicitly, with the unknown kept separate from the confirmed, or the analysis misleads by omission. We address gaps in data by generating synthetic data that mimics real-life data, and address the residual uncertainty with Monte Carlo simulation. A composite index built from the sequence of borrowing precedents, eliciting expert weights, and calibrating against cases is portable infrastructure: the same method that scores crisis information also scores structural forced-labour risk. And cost modeling in a context of human lives has to stay descriptive rather than prescriptive, following the framework's refusal to monetize life.",
        },
      ],
    },
    {
      id: "dzaleka",
      number: "04",
      title: "After Arrival: Dzaleka and the Second Emergency",
      paragraphs: [
        "A successful evacuation deposits people into a slower emergency. The concept of a protracted refugee situation, conventionally a population of at least 25,000 of the same nationality in exile for five years or more, describes where most refugees actually live, and care-and-maintenance encampment becomes the default by inertia rather than by anyone's plan.",
        "The duration is not a rounding error in a person's life. By UNHCR's own accounting, the average duration of a protracted refugee situation rose from about 9 years in 1993 to roughly 17 years by 2003, and while later analysis rightly cautions that a single average conceals wide variation, the order of magnitude is not in dispute: protracted exile routinely lasts a decade or more, and often a generation. The literature on encampment and self-settlement has long argued that the camp is often less a humanitarian necessity than an administrative and political choice, and that its costs to refugees, in mobility, work, and self-reliance, are systematically understated.",
        {
          lead: "Dzaleka and the funding collapse.",
          text: "Dzaleka Refugee Camp in Dowa District, Malawi, is the sharp end of that pattern. Built in 1994 for 10,000 to 12,000 people, it now holds on the order of 53,000 to 60,000 people, predominantly from the Democratic Republic of the Congo, Burundi, and Rwanda, and it is caught in the funding collapse of 2025 and 2026.",
        },
        {
          intro: "The numbers describe a system in retreat.",
          list: [
            "UNHCR's Malawi budget fell from about US$8 million to about US$1 million, a cut of roughly 90 percent, ending general non-food distributions and laying off protection staff, including paralegals.",
            "World Food Programme assistance is secured only through the middle of 2026, with about US$11 million still needed to restore full rations through December.",
            "Monthly cash support has fallen toward the range of US$6 to US$9 per person, down from roughly US$100, forcing skipped meals and other negative coping.",
          ],
        },
        "Malawi's encampment policy, enforced since March 2023, bars most residents from working outside the camp, so the population cannot substitute self-reliance for collapsing aid. Local civil society, including Inua Advocacy, argues the crisis is inseparable from that policy and is pressing for the right to work; weakened oversight is meanwhile reported to embolden trafficking networks.",
        "This is not a context for piloting speculative technology on vulnerable people. It is a context where the highest-value contribution is measurement, evidence, and legibility: tools that help residents and the organizations serving them see and argue for the fastest route out, and that document the true cost of the status quo. This is a global humanitarian emergency that needs collective collaborative effort, and building infrastructure, digital goods and services, information, training, and capacity might transform generational poverty and increase access to resources.",
        {
          lead: "Encampment as a driver of forced labour.",
          text: "These are the textbook conditions for forced labour. When legal work is barred and assistance collapses, the informal and coerced economy fills the gap. Reducing that exposure is a direct objective of the CoLab's work: the Forced Labor Structural Risk Index names where the risk concentrates, and the livelihoods-information instrument measures whether the information that could protect people, about their rights, their options, and legitimate work, is actually reaching them. That link has no official validation yet, and the future research is to separate recruitment, exploitation, and monetization by intersectionality using social demography, and to deepen the demand side.",
        },
      ],
    },
    {
      id: "financial-model",
      number: "05",
      title: "The Financial Model: From Evacuation Break-Even to Inclusion Break-Even",
      paragraphs: [
        "The financial-modeling engine already exists, validated for one problem and now re-pointed to another, and the distinction matters. The Evacuation Risk and Cost Framework is validated for evacuation costing; its encampment-versus-inclusion parameterization is new and unvalidated, and most of its durable-solutions cost parameters are tagged Estimated or Unvalidated. What transfers cleanly is the architecture and the break-even mathematics, a one-time investment set against a mounting recurring cost, not a set of validated cost figures for the new use.",
        {
          intro: "The engine, re-pointed.",
          list: [
            "Trajectory A prices status-quo encampment as a recurring per-person, per-year assistance cost, covering rations, water and sanitation, health, protection, and administration, using the same Sphere, UNHCR, and WFP parameter families the framework already carries, with the same Validated, Estimated, or Unvalidated tags.",
            "Trajectory B prices an inclusion or resettlement pathway as a front-loaded investment, covering documentation, recognition of qualifications, transport, start-up capital, and host co-investment.",
            "The output is the break-even year after which the status quo costs more, which is the framework's break-even chart with its axes relabeled.",
          ],
        },
        "The Resettlement and Inclusion Capacity Simulator is that engine re-pointed, and re-earning its validity in the durable-solutions domain is the work, not a formality. The capacity-and-willingness layer transfers from the readiness simulator: it maps destinations, whether resettlement states or local-integration pathways, against the non-substitutable gatekeepers of legal consent, host willingness, and security, alongside the substitutable capacities of housing, jobs, and services, while preserving the distinction between an option that is unknown and one that is refused, so that an unlobbied state is never mistaken for a closed door. The uncertainty layer carries over as well, so that thin data on host capacity or a state's posture visibly widens the confidence band and prevents false precision in an advocacy number.",
        {
          lead: "What the evidence predicts.",
          text: "The World Bank's recent work on refugee self-reliance in Sub-Saharan Africa indicates that if refugees had the right to move and work, they would contribute to the hosting country's economy, with real fiscal and economic gains. The honest caveat is built into that same literature. The World Bank finds that self-reliance remains elusive across much of the region, because camps often sit in marginal, high-poverty areas where even full local integration would lift incomes only a little, and the scholarship on self-reliance programming warns that the concept is often invoked to justify the withdrawal of assistance rather than to expand rights.",
        },
        "The simulator has to be able to return the answer that inclusion does not pay here, where host markets are too thin, or it is advocacy rather than analysis. Its output is a defensible, reproducible sentence of the form: sustaining this population at Dzaleka costs approximately this much per year; this pathway costs approximately that much up front and breaks even in a given year, subject to these gatekeepers and this uncertainty band. The simulator could also provide country comparisons across different legal models and measure the economic impact of different refugee policies, and listing the policies of each hosting country would better inform humanitarian organizations and populations.",
        {
          intro:
            "What the literature says the model will find. The engine formalizes an argument the development-economics evidence already supports.",
          list: [
            "UNHCR estimates that if freedom of movement and the right to work were relaxed so refugees could earn on par with hosts, complementary assistance costs would fall from about US$3.2 billion to roughly US$900 million a year.",
            "The joint World Bank and UNHCR benchmark puts refugees' global subsistence needs at US$56 billion to US$62 billion annually, of which about US$41 billion is already met by refugees' own earnings where work is permitted.",
            "In Uganda's inclusive regime, economic participation saves an estimated US$150 per refugee per year, about US$225 million across 1.5 million refugees.",
            "Around Kakuma, refugee presence raised gross regional product by about 3.4 percent.",
            "Colombia's regularization of about 500,000 Venezuelans raised their incomes by about 31 percent with minimal impact on host formal employment.",
          ],
        },
      ],
    },
    {
      id: "digital-public-goods",
      number: "06",
      title: "Digital Public Goods for Economic Inclusion",
      paragraphs: [
        "The toolkit is ordered from the safest build to the one that demands the most caution. The organizing principle is data minimization: build the thinnest system that solves the problem, and refuse the parts whose risks outweigh their benefit for this population. A digital public good, in the sense set out by the Digital Public Goods Alliance and endorsed within the United Nations system, is open-source software, open data, an open standard, or an open model that is relevant to the Sustainable Development Goals, does no harm by design, and, importantly for this population, minimizes the collection of personally identifiable information. The Principles for Digital Development point the same way, toward privacy, reuse, and designing with the user. Measured against those criteria, the CoLab's contributions are intended to qualify as digital public goods rather than to resemble them loosely.",
        {
          lead: "Measurement: the Livelihoods Information and Access Index.",
          text: "The measurement instrument is the Evacuation Information Index re-specified for displaced livelihoods and legal rights: an open, versioned instrument measuring the quality, accessibility, and equity of information about work rights, employment pathways, financial services, and entrepreneurship support reaching displaced populations. The architecture transfers from the evacuation index, but the construct does not, and saying so is part of the method. Measuring information access to work rights is a different thing from scoring crisis severity, so the index has to establish its own construct validity from the ground up rather than inherit it.",
        },
        "In draft form the index is a matrix. Its three dimensions, quality, meaning whether information is accurate, current, and actionable; accessibility, meaning whether people can reach it in a language and channel they use; and equity, meaning whether it reaches sub-populations evenly, are scored across four domains: work rights and legal status, employment pathways, financial services, and entrepreneurship support. Each cell draws on a mix of sources: an audit of what official and organizational information exists, a structured record from field partners of what actually circulates, and, in the future primary study, what residents themselves report receiving.",
        "The equity dimension takes seriously the finding in the forced-migration literature that displacement is gendered, that women, men, and sexual and gender minorities face different risks and different information barriers, so disaggregation is a design requirement rather than an afterthought. Because information inside a camp travels largely by word of mouth, community leaders, and channels that are not in English, the instrument has to weigh informal and in-language sources deliberately, or it will reproduce the very bias it is built to detect. The framework is provisional and is itself a deliverable, with the weights subject to the expert-elicitation pipeline before any score is treated as evidence.",
        "The index does not enter an empty field, and the report says so plainly rather than claiming to be first. The humanitarian sector already assesses information reaching affected populations through accountability-to-affected-populations frameworks, communication-with-communities practice, and information-ecosystem assessments. What those approaches largely lack, and what the index adds, is a composite, versioned, openly standardized measure that renders information access as a comparable variable, disaggregated by sub-population, which a later impact evaluation can treat as an outcome or a mechanism. The contribution is the measure and its portability, not the discovery that information matters. Its deliverables are the index, an open data standard, a reference implementation, and methodology documentation, validated first at Dzaleka with Fraternidade Sem Fronteiras.",
        {
          intro: "The open questions the index carries.",
          list: [
            "One size does not fit all: the geopolitical impact and the limits of building an index and adapting it live, when everything can change.",
            "How can local communities own their data governance?",
            "What would be the most beneficial digital goods a displaced population needs?",
            "How can the information be made accessible in low-connectivity environments?",
            "How can marginalized communities and people who do not read be included in the design of digital goods?",
          ],
        },
        {
          lead: "Future research on the index.",
          text: "Developing a work card and a system that would allow refugees to record their expertise and be matched with regions or organizations that need those services.",
        },
        {
          lead: "Value transfer: privacy-preserving cash, decoupled from biometrics.",
          text: "The nearest-term practical contribution is moving value more cheaply and reliably as traditional financing collapses. The reference case is the World Food Programme's Building Blocks, the largest blockchain-based humanitarian platform, which settled entitlements on a private, permissioned ledger and paid vendors in consolidated sums, saving roughly 98 percent of transaction costs on an early deployment, improving reconciliation across agencies, and establishing a co-governed network that UN Women later extended to cash-for-skills in refugee camps.",
        },
        "The same case is the cautionary tale. Building Blocks ran on biometric registration, and independent analysis warns that many such pilots functioned as donor showpieces under-invested in privacy, and that even a permissioned ledger can leak sensitive metadata when on-chain identifiers are correlated with off-chain records. The lesson is to decouple the payment rail from biometric identity.",
        {
          intro: "A wallet designed for Dzaleka would therefore:",
          list: [
            "Authenticate with the thinnest possible credential, a personal identification number together with a locally issued token or code, never a biometric.",
            "Keep identifying data off the ledger, with only pseudonymous entitlement state recorded on it.",
            "Integrate an existing audited, co-governed network rather than build a bespoke ledger, so that the CoLab's contribution is the threat model and the measurement wrapper.",
            "Run a data-protection impact assessment with community consultation before any collection.",
          ],
        },
        {
          lead: "Portability: skills credentials, never identity.",
          text: "Portability of skills is the third contribution, and it must stop short of identity. The CoLab operates an adjacent architecture that demonstrates the cryptographic pattern, an agent that issues cryptographically signed, tamper-evident verifiable credentials for cultural objects, and Professor Rhodes's prior work with the ID2020 effort concerned decentralized, portable humanitarian credentials with UNHCR and the World Food Programme. The pattern is shared; the risk surface of issuing credentials to displaced people is not, and the report treats that gap as real rather than solved.",
        },
        "The responsible application is narrow: portable, self-held credentials for skills, qualifications, and completed training, so that a nurse or an electrician does not lose a decade of accreditation to displacement, issued to and controlled by the individual and presented selectively. The bright line is firm. A skills credential records what a person can do. It must never become a de facto identity card that gatekeeps aid or is legible to a persecuting authority. The moment it records who someone is, it inherits the risks discussed in the next section and should be stopped.",
        {
          lead: "Rights: mapping civil-society legal assistance.",
          text: "Donor cuts stripped UNHCR's own paralegals out of Dzaleka, which makes a maintained, open directory of who actually provides legal help the safest and highest-leverage build. Organized by legal need, refugee-status determination, work authorization, documentation, protection from gender-based violence, protection from trafficking, and resettlement referral, the map records which civil-society and refugee-led organizations provide assistance, with contact details, language, and eligibility, under the same allowlist-and-citation discipline the provenance agent enforces, so that no unsourced claim ships.",
        },
        "It connects to the index directly. The index shows where rights information fails; the map routes a person to the organization that can close the gap. Local actors such as Inua Advocacy are the anchor nodes, rather than the government. This legal-and-jurisdiction layer, covering work rights, documentation rules, encampment policy, recognition of qualifications, and access to financial services, is a first-class component of the work, coded from public legal sources, and it reflects the long-standing finding in the refugee literature that legal status and the right to work are among the decisive determinants of whether displaced people can build a livelihood at all.",
      ],
    },
    {
      id: "digital-identity-risk",
      number: "07",
      title: "Vulnerable Populations, Digital Identity Risk, and Mitigation",
      paragraphs: [
        {
          lead: "The Rohingya precedent.",
          text: "Refugees are an exceptionally vulnerable group whose personal data demands unusual rigor, and the technology that most tempts humanitarian builders, a comprehensive digital identity for displaced people, is the one this team refuses to build. The evidence is documented rather than hypothetical. Human Rights Watch found that biometric and biographic data collected from Rohingya refugees in Bangladesh was shared onward, ultimately reaching Myanmar, the government they had fled, for the purpose of assessing repatriation eligibility, covering some 830,000 people between 2018 and 2021, without the full data-protection impact assessment UNHCR's own policy requires and without meaningful informed consent.",
        },
        "Consent in that system was structurally compromised. Refugees were told that aid depended on their registration, which makes agreement coerced rather than free. Consent materials were commonly presented in English, a language many of those required to register did not read, and reporting indicates that families who refused enrollment were cut off from food and services. The defining property of the harm is its irreversibility. Biometrics are sticky; an iris cannot be reissued once it is compromised, and a database built to facilitate solutions suffered precisely the function creep that critics had predicted, as data gathered for one stated purpose was repurposed for another.",
        {
          intro:
            "Mitigation is mostly refusal, then minimization, and it can be stated as a small number of firm commitments.",
          list: [
            "Do not build biometric identity. A category refusal, encoded as a versioned decision pattern in the CoLab's open schema, DDC-0001, biometric registration of displaced populations.",
            "Decouple entitlement from identity: access gated by the thinnest credential, never by who you are proven biometrically.",
            "Data minimization and purpose limitation: least data, single stated purpose, no secondary use or third-party transfer, as a matter of design rather than policy alone.",
            "Individual control and local governance: the person holds and selectively presents any credential; refugee-led and local actors govern the data.",
            "Real consent or none: if consent cannot be free and informed, whether because aid is conditioned on it or because a language or power gap cannot be bridged, treat it as absent and do not proceed.",
            "Mandatory pre-collection data-protection impact assessment and community consultation: the omitted step whose absence produced the Rohingya harms.",
          ],
        },
        "For a funder, this refusal is an asset. A responsible-AI lab that can name the one thing it will not build, and cite exactly why, is more credible than one that promises everything.",
      ],
    },
    {
      id: "evidence-engine",
      number: "08",
      title: "Aggregating Evidence So Displaced People Can Argue Their Case Sooner",
      paragraphs: [
        "Taken together, these instruments become an evidence engine that attacks the core information asymmetry facing displaced people, the fact that the rights-and-options case that could change an individual's situation today requires specialized legal and economic knowledge that the individual does not have. The index shows, with disaggregation, which sub-populations are systematically failed by rights-and-pathways information, which is evidence rather than anecdote. The financial model reframes the ask from a plea for help into a costed comparison, that prolonged encampment costs a given amount per year while a given pathway costs less by a given year, which is the argument that donors and states respond to. The legal map converts the evidence into action, routing people to organizations that can file, refer, and litigate.",
        "One limit has to be stated plainly, because the evidence engine cannot dissolve it. Durable solutions are rationed by state consent, resettlement quotas, and political will, and the readiness model's own logic holds that a confirmed refusal is a settled exclusion that no measurement moves. Better information and a sharper cost argument can widen the set of options that are seriously considered and can equip advocates who would otherwise argue from anecdote, but where the binding constraint is political rather than informational, rigorous evidence may change nothing. The impact claims in this report are scoped to that reality: the instruments improve the quality and legibility of the case, which is necessary but not sufficient for a different outcome.",
        "The outputs are designed to be wielded by refugee-led organizations and civil-society advocates, and, where they will use them, by durable-solutions units within UNHCR, rather than to sit in a dashboard. This design choice reflects a clear direction in the field, the growing insistence, visible across the refugee-studies and practitioner literature on knowledge, voice, and power and on refugee self-representation, that displaced people should hold and deploy the evidence about their own situations rather than be the objects of it.",
        "Two guardrails hold throughout. Every advocacy artifact carries its uncertainty band honestly, and the aggregation layer never becomes a registry of identifiable individuals. It argues about populations and gaps, not named people.",
      ],
    },
    {
      id: "infrastructure",
      number: "09",
      title: "What Infrastructure Is Actually Needed",
      paragraphs: [
        "Two things are absent by design: any biometric or identity system, and any bespoke ledger. Everything proposed is either a measurement or knowledge artifact that the CoLab is suited to own, or a thin integration on audited external rails. That is the correct risk posture for a small lab working with a highly vulnerable population, and it follows directly from the digital-public-goods and data-minimization commitments set out above.",
        {
          table: {
            caption:
              "The proposed stack, and what each layer reuses from the built portfolio.",
            headers: ["Layer", "Component", "Reuses", "Posture"],
            rows: [
              [
                "Measurement",
                "LIAI index, open data standard, reference implementation, methodology",
                "EII and the composite-index method",
                "Build, the funding ask",
              ],
              [
                "Economics",
                "RICS: encampment-versus-inclusion break-even; capacity and willingness map",
                "ERCF engine (operational) and readiness gatekeepers",
                "Adapt, engine in place",
              ],
              [
                "Value transfer",
                "Privacy-preserving cash wallet, biometric-free",
                "External audited network; CoLab adds threat model and measurement",
                "Integrate, do not rebuild",
              ],
              [
                "Portability",
                "Self-held skills and qualification credentials",
                "Provenance verifiable-credential architecture; ID2020 lineage",
                "Build narrowly, skills only",
              ],
              [
                "Rights",
                "Open civil-society legal-assistance map",
                "Provenance sourcing discipline",
                "Build, safest and high leverage",
              ],
              [
                "Governance",
                "DDC decision-pattern schema; DPIA and ethics layer",
                "DDC-0001",
                "Build, the credibility spine",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "success",
      number: "10",
      title: "How Success Will Be Measured",
      paragraphs: [
        "A funder should not have to take this program on faith, so success is defined in advance in three tiers: outputs, whether the instruments shipped and are rigorous; outcomes, whether they work and are used; and impact, whether they changed decisions. The measurement instruments themselves double as the evidence base. One line governs the whole framework and resolves an ambiguity a careful reader would otherwise catch: under this grant, every activity involving residents is consultation and co-design of the instruments, together with a desk audit and the field partner's structured knowledge, and no personal data is collected from residents. The measurement of residents' own information access, which would require primary data collection, is a separate future study.",
        {
          lead: "Outputs: did we ship, and is it rigorous?",
          text: "Over the first year, success means a first open-source release of the index, comprising the index itself, an open data standard, a reference implementation, and methodology documentation, each versioned and citable. It means completed and published validation of the instrument's design, with expert elicitation across 8 to 12 experts over two rounds, reported weights, consistency ratios within accepted thresholds, and divergence analysis, including negative results. It means the reference-context validation executed with Fraternidade Sem Fronteiras, drawing on an audit of existing information and the partner's structured knowledge of what circulates, using open and synthetic data. It means the financial model parameterized for Dzaleka on the operational cost engine, with every parameter tagged and the full parameter table public. And it means the civil-society legal map live with the large majority of entries verified against primary sources, and the biometric-refusal decision pattern published with its governance schema.",
        },
        "Full psychometric validation of the instrument on responses from the displaced population itself, covering test-retest reliability, construct validity, and measurement invariance across subgroups, requires primary data collection from that population and is not part of this phase. It is written up here as a published protocol and pre-analysis plan for a future primary study, so that the instrument and its validation plan are themselves a public good, and so that a later study can execute the plan without re-deriving it. The longitudinal read on whether information-access scores for the worst-served sub-populations improve over time belongs to that same future study. This is the honest boundary of the present work, and stating it plainly is part of the method.",
        {
          lead: "Outcomes: does it work, and is it used?",
          text: "Over the first two years, success means concordance between the instrument and the field partner's operational knowledge of where information gaps sit at Dzaleka, and equity disaggregation that reproduces independently observed disparities. It means adoption, with at least one external research team taking up the index as an instrument and at least one practitioner organization using its scores to retarget outreach. It means the financial model cited in at least two advocacy or policy documents by refugee-led or civil-society organizations, with the uncertainty bands reproduced intact, since fidelity of use matters and not only volume. It means community legitimacy, with refugee community members engaged as co-designers and a community review session signing off on how findings are represented before publication. And it means open-source health, with public contribution metrics, quarterly releases, and a documented path to a second site.",
        },
        {
          lead: "Impact: did decisions change?",
          text: "Over one to three years, success means that a livelihoods or durable-solutions actor at Dzaleka changes a concrete allocation, outreach, or referral decision that can be attributed to the evidence, documented through decision memos or partner attestation. It means that the measurement gap itself closes, with information access appearing as a specified variable in at least one subsequent funded evaluation design that cites the standard, which is the definition of success for infrastructure. These impact claims are deliberately modest about attribution, for the gatekeeper reason set out above: the instruments can change what is known and argued, while the political constraints on durable solutions lie outside their reach.",
        },
        {
          lead: "Failure and accountability.",
          text: "Failure deserves equal candor, stated now: weights that fail expert consistency checks but ship anyway; adoption claims that rest on download counts rather than documented decisions; a map that decays unverified; or any drift from measurement toward identity. The project commits to reporting against both lists, to publishing a pre-registered analysis plan for the validation study, and to releasing all instruments, de-identified aggregate data, and code under open access at the end of the grant. A standing do-no-harm review screens any proposed feature that touches personal data against the commitments above before development, and the screening record is public.",
        },
      ],
    },
    {
      id: "alignment",
      number: "11",
      title: "Alignment with the Displaced Livelihoods Initiative and Other Funders",
      paragraphs: [
        "This report backs the CoLab's submission to the Displaced Livelihoods Initiative in its Infrastructure and Public Goods track: the Livelihoods Information and Access Index as an open measurement public good, validated at Dzaleka. The fit is structural. That track invites a new measure that enables future rigorous evaluations rather than the evaluation of a single program, and the initiative's own call names the lack of information on legal status as a barrier to displaced livelihoods and invites AI-supported measurement in hard-to-reach contexts. The forced-labour framing is not a detour from that agenda but its sharpest edge: strengthening information about work rights and legitimate pathways is a protective factor against the exploitation the Forced Labor Structural Risk Index measures.",
        "The proposal is scoped to research and measurement costs only, with no intervention-delivery lines, and it treats the operational cost engine, the provenance-credential architecture, and the field partner's community access as in-kind contributions rather than billed items. The request sits within the initiative's cap for this track, and the design honors the initiative's guidance that researcher-only designs tend to underperform on policy influence, which is why the field partnership with Fraternidade Sem Fronteiras is written into the plan rather than added to it.",
        {
          lead: "Team and partnership.",
          text: "Sylvia Maier, of the NYU SPS Center for Global Affairs, serves as Principal Investigator and eligibility anchor, since the initiative requires a Principal Investigator with a primary university affiliation and demonstrated experience with rigorous evaluation. Teresa Cantero, a doctoral candidate at Universidad Carlos III de Madrid and a visiting scholar at the NYU Center for Global Affairs, is Primary Researcher; the Summer 2026 cohort carries implementation; and Fraternidade Sem Fronteiras is the field partner.",
        },
        "The partnership is established rather than cold: Yago Rocha volunteered with Fraternidade Sem Fronteiras at Dzaleka on refugee livelihoods and financial inclusion, and Carolina Moron visited Dzaleka while living in Malawi and building a multi-sector data coalition, which is first-hand familiarity that lowers the risk around community access. The same architecture serves adjacent funders, because the measurement-and-governance framing travels. The honest assessment is that the initiative's funded portfolio favors teams with strong evaluation track records, so competitiveness rests on the rigor of the measurement work and the depth of the team's field experience rather than on the breadth of the claims.",
      ],
    },
    {
      id: "programme-design",
      number: "12",
      title: "Programme Design and Outlook",
      paragraphs: [
        "The work is designed for a term of roughly twenty-four months, beginning within the funder's required window after an award. The sequence moves from re-specifying the indicator framework for livelihoods and legal-rights information, through the expert-elicitation and calibration pipeline for the index, to the reference-context validation at Dzaleka with the field partner, and then to open release of the index, the data standard, the reference implementation, and the methodology, followed by dissemination to the research and practitioner community, including remote and partner-led presentation of results in Malawi.",
        "Because this is an infrastructure-and-public-goods effort, the technology is the deliverable rather than overhead, and a substantial share of the budget maps to the reference implementation and the model adaptation. The cost engine itself is an in-kind contribution, already operational and validated for evacuation, which is why its re-pointing to durable solutions is an adaptation rather than a new build.",
      ],
    },
    {
      id: "limitations",
      number: "13",
      title: "Consolidated Limitations and Future Research",
      paragraphs: [
        "The limitations are stated together so that they are hard to miss.",
        {
          list: [
            "Maturity varies by tool, and the report holds the line between them: the cost engine is validated for evacuation, the Evacuation Information Index is built but unvalidated, the Forced Labor Structural Risk Index is built and documented with a published methodology, and the livelihoods instruments are proposed.",
            "Measurement comes before deployment, so the weights and thresholds of the index and the financial model are provisional until they are expert-elicited and calibrated, and nothing here is operational decision-support before that validation.",
            "Costs are more reliable than modeled outcomes, so the work leads with cost and break-even and treats any modeled mortality or lives-saved figure as indicative only.",
            "The economics of inclusion are context-dependent, so the model has to be able to find against inclusion where host markets are too thin, or it is advocacy rather than analysis.",
            "Evidence has political limits, so the impact claims are scoped to what better information can plausibly move.",
            "Do-no-harm dominates, so the documented refusal to build biometric identity and the privacy-preserving patterns are public goods in their own right.",
            "The honest scope boundary holds: full psychometric validation on the displaced population is future primary work, published here as a protocol rather than claimed as done.",
          ],
        },
        {
          intro: "The next steps follow from those limits.",
          ordered: true,
          list: [
            "Run the expert-elicitation and calibration pipeline for the index against the Dzaleka reference context.",
            "Parameterize the financial model on Dzaleka cost inputs.",
            "Stand up the civil-society legal map with the field partner and local advocates.",
            "Publish the biometric-refusal decision pattern and stress-test the governance schema against automated benefits-eligibility systems.",
            "Carry the design into a second displacement context along a documented adoption path.",
          ],
        },
        "The through-line from the evacuation corridor to the camp is a single claim, tested in more than one domain: that the binding constraint on protection, on durable solutions, and on freedom from forced labour alike is the quality, accessibility, and equity of the information that people can act on, and that open, honestly labeled measurement infrastructure is the public good most worth building for it.",
      ],
    },
  ] satisfies ReportSection[] as ReportSection[],

  citations: [
    {
      ref: "Geneva Convention Relative to the Protection of Civilian Persons in Time of War (Fourth Geneva Convention), art. 49; Protocol Additional to the Geneva Conventions (Protocol I), arts. 57 to 58; Protocol II, art. 17; Rome Statute of the International Criminal Court, art. 8. See also “Evacuation,” How Does Law Protect in War? ICRC Casebook.",
      url: "https://casebook.icrc.org/a_to_z/glossary/evacuation",
    },
    {
      ref: "Convention Relating to the Status of Refugees (1951) and its 1967 Protocol, esp. arts. 1 and 33 (definition and non-refoulement).",
      url: "https://www.unhcr.org/us/about-unhcr/overview/1951-refugee-convention",
    },
    {
      ref: "UN General Assembly, Global Compact on Refugees, affirmed 17 Dec. 2018, A/73/12 (Part II), res. 73/151.",
      url: "https://www.unhcr.org/us/about-unhcr/who-we-are/global-compact-refugees",
    },
    {
      ref: "Alexander Betts, “The Normative Terrain of the Global Refugee Regime,” Ethics and International Affairs 29, no. 4 (2015): pp. 363 to 375; and Roger Zetter, Protecting Forced Migrants: A State of the Art Report (Swiss Federal Commission on Migration, 2014).",
    },
    {
      ref: "Ethical Tech CoLab, “Forced Labor Structural Risk Index,” Fall 2025. An interactive index mapping the structural conditions that enable forced labour across 184 countries on a 0 to 1 risk scale, with national and sub-national layers.",
      url: "/publications/forced-labor-structural-risk-index",
    },
    {
      ref: "ILO Forced Labour Convention, 1930 (No. 29) and its 2014 Protocol; the UN Protocol to Prevent, Suppress and Punish Trafficking in Persons (Palermo Protocol, 2000); and ILO, Walk Free, and IOM, Global Estimates of Modern Slavery: Forced Labour and Forced Marriage (2022), estimating 27.6 million people in forced labour worldwide.",
    },
    {
      ref: "Cantero, Teresa. “Artificial Intelligence and Civilian Protection in Evacuation during Armed Conflict under International Humanitarian Law.” Presentation, NYU Center for Global Affairs, 2026.",
    },
    {
      ref: "UN Office on Genocide Prevention and the Responsibility to Protect; Roberta Cohen, “Reconciling the Responsibility to Protect with IDP Protection,” Brookings Institution (2010).",
      url: "https://www.un.org/en/genocideprevention/about-responsibility-to-protect.shtml",
    },
    {
      ref: "Volker Türk and Rebecca Dowd, “Protection Gaps,” in The Oxford Handbook of Refugee and Forced Migration Studies (Oxford UP, 2014), pp. 278 to 285.",
    },
    {
      ref: "UNHCR, Global Trends: Forced Displacement (UNHCR, 2025 to 2026), reporting the global figure declining for the first time in a decade to roughly 117 million. The count of evacuated civilians has no equivalent global series.",
      url: "https://www.unhcr.org/global-trends",
    },
    {
      ref: "International Organization for Migration; OCHA, “What Is the Cluster Approach?”; OHCHR, core international human-rights instruments. On the protection consequences where host states are not parties to the 1951 Convention, see “The Protection of Refugees in Non-Signatory States,” International Journal of Refugee Law 33, no. 2 (2021): p. 188.",
    },
    {
      ref: "Haine Beirens and Susan Fratzke, “Taking Stock of Refugee Resettlement,” Migration Policy Institute (2017); Susan Fratzke and María Belén Zanzuchi, “Complementary Pathways,” Migration Policy Institute (2024); UNHCR, Safe Pathways for Refugees (2018).",
    },
    {
      ref: "Ethical Tech CoLab, “Evacuation Information Index (EII),” GitHub, 2026. Weighting precedents: ACAPS and the EU Joint Research Centre, INFORM Severity Index; ACLED, Conflict Index; Fund for Peace, Fragile States Index.",
      url: "/publications/evacuation-inform-index",
    },
    {
      ref: "Thomas L. Saaty, “How to Make a Decision: The Analytic Hierarchy Process,” European Journal of Operational Research 48, no. 1 (1990): pp. 9 to 26; Mohammed Al Fozaie, “A Guide to Integrating Expert Opinion and Fuzzy AHP,” Advances in Fuzzy Systems (2022); OECD and JRC, Handbook on Constructing Composite Indicators (OECD Publishing, 2008).",
    },
    {
      ref: "Ethical Tech CoLab, “Exodus: Civilian Evacuation Risk Platform,” GitHub, 2026.",
      url: "https://github.com/Ethical-Tech-CoLab",
    },
    {
      ref: "Cost parameters compiled in the ERCF v7.2 documentation from humanitarian-standard sources: UNHCR WASH Manual; Sphere Association, The Sphere Handbook, 2018 ed.; World Food Programme, Annual Performance Report 2023 and Executive Board figures 2025. Primary sources should be cited directly in operational use.",
    },
    {
      ref: "Ethical Tech CoLab and Yago Rocha, “ERCF: Evacuation Risk and Cost Framework, v7.2,” GitHub, 2026.",
      url: "/publications/ercf",
    },
    {
      ref: "Ethical Tech CoLab and Melanie MacKew, “Evacuation Simulation,” GitHub, 2026.",
      url: "/publications/evacuation-simulation",
    },
    {
      ref: "Ethical Tech CoLab and India Clarke, “Evacuation Readiness and Uncertainty Simulator,” GitHub, 2026.",
      url: "/publications/erus",
    },
    {
      ref: "UNHCR, Policy on Alternatives to Camps (2014); Bram J. Jansen, “Digging Aid: The Camp as an Option in East and the Horn of Africa,” Journal of Refugee Studies 29, no. 2 (2016): pp. 149 to 165; Oliver Bakewell, “Encampment and Self-Settlement,” and Loren B. Landau, “Urban Refugees and IDPs,” both in The Oxford Handbook of Refugee and Forced Migration Studies (Oxford UP, 2014), pp. 127 to 148; Lewis Turner, “Explaining the (Non-)Encampment of Syrian Refugees,” Mediterranean Politics (2015).",
    },
    {
      ref: "UNHCR, Protracted Refugee Situations, EC/54/SC/CRP.14 (2004), reporting the average duration of major protracted refugee situations rising from about 9 years in 1993 to about 17 years by 2003. See also World Bank, “How Long Do Refugees Stay in Exile?” (2019).",
    },
    {
      ref: "IOM, World Migration Report 2024 (IOM, 2024), Chapter 1 overview.",
    },
    {
      ref: "“Dzaleka Refugees at Risk as WFP Faces K19bn Shortfall,” Nation Online, 8 Feb. 2026; “Funding Cuts Push Malawi's Dzaleka Refugee Camp to the Brink,” FairPlanet, 20 Aug. 2025; UNHCR, “Refugees in Dzaleka Struggle to Make Ends Meet amid Funding Cuts,” UNHCR Africa, 5 May 2025; “We Still Need People to Hold Our Hands,” Dialogue Earth, June 2026.",
    },
    {
      ref: "World Bank, Making Refugee Self-Reliance Work: From Aid to Employment in Sub-Saharan Africa (World Bank, 2025); World Bank, “The Costs Come Before the Benefits” (2024). On the politics of self-reliance, see Suzan Ilcan et al., “Humanitarian Assistance and the Politics of Self-Reliance: Uganda's Nakivale Refugee Settlement,” CIGI Papers no. 86 (2015); Merle Kreibaum, “Build Towns Instead of Camps” (German Development Institute, 2016); Amelia Kuch, “Naturalization of Burundi Refugees in Tanzania,” Journal of Refugee Studies (2016); and World Bank, An Assessment of Uganda's Progressive Approach to Refugee Management (2016).",
    },
    {
      ref: "UNHCR, “Investing in Refugees' Self-Reliance: A More Cost-Effective and Sustainable Response.”",
      url: "https://www.unhcr.org/blogs/investing-in-refugees-self-reliance/",
    },
    {
      ref: "World Bank, “The Costs Come Before the Benefits” (World Bank Group, 2024); “Refugees Mean Business: This Is Why Investing in Them Pays,” World Economic Forum, 20 Jan. 2025.",
    },
    {
      ref: "Digital Public Goods Alliance, DPG Standard (nine indicators, including SDG relevance, open licensing, non-collection of personally identifiable information, and privacy and applicable laws); Principles for Digital Development.",
      url: "https://digitalpublicgoods.net/standard/",
    },
    {
      ref: "E. Fiddian-Qasmiyeh, “Gender and Forced Migration,” in The Oxford Handbook of Refugee and Forced Migration Studies (Oxford UP, 2014), pp. 395 to 408; Volker Türk, “Ensuring Protection for LGBTI Persons of Concern,” Forced Migration Review.",
    },
    {
      ref: "On existing approaches to measuring information reaching affected populations, see the IASC framework on accountability to affected populations; the CDAC Network and Ground Truth Solutions on communication with communities; and Internews information-ecosystem assessments.",
    },
    {
      ref: "World Food Programme, “Building Blocks,” WFP Innovation; UN Women and WFP, Blockchain Pilot Project for Cash Transfers in Refugee Camps: Jordan Case Study (UN Women, 2021).",
    },
    {
      ref: "“Privacy in Peril: Safeguarding Digital Data in Humanitarian Blockchain Initiatives,” Humanitarian Practice Network and ODI, 27 Aug. 2025.",
    },
    {
      ref: "Ethical Tech CoLab, “Arts Provenance Agent,” GitHub, 2026; on the ID2020 lineage, see public documentation of the decentralized-identity work with UNHCR and WFP.",
      url: "/publications/digital-provenance-passport",
    },
    {
      ref: "Alice Edwards and Laura van Waas, “Statelessness,” in The Oxford Handbook of Refugee and Forced Migration Studies (Oxford UP, 2014), pp. 290 to 299; Sarah Bidinger, “Syrian Refugees and the Right to Work,” Boston University International Law Journal 33 (2015): pp. 223 to 249.",
    },
    {
      ref: "Human Rights Watch, “UN Shared Rohingya Data Without Informed Consent,” 15 June 2021.",
      url: "https://www.hrw.org/news/2021/06/15/un-shared-rohingya-data-without-informed-consent",
    },
    {
      ref: "“Although Shocking, the Rohingya Biometrics Scandal Is Not Surprising,” ODI Insights, 2021; “Rohingya Data Protection and the UN's Betrayal,” The New Humanitarian, 21 June 2021.",
    },
    {
      ref: "“Knowledge, Voice and Power,” Forced Migration Review 70 (2022); Mauricio Vitoria et al., “The Global Summit of Refugees and the Importance of Refugee Self-Representation,” Forced Migration Review (2018).",
      url: "https://www.fmreview.org/issue70/",
    },
    {
      ref: "Innovations for Poverty Action, Displaced Livelihoods Initiative: Call for Proposals, Round V (IPA, 2026); IPA, DLI Eligibility Self-Assessment and Budget Template, Round V (2026).",
    },
  ] satisfies Citation[] as Citation[],
};

export type { Citation, Paragraph, ReportSection };
