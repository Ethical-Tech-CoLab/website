// ─────────────────────────────────────────────────────────────────────────
// "The Mariupol Corridor Severity Model", a plain-language research report on
// the Mariupol 2022 Corridor Severity Model prototype, transcribed from
// Mariupol-Severity-Model-Paper.md in the mariupol-evacuation-model
// repository. Rendered by
// src/app/publications/mariupol-severity-model/page.tsx. Kept here so the
// page stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
//
// The paper attributes contested claims rather than asserting them. Where it
// says the repository records, or the repository states, that attribution is
// load-bearing. Do not flatten it into direct assertion.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is plain prose, prose introduced by an accent lead-in (used
 *  for the labelled limitation entries), a formula rendered in monospace, a
 *  bulleted list, or a data table. The paper's tables and its consent ladder
 *  are restored here as structure rather than prose, because the figures are
 *  meant to be scanned and compared. The vulnerability formula is kept
 *  alongside its plain-language description rather than instead of it. */
export type Paragraph =
  | string
  | { lead: string; text: string }
  | { formula: string; note?: string }
  | { intro?: string; list: string[]; ordered?: boolean }
  | { table: { caption?: string; headers: string[]; rows: string[][] } };

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

export const mariupolReport = {
  eyebrow: "Publications · Academic report",
  title: "The Mariupol Corridor Severity Model",
  subtitle:
    "A Daily Measure of Civilian Danger During the Siege of Mariupol, March to May 2022",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "Christine, GitHub user ChristineLumen. Prepared as masters research at the NYU Center for Global Affairs, under the Ethical Tech CoLab. Repository version 0.9.",
  thesis:
    "A siege does not kill people at a steady rate, and it does not kill them only by shelling. Some days the shells fall. Other days the guns are quiet, and what is killing people is that there has been no heating for three weeks, no running water, no medicine, and no convoy has come through. From a distance, the quiet days can look like improvement. This model produces one number for every day of the siege of Mariupol, built so that a lull in shelling cannot by itself lower the assessment.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "77",
      label:
        "days scored, one severity number for every day from 5 March to 20 May 2022",
    },
    {
      value: "54",
      label:
        "of those days on which the deprivation clock was the dominant driver, against none for the three violence components",
    },
    {
      value: "0.742",
      label:
        "the composite score any single saturated component forces, above the 0.70 threshold for the Critical phase",
    },
    {
      value: "7.5",
      label:
        "weeks between 9 March, when the model first says evacuation is warranted, and the negotiated mechanism arriving on 30 April",
    },
  ],

  sections: [
    {
      id: "foreword",
      number: "00",
      title: "Foreword",
      paragraphs: [
        "A siege does not kill people at a steady rate, and it does not kill them only by shelling. Some days the shells fall and the count of the dead rises. Other days the guns are comparatively quiet, and what is killing people is that there has been no heating for three weeks, no running water, no medicine, and no convoy has come through. From the outside, and especially from the outside at a distance, the quiet days can look like improvement.",
        "Between March and May of 2022 the city of Mariupol was encircled. Corridors for civilians to leave were announced, and then did not hold. Weeks passed. A negotiated evacuation involving the United Nations and the International Committee of the Red Cross eventually took people out of the Azovstal steelworks at the very end of April. The question this repository asks is a narrow and uncomfortable one: on which day did the facts on the ground first become bad enough that the legal obligations owed to those civilians were plainly engaged, and how long afterwards did anything actually arrive?",
        "This report explains, in non-technical language, what the model measures, how it turns observations into a single daily number, why each of its ingredients was chosen, and what it cannot do. It is written for readers who work in policy, humanitarian operations, or law, and who have never written a line of computer code.",
      ],
    },
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "This repository contains a research prototype: an experimental piece of software that calculates, for every single day of the siege of Mariupol from 5 March to 20 May 2022, a number between 0 and 1 describing how dangerous it was for civilians to remain in the city. The repository calls this number the composite severity, written as S.",
        "The severity number is built from six ingredients, which the repository calls components. Three of them describe violence: how many attacks happened each day, how close the fighting was to where people lived, and how much of that violence was aimed at civilians or broke promises of safe passage. Three of them describe the slower forms of harm that a siege produces: the cold in a city whose heating has been destroyed, the accumulating time under encirclement with no aid arriving, and the progressive destruction of the buildings people shelter in.",
        "The six ingredients are deliberately not averaged in the ordinary way. The model uses a method of combination that pulls the answer close to whichever ingredient is worst. The reasoning is stated plainly in the repository's methodology: a population that is safe from shelling but freezing without water is not in medium danger. A plain average would have made the lull in shelling after mid-March look like recovery. It was not.",
        "The resulting daily number is sorted into one of five phases, from Minimal to Critical, each carrying an indicated posture ranging from routine monitoring to immediate protective action. The presentation deliberately follows the five-category convention used by the INFORM Severity Index and by the Integrated Food Security Phase Classification, so that humanitarian readers recognise the shape of the output.",
        "The severity number is then multiplied by a vulnerability weight of 1.114, derived from the share of the pre-siege population who were children, elderly, or living with a disability, to produce what the repository calls a priority index.",
        "The repository's central claim is a claim about timing. It argues that publicly available information was sufficient to establish, well before the end of March, that the factual conditions triggering obligations under International Humanitarian Law were met, and that the negotiated evacuation mechanism did not arrive until 30 April. The repository states its conclusion in one sentence: the binding constraint was not information but consent.",
        "The tool is a single web page that runs in an ordinary browser. Its author describes it as retrospective, not validated against how people actually behaved, and explicitly not operational guidance. It is the first of three intended axes of a fuller decision framework; the other two, feasibility and destination viability, are not built.",
        "This report finds the model's reasoning clear and unusually well documented, and its candour about its own weaknesses genuine. It also identifies several points where a reviewer should verify a citation or a data figure before the work is published or relied upon.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "During a siege, the people who might intervene are almost always working from partial information, and the information that is available degrades exactly when conditions are worst. Reporters leave or are killed. Communications fail. The number of recorded incidents falls, not because less is happening but because fewer people are left to record it. A decision-maker watching a feed of reported attacks can therefore watch a city get quieter on the page while it gets deadlier on the ground.",
        },
        {
          lead: "The gap.",
          text: "Existing humanitarian severity measures are built to rank crises against each other, usually monthly and usually at the level of a whole country or a whole emergency. They are not built to answer the question a siege poses, which is a question about a single place on a single day: is it, today, sufficiently dangerous here that the obligations owed to these civilians are plainly engaged? Nor do the standard measures put any weight on whether promises of safe passage were kept, which in a siege is often the decisive variable.",
        },
        {
          lead: "The response.",
          text: "This repository proposes a daily, place-specific severity signal assembled entirely from information that was publicly available at the time: recorded conflict events, temperature, satellite damage assessments, population estimates, and the documented record of what corridors were announced and what became of them. It then attaches each of the six ingredients to the legal provision it bears on, so that a rise in the number can be read as a rise in the strength of a specific legal claim rather than as a general worsening.",
        },
        "The research question the repository sets itself is stated at the top of its own interface: how can and should artificial intelligence tools be used to enhance the protection and evacuation of civilians during armed conflict, and in what ways do they support or challenge the implementation of existing obligations under International Humanitarian Law? The model is offered as one empirical answer, worked through a single case.",
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        {
          intro: "The model is designed to:",
          list: [
            "Produce a transparent daily measure of how dangerous it was for civilians to remain in Mariupol on any given date between 5 March and 20 May 2022.",
            "Give equal analytical standing to the slow harms of a siege, cold, deprivation, and the destruction of shelter, alongside the fast harms of shelling, so that a lull in attacks cannot by itself lower the assessment.",
            "Turn the question of consent into a measurable quantity, by scoring how many announced corridors were honoured and on whose terms passage was permitted.",
            "Anchor each component to the International Humanitarian Law provision it bears on, so that the model measures the factual predicate for an obligation rather than pronouncing on the obligation itself.",
            "Generate, for any selected date, a written situation assessment naming the corridor regime in force, the dominant driver of severity, and the legal provisions engaged.",
            "Make every step of the calculation inspectable, including the arithmetic, so that a reader who disagrees with a threshold can see exactly what changing it would do.",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How the Model Works",
      paragraphs: [
        "The model belongs to a family of tools called composite indicators: measures that take several unlike quantities and squash them into a single score. The standard reference manual for this kind of work, the Handbook on Constructing Composite Indicators published jointly by the OECD and the European Commission's Joint Research Centre in 2008, is cited by the repository and shapes its approach.",
        "The first problem such a tool must solve is that its ingredients are measured in different units. Attacks per day, degrees Celsius, and percentage of buildings destroyed cannot be added together as they stand. The solution used here is called min-max normalisation: for each ingredient the author fixes a floor and a ceiling, and then rescales the raw observation so that the floor becomes 0 and the ceiling becomes 1. A value of 0 means no concern on that measure. A value of 1 means as bad as the model's scale allows, and the interface marks such a value as saturated.",
        "The ceilings are therefore not neutral. They are judgements about what counts as the worst case, and where they are set determines how much any given ingredient can contribute. The repository is explicit that its ceilings are documented conventions rather than statistically derived values, and that they should be re-estimated as percentiles of an observed distribution before publication.",
        {
          lead: "Component one, hostility intensity.",
          text: "The number of violent events recorded inside the city on an average day: battles, shelling, air and drone strikes, and explosions or remote violence. The raw number comes from the Armed Conflict Location and Event Data Project, known as ACLED, an independent non-profit organisation that reads news reports, non-governmental organisation reports, and local sources and converts them into a structured record of individual violent incidents. The daily event count is divided by a ceiling of 10 events per day. It does very little in the Mariupol case: the highest daily rate in the author's extraction is 4.8 events per day, during 10 to 15 March, which yields a score of 0.48. It is never the dominant driver of severity on any day of the siege window, and the repository treats that as a finding.",
        },
        {
          lead: "Component two, kinetic proximity.",
          text: "How close the armed activity was to where civilians lived. The number of armed actions per day recorded within 5 kilometres of the city, plus one half of the number recorded within 5 to 15 kilometres, all divided by a ceiling of 6. The halving is what the methodology calls distance-decay weighting: fighting fifteen kilometres away is a smaller threat to a civilian in the city than fighting five kilometres away, but it is not no threat at all, because it shapes where the front is going and whether routes out remain usable. Two cities can record the same number of attacks per day while one has them at its edges and the other in its centre, so the repository keeps closeness visible in its own right. It peaks at 0.556 during the 10 to 15 March window and never becomes dominant.",
        },
        {
          lead: "Component three, protection risk.",
          text: "The model's most distinctive component, and the one that carries most of its legal argument. It is the plain average of four sub-indicators, each scored from 0 to 1 and each given equal weight. The first two describe how the violence was conducted: the civilian-targeting share, the proportion of all recorded violent events whose target was civilian, which reaches 0.483 in the 10 to 15 March window; and lethality, deaths per recorded event divided by a ceiling of 15, which reaches 12.9 deaths per event in the same window for a score of 0.86. The methodology identifies that window as the retaliation phase and treats the combination of high civilian targeting and high lethality as its empirical signature.",
        },
        {
          lead: "Corridor violation history.",
          text: "The third sub-indicator, and the first of the model's two original contributions. It is the proportion of previously announced corridors on the relevant route that were shelled or blocked. During the first regime this sits at 1.00, because both prior attempts had collapsed. It falls to 0.67 during the self-evacuation period, to 0.60 during the organised evacuation, and rises again to 0.70 at the end.",
        },
        {
          lead: "Consent and filtration exposure.",
          text: "The fourth sub-indicator is an ordered ladder describing the legal and political basis on which people were moving, running as follows.",
        },
        {
          list: [
            "0.25, negotiated with a neutral third-party escort.",
            "0.40, negotiated bilaterally between the parties.",
            "0.50, announced unilaterally by one party.",
            "0.75, no ceasefire in effect at all.",
            "0.90, movement subject to screening by the adversary, the process reported as filtration.",
          ],
        },
        "Choosing a destination controlled by the adversary raises the effective value to 0.90 or above.",
        "Two of the four sub-indicators measure what was done to civilians; two measure what was promised to them and whether it held. The repository states that the last two operationalise the consent conditions attached to evacuation and to the passage of relief under the Fourth Geneva Convention and Additional Protocol I. The practical effect is that a corridor which exists on paper but not in fact raises the severity score rather than lowering it. That is the correct direction of travel, and it is not how a simple access indicator would behave. The four sub-indicators are averaged without weighting, which is an explicit choice rather than an oversight, but it is a choice: the proportion of attacks aimed at civilians and the legal basis of a corridor are treated as equally informative about protection risk.",
        {
          lead: "Component four, cold burden.",
          text: "How far the temperature fell below a habitable minimum. It is the shortfall of the mean daily temperature below a threshold of 18 degrees Celsius, divided by 28, with a floor at minus 10 degrees. At 18 degrees or above the component scores 0; at minus 10 degrees or below it scores 1. Outdoor temperature is used as a proxy for indoor temperature, which is the component's crucial and defensible assumption: district heating, electricity and water supply in Mariupol were destroyed from around 2 March, and in a city where the heating has stopped, the inside of a building converges on the temperature outside it.",
        },
        "Cold matters a great deal here, because the siege ran through the end of a Ukrainian winter. On the model's own temperature series the coldest point is around minus 6 degrees in the second week of March. Cold is the dominant component on 23 of the 77 days in the window, more than any of the three violence components achieve on any day. A purely kinetic assessment would have registered none of this.",
        "One note on the 18 degree figure. The repository attributes this threshold to the Sphere Handbook. A full-text check of the fourth edition, published in 2018, does not locate an 18 degree indoor or habitability figure anywhere in it. The comparable published figure in the sector is UNHCR's Emergency Handbook, which gives a comfortable shelter interior as 15 to 19 degrees Celsius, and the World Health Organization's housing guidance, which uses 18 degrees as a healthy indoor minimum. The threshold itself is therefore well within the range the sector uses; the attribution appears to need correction.",
        {
          lead: "Component five, the deprivation clock.",
          text: "Time. Specifically, the number of days the city has been encircled, counted from 2 March, divided by a ceiling of 60 days. The definition subtracts three days from the count for each aid convoy that reached the city, on the reasoning that a delivery of supplies buys back some of the accumulated deficit. In the Mariupol case the number of convoys that reached the city proper is recorded as zero, so this relief credit never operates. The repository notes that the ICRC convoy was repeatedly blocked at Berdiansk.",
        },
        "The reasoning for a clock is that hunger, thirst, untreated illness, and the exhaustion of medicines are cumulative. They do not require a shot to be fired and they do not improve on their own. A model that only counted incidents would treat a quiet fiftieth day of encirclement as safer than a loud fifth day. The deprivation clock is the model's way of insisting that it is not. It does more work than any other component: it is the dominant driver on 54 of the 77 days, it reaches its ceiling of 1.0 on 1 May, and it remains saturated for the rest of the window. Because of how the six components are combined, this single saturated component is enough on its own to hold the whole model in its top severity phase. This is both the model's sharpest argument and its most significant vulnerability.",
        {
          lead: "Component six, infrastructure damage.",
          text: "The cumulative share of the city's structures visibly damaged or destroyed, taken from satellite damage assessments published by UNOSAT, the United Nations Satellite Centre, which operates within the United Nations Institute for Training and Research. UNOSAT analysts compare before-and-after satellite images and classify individual buildings as destroyed, severely damaged, moderately damaged or possibly damaged. The Ukraine work sits under a single activation code, CE20220223UKR. UNOSAT publishes on particular dates, not every day, so the model fixes five anchor points and draws a straight line between them: 0.02 on 5 March, 0.04 on 14 March, 0.14 on 26 March, 0.32 on 7 May, and 0.33 on 20 May.",
        },
        "The repository says plainly that this is a lower bound. Satellites see roofs. Damage to the inside of a building whose roof is intact is invisible to this method, and UNOSAT itself labels its assessments preliminary and not validated in the field. The true share of unusable buildings on any given day was therefore higher than the number the model uses. The component rises steadily but never becomes dominant, because its ceiling of 1.0 would require essentially the whole city to be visibly destroyed, and the assessed figure reaches only about a third.",
        {
          lead: "Combining the six.",
          text: "Having produced six numbers between 0 and 1, the model combines them with what mathematicians call a generalised power mean, using an exponent of 6. In plain terms the recipe is: raise each of the six scores to the sixth power, take the ordinary average of those six powered numbers, then take the sixth root of the result. The effect of raising numbers to a high power before averaging is that large values dominate small ones very heavily. The answer always lands somewhere between the plain average of the six and the single worst of the six, and with an exponent of 6 it lands close to the worst. The repository calls this the humanitarian weakest-link principle.",
        },
        "The technical name for what is at stake here is compensability, meaning the extent to which a good score on one measure is allowed to cancel out a terrible score on another. A plain average is fully compensatory: three comfortable measures will drag a catastrophic fourth up toward the middle. The OECD and Joint Research Centre handbook treats this as an explicit decision the designer of any index must make and defend, and the INFORM Severity Index makes a similar choice for similar reasons, using geometric rather than arithmetic averaging to limit compensability. This model goes considerably further in the same direction than INFORM does, and the repository is right to flag its exponent as an adjustable convention rather than a discovered fact.",
        "One consequence deserves to be stated in plain terms, because it is not obvious from the formula and it matters for how the results should be read. If any single one of the six components reaches its ceiling of 1.0, the combined score cannot fall below approximately 0.742 no matter what the other five are doing. Since the threshold for the model's top severity phase is 0.70, one saturated component is by itself sufficient to place the city in the highest category. From 1 May onward the deprivation clock is saturated, and the model's output is effectively pinned by that fact alone.",
        "The repository states, correctly and importantly, that the sixth powers are an internal weighting device and are not shares of causation. The number 0.33 for infrastructure damage, raised to the sixth power, becomes 0.0013 and effectively disappears from the sum. That does not mean the destruction of a third of the city mattered little. It means this particular arithmetic is designed to report the worst thing happening, and everything that is not the worst thing recedes.",
        {
          lead: "The five severity phases.",
          text: "The resulting score is placed in one of five bands, each carrying a stated posture.",
        },
        {
          table: {
            headers: ["Phase", "Score range", "Label", "Indicated posture"],
            rows: [
              ["1", "below 0.20", "Minimal", "routine monitoring"],
              [
                "2",
                "0.20 to 0.40",
                "Concern",
                "contingency planning; register vulnerable groups",
              ],
              [
                "3",
                "0.40 to 0.55",
                "Serious",
                "evacuation planning; negotiate access",
              ],
              ["4", "0.55 to 0.70", "High", "evacuation warranted"],
              [
                "5",
                "0.70 and above",
                "Critical",
                "immediate protective action",
              ],
            ],
          },
        },
        "The five-band shape is borrowed deliberately. The INFORM Severity Index, run by ACAPS with the European Commission's Joint Research Centre as scientific lead, sorts every humanitarian crisis in the world into five severity categories. The Integrated Food Security Phase Classification, the partnership of United Nations agencies and non-governmental organisations that classifies food crises, uses a five-phase ladder that humanitarian readers know well. Adopting the same shape makes the output legible to people who already work with those systems. The thresholds themselves, however, are the author's own conventions. They were not derived from data and they have not been validated by expert elicitation. The repository says so.",
        {
          lead: "Vulnerability weighting.",
          text: "The final step adjusts for who was in the city. The weight is 1 plus 0.3 times the share of the population who were children or elderly, plus 0.3 times the share living with a disability, with a pre-siege population of 343,598, children numbering 32,926, elderly 73,723, and people with disabilities approximately 24,288. These figures yield a vulnerability weight of 1.114, and the priority index is simply the severity score multiplied by that weight.",
        },
        {
          formula: "Vw = 1 + 0.3 x (children + elderly) / N + 0.3 x (disabled / N)",
          note: "N is the pre-siege population of 343,598. The figures above give Vw of 1.114.",
        },
        "The population figures come from WorldPop, a research programme based at the University of Southampton that estimates how many people live in each small square of ground by taking official census totals for large areas and distributing them using satellite evidence about where buildings are. The boundaries used are from GADM, a free global database of administrative area outlines. The disability share of 7.07 per cent is taken from Ministry of Social Policy pension-system statistics as reported by the World Bank.",
        "The repository is candid that the 0.3 increments are placeholders pending calibration. They are chosen to mirror the categories of person given special protection under the Fourth Geneva Convention and under Article 11 of the Convention on the Rights of Persons with Disabilities, which requires States to take all necessary measures to ensure the protection and safety of persons with disabilities in situations of armed conflict. The weight is applied as a multiplier on exposure rather than added in as a seventh component, mirroring the INFORM Severity separation between how bad the threat is and how many vulnerable people it falls on. The repository calls 1.114 conservative, because the World Bank source itself notes that true disability prevalence in Ukraine is likely closer to the World Health Organization's international rate of around 16 per cent than to the 7.07 per cent recorded in the pension system.",
        "Two honest observations about this step. The repository notes that elderly and disabled populations overlap and that the same people are therefore counted twice; it flags this as needing correction where joint distributions exist. And, more consequentially for reading the results, the vulnerability weight is a single constant applied to all 77 days. Within this one case it never changes the ordering of anything. Its purpose is comparison between cases in the fuller decision framework the repository envisages, which has not been built.",
      ],
    },
    {
      id: "worked-example",
      number: "05",
      title: "A Worked Example: 14 March 2022",
      paragraphs: [
        "The repository works through a single day in full, and it is worth following because it demonstrates the model's central argument better than any description. 14 March 2022 was the day the first private cars got out of Mariupol and reached Zaporizhzhia. The six components on that day were:",
        {
          table: {
            headers: ["Component", "Calculation", "Score"],
            rows: [
              ["Hostility intensity", "4.8 events per day divided by 10", "0.480"],
              [
                "Kinetic proximity",
                "(2.17 plus half of 2.33) divided by 6",
                "0.556",
              ],
              [
                "Protection risk",
                "average of 0.483, 0.860, 0.670, 0.750",
                "0.691",
              ],
              ["Cold burden", "(18 minus minus 5.3) divided by 28", "0.832"],
              ["Deprivation clock", "12 days divided by 60", "0.200"],
              ["Infrastructure damage", "UNOSAT anchor for 14 March", "0.040"],
            ],
          },
        },
        "The plain average of these six is 0.47. The worst of the six is 0.83. The weakest-link combination gives 0.66, which places the day in Phase 4 of 5, High, with the indicated posture that evacuation is warranted. Multiplied by the vulnerability weight, the priority index is 0.73.",
        "The reading the repository draws from this is the important part. On the day the first cars escaped, the gravest single threat to the people still inside was not shelling. It was cold: minus 5 degrees, no heating, day twelve of encirclement. A kinetic assessment, watching only the tempo of attacks, would have missed it entirely.",
      ],
    },
    {
      id: "reading-the-results",
      number: "06",
      title: "Reading the Results",
      paragraphs: [
        "The tool is a single web page. The user selects a date, by dragging along a timeline, stepping day by day, or jumping to one of the four corridor regimes or to a documented event. The page then shows, for that date: which corridor regime was in force and where its route ran on a schematic map of the front line; a satellite view; the observed values of every variable that feeds the model; the six component scores with a short sentence explaining each one; the composite severity with its phase and posture; and a generated written assessment naming the legal provisions engaged.",
        "Three presentational choices deserve mention. The interface prints a single driver sentence identifying which component is currently worst, so that the reader is told not only how bad it is but why. It draws a small number line showing the plain average, the model's rating, and the worst component side by side, which makes the effect of the weakest-link method visible rather than hidden. And the full arithmetic, including every sixth power and the running sum, is available behind a toggle, so a sceptical reader can check the sum by hand.",
        "Recomputing the model exactly as published produces the following trajectory across the 77 days. The series opens on 5 March at 0.51, Phase 3, Serious. It rises through the first week and enters Phase 4, evacuation warranted, on 9 March. It reaches a local peak of 0.675 on 13 March, driven by the combination of the coldest part of the window and the retaliation phase in the protection-risk component. It then falls away through the second half of March, reaching a trough of about 0.38 on 26 March, which is Phase 2, Concern. It falls because the weather improves and because the recorded tempo of attacks drops sharply after 15 March.",
        "From late March it climbs again, steadily and without interruption, as the deprivation clock accumulates. It re-enters Phase 4 in mid-April, crosses 0.70 into Phase 5, Critical, on 28 April, and reaches 0.743 on 1 May, where it stays, flat, until the window closes on 20 May.",
        "Two things follow from this shape, and both are worth stating carefully. The first supports the repository's argument. The threshold at which the model says evacuation is warranted was first crossed on 9 March. The organised evacuation involving the United Nations and the International Committee of the Red Cross began on 30 April. That is a gap of roughly seven and a half weeks between the modelled signal and the mechanism, and the substance of the repository's central finding survives the recomputation.",
        "The second qualifies it. The repository's README describes severity as crossing critical thresholds in mid-March, roughly eight weeks before the mechanism arrived. On the model's own five-phase scale, what happens in mid-March is entry into Phase 4, High, not Phase 5, Critical. The model's Critical phase is not reached until 28 April, and the global maximum of the whole series is at its very end, not in March. The mid-March feature is a local peak, and it is a real and meaningful one, but the summary wording somewhat overstates what the model outputs.",
        "It is also worth noting that across all 77 days the dominant component is either cold burden, on 23 days, or the deprivation clock, on 54 days. On no day of the siege is the worst-scoring component one of the three that measure violence. That is a striking result and it is the model's substantive point made arithmetically. It is also, in part, an artefact of where the ceilings were set: intensity was divided by 10 when the observed maximum was 4.8, while the deprivation clock was divided by 60 days in a siege that ran for more than 60 days. Both readings are true at once, and an honest use of this model requires holding both.",
      ],
    },
    {
      id: "where-the-numbers-come-from",
      number: "07",
      title: "Where the Numbers Come From",
      paragraphs: [
        "This section matters more than its length suggests, because the phrase daily model can be read in two quite different ways, and only one of them is accurate here.",
        "The repository does not contain a dataset. Its data folder and its imagery folder hold instructions for downloading optional extra layers, not the layers themselves. Every number the model actually computes with is written directly into the single web page as a fixed constant.",
        "The violence figures come from the author's own extraction from ACLED for Mariupol raion, but they are not daily figures. They are summarised into four windows, and held constant inside each window. Phase I covers 24 February to 9 March, Phase II covers 10 to 15 March, Phase III covers 16 March to 5 May, and Phase IV, after 5 May, is labelled extrapolated in the repository's own tables. Every day inside a window carries the same event rate, the same civilian targeting share, the same lethality, and the same proximity figures.",
        "The temperature series is not an ERA5 extraction. ERA5 is the European Centre for Medium-Range Weather Forecasts reanalysis, a reconstruction of past weather that fills every gap in space and time by feeding decades of real observations through a modern forecasting model, and it would supply an hourly record for Mariupol. The repository names ERA5 as its intended source and states plainly that the current series is an interpolated climatology, a smooth curve drawn through ten anchor temperatures, pending the full extraction. The infrastructure damage series is likewise interpolated between five UNOSAT anchor points.",
        "The consequence, stated plainly. The model produces a value for every day, but its inputs move on far fewer than 77 occasions. Day-to-day variation within a phase comes only from the temperature curve, the deprivation clock ticking forward by one day, and the damage line advancing by a fraction. The word daily describes the resolution of the output, not the resolution of the evidence. A policy reader should hold this firmly in mind: the shape of the curve is real and is defensible, but the model cannot distinguish 18 March from 19 March on any evidence about what happened on those two days.",
        "There are optional layers. If a user downloads the UNOSAT building-damage geodata from the Humanitarian Data Exchange, the humanitarian data-sharing platform run by the United Nations Office for the Coordination of Humanitarian Affairs, the tool will display real per-building assessments and filter them by date. Until that file is supplied, the per-building colouring is generated from a district-level chronology and is labelled illustrative throughout the interface. The interface also offers building footprints from OpenStreetMap, the volunteer map of the world, retrieved through its Overpass query service, and dated satellite crops the user can export from the Copernicus Browser, the European Space Agency's free viewer for Sentinel-2 imagery. The repository warns explicitly that the undated base satellite mosaic must not be presented as the state of the city on any particular date, which is a scrupulous piece of labelling.",
      ],
    },
    {
      id: "corridor-record",
      number: "08",
      title: "The Corridor Record",
      paragraphs: [
        "The model divides the siege window into four regimes, each with its own scores for corridor violation history and consent exposure. These are the two variables that carry the model's legal argument, so it is worth setting the regimes out as the repository defines them.",
        {
          lead: "Announced corridors that failed, 5 to 13 March.",
          text: "Violation history 1.00, consent 0.50. The repository records that corridors announced for 5 to 7 March collapsed under renewed shelling, with each party attributing responsibility to the other, and that a proposal on 7 March routing corridors toward Russia and Belarus was rejected by Kyiv. The consent value of 0.50 reflects unilateral announcement rather than negotiated agreement.",
        },
        {
          lead: "Self-evacuation, 14 March to 29 April.",
          text: "Violation history 0.67, consent 0.75. The repository describes private vehicles departing toward Zaporizhzhia without any ceasefire in effect, crossing Russian-held territory and multiple checkpoints between Manhush and Vasylivka, with passage intermittently permitted and convoys turned back on some days. The consent value of 0.75 is the model's score for movement occurring with no agreement at all. Eastbound movement into Russian-controlled territory via Bezimenne is recorded as continuing in parallel throughout.",
        },
        {
          lead: "Organised humanitarian evacuation, 30 April to 7 May.",
          text: "Violation history 0.60, consent 0.25. The repository records that following the United Nations Secretary-General's meetings in Moscow on 26 April, an arrangement involving the United Nations and the International Committee of the Red Cross took civilians out of the Azovstal plant, with evacuees exiting through a Russian-controlled screening point at Bezimenne before onward transfer to Zaporizhzhia, and some proceeding to Russian-controlled territory rather than to Zaporizhzhia. The consent value of 0.25 is the model's lowest, reserved for passage negotiated with a neutral third-party escort.",
        },
        {
          lead: "No organised corridor, 8 to 20 May.",
          text: "Violation history 0.70, consent 0.90. The repository records that no agreed civilian passage was in effect and that remaining movement was subject to filtration screening, citing reporting by the Office of the United Nations High Commissioner for Human Rights and its Human Rights Monitoring Mission in Ukraine, including reported onward transfers to the Russian Federation.",
        },
        "The repository adds one observation that deserves emphasis, because it is the reason the whole exercise has a point. The macro front line in the Zaporizhzhia sector was static throughout the siege window. The routes out did not become unsafe because the battlefield shifted underneath them. They were unsafe, or usable, according to whether passage was permitted. In the repository's phrase, corridor insecurity was a consent problem across stable territory, not a shifting-battlefield problem.",
        "All conduct summaries above are the repository's, attributed by it to reporting by the Office for the Coordination of Humanitarian Affairs, the International Committee of the Red Cross, and the Office of the High Commissioner for Human Rights. They are descriptive, and the repository is careful to state that they are not adjudicative.",
      ],
    },
    {
      id: "ihl",
      number: "09",
      title: "Grounding in International Humanitarian Law",
      paragraphs: [
        "The model does not decide legal questions. What it claims to do is measure the factual predicate on which certain obligations turn: whether the danger was imminent, and whether objects indispensable to survival were being denied. That is a modest and appropriate framing, and it is the right one.",
        {
          lead: "Fourth Geneva Convention, Article 17.",
          text: "The parties to a conflict shall endeavour to conclude local agreements for the removal from besieged or encircled areas of the wounded, sick, infirm and aged, children and maternity cases, and for the passage into such areas of medical personnel and equipment and ministers of religion. Two points of precision matter, and the repository would be stronger for stating them. The obligation is to endeavour, that is, to make a good-faith effort to reach an agreement; it is an obligation of conduct, not of result. And the categories named are narrower than civilians in general. Article 17 is the provision the repository points to as the mechanism that arrived late, and that identification is apt, but Article 17 standing alone is a comparatively weak legal hook.",
        },
        {
          lead: "Fourth Geneva Convention, Article 23.",
          text: "Each party shall allow the free passage of medical and hospital stores intended for civilians, and of essential foodstuffs, clothing and tonics intended for children under fifteen, expectant mothers and maternity cases. Passage may be made conditional where there are serious reasons to fear diversion, ineffective monitoring, or definite military advantage to the adversary. The narrowness of the food limb, which does not cover the general adult civilian population, is a known gap in the 1949 text.",
        },
        {
          lead: "Additional Protocol I, Article 70.",
          text: "Relief actions that are humanitarian and impartial shall be undertaken for civilian populations not adequately provided for, subject to the agreement of the parties concerned, and parties shall allow and facilitate the rapid and unimpeded passage of relief consignments even where destined for the adverse party's civilians. The dominant reading of the consent requirement is that it may not be withheld arbitrarily. Article 70 substantially closes the gap left by Article 23.",
        },
        {
          lead: "Additional Protocol I, Articles 51, 57 and 58.",
          text: "Article 51 prohibits attacks on civilians and prohibits indiscriminate attacks, including those expected to cause civilian harm excessive in relation to the concrete and direct military advantage anticipated. Article 57 requires constant care to spare civilians, verification of targets, choice of means that minimise civilian harm, cancellation of attacks that turn out to be unlawful, and effective advance warning where circumstances permit. Article 58 places duties on the defending party to move its own civilians away from military objectives so far as feasible, expressly without prejudice to the prohibition on forcible transfers.",
        },
        {
          lead: "Fourth Geneva Convention, Article 49.",
          text: "Forcible transfers and deportations of protected persons out of occupied territory are prohibited regardless of motive. Evacuation is permitted only where the security of the population or imperative military reasons demand it, must stay within the occupied territory unless materially impossible, and must be reversed as soon as hostilities in the area cease. This is the provision the repository invokes in connection with documented filtration transfers, and it is the correct one.",
        },
        {
          lead: "Customary International Humanitarian Law, Rules 15, 24, 53, 54 and 55.",
          text: "As codified in the study published by the International Committee of the Red Cross: constant care and feasible precautions in military operations; removal of civilians from the vicinity of military objectives so far as feasible; the prohibition on starvation of the civilian population as a method of warfare; the prohibition on attacking, destroying, removing or rendering useless objects indispensable to civilian survival; and the duty to allow and facilitate rapid and unimpeded passage of impartial humanitarian relief, subject to a right of control.",
        },
        "The legal background against which all of this sits, and which the repository assumes without stating, is that a siege is not unlawful merely because it is a siege. The International Committee of the Red Cross puts it directly: sieges are not prohibited as such under International Humanitarian Law. What makes a siege unlawful is how it is conducted, and specifically whether starvation is used as a method of warfare, whether objects indispensable to survival are attacked or rendered useless, whether relief is arbitrarily refused, whether attacks within the encirclement are indiscriminate or disproportionate, and whether the required precautions are taken. The model's six components map onto precisely that list, which is the strongest argument in its favour as a design.",
        "The distinctive legal move the model makes is to score consent. Under Article 17 the parties must endeavour to agree; under Article 70 and Rule 55 relief must be allowed and facilitated, subject to a genuine but limited right of control. These are obligations about willingness, and willingness has historically been assessed in prose rather than in numbers. The corridor violation and consent sub-indicators are an attempt to measure the distance between what was announced and what was honoured. Whether the specific values on the ladder are right is arguable, and the repository says they are conventions. That the gap is worth measuring at all seems to this reviewer correct.",
      ],
    },
    {
      id: "methodological-choices",
      number: "10",
      title: "Methodological Choices",
      paragraphs: [
        {
          lead: "Why the worst condition dominates.",
          text: "The choice of exponent 6 is the single most consequential decision in the model, and the repository defends it on substantive rather than technical grounds: in a siege, the things that kill people do not average out. The defence is sound. The magnitude of the exponent is a separate question from its direction, and the repository treats it as adjustable.",
        },
        {
          lead: "Why vulnerability multiplies rather than adds.",
          text: "Being a child in a freezing city does not add a further hazard; it changes how the existing hazards land. The model therefore applies vulnerability as a multiplier on exposure rather than averaging it in as a seventh component, which mirrors the structure of the INFORM Severity Index.",
        },
        {
          lead: "Why the ordinal consent ladder rather than a binary.",
          text: "A corridor is not simply open or closed. It can be announced by one side and not the other, negotiated between the parties, escorted by a neutral third party, or nominally available but subject to screening by an adversary at the far end. Each of those states carries a different level of protection, and the five-step ladder is a reasonable, if rough, way of ordering them.",
        },
        {
          lead: "Why the model was built retrospectively on a closed case.",
          text: "Using a siege whose outcome is known allows every input to be checked against published sources and every claim to be traced. It also, as the repository acknowledges, means the design has been shaped by knowledge that a real-time user would not have.",
        },
        {
          lead: "Where the thresholds come from.",
          text: "From the author's judgement, informed by published conventions. Not from data, and not yet from expert consensus. The repository states this without hedging, which is to its credit.",
        },
      ],
    },
    {
      id: "limitations",
      number: "11",
      title: "Limitations and Caveats",
      paragraphs: [
        "The repository sets out seven limitations of its own. They are real limitations, not token ones, and the summary below preserves them while adding four observations that emerged from reviewing the code and recomputing the series.",
        {
          lead: "The evidence degrades exactly when it is needed most.",
          text: "Event reporting from inside a besieged city collapses at the point of greatest severity, because the people who would report have left, died, or lost communications. Every count of attacks in this model is a count of reported attacks. ACLED itself advises that fatality figures are the most biased and least accurate component of conflict reporting and recommends using measures other than fatalities to assess intensity, which is a direct caution about the lethality sub-indicator.",
        },
        {
          lead: "The model is retrospective.",
          text: "It was built knowing how the siege ended. A real-time deployment would face uncertainty this prototype does not.",
        },
        {
          lead: "It has never been validated against behaviour.",
          text: "Modelled severity has not been compared to observed departure flows, or to any other record of what people actually did. There is no test in this repository of whether a high score corresponds to anything.",
        },
        {
          lead: "Judgement is embedded in the numbers.",
          text: "The normalisation ceilings, the exponent of 6, the values on the consent ladder, the 0.3 vulnerability increments, and the five phase thresholds are all conventions chosen by the author. Each is defensible and each is adjustable, and the repository says they should be re-estimated as distribution percentiles before publication.",
        },
        {
          lead: "It is one axis of three.",
          text: "Severity measures how dangerous it was to stay. It says nothing about whether an evacuation was operationally possible, or whether the place people would be moved to was safe. Those two axes, feasibility and destination viability, are described in the repository but not implemented. A reader must not treat a high severity score as a recommendation to move people.",
        },
        {
          lead: "The tool is dual use.",
          text: "The repository raises this itself, and it is the most serious ethical point in the document. The same fusion of event data, population data and route information that helps prioritise an evacuation could support targeting or screening. Movement data about civilians under siege is protection-sensitive by nature.",
        },
        {
          lead: "Infrastructure damage is a lower bound.",
          text: "And the per-building display is illustrative until the real UNOSAT geodata is supplied.",
        },
        "To these the following are added from this review.",
        {
          lead: "The daily resolution is nominal.",
          text: "The violence inputs change on three occasions across 77 days. This is the caveat most likely to be missed by a non-technical reader looking at a smooth daily curve.",
        },
        {
          lead: "A single saturated component pins the result.",
          text: "Because any one component at 1.0 forces the composite to approximately 0.742, and the Critical threshold is 0.70, the deprivation clock alone holds the model in its top phase for the last three weeks of the window regardless of anything else. The model is making a defensible substantive claim there, that fifty-odd days of encirclement without relief is by itself a critical condition. But the reader should understand that after 1 May the number is reporting the passage of time and nothing more, and that the choice of a 60-day ceiling is what makes this happen when it happens.",
        },
        {
          lead: "The ceilings determine which component wins.",
          text: "Intensity is divided by 10 against an observed maximum of 4.8, so it can never exceed 0.48. The deprivation clock is divided by 60 in a siege lasting longer than 60 days, so it necessarily saturates. Under a weakest-link rule, the component with the most generous ceiling relative to its observed range will dominate almost by construction. That the violence components never lead is therefore partly a substantive finding and partly a consequence of the scaling, and the two should not be conflated.",
        },
        {
          lead: "The vulnerability weight carries no information within this case.",
          text: "As a single constant applied to all 77 days, it rescales the output without changing any comparison. It would begin to do work only in the cross-case framework the repository has not yet built.",
        },
        {
          lead: "The relief credit is never exercised.",
          text: "Because no convoy reached the city, the three-day credit in the deprivation clock never operates. It is therefore an untested part of the design.",
        },
        "Above all, the repository is explicit and repeated on the central point: this is a research prototype, its outputs are indicative, and it is not operational guidance. Nothing in this report should be read as suggesting otherwise.",
      ],
    },
    {
      id: "reviewer-checks",
      number: "12",
      title: "Points a Reviewer Should Verify",
      paragraphs: [
        "This section exists because the repository is a working paper at version 0.9 and would benefit from a short list of things to check before it goes further. None of these undermines the model's argument; all are the kind of thing that a reviewer or an examiner will find.",
        {
          lead: "The temperature threshold citation.",
          text: "The 18 degree threshold is attributed to the Sphere Handbook. A full-text check of the 2018 fourth edition does not find an 18 degree indoor or habitability figure. The nearest published sector figures are UNHCR's Emergency Handbook, which gives 15 to 19 degrees Celsius for a comfortable shelter interior, and the World Health Organization's housing guidance, which uses 18 degrees. The threshold looks well chosen; the citation appears to need correcting.",
        },
        {
          lead: "The March UNOSAT anchor.",
          text: "The anchor for 14 March is given as 773 of 17,594 structures, about 4 per cent, for a combined Livoberezhnyi and Zhovtnevyi area of interest. The published UNOSAT assessment using imagery of 14 March 2022 reports 433 of 9,279 structures damaged in Livoberezhnyi District, about 5 per cent. The May figure in the repository, 5,647 structures and about 32 per cent, matches the published updated assessment exactly. The March figure should be traced back to its specific product.",
        },
        {
          lead: "The README wording.",
          text: "The README summarises severity as crossing critical thresholds in mid-March. On the model's own five-phase scale it crosses into Phase 4, High, on 9 March and does not reach Phase 5, Critical, until 28 April. The claim about the timing gap survives either way, but the wording and the chart should agree.",
        },
        {
          lead: "The citation file.",
          text: "It still contains placeholder fields for the author's surname and for the repository address.",
        },
        {
          lead: "The date range.",
          text: "The repository's own summary uses an en dash to write the date range as March to May. Where the work is prepared for publication in a United Nations or similar house style, ranges are normally written out.",
        },
      ],
    },
    {
      id: "audience",
      number: "13",
      title: "Practical Nature and Intended Audience",
      paragraphs: [
        "The tool is one web page. It can be published as a static website or served from a folder on a laptop. It requires an internet connection for the base map layers but no installation, no account, and no server. That design choice makes it easy to circulate and easy to archive, which for a piece of research about a contested event is a real advantage: what a reader sees is exactly what the author wrote.",
        "The audience is a mixed one, which the design reflects. The written assessment and the driver sentence are aimed at humanitarian coordinators and political decision-makers. The legal anchors are aimed at legal advisers and accountability practitioners. The visible arithmetic is aimed at reviewers who want to disagree with a threshold and see immediately what changes.",
        "Its most likely honest use today is as a teaching and argument instrument. It is a good way to show a room of people why a lull in shelling is not improvement, why the destination of a corridor is a protection variable rather than a logistical detail, and why the question of when an obligation crystallised can be asked with dates attached.",
      ],
    },
    {
      id: "conclusion",
      number: "14",
      title: "Conclusion",
      paragraphs: [
        "The contribution this repository makes is not a number. It is an argument carried out in arithmetic: that the harms of a siege are not additive, that the worst condition should govern, and that whether a promise of safe passage was kept is a measurable fact about protection rather than background colour. Each of those claims is contestable. Each is stated here in a form clear enough to be contested, which is more than most such tools allow.",
        "The model's own numbers say that the conditions the law responds to were plainly present in Mariupol from the second week of March 2022, and that the mechanism the law envisages arrived at the end of April. The repository draws from this the conclusion that the constraint was consent rather than information. That conclusion does not follow from the arithmetic alone, and it should not be presented as though it does. But the arithmetic makes it a question that can be asked precisely, with a date attached, and against evidence that was available at the time to anyone who cared to assemble it.",
        "The prototype is modest about itself in all the right places. Its weights are conventions, its data are coarser than its daily output suggests, it has never been validated against behaviour, and it measures only one of the three things a real evacuation decision requires. Its author says all of this without being asked. The proper next steps are the ones the repository already names: re-estimate the bounds against observed distributions, complete the ERA5 and UNOSAT extractions, submit the thresholds to expert elicitation, and build the two missing axes. Until then it should be read as what it says it is, which is a careful and honest piece of work in progress.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "ACLED. Armed Conflict Location and Event Data Project, conflict events and fatalities for Mariupol raion.",
      url: "https://acleddata.com",
    },
    {
      ref: "OECD and the Joint Research Centre. (2008). Handbook on Constructing Composite Indicators. OECD Publishing.",
      url: "https://publications.jrc.ec.europa.eu/repository/handle/JRC31473",
    },
    {
      ref: "ACAPS and the Joint Research Centre of the European Commission. INFORM Severity Index.",
      url: "https://www.acaps.org/en/thematics/all-topics/inform-severity-index",
    },
    {
      ref: "Integrated Food Security Phase Classification. IPC five-phase severity classification.",
      url: "https://www.ipcinfo.org",
    },
    {
      ref: "UNITAR and UNOSAT. Satellite-derived damage assessments for Ukraine, activation CE20220223UKR.",
      url: "https://unosat.org",
    },
    {
      ref: "United Nations Office for the Coordination of Humanitarian Affairs. Humanitarian Data Exchange, UNOSAT building damage geodata for Ukraine.",
      url: "https://data.humdata.org",
    },
    {
      ref: "WorldPop, University of Southampton. Gridded population estimates.",
      url: "https://www.worldpop.org",
    },
    {
      ref: "GADM. Database of Global Administrative Areas.",
      url: "https://gadm.org",
    },
    {
      ref: "ECMWF and the Copernicus Climate Change Service. ERA5 reanalysis, named by the repository as its intended temperature source.",
      url: "https://climate.copernicus.eu",
    },
    {
      ref: "European Space Agency. Copernicus Browser, Sentinel-2 imagery exports.",
      url: "https://browser.dataspace.copernicus.eu",
    },
    {
      ref: "OpenStreetMap contributors. Building footprints retrieved through the Overpass query service.",
      url: "https://www.openstreetmap.org",
    },
    {
      ref: "International Committee of the Red Cross. Article 17, Geneva Convention (IV) relative to the Protection of Civilian Persons in Time of War, 1949.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-17",
    },
    {
      ref: "International Committee of the Red Cross. Article 23, Geneva Convention (IV), 1949.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-23",
    },
    {
      ref: "International Committee of the Red Cross. Article 49, Geneva Convention (IV), 1949.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-49",
    },
    {
      ref: "International Committee of the Red Cross. Articles 51, 57, 58 and 70, Protocol Additional to the Geneva Conventions of 12 August 1949, and relating to the Protection of Victims of International Armed Conflicts (Protocol I), 1977.",
    },
    {
      ref: "Henckaerts, J.M. and Doswald-Beck, L. Customary International Humanitarian Law. International Committee of the Red Cross, Rules 15, 24, 53, 54 and 55.",
    },
    {
      ref: "United Nations. Article 11, Convention on the Rights of Persons with Disabilities, situations of risk and humanitarian emergencies.",
      url: "https://www.un.org/development/desa/disabilities/convention-on-the-rights-of-persons-with-disabilities.html",
    },
    {
      ref: "Office of the United Nations High Commissioner for Human Rights and the Human Rights Monitoring Mission in Ukraine. Reporting on filtration screening and onward transfers.",
      url: "https://www.ohchr.org",
    },
    {
      ref: "Sphere Association. The Sphere Handbook, fourth edition, 2018. Cited by the repository for the 18 degree threshold; see Section 12.",
      url: "https://spherestandards.org/handbook/",
    },
    {
      ref: "UNHCR. Emergency Handbook, comfortable shelter interior of 15 to 19 degrees Celsius.",
      url: "https://emergency.unhcr.org",
    },
    {
      ref: "World Health Organization. WHO Housing and Health Guidelines, 2018, healthy indoor minimum of 18 degrees Celsius.",
      url: "https://www.who.int/publications/i/item/9789241550376",
    },
    {
      ref: "World Bank. Ukraine disability prevalence as recorded in Ministry of Social Policy pension-system statistics.",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/mariupol-evacuation-model/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/mariupol-evacuation-model",
};
