// ─────────────────────────────────────────────────────────────────────────
// "The Evacuation Simulator", a plain-language research report on the EvacSim
// prototype, transcribed from EvacSim-Paper.md in the Evac-Sim-Melanie
// repository. Rendered by
// src/app/publications/evacuation-simulation/page.tsx. Kept here so the
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

export const evacuationSimulationReport = {
  eyebrow: "Publications · Academic report",
  title: "The Evacuation Simulator",
  subtitle:
    "An Agent-Based Model of How Civilians Decide to Leave During Armed Conflict",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "2026",
  authors:
    "Melanie MacKew. Developed as part of masters research at the NYU Center for Global Affairs, under the Ethical Tech CoLab.",
  thesis:
    "Warnings are issued more often than they are believed. Most people do not run when an alert goes out; they telephone a relative, they step outside to see whether the family next door is loading a car, they wait for a second source to say the same thing. That interval between the warning and the departure is where humanitarian evacuations are won or lost, and EvacSim is a research prototype that makes it visible: a small simulated community of six households, each person moving through hearing, believing, preparing, and leaving, with the timing driven by who they are and what information reaches them.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "6",
      label:
        "households in the simulated community, kept small so every person stays individually visible and traceable",
    },
    {
      value: "4",
      label:
        "information channels supplying confirmations: official broadcast, humanitarian actor, neighbours, and hostile misinformation",
    },
    {
      value: "5.5",
      label:
        "the identical travel speed every category reaches by car, where on foot a child moves at 1.5 and an adult at 2.6",
    },
    {
      value: "10",
      label:
        "limitations the report states about the prototype, beginning with the fact that nobody in the model can be harmed",
    },
  ],

  sections: [
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "EvacSim is an interactive simulation, a piece of software that plays out an imagined situation on screen so that a user can watch it unfold and change the conditions. It models a community of six households receiving an evacuation warning during an armed conflict, and it shows who leaves, who is delayed, and who does not get out at all.",
        "The tool is built on a simple idea drawn from disaster sociology: people do not act on a single warning. Each simulated person needs a certain number of independent confirmations before they will start preparing to leave. Everything else in the model follows from how quickly those confirmations arrive and how long preparation and travel then take.",
        "Confirmations can arrive through four channels: an official broadcast, a humanitarian aid organisation, neighbours who can be seen already moving, and a hostile misinformation channel that supplies confirmations which are convincing but false. Which channel actually drove each household to move is recorded and reported at the end of every run.",
        "The model treats vulnerability as a matter of timing rather than a score. Elders, children under five, pregnant women, and unaccompanied minors are each given specific delays in preparation, movement speed, and the number of confirmations required. The consequences are then allowed to play out. When a corridor closes on a schedule, it is these categories that are most often left behind, and the tool shows exactly that.",
        "Escape is routed through corridors: four named gates on the edges of the map that can be opened, closed, or timed to open and close mid-run. This models a negotiated humanitarian passage with a fixed validity window. When all gates are shut, people who are ready to move are marked as trapped, which is the simulation's representation of siege.",
        "The prototype is delivered as a web page that runs in an ordinary browser and is published as a public demonstration. It carries an extensive built-in guide explaining its own mechanics and their legal grounding.",
        "The tool is honest, in its own documentation, that its timings are qualitative approximations rather than measured real-world durations. This report endorses that caution and adds one further caveat: several of the International Humanitarian Law citations in the repository are inaccurate and should be corrected before the tool is used in teaching. Section 09 sets out which ones and what the correct provisions are.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Evacuation planning in armed conflict is usually discussed in terms of capacity: how many buses, how many kilometres of road, how many hours of ceasefire. These are the easy quantities to count. They are also the least predictive. A corridor with ample capacity fails if the population does not believe the corridor exists, does not trust the party announcing it, or cannot physically reach it in the time allowed.",
        },
        {
          lead: "The gap.",
          text: "The behavioural side of evacuation is well documented in disaster sociology, but that literature grew out of hurricanes, floods, and industrial accidents. It assumes a benign movement environment: the warning is issued in good faith, the roads are open, and nobody is trying to deceive you. Armed conflict inverts all three assumptions. The threat is deliberate, the information is contested, and movement itself may be obstructed or compelled.",
        },
        {
          lead: "The response.",
          text: "EvacSim takes the established behavioural model, the confirmation-seeking household that moves as a unit, and places it inside a conflict environment. It adds the things that make conflict evacuation different: corridors that can close, checkpoints that impose delay, telecommunications that degrade under bombardment, deliberate misinformation about routes, and coercion that removes the household's choice entirely.",
        },
        "The repository is explicit that the behavioural foundations come from two named bodies of work. Enrico Quarantelli, of the Disaster Research Center at the University of Delaware, established that people rarely panic in disasters and instead seek confirmation from multiple sources before accepting that a threat is real. Thomas Drabek, of the University of Denver, documented that families evacuate as units rather than as individuals, waiting until all members are present before departing. These two findings are the direct source of the model's two central mechanics: the confirmation counter and the household hub that waits for its slowest member.",
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        "The tool is designed to show how the quality and source of information, rather than the severity of the threat alone, determines how quickly a population moves.",
        "It is designed to make the cost of vulnerability legible in units of time, so that the delay imposed by an elder or an unaccompanied child can be compared directly against the length of a corridor window.",
        "It is designed to demonstrate the asymmetry between modes of transport, showing that the same obstruction which is a minor inconvenience to a household with a car may be fatal to a household on foot.",
        "It is designed to represent the operational conditions that International Humanitarian Law regulates, including corridor access, checkpoint obstruction, attacks on communications infrastructure, perfidious misinformation, and forced displacement, so that legal rules can be seen as behavioural consequences rather than abstract prohibitions.",
        "It is designed to support comparison between runs, so that a user can change one condition, run the scenario again, and see what that single change cost the population.",
        "And it is designed to serve as a teaching instrument for students and humanitarian practitioners rather than as an operational planning tool.",
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How the Simulation Works",
      paragraphs: [
        {
          lead: "The community.",
          text: "The simulation places six households on a rectangular map, given the family names Rivera, Kim, Okafor, Hassan, Novak, and Tanaka. Each household has one member designated as its hub, drawn at the centre of the cluster, with the remaining members arranged around it. The hub represents the household as a coordinating unit. It does not depart until the slowest person in the household is ready, which is how the model implements Drabek's finding that families move together.",
        },
        "Households are linked to one another in a social network. Each family is connected to the family on either side of it in a ring, and also to the family two positions away. The result is that every household can see four of the other five. Only these linked households can influence one another.",
        {
          lead: "The five stages.",
          text: "Every individual passes through five stages in order. Unaware, meaning the person has not yet heard anything. Seeking, meaning the person has heard an alert and is now looking for corroboration. Milling, meaning the person believes the alert and is preparing to leave, gathering family members, packing, securing the house. Evacuating, meaning the person is physically moving toward an exit. And Evacuated, meaning the person has reached safety and is out of the simulation.",
        },
        "Each transition is probabilistic, meaning it is decided by a weighted chance each time the clock advances rather than by a fixed rule. Two people in identical circumstances will not necessarily move at the same moment.",
        {
          lead: "The clock.",
          text: "Time in the simulation is measured in ticks. A tick is a deliberately abstract unit. When the simulation is running at normal speed one tick elapses every 200 milliseconds of real time, roughly five ticks per second, but a tick is not claimed to correspond to any particular number of real-world minutes. The documentation states the reason plainly: the timing values were chosen to produce realistic relative behaviour, not calibrated against measured durations, and labelling ticks as minutes would imply a precision the model does not have. This is an unusually candid design choice and it should be respected when interpreting any result.",
        },
        "A person in the Seeking stage accumulates confirmations, and the model records which source supplied the final one that tipped the person into Milling. The official broadcast is a single information node at the centre of the map, representing a government or military announcement, with its reliability set directly by the information clarity setting. The humanitarian actor is a separate node in the upper left of the map, representing an aid organisation such as the ICRC; its reliability is fixed at 0.75, higher than a government broadcast at typical clarity settings, but it reaches only a fraction of households, determined by the humanitarian access setting. This encodes the operational reality that a neutral organisation is more trusted but must negotiate for physical access.",
        "The third channel is neighbours. If any linked household has a member who is already milling or evacuating, a person in the Seeking stage may take that as a confirmation. This is social contagion, and it is the mechanism by which an evacuation cascades through a community. The fourth is misinformation: a hostile channel that supplies confirmations which count toward the threshold exactly as genuine ones do, but which then send the person to the wrong exit.",
      ],
    },
    {
      id: "variables",
      number: "05",
      title: "The Variables Explained",
      paragraphs: [
        "Every setting a user can change is listed here with what it represents, why it takes the range it does, and how it reaches the outcome. Where a number is quoted, it is the number in the source code.",
        {
          lead: "Threat level.",
          text: "A whole number from 1 to 10, set to 6 by default. This represents how severe and how visible the danger is. It works by setting the chance, each tick, that any given unaware person hears an alert for the first time. The formula is the threat level divided by ten, multiplied by 0.35, with a small additional term that rises with elapsed time, and the result held between 2 and 55 per cent. At the default setting of 6 an unaware person has roughly a one in five chance of hearing something in any given tick at the start of a run, rising slowly as the run continues. The important point is that threat level in this model governs how fast news travels, not how much damage is done. Nobody is injured or killed in this simulation.",
        },
        {
          lead: "Threat rise rate.",
          text: "A whole number from 0 to 20, set to 0 by default. At zero the threat level stays fixed for the entire run. Above zero the threat climbs as the run proceeds, adding one level of threat every hundred ticks divided by the setting, and the climb stops at the maximum of 10. This models the compressing decision window that characterises conflict displacement: a household that hesitates finds that the situation has deteriorated around it while it was deciding.",
        },
        {
          lead: "Information clarity.",
          text: "A whole number from 1 to 10, set to 5 by default. This is the single most consequential setting in the model, because it acts in two places at once. First, it sets the reliability of the official broadcast node, which is simply clarity divided by ten, held between 0.1 and 0.95. That reliability then drives the per-tick chance that a seeking person receives a confirmation. Second, and more sharply, if clarity is below 4 then every person in the community is given one or two extra confirmations to obtain before they will move. Poor information is therefore doubly punishing: each confirmation is slower to arrive, and more of them are needed. Populations that have been given vague, contradictory, or previously false warnings become more sceptical, and their scepticism is rational.",
        },
        {
          lead: "Humanitarian access.",
          text: "A percentage from 0 to 100, set to 40 by default. This represents how far an aid organisation has been permitted to operate. At the moment the simulation is built, each individual is independently assigned as reachable or not reachable by the humanitarian node, with the probability equal to the access setting. Someone who is not reachable never receives anything from that channel, no matter how long the run lasts. Those who are reachable receive confirmations from it at a fixed chance of 37.5 per cent per tick. Setting this to zero removes the humanitarian actor entirely and is the simulation's model of denied access.",
        },
        "The four armed conflict settings are all set to zero by default, meaning the simulation begins in a relatively benign state which the user then degrades deliberately.",
        {
          lead: "Checkpoint delay.",
          text: "A whole number of ticks from 0 to 15. When above zero, each person has a 55 per cent chance of being stopped at the moment they finish preparing and begin to move, with a random delay added to their travel time. This represents document checks and security screening. The design choice worth noting is that the delay is applied to everyone equally, which means its humanitarian effect is not equal: a household that was already close to the edge of the corridor window is pushed over it, while a fast household absorbs the same delay without consequence.",
        },
        {
          lead: "Misinformation.",
          text: "A percentage from 0 to 100. When above zero, a person in the Seeking stage has a per-tick chance equal to the setting multiplied by 0.35 of receiving a false confirmation, so a setting of 60 per cent produces a 21 per cent chance per tick. The false confirmation counts toward the threshold exactly as a genuine one does, which is the point: the household cannot tell the difference. The consequence appears later. If the confirmation that finally tipped a person into preparing came from the misinformation channel, then when that person begins to move they are routed not to their nearest open gate but to a randomly chosen different open gate. If only one gate is open there is no wrong way to send them, and the misdirection has no effect, which is a small but real artefact of the implementation.",
        },
        {
          lead: "Infrastructure damage.",
          text: "A whole number from 0 to 20, modelling the destruction of telecommunications. When above zero, the effective information clarity falls every tick, reduced by the elapsed ticks multiplied by the setting and divided by fifteen, with a floor of 1. Both the broadcast node's reliability and the per-tick confirmation chance fall with it. The households punished by this setting are precisely the slowest ones, because they are still seeking confirmation at the point when the information environment collapses.",
        },
        "Two observations about that setting. First, it is far more aggressive than the guide describes. The built-in guide states that at a setting of 10 a starting clarity of 7 will have fallen to around 4 by tick 45. The formula in the source code does not produce that result. A setting of 10 reduces clarity by two thirds of a point every tick, so a starting clarity of 7 reaches the floor of 1 in around nine ticks, not forty-five. Even the setting labelled light damage in the interface collapses clarity from 7 to the floor within about thirteen ticks. Users should treat any non-zero value here as modelling a rapid communications blackout rather than a gradual decline. Second, the extra confirmations imposed by low clarity are assigned once when the run is built and are not increased retrospectively as clarity degrades, so degradation makes each confirmation harder to obtain but does not raise the threshold that must be reached.",
        {
          lead: "Coercion risk.",
          text: "A percentage from 0 to 100, representing forced displacement. When above zero, an unaware person who has not received any alert in a given tick has a chance of being pushed directly into the Milling stage without ever seeking or receiving confirmation. Readers should note how small this is in practice: even at maximum threat and maximum coercion the per-tick chance is 0.8 per cent, well below the cap of 6 per cent, so coercion accumulates slowly over a long run rather than sweeping through the community. Coerced individuals are flagged, drawn with a red ring, logged individually, and counted separately in the end-of-run summary. They may well reach safety faster than their neighbours, because they skipped the entire confirmation process, and the tool is right to insist that this speed is not a good outcome. They left without preparation, without verifying the route, and without choosing to go.",
        },
        {
          lead: "Average family size.",
          text: "A whole number from 1 to 7, set to 3 by default. The actual size of each household is drawn at random between one below and one above this figure, so households vary. Larger households are slower for a structural reason: the hub adopts the longest preparation time and the longest travel time of any member, so every additional person is another chance of drawing a slow one.",
        },
        {
          lead: "Elder ratio.",
          text: "A percentage from 0 to 60, set to 20 by default. Each non-hub member of each household is independently tested against this percentage to determine whether they are an elder. An elder receives one additional required confirmation, extra preparation time, and a reduced movement speed. The extra confirmation is the mechanically interesting part. It encodes the finding that older people are more likely to want a second or third source before accepting a warning, particularly where there is attachment to a home and scepticism toward the announcing authority.",
        },
        {
          lead: "Children under five.",
          text: "A percentage from 0 to 50, set to 20 by default, applied to those not already assigned as elders. Young children receive the longest preparation penalty of the two original categories, reflecting the work of gathering and packing for a small child, and the slowest movement speed of any category on foot. They do not receive extra required confirmations, because a small child is not the one deciding.",
        },
        {
          lead: "Pregnant women.",
          text: "A percentage from 0 to 30, set to 0 by default. Preparation delay is comparable to an elder and movement speed sits between an elder and an adult. No extra confirmations are required. This category was added specifically to represent a group that International Humanitarian Law singles out for protection.",
        },
        {
          lead: "Unaccompanied minors.",
          text: "A percentage from 0 to 20, set to 0 by default. This is the most severely penalised category in the model and deliberately so. An unaccompanied minor requires two additional confirmations, more than any other category, and receives by far the largest preparation delay: six to twelve extra ticks on foot, against two to five for an elder. They then move at the slow speed of a child. A separated child cannot simply leave. Somebody must be found who is authorised to take responsibility for them, and family tracing and reunification take time that no other category incurs. In a run with a timed corridor window, this is the category that gets left behind, and demonstrating that is the point of including it.",
        },
        "One important structural detail. These four categories are assigned in strict priority order and are mutually exclusive: a person is tested for elder first, then child, then pregnant, then unaccompanied minor, and once assigned cannot also be something else. A pregnant elder or a child who is also unaccompanied cannot exist in this model. Household hubs are never assigned any vulnerability category at all. The practical effect is that raising the elder percentage quietly suppresses the number of people available to be assigned to the later categories, so the sliders are not independent of one another.",
        {
          lead: "Neighbour influence.",
          text: "A percentage from 0 to 100, set to 55 by default. Each tick, if any of a household's four linked neighbours has a member visibly milling or evacuating, every seeking member of that household has a chance equal to this setting of gaining a confirmation from that observation alone. At high settings the community behaves as a cascade, where one household departing pulls the rest out behind it. At zero, social observation counts for nothing and only official and humanitarian channels matter.",
        },
        "Three quantities are not exposed as settings but are generated for each individual when the run is built, and they are what the settings above actually act upon. Confirmations needed is a random whole number from 1 to 3, plus one or two more if information clarity is below 4, plus one if the person is an elder, plus two if they are an unaccompanied minor. It is the single number that most determines who leaves early and who leaves late. Preparation time is drawn at random from a range that depends on the scenario, with an additional draw added for the person's vulnerability category: on foot the base range is 2 to 4 ticks, with an elder adding 2 to 5, a child under five adding 3 to 6, a pregnant woman adding 2 to 5, and an unaccompanied minor adding 6 to 12. Travel time is drawn the same way, and speed is a fixed value per category per scenario, measured in screen pixels per tick.",
        {
          lead: "The scenario setting.",
          text: "The user chooses one of three modes of evacuation, and this choice rewrites all the preparation and travel figures at once. The three modes are not simply faster or slower versions of each other. They differ in shape. Pedestrian is the slowest and the most unequal: preparation is moderate, but travel speeds differ substantially by category, from 1.5 for a child to 2.6 for an adult, and vulnerability matters more here than in any other mode. Car has the quickest preparation of the three, at a base of 1 to 3 ticks, and every category travels at an identical speed of 5.5. A vehicle equalises mobility almost completely, and this is the model's clearest single finding: access to transport does not merely make evacuation faster, it makes vulnerability stop mattering. Train is the reverse profile, with the longest preparation of the three at a base of 4 to 8 ticks, representing the wait for a departure, but once aboard everyone moves at 8.0, the fastest speed in the model. The train scenario has no corridor gates at all; passengers leave by the rail line.",
        },
      ],
    },
    {
      id: "corridors",
      number: "06",
      title: "Corridors: How People Actually Get Out",
      paragraphs: [
        "In the pedestrian and car scenarios, escape is not in all directions. Four gates are placed at the midpoints of the four edges of the map and named North, South, East, and West. When a person finishes preparing, they identify the nearest gate that is currently open and move toward it. The train scenario has no gates.",
        "Each gate has three settings. It can be open or closed at the start. It can be given a closing tick, at which it shuts. It can be given an opening tick, at which it opens, in which case it begins the run closed. Combining an opening tick with a closing tick produces a humanitarian window: a gate that opens at tick 15 and closes at tick 35 gives the population a twenty-tick passage. This is the mechanic that makes every preparation delay described above consequential rather than merely descriptive. An eight-tick elder delay is invisible in a run with no time limit and decisive in a run with a twenty-tick window.",
        "When a gate closes mid-run, anyone already travelling toward it recalculates and heads for the nearest remaining open gate, and the reroute is logged individually. Rerouting costs time, and the cost is much higher on foot than by car, which is the asymmetry the documentation identifies as a research finding in its own right. The same closure that mildly inconveniences a household with a vehicle can leave a household on foot unable to reach any alternative.",
        "If no gate is open when a person is ready to move, they are marked as trapped. Trapped individuals stop, are logged by name, and are counted in the final summary. A run ends when every person is either evacuated or trapped. This is the simulation's representation of encirclement and siege, and it is the condition the tool is most clearly designed to make visible: the visual and numerical gap between the households that got out and the households that were still preparing when the gate shut.",
      ],
    },
    {
      id: "results",
      number: "07",
      title: "Reading the Results",
      paragraphs: [
        "While a run is in progress the map is the primary output. Individuals change colour as they pass through the five stages, from grey when unaware, through blue when seeking, amber when milling, red when evacuating, to green when evacuated. Each population category has its own shape, so an elder, a child, a pregnant woman, and an unaccompanied minor can be distinguished at a glance. Lines drawn between the information nodes and individuals show confirmations arriving, colour-coded by which channel supplied them, with the hostile misinformation channel drawn in red.",
        "Below the map, three rows of figures update every tick: how many people are in each of the five stages, how many belong to each vulnerability category, and a single prominent percentage showing how much of the population has completed evacuation.",
        "An event log records everything in plain sentences as it happens: who received an alert, how many confirmations they now hold, who was held at a checkpoint and for how long, which corridor closed and who is rerouting, who was coerced, and who was trapped. The log is capped at the most recent eighty entries. It is the most useful output for teaching, because it converts the statistical outcome back into individual stories.",
        "When a run ends, a summary panel reports the total number of ticks, the average time the population spent in each of the seeking, milling, and evacuating stages, which household finished last, and what the model believes caused that household to be slowest, expressed as its composition. It also reports the channel split, along with counts of those coerced, those held at checkpoints, and those trapped.",
        "The channel split is the analytically richest output. It answers a question that matters operationally: was this evacuation driven by the authorities or by the community? A run in which social confirmation dominates is a run in which official communication failed and the population compensated for it. A run in which the humanitarian channel dominates is a run in which access mattered more than broadcasting. A run in which misinformation dominates is a run in which the population moved decisively in the wrong direction.",
        "The last five runs are retained, and one can be pinned for direct comparison. This is the intended way to use the tool. A single run tells the user very little, because so much is decided by random draws. The signal appears in the difference between two runs that were identical except for the one thing the user changed.",
      ],
    },
    {
      id: "methodology",
      number: "08",
      title: "Methodological Choices",
      paragraphs: [
        {
          lead: "Why time is abstract.",
          text: "The decision to measure time in ticks rather than minutes is the most defensible choice in the project. The preparation and travel figures were selected to produce plausible relative behaviour, and there is no empirical calibration behind them. Converting them to minutes would manufacture a precision that does not exist. The documentation says so directly and points readers toward calibrated evacuation timing studies for anyone who needs real durations.",
        },
        {
          lead: "Why vulnerability is expressed as delay rather than as a risk score.",
          text: "The model never assigns anyone a number representing how much danger they are in. Instead it gives them extra ticks. This is a meaningful choice. It means vulnerability only produces a bad outcome when it interacts with a constraint, such as a closing corridor or a degrading information environment. In a run with no time pressure, a household full of elders arrives late and arrives safely. That is a more honest representation of how vulnerability actually operates than a standing risk score would be.",
        },
        {
          lead: "Why the household waits.",
          text: "The hub takes the maximum preparation and travel time of anyone in the household, so the whole family moves at the pace of its slowest member. This directly implements Drabek's finding and it is the mechanism by which one unaccompanied minor or one elder slows an entire household rather than only themselves.",
        },
        {
          lead: "Why everything is probabilistic.",
          text: "Almost every transition in the model is decided by a random draw. Two runs with identical settings will produce different results. This is deliberate and correct, since it reflects genuine uncertainty in warning response, but it has a consequence for how the tool should be used. Conclusions should never be drawn from a single run.",
        },
        {
          lead: "Why the population is small.",
          text: "Six households and typically fifteen to twenty individuals is a very small population. This keeps every individual visible and traceable on screen, which serves the teaching purpose, but it means the results are statistically noisy and no percentage produced by a single run should be treated as an estimate of anything.",
        },
      ],
    },
    {
      id: "legal-grounding",
      number: "09",
      title: "Grounding in International Humanitarian Law",
      paragraphs: [
        "The repository connects each of its mechanics to a provision of International Humanitarian Law, the body of law that regulates the conduct of hostilities and protects those not taking part in the fighting. This is a valuable design feature: it turns legal rules into observable behaviour.",
        "Several of those provisions are cited correctly. Additional Protocol II, Article 17(1) provides that the displacement of the civilian population shall not be ordered for reasons related to the conflict unless the security of the civilians involved or imperative military reasons so demand, and Article 17(2) provides that civilians shall not be compelled to leave their own territory. This is the correct basis for the coercion mechanic. Customary Rule 129 prohibits deportation and forcible transfer, and Rule 131 requires that displaced civilians be received in satisfactory conditions and that families not be separated.",
        "Additional Protocol I, Article 52 provides that civilian objects shall not be the object of attack, which is the correct basis for the infrastructure damage mechanic. Article 58 requires parties to endeavour to remove civilians from the vicinity of military objectives, and its opening words expressly preserve Article 49 of the Fourth Geneva Convention, which matters: the duty to move civilians away from danger cannot be used to justify displacement that Article 49 forbids. Customary Rule 53 and Article 54 prohibit starvation of the civilian population as a method of warfare, and Article 54(2) is particularly apposite to the trapped mechanic, because it prohibits destroying or rendering useless objects indispensable to civilian survival whatever the motive, expressly including the motive of causing civilians to move away.",
        "Article 70 and Customary Rule 55 require parties to allow and facilitate rapid and unimpeded passage of impartial humanitarian relief, which is the correct basis for the humanitarian access setting. Article 57(2)(c) and Customary Rule 20 require effective advance warning of attacks which may affect the civilian population unless circumstances do not permit, and a high-threat, low-clarity run is a fair representation of a warning that was issued but was too vague to act on. Customary Rule 138 entitles the elderly, disabled, and infirm to special respect and protection, which supports the elder mechanic.",
        "Four citations in the repository documentation are inaccurate and should be corrected. This is not a criticism of the project's substance, which is sound. It is a matter of the accuracy that a teaching tool on legal subjects requires.",
        {
          lead: "Customary Rule 99.",
          text: "It is cited repeatedly, in the corridor documentation, the checkpoint documentation, and the built-in guide, as the rule requiring parties to allow civilians to leave and prohibiting disproportionate impediment to civilian movement. Rule 99 does not say this. Rule 99 provides that arbitrary deprivation of liberty is prohibited. It is a detention rule, situated in the chapter of the ICRC Customary Law Study on fundamental guarantees. There is in fact no single customary rule creating a general civilian right to leave a besieged area. The nearest provision is Article 17 of the Fourth Geneva Convention, which requires parties to endeavour to conclude local agreements for the removal from besieged or encircled areas of the wounded, sick, infirm, and aged, of children, and of maternity cases. Two limits of that article are instructive for this project: it is only an obligation to endeavour, and it covers specific vulnerable categories rather than the whole civilian population.",
        },
        {
          lead: "Article 16 of Additional Protocol I.",
          text: "It is cited in the population settings as the provision giving special protection to pregnant women. It is not. Article 16 of Additional Protocol I is titled General protection of medical duties and concerns the protection of medical personnel from being punished or compelled to act against medical ethics. The intended citation is almost certainly Article 16 of the Fourth Geneva Convention, which does provide that the wounded and sick, the infirm, and expectant mothers shall be the object of particular protection and respect. The stronger provision for this purpose is Article 8(a) of Additional Protocol I, which brings maternity cases, newborn babies, and expectant mothers within the definition of the wounded and sick and therefore within that entire protective regime.",
        },
        {
          lead: "Article 78 of Additional Protocol I.",
          text: "It is cited as the basis for the unaccompanied minors mechanic. The article is real and its content is relevant, but its scope is narrower than the repository implies. Article 78 governs the evacuation of children who are not a party's own nationals to a foreign country, and requires that such evacuation be temporary, justified by compelling reasons, consented to in writing by parents or legal guardians, and supervised by a Protecting Power. It does not regulate the internal evacuation of a state's own children, which is what the simulation depicts. For the protection of children generally, Article 77 of Additional Protocol I and Articles 24 and 50 of the Fourth Geneva Convention are the appropriate provisions. The reunification delay the model applies is nonetheless well founded: it reflects the tracing and reunification work that Article 26 of the Fourth Geneva Convention and Article 74 of Additional Protocol I require states to facilitate.",
        },
        {
          lead: "Customary Rule 9.",
          text: "It is cited alongside Article 52 of Additional Protocol I for the prohibition on attacking civilian objects. Rule 9 is a definition rather than a prohibition: it states that civilian objects are all objects that are not military objectives. The protective proposition is Rule 10, which provides that civilian objects are protected against attack unless and for such time as they are military objectives. Citing Rules 9 and 10 together would be correct.",
        },
        "One further point is a matter of framing rather than a citation error. The repository presents misinformation about evacuation routes as falling squarely within the prohibition on perfidy in Article 37. The connection is intuitive but the article is narrower than that: perfidy under Article 37 requires the intent to kill, injure, or capture an adversary by inviting their confidence in a protection under international law, and Article 37(2) expressly permits ruses of war and names misinformation among them. False information directed at a civilian population to endanger it engages other rules, including the general protection of civilians and the prohibition on acts whose primary purpose is to spread terror, more directly than it engages Article 37. The mechanic is valuable and the concern is real. The legal framing would benefit from revision.",
      ],
    },
    {
      id: "limitations",
      number: "10",
      title: "Limitations and Caveats",
      paragraphs: [
        {
          lead: "Nobody is harmed.",
          text: "The model has no concept of injury or death. Being trapped is the worst outcome available, and being trapped is recorded as a status rather than as a consequence. Corridor violations, attacks on convoys, and secondary threats during transit are all identified in the repository's own planning documents as desirable additions and none are implemented.",
        },
        {
          lead: "The timings are not calibrated.",
          text: "This bears repeating because it constrains every quantitative statement the tool makes. The preparation ranges, movement speeds, and confirmation thresholds are plausible relative values chosen by the author. They are not derived from evacuation data.",
        },
        {
          lead: "The population is tiny and the results are noisy.",
          text: "With six households, a single unlucky random draw can change a headline figure substantially. No number from a single run should be quoted.",
        },
        {
          lead: "The vulnerability categories cannot overlap.",
          text: "Because a person is tested for each category in a fixed order and assigned to the first that matches, the model cannot represent a pregnant woman with a disability, an elderly person who is also chronically ill, or a child who is both under five and unaccompanied. Compounding vulnerability, which is exactly what determines outcomes in real displacement, is outside the model.",
        },
        {
          lead: "Several important categories are absent.",
          text: "The wounded and sick, persons with disabilities, and people lacking identity documents are all discussed at length in the repository's extensions document and none are implemented. The first of these is the most significant omission, since the wounded and sick hold the strongest claim to priority evacuation in the entire legal framework.",
        },
        {
          lead: "The threat is spatially uniform.",
          text: "Everyone on the map faces the same threat level regardless of where they stand. There is no front line, no direction from which danger approaches, and no reason why a household near the fighting should be alerted before one further away. The repository identifies directional threat as an important missing feature and it remains missing.",
        },
        {
          lead: "Coercion is rare in practice.",
          text: "Because of the very small coefficient in the formula, even the maximum coercion setting produces a low per-tick probability. Users who set the slider to a high value and observe few coercion events are not misreading the display.",
        },
        {
          lead: "Misinformation has no effect when only one gate is open.",
          text: "The mechanic works by misrouting people to a non-nearest gate, so it requires at least two open gates to do anything at all beyond arriving faster. In a single-corridor scenario, misinformation makes the population move sooner and no worse.",
        },
        {
          lead: "There is no test suite.",
          text: "The repository contains no automated tests, so the behaviour of the model rests on visual inspection.",
        },
        {
          lead: "Above all, this is a teaching model.",
          text: "It is designed to make a small number of relationships vivid, not to forecast what a real population will do. Its outputs should never inform an operational decision.",
        },
      ],
    },
    {
      id: "audience",
      number: "11",
      title: "Practical Nature and Intended Audience",
      paragraphs: [
        "The tool is a web page. It runs in an ordinary browser with nothing to install and is published as a public demonstration. It opens on a guide page rather than on the simulation itself, which is a deliberate and correct choice: the guide walks the reader through the five stages, the information channels, the population categories, the corridor system, the armed conflict mechanics, and the legal framework before they touch a single control. The guide is longer than the simulation code that it explains.",
        "The intended users are students and humanitarian practitioners. The tool suits a classroom particularly well, because the event log converts every statistical outcome back into a named person with a household and a reason for their delay. A discussion of why the Okafor family was still milling when the North corridor closed is a more productive discussion than a discussion of a percentage.",
        "The most instructive exercise the tool supports is comparative. Run the same community on foot and by car with an identical corridor window and identical demographics, and the difference in who gets out is entirely attributable to access to transport. That single comparison carries the project's central argument more effectively than any of its individual settings.",
      ],
    },
    {
      id: "conclusion",
      number: "12",
      title: "Conclusion",
      paragraphs: [
        "EvacSim makes one argument well. Evacuation outcomes in armed conflict are determined less by the severity of the danger than by the interaction between how quickly information becomes credible and how long particular people take to act on it. The tool holds those two quantities apart and lets a user vary each independently, and its most valuable outputs are the ones that show where they collide: the elder still preparing when the corridor closes, the unaccompanied child awaiting an escort that arrives after the window has passed.",
        "Its treatment of vulnerability deserves particular note. By expressing protected status as time rather than as a risk score, the model produces a result that is easy to state and hard to argue with. Vulnerability is harmless until it meets a constraint, and every constraint that International Humanitarian Law regulates, the closed corridor, the checkpoint, the destroyed transmitter, the false direction, works by shortening the time available to the people who need the most of it.",
        "The prototype is modest about its status and should be. Its timings are uncalibrated, its population is small, nobody in it can be hurt, and its vulnerability categories cannot overlap in the ways that matter most in real displacement. Its legal citations require correction before it is used to teach law. What it offers is not prediction but a way of seeing, and for that purpose the choice to keep every simulated person individually visible, named, and traceable through the event log is worth more than any additional mechanic would be.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Quarantelli, E.L. Disaster Research Center, University of Delaware. Work establishing that people rarely panic in disasters and instead seek confirmation from multiple sources before accepting that a threat is real.",
    },
    {
      ref: "Drabek, T.E. University of Denver. Work documenting that families evacuate as units rather than as individuals, waiting until all members are present before departing.",
    },
    {
      ref: "International Committee of the Red Cross. Article 17, Protocol Additional to the Geneva Conventions of 12 August 1949, and relating to the Protection of Victims of Non-International Armed Conflicts (Protocol II), 1977. Prohibition of forced movement of civilians.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/apii-1977/article-17",
    },
    {
      ref: "International Committee of the Red Cross. Article 17, Geneva Convention (IV) relative to the Protection of Civilian Persons in Time of War, 1949. Removal from besieged or encircled areas.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-17",
    },
    {
      ref: "International Committee of the Red Cross. Article 16, Geneva Convention (IV), 1949. Particular protection and respect for the wounded and sick, the infirm, and expectant mothers.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-16",
    },
    {
      ref: "International Committee of the Red Cross. Article 26, Geneva Convention (IV), 1949. Facilitating enquiries by dispersed families.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/gciv-1949/article-26",
    },
    {
      ref: "International Committee of the Red Cross. Article 37, Protocol Additional to the Geneva Conventions of 12 August 1949, and relating to the Protection of Victims of International Armed Conflicts (Protocol I), 1977. Prohibition of perfidy, and permitted ruses of war.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-37",
    },
    {
      ref: "International Committee of the Red Cross. Article 52, Additional Protocol I, 1977. General protection of civilian objects.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-52",
    },
    {
      ref: "International Committee of the Red Cross. Article 54, Additional Protocol I, 1977. Protection of objects indispensable to the survival of the civilian population.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-54",
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
      ref: "International Committee of the Red Cross. Article 70, Additional Protocol I, 1977. Relief actions, and priority in the distribution of relief.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-70",
    },
    {
      ref: "International Committee of the Red Cross. Article 77, Additional Protocol I, 1977. Protection of children.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-77",
    },
    {
      ref: "International Committee of the Red Cross. Article 78, Additional Protocol I, 1977. Evacuation of children to a foreign country.",
      url: "https://ihl-databases.icrc.org/en/ihl-treaties/api-1977/article-78",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 9. Definition of civilian objects.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule9",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 10. Civilian objects lose their protection only when they are military objectives.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule10",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 20. Advance warning.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule20",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 53. Starvation as a method of warfare.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule53",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 55. Access for humanitarian relief to civilians in need.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule55",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 99. Deprivation of liberty.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule99",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 129. The act of displacement.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule129",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 131. Treatment of displaced persons.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule131",
    },
    {
      ref: "International Committee of the Red Cross. Customary International Humanitarian Law Study, Rule 138. The elderly, disabled and infirm.",
      url: "https://ihl-databases.icrc.org/en/customary-ihl/v1/rule138",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/Evac-Sim-Melanie/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/Evac-Sim-Melanie",
};
