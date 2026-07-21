// ─────────────────────────────────────────────────────────────────────────
// "The Evacuation Readiness and Uncertainty Simulator (ERUS)", a plain-language
// research report on the ERUS prototype, transcribed from ERUS-Paper.md in the
// India-EvacSimulation repository. Rendered by
// src/app/publications/erus/page.tsx. Kept here so the page stays
// presentational, matching the site's content/ convention.
//
// Note on the repository name: India-EvacSimulation is named for its author,
// India Clarke. The project has no connection to the country of India. Do not
// add any such framing to this file.
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

export const erusReport = {
  eyebrow: "Publications · Academic report",
  title: "The Evacuation Readiness and Uncertainty Simulator",
  subtitle: "Showing How Poor Field Information Degrades Evacuation Decisions",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "India Clarke. Developed as part of doctoral research on civilian protection in armed conflict, under the Ethical Tech CoLab at the NYU Center for Global Affairs.",
  thesis:
    "When a humanitarian organisation decides where to move civilians fleeing conflict, it is rarely choosing between a good option and a bad one. It is choosing between several options it does not fully understand. ERUS exists to make one thing visible: the same underlying reality, assessed under worse information, produces materially worse predicted outcomes. Move the uncertainty slider and predicted success falls while nothing on the ground has changed at all.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "500",
      label:
        "Monte Carlo trials run for every pairing of an evacuee group with a destination",
    },
    {
      value: "20%",
      label:
        "readiness cap on any destination with a blocked gatekeeper, which sits below the forty per cent success floor",
    },
    {
      value: "0.30",
      label:
        "score given to an unassessed factor, set deliberately below the 0.50 given to a partial one",
    },
    {
      value: "4",
      label:
        "values that fully determine every output: seed, destination count, group count, and uncertainty level",
    },
  ],

  sections: [
    {
      id: "foreword",
      number: "00",
      title: "Foreword",
      paragraphs: [
        "When a humanitarian organisation decides where to move a group of civilians fleeing conflict, it is rarely choosing between a good option and a bad one. It is choosing between several options it does not fully understand. Is the camp forty kilometres away still secure, or was that report three weeks old? Has the district authority actually agreed to receive people, or did someone assume it had? Is the host community willing, or has nobody asked?",
        "The situation on the ground is whatever it is. What changes, hour by hour, is how much of it the people making the decision can actually see. This report concerns a piece of software built to make that second problem visible: to show that the quality of a decision can collapse while nothing on the ground has changed at all, purely because the information environment has deteriorated.",
        "A note on the name. The repository is called India-EvacSimulation because its author is named India Clarke. It does not concern the country of India, Indian disaster management, or the National Disaster Management Authority. The tool is about civilian evacuation in armed conflict, and it uses no real place names of any kind.",
      ],
    },
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "The Evacuation Readiness and Uncertainty Simulator, referred to here as ERUS, is a research instrument that runs as a single web page in an ordinary browser. It invents a set of possible evacuation destinations and a set of groups of people needing to move, scores how ready each destination is, and works out which group should go where.",
        "Every destination, every group, and every piece of information about them is synthetic. Nothing in the tool is a real place, a real population, or a real dataset. This is deliberate and is stated repeatedly in the project's own documentation. The tool is not making claims about any actual conflict.",
        "The central argument the tool exists to demonstrate can be stated in one sentence: the same underlying reality, assessed under worse information, produces materially worse predicted outcomes. The tool provides a single slider labelled Field Uncertainty. Moving it does not change any fact about any destination. It changes only how much confidence the assessment carries. Predicted success rates fall anyway. That gap between what is true and what is knowable is what the project is about.",
        "Destinations are scored across seven factors. Three of them are treated as gatekeepers: Security, Authority consent, and Willingness. Any one of these being confirmed as blocked caps the destination's overall readiness at twenty per cent, regardless of how good everything else is. The remaining four factors, being Capacity, Shelter, Food and water, and Medical capacity, reduce a score proportionally rather than capping it.",
        "Because each factor is uncertain, the tool does not produce a single answer. It re-runs each pairing of a group and a destination five hundred times, each time randomly nudging factor assessments in proportion to how unreliable they are, and reports the proportion of runs in which the move would have succeeded. This is a standard technique known as Monte Carlo simulation.",
        "The model draws a distinction that most scoring systems collapse. A destination whose willingness to receive people has simply never been assessed is recorded as Unknown. A host community that has explicitly refused is recorded as Unwilling. The first is a gap that better field work could close. The second is a settled answer that no amount of further enquiry will change. Treating them identically would make a refusal look like a solvable research problem.",
        "The software itself works and is publicly demonstrated. The project's own backlog is candid that its supporting documentation has fallen behind the code, that no parameter has been calibrated against real field data, and that the document it names as its authoritative methodology is not actually present in the repository.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Humanitarian actors working in active conflict do not operate with complete information. They operate with fragments: a report from a partner agency, an assessment carried out before the front line moved, a phone call that did not connect. The project's own concept note describes incomplete, unreliable, or absent field intelligence as the normal operating condition rather than an exceptional one.",
        },
        {
          lead: "The consequence.",
          text: "When the information is poor, the decision is still made. Someone still has to say which convoy goes where. The danger is not that a decision-maker knows they are guessing. The danger is that a planning tool presents an estimate with the same visual confidence whether that estimate rests on a verified assessment from yesterday or an assumption from last month.",
        },
        {
          lead: "The gap this addresses.",
          text: "Readiness scoring in humanitarian planning tends to produce a single number per site. That number does not usually carry any indication of how fragile it is. Two sites can score identically while one score is well founded and the other is largely inference.",
        },
        {
          lead: "The response.",
          text: "ERUS separates two things that are normally merged: what a factor is assessed to be, and how confident the assessor is in that assessment. Every factor in the tool carries both. The scoring then combines them, so that a well-evidenced partial assessment can outscore a poorly-evidenced good one. This is the mechanical heart of the tool.",
        },
        {
          lead: "The stated research questions.",
          text: "The project sets itself three. How does multi-factor readiness translate into a probable outcome? How does degraded field intelligence propagate through the chain of an evacuation decision? And where would real-time, machine-assisted assessment provide the greatest gain in decision quality? The third question is the one the tool's Factor Information Value panel is built to answer.",
        },
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        "Make the propagation of uncertainty through an evacuation decision visible and measurable, rather than asserted.",
        "Express readiness as a distribution of possible outcomes rather than as a single point estimate that conceals its own fragility.",
        "Encode the fact that certain conditions are not tradeable. A site under active threat cannot be redeemed by an excellent food supply, and the arithmetic of the model must refuse to allow that trade.",
        "Keep the distinction between an unresolved question and a settled refusal, so that an unresolvable exclusion is never presented as an intelligence gap.",
        "Identify which specific unknowns, if resolved, would most improve the predicted outcome, so that scarce assessment capacity can be pointed at the questions that matter.",
        "Make every result exactly reproducible by anyone who has four numbers, so that a claim made from the tool can be independently regenerated and checked.",
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How the Simulator Works",
      paragraphs: [
        "The tool runs the same sequence of six steps every time a scenario is generated or the uncertainty slider is moved.",
        {
          lead: "Step one, the seeded number generator.",
          text: "Every random value in the tool comes from a single arithmetic recipe that produces a stream of numbers which look random but are entirely determined by a starting number, called the seed. The recipe used is the Park and Miller generator, a well-documented method published in 1988. The practical consequence is that the same seed always produces the same scenario, on any computer, at any time. The tool never uses the browser's own randomness, which would not be repeatable.",
        },
        {
          lead: "Step two, inventing the scenario.",
          text: "The generator builds a chosen number of destinations, each with seven factor assessments, a capacity, and a distance, and a chosen number of evacuee groups drawn from eight fixed population types. This happens once, when a scenario is created. It does not re-run when the uncertainty slider moves, which is what allows the tool to prove that a falling success rate is caused by information quality alone and not by a changed scenario.",
        },
        {
          lead: "Step three, scoring readiness.",
          text: "Each destination is reduced to a single readiness figure between zero and one hundred per cent, using the weighted formula set out in the following section.",
        },
        {
          lead: "Step four, the Monte Carlo engine.",
          text: "For each possible pairing of a group with a destination, the tool runs five hundred trials. In each trial it independently considers every factor, asks whether an assessment that unreliable might be wrong, and if so shifts it one step better or worse. It then re-scores readiness. The output is a success rate and a standard deviation, which is a measure of how widely the five hundred results were spread.",
        },
        {
          lead: "Step five, assignment.",
          text: "Groups are sorted by urgency, with immediate cases first, then urgent, then those who can wait. Each group in turn is given the highest-scoring destination that still has enough spare capacity for it. Capacity is decremented as groups are placed, so later groups genuinely compete for what earlier groups did not take. If no site with room remains, the group is marked unassigned rather than being quietly given a place that does not exist.",
        },
        {
          lead: "Step six, display.",
          text: "The results are drawn as destination cards, an assignment matrix, an outcome table, an alerts panel, a sensitivity chart, and the information-value panel.",
        },
      ],
    },
    {
      id: "variables",
      number: "05",
      title: "The Variables Explained",
      paragraphs: [
        "This section is the substance of the report. Every number the tool uses is listed below in plain terms: what it represents, why it was set where it was set, and how it reaches the result.",
        {
          lead: "The seven factors.",
          text: "Each destination is described by seven qualities. Security, whether the site is under threat. Authority consent, whether the relevant host authority has agreed to the movement. Willingness, whether the host community itself is prepared to receive people. Those three are gatekeepers, marked as such in the code. The remaining four are Capacity, whether there is room; Shelter, whether there is somewhere to sleep; Food and water, whether basic provisions exist; and Medical capacity, whether there is clinical care.",
        },
        "The three gatekeepers were chosen because each represents a condition that cannot be compensated for by anything else. The project's concept note states the reasoning plainly for Security: a site under active threat cannot be made viable by good food supply. Willingness was originally an ordinary factor and was promoted to gatekeeper status during development, precisely because as an ordinary factor it allowed strong shelter, food, and medical scores to arithmetically outweigh an outright refusal.",
        {
          lead: "The four statuses.",
          text: "Every factor, at every destination, holds one of four values, which convert to numbers as follows. Operational scores 1.0, the factor is in good order. Partial scores 0.5, the factor is degraded but functioning. Blocked scores 0.0, the factor has failed. Unknown scores 0.30 before any adjustment.",
        },
        "The choice of 0.30 for Unknown is the model's stance on ignorance. It is deliberately below Partial. An unassessed factor is not treated as probably fine. It is treated as more likely to be a problem than not, which the documentation calls epistemic conservatism, meaning caution about what one does not know.",
        {
          lead: "Confidence, and why it is applied twice.",
          text: "Each factor also carries a base confidence, a number between zero and one describing how well that particular thing was assessed. The generator assigns it by status. An Unknown factor gets a low base confidence, between 0.05 and 0.50. A Blocked factor gets a middling one, between 0.40 and 0.75. An Operational or Partial factor gets a high one, between 0.60 and 0.95. The logic is that a field team reporting a functioning clinic has usually seen it, whereas a team reporting that they do not know has by definition seen less.",
        },
        "Separately, the Field Uncertainty slider produces a single confidence multiplier applied to every factor at once. If the slider reads thirty per cent uncertainty, the multiplier is 0.70, and every factor's confidence is reduced to seventy per cent of what it was. This is the whole-environment term: how degraded is the information picture right now, across the board. The two multiply together to give an effective confidence for each factor. This is the pairing the concept note calls uncertainty twice over.",
        {
          lead: "How a factor score is actually computed.",
          text: "A factor's contribution is its status value scaled by a confidence adjustment. The adjustment is not the raw confidence but 0.5 plus half of the effective confidence. In plain terms, a factor never loses more than half its value to uncertainty. A destination reported as Operational with perfect confidence contributes its full 1.0. The same destination reported as Operational with no confidence at all contributes 0.5, the same as a confidently-reported Partial. Blocked is the exception. It scores zero regardless of confidence, on the reasoning that a reported blockage should not be discounted merely because the report is shaky.",
        },
        {
          lead: "The weights and the gatekeeper cap.",
          text: "Gatekeeper factors carry a weight of 2. Standard factors carry a weight of 1. Readiness is the weighted average of the seven factor scores, so the three gatekeepers between them account for six of the ten weight units, which is to say sixty per cent of the ordinary score.",
        },
        "On top of that average sits the hard rule. If any gatekeeper is Blocked, readiness is capped at twenty per cent no matter what the average said. This is what makes the gatekeepers non-substitutable. The weighting alone would still have permitted a very strong performance elsewhere to lift a site with a blocked gatekeeper above a mediocre but unblocked one. The cap forbids it.",
        {
          lead: "Destination capacity and distance.",
          text: "Capacity is generated between 200 and 5,000 places. It is not drawn evenly across that range but from an exponential distribution, which produces many small values and few large ones. The stated reason is that this matches the real shape of humanitarian site provision: many small sites and a few large camps. Distance is generated between 20 and 400 kilometres. The documentation is explicit that distance is a stand-in for operational burden, and that real routing constraints such as road condition, checkpoints, and fuel are not modelled. It is the only route variable in the tool.",
        },
        {
          lead: "The evacuee groups.",
          text: "Groups are drawn from eight fixed population types, described in the methodology as grounded in field taxonomy and in the categories of persons afforded specific protection under international humanitarian law. Only the size of a group is randomised, between 50 and 2,000 people. Each type carries three fixed properties. Elderly and mobility-impaired: vulnerability 5, mobility needs, immediate urgency. Wounded and medical cases: vulnerability 5, medical needs, immediate urgency. Unaccompanied minors: vulnerability 5, medical needs, immediate urgency. Families with children: vulnerability 4, no special need, urgent. Pregnant women: vulnerability 4, medical needs, urgent. Journalists and aid workers: vulnerability 2, no special need, urgent. Unaccompanied adults: vulnerability 2, no special need, can wait. Mixed general population: vulnerability 2, no special need, can wait.",
        },
        "Vulnerability runs on a five-point scale. Urgency determines the order in which groups are assigned, which matters because assignment is sequential and capacity runs out. The special-needs marker determines whether a destination's medical provision is treated as decisive for that group.",
        {
          lead: "The composite score, and its four weights.",
          text: "Readiness alone does not decide where a group goes. The tool ranks destinations for each group using a composite score built from four parts. Readiness, weight 0.40, the quality of protection at the site. Capacity fit, weight 0.30, the site's capacity divided by the group's size, capped at 1.0, since a site twice the size of the group scores the same as one ten times its size and surplus beyond sufficiency adds nothing. Proximity, weight 0.20, one minus the distance divided by the 400 kilometre maximum, so a nearby site scores near 1.0 and the furthest scores near zero. Vulnerability match, weight 0.10, a binary: 1.0 if the group has a special need and the site's medical capacity is Operational, and 0.5 in every other case.",
        },
        "The in-app methodology states the ordering these weights encode: protection quality first, physical fit second, operational burden third, population needs fourth.",
        "One observation worth recording. Because vulnerability match is checked only against medical capacity, a group whose stated need is mobility rather than medical is rewarded by the presence of a clinic. The mobility need has no separate representation anywhere in the scoring. This is a simplification the documentation does not flag.",
        {
          lead: "The Monte Carlo variables.",
          text: "Three numbers govern the simulation of uncertainty. Runs, set to 500 per group and destination pair, is how many times each pairing is tested; more runs give a tighter estimate at the cost of speed, and the information-value panel uses a cheaper 100 runs whose output the documentation says should be read as directional only. Maximum perturbation probability, set to 0.85, is the ceiling on how likely a factor's assessment is to be wrong in a given trial, so that at an effective confidence of zero a factor still has a fifteen per cent chance of being reported correctly and the tool never assumes information is entirely worthless. The perturbation step is fixed at one level: when a factor is judged to be misreported it moves exactly one place better or worse along the sequence, with an even chance of each direction. The documentation acknowledges this as a simplification, noting that a real mis-assessment could jump multiple levels, such as an Operational site being reported as Blocked.",
        },
        "Factors already recorded as Unknown are never perturbed. Uncertainty about an unknown is already expressed in its low score and low confidence.",
        {
          lead: "The success threshold.",
          text: "A single trial counts as a success only if three conditions hold together: readiness reaches at least forty per cent, the destination's capacity is at least the group's size, and no gatekeeper is blocked in that trial. The forty per cent floor is cited in the tool's own source table to the UNHCR Handbook for Emergencies. The documentation is nonetheless direct that it is an operational approximation which should be calibrated against field data before any applied use.",
        },
        "Note that a destination whose gatekeeper is blocked is capped at twenty per cent readiness, which is below the forty per cent floor. The cap and the threshold are therefore consistent by construction: a blocked gatekeeper cannot produce a successful trial.",
      ],
    },
    {
      id: "reading-results",
      number: "06",
      title: "Reading the Results",
      paragraphs: [
        {
          lead: "Destination cards.",
          text: "Each site shows its readiness percentage and its seven factor statuses. Where a gatekeeper is blocked, the card names which one rather than showing a general warning, so that three distinct failure modes are never collapsed into a single badge.",
        },
        {
          lead: "The assignment matrix.",
          text: "A grid of every group against every destination, showing the composite scores that produced the ranking.",
        },
        {
          lead: "Outcomes.",
          text: "For each group, the assigned destination, the alternative if one exists, the predicted success rate from the five hundred trials, and the standard deviation. A high success rate with a high standard deviation should be read differently from the same rate with a low one: the first is a fragile prediction, the second a stable one.",
        },
        {
          lead: "The riskiest factor.",
          text: "For each assignment the tool identifies the single lowest-scoring factor at the assigned destination, which is the thing most worth checking before moving anyone.",
        },
        {
          lead: "The uncertainty sensitivity chart.",
          text: "For each group, predicted success rate is plotted at eleven uncertainty levels from zero to one hundred per cent. This is the tool's core demonstration in a single picture: the underlying scenario is identical at every point on the line, and only the information quality differs.",
        },
        {
          lead: "The Factor Information Value panel.",
          text: "For each of the seven factors, the tool asks a counterfactual question: if every Unknown instance of this factor were resolved to Operational, how much would the average success rate improve? It answers by genuinely re-running the assignment and the simulation with that change applied, not by estimating. The factors are then ranked by improvement. In practical terms this tells an assessment team which single question is worth the trip.",
        },
        {
          lead: "Alerts.",
          text: "Warnings surface unassigned groups and destinations excluded by a named gatekeeper.",
        },
      ],
    },
    {
      id: "distinctions",
      number: "07",
      title: "The Two Distinctions the Model Insists On",
      paragraphs: [
        {
          lead: "Known unknown against unknown unknown.",
          text: "A factor recorded as Unknown with high confidence, meaning the team is sure it does not know, scores higher than the same status with low confidence, meaning the team is not even sure its ignorance is accurate. This falls directly out of the confidence adjustment. The reasoning offered is that a field team which explicitly flags a gap is providing more actionable information than one whose own reporting cannot be trusted.",
        },
        {
          lead: "Unknown against Unwilling.",
          text: "When the Willingness factor is Blocked, the tool displays the word Unwilling rather than the generic Blocked, throughout the interface and in generated text. The point is not cosmetic. Unknown is an intelligence gap that better assessment can close. Unwilling is a confirmed exclusion that no further enquiry will change. A tool whose purpose is to identify where more information would help must not present a settled refusal as an open question, or it commits the very error it exists to expose.",
        },
        "The project's backlog is honest that this change had consequences. Because gatekeeper factors are generated with a higher probability of being blocked than standard factors, promoting Willingness to gatekeeper status raised the number of excluded destinations in the default scenario from roughly two in eight to roughly five in eight. The backlog records this as the intended fix but also flags that the exclusion rate should be re-tested before results from this version are cited, in case it is an artefact of reusing a status distribution designed for a different kind of factor.",
      ],
    },
    {
      id: "grounding",
      number: "08",
      title: "Grounding in Humanitarian Standards and Law",
      paragraphs: [
        "The tool's own source table is explicit about a boundary that matters. No real dataset is used anywhere. The sources listed inform the design of the model, meaning which factors exist, which are gatekeepers, and where thresholds come from. They do not supply data.",
        "The Sphere Handbook, fourth edition, 2018, sits behind the Shelter and Food and water factors. Sphere is a voluntary set of minimum standards for humanitarian response, developed by a coalition of humanitarian organisations. The two figures the tool cites from it are accurate: a minimum of 15 litres of water per person per day, and 3.5 square metres of covered living space per person.",
        "The UNHCR Handbook for Emergencies, third edition, 2007, is cited as the origin of the forty per cent minimum readiness threshold. UNHCR is the United Nations refugee agency.",
        "Inter-Agency Standing Committee guidance from 2007 is cited behind the Authority consent gatekeeper. The Inter-Agency Standing Committee is the main coordination forum of the United Nations and non-governmental humanitarian system. Its guidance in this area establishes that humanitarian operations require the consent of the host government, which is the principle the gatekeeper encodes.",
        "Additional Protocol I to the Geneva Conventions, 1977, Articles 12 and 58, sits behind the Medical capacity and Security factors. Article 12 protects medical units from attack. Article 58 requires parties to a conflict to take precautions to protect civilians under their own control from the effects of attacks.",
        "An ICRC publication from 2013 on violence and the use of force is cited as grounding the Security gatekeeper. The ICRC is the International Committee of the Red Cross, the body with a specific mandate under the Geneva Conventions. Park and Miller, 1988, is cited for the random number generator, which is a computing citation rather than a humanitarian one.",
        "A reader should treat these citations as the origin of design choices rather than as validation of the numbers. The tool does not claim that Sphere endorses a weight of 2 for gatekeepers, and it should not be read as claiming so.",
      ],
    },
    {
      id: "reproducibility",
      number: "09",
      title: "Reproducibility",
      paragraphs: [
        "Every output of the tool is fully determined by four values: the seed, the number of destinations, the number of evacuee groups, and the uncertainty level. Nothing else varies.",
        "The tool writes those four values into the web address of the page. A Copy link button places that address on the clipboard. Anyone who opens that address regenerates the identical scenario, on any machine. The project recommends citing results in the form seed 42, eight destinations, three groups, thirty per cent uncertainty.",
        "This is a genuine strength and is unusual in tools of this kind. A claim made from this simulator can be checked by a reviewer in a few seconds rather than taken on trust.",
      ],
    },
    {
      id: "related-projects",
      number: "10",
      title: "Relationship to Other Ethical Tech CoLab Projects",
      paragraphs: [
        "Three projects in the same organisation address civilian evacuation and share a common documentation pattern of a concept note, an architecture note, and a backlog. They are separate pieces of software with different aims and no shared code.",
        "ERCF, the Evacuation Risk and Cost Framework, is a server-based tool that estimates the human and financial cost of an evacuation and compares the one-off cost of moving people against the accumulating cost of sustaining them where they are. Unlike ERUS it uses real external data, including conflict event records and country-level severity indices, and a set of documented historical cases.",
        "Evac-Sim-Melanie is an agent-based model of how individual households decide to leave, following a population through stages from unaware to departed, and modelling how alerts spread between neighbours.",
        "The three occupy different levels. ERCF asks what an evacuation would cost. Evac-Sim-Melanie asks how a population behaves once told to move. ERUS asks a narrower and prior question: given a set of possible destinations, how much does the quality of our information about them determine the outcome? Readers interested in any of the others should consult those repositories directly, as this report describes only ERUS.",
      ],
    },
    {
      id: "maturity",
      number: "11",
      title: "Practical Nature and Maturity of the Tool",
      paragraphs: [
        {
          lead: "What is built and works.",
          text: "The simulator is complete and functional. It is one self-contained web page with no installation, no build step, and no external dependencies, which is a deliberate choice so that it will still run years from now without a toolchain to maintain. It is published as a live public demonstration through GitHub Pages. All of the mechanics described above are implemented in the code and were verified against it for this report.",
        },
        {
          lead: "What is not built.",
          text: "There are no automated tests of any kind. The project's own backlog identifies the scoring, perturbation, simulation, and assignment functions as good candidates for tests that would catch accidental changes to the formulas, and notes that none exist. There is no licence file, which means the terms on which anyone else may use the work are undefined.",
        },
        {
          lead: "A documentation problem worth stating plainly.",
          text: "Both the README and the tool's own methodology section name a Word document, Evacuation_Simulator_Methodology.docx, as the authoritative source for formula derivations and citations, to be preferred over the in-app text if the two ever disagree. That document is not in the repository. It is excluded from version control by the repository's own ignore rules, along with all spreadsheet and comma-separated data files. A reader who obtains a copy of this repository therefore cannot consult the document the repository tells them is authoritative. The backlog separately notes that this document is behind the code in at least four respects, including the number of simulation runs and the promotion of Willingness to gatekeeper status, and that its closing claim to have been automatically generated from the source code is not accurate.",
        },
        {
          lead: "History of drift.",
          text: "The backlog records that two copies of the tool existed in this repository for a period, with new features landing only in the one that was not being published, so that the public demonstration was stale. This has been resolved by making one file canonical and turning the other into a redirect. It is recorded here because it illustrates the class of problem the backlog is mostly concerned with: the code is sound, and the things around the code have repeatedly fallen out of step with it.",
        },
      ],
    },
    {
      id: "limitations",
      number: "12",
      title: "Limitations and Caveats",
      paragraphs: [
        {
          lead: "Nothing is calibrated.",
          text: "No parameter in the tool has been fitted to or tested against empirical field data. The forty per cent success threshold, the 0.85 perturbation ceiling, the 0.30 score for Unknown, the twenty per cent gatekeeper cap, the doubling of gatekeeper weights, and the four composite weights are all modelling assumptions. The project describes them as open to challenge and says so repeatedly.",
        },
        {
          lead: "Factors are treated as independent.",
          text: "In reality security and authority consent plausibly move together, since a deteriorating security situation often accompanies a withdrawal of consent. The model assumes no such relationship, which will tend to understate how badly things fail together. The project identifies adding factor correlation as the highest-value next step for realism.",
        },
        {
          lead: "There is no time.",
          text: "The model is a single snapshot. Nothing deteriorates or improves over the course of an evacuation, and no journey takes any time to complete.",
        },
        {
          lead: "Routes are represented by one number.",
          text: "Distance stands in for the entire operational burden of a journey. Road condition, checkpoints, fuel availability, seasonal access, and the presence of mines are not modelled at all. A reader should not take the proximity term as a statement about whether a route is passable.",
        },
        {
          lead: "The assignment is greedy, not optimal.",
          text: "Groups are placed one at a time in urgency order, each taking the best remaining site. This is realistic in that urgent cases are handled first, but it means an early group can take a site that would have been a much better match for a later one. The tool does not search for the best overall allocation.",
        },
        {
          lead: "Mis-assessment is gentle.",
          text: "A factor can only be wrong by one level. Real reporting failures can be larger, and the documentation says so.",
        },
        {
          lead: "The population model is coarse.",
          text: "Eight archetypes with fixed vulnerability values, of which only three distinct values are used, and a single binary check against medical capacity. Group composition, disability other than mobility, language, and legal status are not represented.",
        },
        {
          lead: "The outputs mean nothing about the real world.",
          text: "This follows from the fact that the inputs are invented. The tool demonstrates a relationship between information quality and decision quality. It does not predict, and cannot predict, the outcome of any actual evacuation.",
        },
        {
          lead: "The tool's own statement of its status.",
          text: "It is unambiguous and should be respected: a conceptual demonstration tool for thesis research, not an operational decision-support system, whose outputs require empirical calibration before any real-world use.",
        },
      ],
    },
    {
      id: "audience",
      number: "13",
      title: "Intended Audience and Use",
      paragraphs: [
        "The tool is built for an academic argument. Its stated purpose is to make an uncertainty-propagation argument legible to thesis examiners and stakeholders. It is well suited to that, and to teaching, where the sensitivity chart makes an abstract point about information quality concrete in a way that prose does not.",
        "It has a secondary use in prioritising assessment effort. The information-value panel answers a question humanitarian teams face regularly, which is which of several unanswered questions is worth the journey to answer. Even with invented data, the structure of that reasoning is transferable.",
        "It is not for planning. No part of this tool should inform a decision about moving actual people. The project says this itself, in every document it contains, and this report repeats it without qualification.",
      ],
    },
    {
      id: "conclusion",
      number: "14",
      title: "Conclusion",
      paragraphs: [
        "The most useful thing about this simulator is a negative result it makes easy to see. Move the uncertainty slider and predicted outcomes deteriorate while the scenario behind them is provably unchanged, because the scenario is regenerated only on demand and not when the slider moves. The degradation is entirely an artefact of what is knowable. Making that visible, and measurable, is a more honest contribution than a tool that produced confident numbers would be.",
        "The two epistemic distinctions are the other substantive contribution. Separating a confident admission of ignorance from an unreliable one, and separating an open question from a settled refusal, are both choices that a simpler scoring system would have flattened. The decision to promote Willingness to a gatekeeper, and to name it Unwilling rather than Blocked, came from noticing that the arithmetic was allowing a good food supply to outvote a community's refusal. That is the kind of error that is easy to make and hard to see once made.",
        "The candour of the project's own backlog is worth noting as a practice in itself. It records the absent methodology document, the stale published build, the uncalibrated thresholds, the missing tests, and the possibility that its own most recent modelling change produced an exclusion rate that is an artefact rather than an intention. A research instrument that catalogues its own weaknesses this specifically is easier to trust about what it does claim.",
        "What remains, before any of this could be more than a demonstration, is calibration. Every threshold in the tool is a considered guess. The tool is transparent about which guesses they are and where each one lives in the code, which is the necessary precondition for someone eventually replacing them with measurements.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Sphere Association. The Sphere Handbook: Humanitarian Charter and Minimum Standards in Humanitarian Response, fourth edition, 2018. Behind the Shelter and Food and water factors.",
      url: "https://spherestandards.org/handbook/",
    },
    {
      ref: "United Nations High Commissioner for Refugees. Handbook for Emergencies, third edition, 2007. Cited as the origin of the forty per cent minimum readiness threshold.",
    },
    {
      ref: "Inter-Agency Standing Committee. Guidance on humanitarian operations requiring the consent of the host government, 2007. Behind the Authority consent gatekeeper.",
    },
    {
      ref: "Protocol Additional to the Geneva Conventions of 12 August 1949, and relating to the Protection of Victims of International Armed Conflicts (Protocol I), 1977, Articles 12 and 58. Behind the Medical capacity and Security factors.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977",
    },
    {
      ref: "International Committee of the Red Cross. Publication on violence and the use of force, 2013. Cited as grounding the Security gatekeeper.",
    },
    {
      ref: "Park, S.K. and Miller, K.W. (1988). Random Number Generators: Good Ones Are Hard To Find. Communications of the ACM, volume 31, issue 10. The generator used for all seeded randomness in the tool.",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/India-EvacSimulation/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/India-EvacSimulation",
};
