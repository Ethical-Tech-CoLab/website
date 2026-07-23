// ─────────────────────────────────────────────────────────────────────────
// "The Digital Provenance Passport", a plain-language research report on the
// DPP prototype, transcribed from DPP-Paper.md in the arts-provenance-agent
// repository. Rendered by
// src/app/publications/digital-provenance-passport/page.tsx. Kept here so the
// page stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is plain prose, prose introduced by a bold lead-in (used for
 *  the labelled limitation entries), a bulleted or numbered list, or a table.
 *  The list and table variants carry structure the source paper had and that
 *  reads badly when flattened: the numbered objectives, the reliability
 *  tiers with their weights, the red flags with their point deductions, and
 *  the permitted-source list. */
export type Paragraph =
  | string
  | { lead: string; text: string }
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

export const provenancePassportReport = {
  eyebrow: "Publications · Academic report",
  title: "The Digital Provenance Passport",
  subtitle:
    "An Automated Assistant for Tracing the Ownership History of Artworks and Cultural Objects",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "Carolina Morón, with a project collaborator whose contributions are noted in the repository's source comments. Prepared as masters research at the NYU Center for Global Affairs.",
  thesis:
    "Provenance research is slow, archival, and applied to only a small fraction of the objects that need it. The Digital Provenance Passport asks what part of the first pass could be done automatically without becoming untrustworthy. It refuses to record any claim that does not carry the address of its source, computes its judgments with arithmetic a non-programmer can read and dispute, and seals its output so that an assessment cannot be quietly improved after the fact.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "40",
      label:
        "points, the largest single deduction, applied only when a paid registry check returns a match",
    },
    {
      value: "6",
      label:
        "permitted source domains the research is confined to, omitting the Getty Provenance Index and Interpol among others",
    },
    {
      value: "14",
      label:
        "countries on the hand-written source-country list, a shorthand for elevated restitution exposure",
    },
    {
      value: "2",
      label:
        "different confidence scoring systems in the repository, which will not agree on the same object",
    },
  ],

  sections: [
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "The Digital Provenance Passport is an experimental piece of software that takes the name of an artwork or cultural object, searches a controlled list of authoritative sources for its ownership history, flags signals associated with looting, restitution claims, documentation gaps, and suspicious pricing, and then issues a sealed digital record of everything it found and everything it did.",
        "The system is deliberately built so that it cannot state a fact about an object unless it can point to the source that asserted it. Any claim that arrives without a source address attached is discarded before it reaches the record. This is the prototype's central safeguard against the well-documented tendency of language models to produce fluent, confident, and entirely fictional history.",
        "The prototype scores each object on a provenance confidence scale running from 0 to 100, where a high number means the ownership history appears well-documented and a low number means it does not. The score begins at a starting value and is reduced by named, itemised deductions, each of which is displayed alongside the evidence that triggered it. There is no hidden statistical model. The rules are a short, readable list.",
        "The system is built as an agent, meaning that it carries out a sequence of steps on its own initiative rather than waiting for a person to click through each one. Among those steps is an unusual one: it can decide for itself whether a paid commercial due-diligence search is worth buying, and if so, pay for it. The prototype uses a small automated payment standard called x402 and a test currency on a test network, so that no real money is ever at stake.",
        "The final output is called a Passport. It is a structured record containing the object's identity, the ownership events that were found, the source behind each one, the confidence score, the red flags, any paid checks that were run, and a cryptographic seal. If a single character of that record is later altered, the seal fails and the alteration becomes visible to anyone who checks. The prototype ships with a deliberate tamper test that demonstrates this.",
        "The prototype is not a determination of title, a legal opinion, or a substitute for a qualified provenance researcher. It runs by default in a fully offline demonstration mode using stored example data, and several of its most eye-catching features, including the commercial stolen-art database search, are simulated stand-ins rather than connections to the real service.",
        "The work was produced as part of masters research at the New York University Center for Global Affairs, under the Ethical Tech CoLab, and was built for a hackathon on autonomous software that transacts on its own behalf. Its ambitions should be read accordingly: it is a demonstration of a method, not a deployed service.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "Provenance research is done by hand, and it is slow. A researcher works through auction and sale catalogues, dealer stock books, household inventories, shipping and customs records, exhibition histories, correspondence, and the physical object itself, reading the labels, stamps, inscriptions, and collectors' marks on its reverse. The Getty Research Institute's Provenance Index, one of the principal reference tools in the field, holds more than two million records drawn from precisely this kind of archival material. Assembling a single credible chain of ownership can take weeks or months, and for many objects the chain can never be completed at all.",
        },
        {
          lead: "The volume problem.",
          text: "The number of objects that need this treatment vastly exceeds the number of specialists able to provide it. Museums hold collections running to hundreds of thousands of items each. Auction houses process consignments continuously. Buyers frequently need an answer in days. In practice, most objects that move through the market receive nothing approaching a full provenance investigation, and the first line of defence is a quick check against a stolen-art database rather than a reconstruction of where the object has actually been.",
        },
        "The consequences of getting it wrong are severe and asymmetric. An object with a gap in its record may be perfectly legitimate, or it may be the product of a crime that the gap exists precisely to conceal. Museums have returned major works decades after acquiring them, at considerable cost to their finances and their standing, because the questions were not asked at the point of purchase.",
        {
          lead: "The gap this prototype addresses.",
          text: "Existing tools tend to sit at one of two extremes. Commercial databases, such as the Art Loss Register, give a fast yes-or-no answer to a narrow question: does this object appear in a register of reported thefts? They are closed, they charge per search, and by design they cannot tell a buyer anything about an object that was never reported stolen, which includes almost everything looted from an archaeological site or taken under colonial rule. Full archival provenance research, at the other extreme, is thorough but too slow and too scarce to apply at the scale of the market.",
        },
        "The Digital Provenance Passport proposes an intermediate layer: an automated first pass that gathers what authoritative institutions have already published about an object, organises it into a dated chain, applies a fixed and inspectable set of warning rules, and hands the human researcher a structured starting point with every source attached. It is designed to tell a researcher where to look, not to tell a court what to conclude.",
        "A guiding design commitment runs through the code: the assessment is produced by ordinary arithmetic on evidence that has already been gathered and cited, not by asking a language model for its opinion. The repository states this plainly, describing the scoring as a transparent, editable rubric rather than a black box. That choice is what makes the rest of the tool auditable.",
      ],
    },
    {
      id: "what-agent-means",
      number: "03",
      title: "What Agent Means in This Context",
      paragraphs: [
        "The word agent has a specific meaning in software, and it is not the meaning it carries in law or in the art trade. Here it does not mean a person acting for a principal, and it does not mean a dealer's representative.",
        "An agent, in this sense, is a program that is given a goal rather than a list of instructions, and that then chooses its own sequence of actions to reach that goal. A conventional program is a recipe: do this, then this, then stop. An agent is closer to an instruction to a research assistant: find out what you can about this object, use whatever reference tools you judge appropriate, and report back with your sources.",
        "The practical difference is that an agent can decide, mid-task, to take an action nobody explicitly told it to take on this occasion. In this prototype the clearest example is the paid check. Having assessed the object once, the system looks at its own confidence figure, looks at the price of a commercial database search, looks at the spending limit it has been given, and decides whether buying that search is worth doing. If it decides yes, it pays and incorporates the result. If it decides no, it records why not and continues.",
        "Two things follow from this that matter to a non-technical reader. First, an agent's autonomy is only ever as safe as the limits placed around it, which is why the spending caps are a substantive part of the design rather than a technical footnote. Second, an agent that can write is an agent that can write something untrue, which is why the sourcing rule is placed before every other consideration in the pipeline.",
      ],
    },
    {
      id: "objectives",
      number: "04",
      title: "Objectives",
      paragraphs: [
        {
          intro: "The prototype is designed to:",
          ordered: true,
          list: [
            "Reduce the time required to produce a first-pass provenance summary for a named object, from days of archival work to a single automated run.",
            "Make unsourced history structurally impossible to record, by refusing to enter any claim that does not carry the address of the source that made it, so that every claim can be traced to and checked against its origin. The limit belongs with the claim: the rule blocks an unsourced claim, not a false one, and section 13 sets out what it does not guarantee.",
            "Express the reliability of a provenance record as a single explicit number, accompanied by the itemised reasons that number is not higher.",
            "Surface the specific categories of concern that matter in cultural-property law and in anti-money-laundering practice: undocumented periods, looting and restitution signals, origin in a country with active repatriation claims, and prices that bear no relation to an object's market value.",
            "Demonstrate that an automated researcher can obtain paid due-diligence data on its own initiative, under a spending limit, and disclose in the final record exactly what it bought and what it paid.",
            "Produce a record that is portable and tamper-evident, so that an assessment can be passed between a museum, a buyer, an insurer, and a regulator without any of them having to trust the others not to have edited it.",
            "Show its working. Every score, flag, source, and payment decision appears in the output, and the underlying rules are short enough to be read and disputed by a non-programmer with the code in front of them.",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      number: "05",
      title: "How the System Works",
      paragraphs: [
        "The prototype runs a fixed sequence of five stages. Each stage passes its findings to the next, and the record that is eventually sealed is assembled from what the stages actually collected, not from a summary written afterwards.",
        {
          lead: "Stage one, intent.",
          text: "The user supplies what they know about the object. Only the title is required. The optional fields are the artist, the country or culture of origin, any ownership history the user is already aware of, an asking price if the object is being bought or sold, and an estimated market value for comparison. The repository calls this stage intent is the interface, meaning that the user states what they want to know in ordinary terms and the system works out the research steps from there. The inputs are trimmed and normalised into a structured request, and a search phrase is built from them by appending the terms provenance ownership history repatriation to whatever the user typed.",
        },
        {
          lead: "Stage two, grounding.",
          text: "Grounding is the term used in the repository for the step that anchors the assessment in published evidence. The system sends its search phrase to a commercial web-search service called Tavily, which is a search tool built for software rather than for people: it returns clean extracted text with the address of each page it came from. Critically, the search is confined to a fixed list of permitted sources. Each result is converted into a single dated event in the object's ownership timeline, carrying the claim, the date if one is available, the place if one is available, the address of the source, the name of the institution vouching for it, and a reliability tier. Any result lacking a source address is counted and discarded, and the repository records the number of discarded claims explicitly, so that the user can see how much was thrown away.",
        },
        {
          lead: "Stage three, risk assessment.",
          text: "The assembled timeline, together with the user's own inputs, is examined against a short list of warning conditions. Each condition that matches produces a red flag, which is a small record containing a category, a severity of low, medium, or high, and a sentence of evidence explaining what triggered it. The same pass produces the provenance confidence score. The design principle stated in the code is that the system flags signals and cites evidence, and never asserts a legal conclusion. It does not say an object was looted. It says that authoritative sources discussing this object contain looting or restitution language, and shows the sentence.",
        },
        {
          lead: "Stage four, the paid check.",
          text: "The prototype then considers whether to buy a premium search of a commercial stolen-art registry. It weighs three things: the price of the check, its remaining budget, and whether its current confidence figure is already conclusive enough that a further check could not change the picture. It records its reasoning in plain sentences that appear in the interface, for example that confidence is already high with no red flags and a paid check is therefore not worth the money. If it decides to buy, it settles the payment automatically using x402. The result of the check is folded back into the assessment, and if it reports a match against a stolen or repatriated record the confidence score is cut sharply and a further red flag is added.",
        },
        {
          lead: "Stage five, the Passport.",
          text: "Everything accumulated across the four preceding stages is assembled into a single structured record and sealed. Throughout the run, each stage announces itself to the web interface as it happens, so that a user watches the reasoning unfold in sequence rather than receiving a finished answer with no visible derivation.",
        },
      ],
    },
    {
      id: "variables",
      number: "06",
      title: "The Variables Explained",
      paragraphs: [
        "Everything the prototype measures can be described in ordinary terms: what it represents, why it was chosen, and how it changes the result.",
        {
          lead: "The inputs.",
          text: "Title is the only required field, and the anchor for every subsequent search. Artist is optional and used to disambiguate, and it matters far more for paintings than for antiquities, which are usually anonymous and identified by culture and period instead. Origin is the country or culture the object came from, and it is checked directly against a list of countries with active restitution claims. Known history is whatever the user has already been told, treated as text to be scanned for warning language rather than as established fact, which is the correct treatment: the story a seller tells is evidence about the seller as much as about the object. Asking price and estimated market value together enable the pricing check; supplying neither disables it.",
        },
        {
          table: {
            caption:
              "The three reliability tiers. Every fact recorded carries one of them, describing how strongly it is backed rather than how important it is. Tiers are assigned mechanically from the address of the source: a page on the Metropolitan Museum's domain is treated as verified by authority, and anything outside the recognised institutions falls to reported in press.",
            headers: ["Tier", "What it means", "Weight"],
            rows: [
              [
                "Verified by authority",
                "A museum record, a UNESCO document, a registry entry, or a government record",
                "0.92",
              ],
              [
                "Reported in press",
                "A news outlet or secondary coverage",
                "0.60",
              ],
              [
                "Inferred",
                "Drawn by the software from cited context, and the least trustworthy of the three",
                "0.30",
              ],
            ],
          },
        },
        "The gap between the first two weights is deliberate and large. It encodes the judgment that an institution's own record of an object it holds is a materially different kind of evidence from a newspaper account of the same object, and the drop to 0.30 for inference marks the point at which a reader should stop treating a line as a finding.",
        {
          lead: "The confidence score.",
          text: "The headline number runs from 0 to 100, and it measures how well-documented the provenance appears, not how valuable or how important the object is. A high score means a clean, traceable record. A low score means gaps, warning signals, or both. The score is a measure of the evidence, not a verdict on the object.",
        },
        "The repository contains two implementations of this score, reflecting the fact that the project was built by more than one hand under time pressure. The web interface uses a deduction model. The score starts at 100, on the presumption that an object is well documented until something suggests otherwise, and named deductions are subtracted for each warning condition found, with the final figure held within the range 0 to 100. The command-line agent uses an accumulation model, which runs in the opposite direction. It starts at 30, a deliberately low base representing an object about which nothing has yet been established, and adds 18 points for every event confirmed by an authoritative institution and 8 points for every event reported in the press, capped at 100. It then subtracts 12 if the early history is undated or incomplete.",
        "The two models express the same intuition from opposite ends. The deduction model asks what is wrong with this record. The accumulation model asks how much of this record has actually been established. The second is the more conservative of the two, since an object with no published history at all scores 30 rather than 100.",
        "Following peer review, the accumulation model is now designated the canonical scorer, and the deduction model in the web pipeline is marked non-canonical in the source. Any score reported as a result comes from the canonical model. The reason accumulation wins is that an object with no published history should not score 100: a model that starts every object at a perfect score treats absence of evidence as evidence of clean provenance, which inverts the purpose of the tool. Scoring behaviour was deliberately left unchanged in that revision, so no previously reported number has silently moved, and the two models still return different figures for the same object. Reconciling the web pipeline onto the canonical model is recorded as committed future work rather than presented as an interesting property of the system. Neither model has been validated against expert judgment.",
        {
          table: {
            caption:
              "The deductions used by the web pipeline. Each condition that matches produces a red flag carrying its category, its severity, and a sentence of evidence.",
            headers: [
              "Red flag",
              "Deduction",
              "Severity",
              "What triggers it",
            ],
            rows: [
              [
                "Provenance gap",
                "25 points",
                "High",
                "Language indicating an undocumented period: undocumented, unknown owner, gap, missing, no record, and the years 1933, 1939, and 1945",
              ],
              [
                "Source-country origin",
                "15 points",
                "Medium",
                "The stated origin, or the gathered text, mentions one of fourteen countries with active repatriation claims",
              ],
              [
                "Looting signal",
                "20 points",
                "High",
                "Looting or illicit-trade vocabulary: looted, stolen, tomb, excavated, smuggled, repatriated, illicit, or tombaroli",
              ],
              [
                "Valuation outlier",
                "30 points",
                "High",
                "An asking price more than three times the stated market estimate",
              ],
              [
                "High value with no comparison",
                "10 points",
                "Low",
                "An asking price above ten million United States dollars supplied with no market estimate to check it against",
              ],
              [
                "Registry match",
                "40 points",
                "High",
                "The paid commercial check returns a match against a stolen or repatriated record",
              ],
            ],
          },
        },
        "The three years named in the gap rule are not arbitrary: they mark the Nazi accession to power, the outbreak of the Second World War in Europe, and its end, which is the period the Washington Principles are concerned with. The gap rule carries the second-largest deduction because a gap is the single most common signature of an illegitimate acquisition. Objects with clean histories tend to have documented ones.",
        "The fourteen source countries are Italy, Greece, Egypt, Turkey, Cambodia, China, Iraq, Peru, Mexico, Nigeria, India, Syria, Cyprus, and Thailand. The list is a shorthand for elevated restitution exposure, and its deduction is modest by design. Originating in Egypt is not a defect in an object; it is a reason to check the paperwork more carefully.",
        "The valuation rule carries the largest deduction of the language-based rules, and it is not really a provenance rule at all. It is a money-laundering rule. Art is a recognised vehicle for moving illicit value precisely because it has no fixed price, and a wildly inflated sale is a recognised laundering technique. The threshold of three times is a judgment call rather than a figure derived from evidence.",
        "The registry match is the largest single movement in the system, and rightly so: it is the only deduction triggered by a direct hit in a dedicated register rather than by language found in general sources. The command-line implementation adds two further categories: a repatriation precedent flag when the timeline itself cites a return or restitution event, and a transaction flag recording the result of screening the system's own payment for exposure to sanctioned addresses.",
        {
          lead: "The spending variables.",
          text: "Because the prototype can spend money on its own initiative, the numbers that constrain that behaviour are as important as the ones that score the object. The vendor price is set by default to five United States cents, the cost of one premium search from the simulated vendor. The maximum spend per run is set by default to twenty-five cents, a hard ceiling: if the price of a check plus what has already been spent would exceed it, the check is refused and the refusal is recorded in the output. The conclusive threshold is set at 90 in the command-line agent, above which the agent will not buy a check at all, on the reasoning that the result could not change the conclusion. The web pipeline applies a comparable rule at a confidence of 85 combined with a complete absence of red flags. The design intention behind these three numbers is that an autonomous purchaser should have a price it knows, a ceiling it cannot cross, and a standard of sufficiency at which it stops buying. It is worth noting the distance between the demonstration and reality here. A real single search of the Art Loss Register has been priced in the region of sixty pounds sterling plus tax, not five cents, and at that price the economic reasoning the agent performs would carry considerably more weight.",
        },
        {
          lead: "The demonstration mode switch.",
          text: "One further variable governs everything else. The system has a master setting with two positions. In mock mode, which is the default, every external connection is replaced by stored example data: no search is performed, no payment is made, and no network is required. In live mode, the system attempts real connections and quietly falls back to the stored data if any of them fail. This is candid engineering for a stage demonstration, and the reason the default is the safe one is stated in the code: so that the prototype never moves funds unless someone has explicitly asked it to. But it has an important consequence for any reader evaluating the tool. Unless the setting has been changed and real credentials supplied, an impressive-looking run is a replay of a stored example rather than live research. Both the fallback behaviour and the mode in use are disclosed on screen and in the output.",
        },
      ],
    },
    {
      id: "reading-results",
      number: "07",
      title: "Reading the Results",
      paragraphs: [
        "The prototype opens on a grid of objects it already tracks, each shown as a card with a confidence figure, a repatriation status of repatriated, contested, or clear, its current holding institution, and the number of stops on its journey. Clicking a card opens that object's full dashboard.",
        {
          lead: "A caution about the label on those cards.",
          text: "The interface prints the confidence figure with the word risk in front of it, so the Euphronios Krater appears as risk 12 out of 100. The underlying number is a cleanliness score, and 12 out of 100 means a badly compromised record, not a low level of risk. A reader who has not been told this will read the card exactly backwards. The colour coding and the accompanying risk level of high or low are correct; only the wording is misleading. It is a small defect with real potential to confuse, and it is recorded here because a plain-language review should say so.",
        },
        "The central display for each object is the sequence of places it has physically been, each stop carrying a year, a place, a country, a description, and a type drawn from a fixed set: origin, excavation, looting, sale, museum, repatriation, or contested. This turns a paragraph of prose into a route that can be read at a glance, and it makes the shape of a problematic history visible. An object that goes from a tomb, to a dealer in a neutral-jurisdiction city, to a major museum, within eighteen months and with no documented owner before that, has a recognisable silhouette.",
        "Each red flag is displayed with its severity and the sentence of evidence that produced it. No flag appears without its reason. Every institution consulted is listed with the address of the page relied on, so that a researcher can go and read it. This is what distinguishes a first-pass research aid from an answer machine: the output is designed to be checked, and the checking is made easy. A search box runs the full agent on any object the user names, with the stages appearing one by one as they complete, including the payment reasoning.",
        "The prototype ships with five real and well-documented cases, chosen to span the range of outcomes: the Euphronios Krater, looted from an Etruscan tomb near Cerveteri in 1971, bought by the Metropolitan Museum of Art in 1972 and returned to Italy in 2008; a Benin Bronze plaque taken during the British punitive expedition of 1897 and still held in London against an active Nigerian claim; the Rosetta Stone, ceded to Britain under the Capitulation of Alexandria in 1801 and the subject of repeated Egyptian requests; the Lydian Hoard, looted from burial mounds in western Turkey in the 1960s and returned by the Metropolitan Museum in 1993; and John Singer Sargent's Madame X, purchased from the artist in 1916 with an unbroken documented history. The last of these is the control case. It is the example of what a clean record looks like, and it scores 93 out of 100.",
      ],
    },
    {
      id: "data-sources",
      number: "08",
      title: "Data Sources and the Permitted-Source List",
      paragraphs: [
        {
          intro:
            "The single most consequential design decision in the prototype is that its research is confined to a fixed list of permitted sources. The search is restricted to the domains of:",
          list: [
            "The Metropolitan Museum of Art",
            "UNESCO, including its World Heritage Centre",
            "The Art Loss Register",
            "The International Council of Museums",
            "United States government cultural-heritage sites",
          ],
        },
        "The purpose of the restriction is to make the tier system meaningful. If the system may search anywhere, then a claim in a collector's forum post and a claim in a museum's own accession record arrive in the same shape and the distinction between them has to be reconstructed after the fact. By searching only recognised institutions, the prototype makes the authority of a claim a property of where it was found.",
        "The named institutions are worth introducing for a reader unfamiliar with the field. UNESCO is the United Nations Educational, Scientific and Cultural Organization, and is the custodian of the principal international instrument on trafficking in cultural property. The International Council of Museums is the global professional body for museums, and publishes the Red Lists that identify categories of object at particular risk of illicit trafficking from specific regions. The Art Loss Register is a private London company that operates the largest commercial database of stolen art and conducts due-diligence checks for auction houses, dealers, insurers, and law enforcement, reportedly running several hundred thousand checks a year. The Metropolitan Museum of Art is included both as a collection record and, unavoidably, as a party to several of the best-documented restitution cases in the field.",
        "The cost of the restriction is that the list is short, and its omissions are substantial. It does not include the Getty Provenance Index, the German Lost Art Foundation's database, Interpol's stolen works of art database, the Art Institute of Chicago, Europeana, or the national heritage authorities of any of the fourteen countries the system itself identifies as source countries. An object well documented in a French or Turkish archive and absent from these six domains will return little, and the tool will report a thin record rather than an absent one. The two are not the same thing, and the prototype does not currently distinguish them.",
        "That omission is not evenly distributed, and the direction of the bias runs against the tool's own motivation. The case for building this system, set out in sections 2 and 11, rests on the objects that stolen-art registers cannot catch: material taken from an archaeological site or under colonial rule, never inventoried and never reported stolen. But the permitted list is five Western institutions and one commercial theft register. The tool therefore searches best where objects are already well documented, which is to say major Western museum holdings, and searches worst exactly where the motivating harm lives, which is source-country archives and colonial-era and archaeological material. The observation in section 13 that the system does not distinguish thin evidence from absent evidence is the symptom; this is the cause, and the two belong together. The consequence is that a low confidence score for a Cambodian sculpture and a low score for a Dutch painting do not mean the same thing, and the tool does not currently say so.",
        "Adding source-country heritage authorities, the Getty Provenance Index, and the German Lost Art Foundation is therefore the first substantive extension of this work rather than an optional one. Every other improvement to the scoring, the interface, or the passport format operates on evidence the tool was able to find, and the coverage bias determines what it can find at all.",
      ],
    },
    {
      id: "payment-layer",
      number: "09",
      title: "The Payment Layer, and Why It Is There",
      paragraphs: [
        "A reader may reasonably ask what an automated payment system is doing in a cultural-heritage research tool. The answer is partly historical: the prototype was built for a hackathon on autonomous software commerce, and the payment capability was a condition of entry. But the underlying argument is a real one and worth stating on its merits.",
        "The most authoritative sources on stolen art are commercial and closed. The Art Loss Register does not publish its database; access is sold per search. That model works when the requester is an auction house with a subscription and an accounts department. It works badly when the requester is a researcher checking one object, a small museum, or a piece of software that has just discovered mid-task that it needs one specific answer. The friction is administrative rather than financial: the sum involved may be trivial, but obtaining an account, a key, and an invoice is not.",
        "The x402 standard is an attempt to remove that friction. It uses the HTTP status code 402, Payment Required, reserved decades ago for exactly this purpose and left unused until recently. A server responds to a request by stating a price; the requester attaches a payment and asks again; the data is returned. There is no account and no subscription, and the exchange completes in seconds. The standard was published and open-sourced by Coinbase in 2025 and has since passed to neutral governance.",
        "What that enables is described in the repository as paying for tools you discover: software that encounters a paywalled resource it did not know about in advance can evaluate the price and buy the answer, rather than failing and waiting for a human to arrange access. Applied to provenance, this is the difference between a research assistant that stops at the edge of the free sources and one that can obtain the commercial check when the free sources prove inconclusive.",
        "The prototype implements this end to end, but against its own simulated vendor. The repository is explicit on the point: the paywall behaviour is genuine, in that the vendor really does refuse the request until payment settles, but the data behind it is stored example content, not the Art Loss Register's actual database. Payments are made in a test version of the USDC digital dollar on Base Sepolia, a practice network using valueless test tokens, and the repository warns in terms that the wallet must never be funded with real money. No commercial relationship with the Art Loss Register is claimed or implied.",
        "The system also screens its own payment. Having paid, it examines the resulting transaction for exposure to sanctioned addresses or laundering patterns and records the verdict in the final document. In the demonstration this screening is illustrative rather than substantive, and the code says so. The reason it is present at all is that a tool used to detect value laundering through art should be able to demonstrate that its own transactions are clean.",
      ],
    },
    {
      id: "passport-and-seal",
      number: "10",
      title: "The Passport and What the Seal Proves",
      paragraphs: [
        "The output document is issued in a standard format known as a Verifiable Credential, a specification maintained by the World Wide Web Consortium for digital records that can be checked by anyone without contacting the issuer. The format matters because a provenance assessment that only one institution's software can read is of limited use to the buyer, insurer, or regulator who receives it.",
        "The record contains the object's identity, the full ownership timeline with a source address against every event, the confidence score, every red flag with its evidence, any paid checks with the amount paid and the transaction they produced, the list of checks performed, and the time of assessment. It is assembled from what the run actually collected. The code is explicit that the record is built from accumulated state rather than re-derived from a language model, so that the sealed document is always a faithful account of the run.",
        "The sealing works as follows. The record is first written out in a strictly canonical form, with every field in a fixed order, so that the same content always produces an identical text. A cryptographic signature is then computed over that text. Anyone holding the document can repeat the calculation and recover the identity of the signer. If any character of the record has been changed since signing, the recovered identity will not match and the document is exposed as altered.",
        "The prototype includes a demonstration of exactly this. Its example script signs a Passport, then alters a single field, raising the confidence score to 100, and re-checks it. The check fails and reports that the content no longer matches its seal. This is a small thing to build and a significant thing to show, because the value at stake in a provenance document is high enough to make quiet editing a genuine risk.",
        "One conceptual point in the design deserves comment. The identity that signs the Passport is the same digital wallet identity that pays for the premium check. The repository summarises this as the observation that a wallet is already a form of public-key infrastructure, applied here to an object's identity rather than to a payment. The practical effect is that the entity that spent the money and the entity that vouched for the record are provably the same, and no separate system of certificates or key distribution is required.",
        "What the seal proves, and does not prove, should be stated exactly. It proves that this document has not been altered since it was signed, and that it was signed by the holder of a particular key. It proves nothing whatever about whether the contents are true. A sealed record of a bad assessment is a bad assessment that cannot be quietly improved later. That is a genuine benefit, and it is a narrower one than the word verified tends to suggest to a general reader.",
      ],
    },
    {
      id: "legal-background",
      number: "11",
      title: "The Legal and Normative Background",
      paragraphs: [
        "The prototype's warning rules are not invented from nothing. They correspond, loosely but recognisably, to the concerns of the principal instruments in this field.",
        {
          lead: "The 1970 UNESCO Convention.",
          text: "The Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property was adopted by UNESCO in 1970 and entered into force in 1972. It has been ratified by 149 states. It requires states parties to establish national services for heritage protection and to legislate accordingly, to operate a system of export certificates, to prohibit the import of objects stolen from museums, religious institutions, and public monuments, and, under Article 7, to seize and return such objects when another state party requests it through diplomatic channels. Article 9 commits states to cooperate in concerted international action against trafficking. Its practical significance for provenance work is the date itself. The year 1970 functions as a dividing line in museum acquisition policy across much of the world: an antiquity that can be shown to have left its country of origin before 1970 sits in a different position from one that cannot. This is why the system's list of source countries, and its attention to undocumented periods, map onto a real and consequential legal boundary.",
        },
        {
          lead: "The Washington Principles on Nazi-Confiscated Art.",
          text: "Agreed on 3 December 1998 by more than forty states at a conference convened in Washington, these eleven non-binding principles address art confiscated by the Nazi regime and never returned. They call for such art to be identified, for archives and records to be opened to researchers, for resources to be committed to the work, for the results to be publicised so that pre-war owners and their heirs can be found, for a central registry of the information, and for claims to be resolved through a just and fair solution rather than left to the technicalities of ordinary property litigation. The fourth principle is the one most directly reflected in this software. It provides that in establishing whether a work was confiscated by the Nazis and not restituted, consideration should be given to unavoidable gaps or ambiguities in the provenance, in light of the passage of time and the circumstances of the Holocaust era. In ordinary terms: an incomplete record is not to be held against a claimant, because the destruction of records was part of what happened. This is precisely why the prototype treats a documentation gap as a signal deserving investigation rather than as an absence of evidence, and why the years 1933, 1939, and 1945 appear by name in its rules. The principles are declaratory and create no legal obligations. Their influence comes from adoption into national practice and institutional policy, and assessments of their record over the past quarter-century have been decidedly mixed.",
        },
        {
          lead: "The commercial registers.",
          text: "The Art Loss Register is the market's standard first-line check. Its limits are structural and well understood by practitioners, and they explain why a tool of this kind is worth building. The register records objects that were reported stolen. An object looted from an undocumented archaeological site was never inventoried and therefore was never reported, so it cannot appear. The same is true of most objects taken under colonial administration. A clean result from a stolen-art database is a meaningful answer to a narrow question and is routinely mistaken for a broader assurance than it can provide.",
        },
        {
          lead: "What the prototype does not do.",
          text: "It does not determine title, and it does not apply the law of any jurisdiction. Limitation periods, good-faith purchaser rules, and the availability of a remedy vary enormously between legal systems, and none of that is modelled. The code states the principle directly: the system flags signals and cites evidence, and never asserts a legal conclusion. That restraint is the correct posture for a research aid, and it should be preserved in any future development.",
        },
      ],
    },
    {
      id: "methodological-choices",
      number: "12",
      title: "Methodological Choices",
      paragraphs: [
        {
          lead: "Why the scoring is arithmetic rather than learned.",
          text: "The prototype could have asked a language model to assign a provenance score directly. It does not. Every deduction is a written rule with a fixed value, applied to evidence that has already been gathered and cited. The reason is auditability. A number produced by a rule can be disputed by disputing the rule. A number produced by a model cannot be disputed at all, only accepted or rejected, and in a field where the output may inform a restitution claim that is not an acceptable property.",
        },
        {
          lead: "Why sourcing is enforced structurally rather than by instruction.",
          text: "It is possible to instruct a language model to cite its sources, and it is well-established that the instruction is sometimes ignored, including by inventing sources that do not exist. The prototype instead makes the citation a structural requirement of the data itself: a timeline event without a source address is discarded before it can be recorded, and the system counts the discards. This is a stronger guarantee than any instruction, and it is the single most defensible piece of engineering in the repository.",
        },
        {
          lead: "Why the search is restricted.",
          text: "The restriction is what allows reliability to be inferred from the provenance of the claim rather than assessed after the fact.",
        },
        {
          lead: "Why price is treated as provenance evidence.",
          text: "Including a valuation check in a provenance tool is an unusual choice, and a good one. Art is a recognised channel for moving illicit value, and a sale far above market is a recognised technique. The prototype treats an inexplicable price as a fact about the transaction in the same way it treats a gap as a fact about the record. The threshold of three times market value rests on judgment rather than on any published study.",
        },
        {
          lead: "Why failures fall back rather than stop.",
          text: "Every external connection in the system degrades to stored example data on error rather than halting. This was chosen so that a live demonstration cannot fail in front of an audience. It is a reasonable choice for its purpose and an unacceptable one for research use, because a tool that silently substitutes example data for real research will eventually be trusted when it should not be. The substitution is disclosed on screen, but disclosure is a weaker safeguard than refusal.",
        },
      ],
    },
    {
      id: "limitations",
      number: "13",
      title: "Limitations and Caveats",
      paragraphs: [
        "The repository and the paper both state these limits plainly. They are reproduced here because they are the most important part of the document for any reader considering what weight to give the tool.",
        {
          lead: "It cannot read an archive.",
          text: "The overwhelming majority of provenance evidence is in physical archives, in dealer records, in correspondence, in auction catalogues that were never digitised, and on the back of the object itself. None of this is reachable by a web search. The prototype gathers what institutions have chosen to publish online, which for most objects is a small and unrepresentative fraction of what exists.",
        },
        {
          lead: "The keyword rules are crude.",
          text: "The system decides that a provenance gap exists by looking for particular words in the gathered text. A museum page stating that an object has no gaps in its record contains the word gap and will trigger the flag. A page discussing the successful repatriation of a different object will trigger the looting flag. These rules find the right signal often enough to be useful as a prompt for human attention, and they will produce false positives regularly. They should be read as a list of things to check, never as findings.",
        },
        {
          lead: "The source-country list is hand-written and incomplete.",
          text: "Fourteen countries are named. Many states with active restitution claims are not among them, and membership of the list is not a legal category. It is a useful shorthand and nothing more.",
        },
        {
          lead: "The thresholds are not empirically derived.",
          text: "Twenty-five points for a gap, fifteen for source-country origin, three times market value for a pricing anomaly, ninety as the point at which further checking is pointless: none of these figures comes from a study or an expert panel. They are the developer's judgment, plausibly calibrated and entirely unvalidated. This is a normal starting position for a prototype and it should not be mistaken for anything more.",
        },
        {
          lead: "There are two different scoring systems in the repository.",
          text: "The web interface and the command-line agent compute confidence in materially different ways and will not agree on the same object. Anyone building on this work should reconcile them before doing anything else.",
        },
        {
          lead: "The interface mislabels its own headline number.",
          text: "A card reading risk 12 out of 100 describes a severely compromised object, which is the opposite of what the phrasing suggests.",
        },
        {
          lead: "Most of what is impressive is simulated.",
          text: "In the default configuration there is no search, no payment, and no database query. The commercial stolen-art check is a stand-in with stored answers. The transaction screening returns a fixed clean verdict. The catalogue of five objects is written by hand from published cases rather than produced by the system. A reader evaluating a demonstration should establish which mode it is running in before drawing conclusions about capability.",
        },
        {
          lead: "The risk of plausible falsehood remains.",
          text: "This is the most serious caveat in the report. The prototype's sourcing rule is a genuine and unusually well-implemented safeguard, and it does not eliminate the problem. It guarantees that every recorded claim has a source address attached. It does not guarantee that the source says what the record claims it says, that the source is about the same object, that the extracted sentence has not lost the qualification that made it accurate, or that a page found on an authoritative domain is itself authoritative. A false provenance claim, expressed in institutional language, carrying a real link to a real museum, and sealed inside a document described as verifiable, is more dangerous than an obvious error, because every visible signal invites trust. This is a foreseeable failure mode of the design, not a hypothetical one. Every claim in a Passport must be read at its source before it is relied on, and the fact that the document is sealed and formally verifiable does nothing to change that.",
        },
        {
          lead: "It does not distinguish thin evidence from absent evidence.",
          text: "An object with no online record and an object with a clean record but no online presence look identical to this system. For the majority of the world's cultural objects, which are not held by major Western museums with published collection databases, this limitation is severe.",
        },
        {
          lead: "It is a prototype.",
          text: "It has no test suite, no validation against expert assessments, and a commit history spanning a few days of work. It should be read as a demonstration of a method and an argument about how such a tool ought to be built, not as a service.",
        },
      ],
    },
    {
      id: "sibling-project",
      number: "14",
      title: "Relationship to the Sibling Project",
      paragraphs: [
        "The Ethical Tech CoLab maintains a related repository, provenance-search, which addresses the same problem from a different direction. That project is a web application that identifies an artwork, including from a photograph taken on a phone in a museum, and searches a considerably wider set of free public sources: the Metropolitan Museum, the Art Institute of Chicago, a bundled extract of the Museum of Modern Art's open collection data, Wikipedia, Wikidata, and Europeana, alongside the same commercial search service used here.",
        "The two projects share a central conviction, stated in both repositories, that the confidence score must be computed by a fixed algorithm rather than by the artificial intelligence, and both restrict their research to a list of recognised sources.",
        "They differ in emphasis. The sibling project prioritises breadth of free sources and accessibility, including identification by camera. The project described in this report prioritises the integrity of the resulting record: the enforced sourcing rule, the evidence tiers, the tamper-evident seal, and the ability to obtain paid data autonomously. Read together they suggest a natural combination, in which the wider source coverage of the one feeds the evidentiary discipline and sealed output of the other. This report treats the present repository on its own terms; the comparison is offered only because a reader encountering both should understand that they are complementary experiments rather than duplicates.",
      ],
    },
    {
      id: "audience",
      number: "15",
      title: "Intended Audience and Use",
      paragraphs: [
        "The prototype is aimed at those who must form a view about an object's history before deciding what to do with it: museum registrars and provenance researchers, restitution and cultural-property lawyers, insurers and compliance staff at auction houses, customs and heritage-crime investigators, and the source-country authorities pursuing claims.",
        "Its appropriate use is as a first pass. It is well suited to triage, meaning the task of deciding which objects in a large collection or a large consignment merit a researcher's time. It is well suited to preparing a starting dossier with sources already assembled and linked. It is well suited to teaching, since it makes the structure of provenance reasoning visible.",
        "It is not suited to supporting a claim, defending an acquisition, satisfying a due-diligence obligation, or reaching any conclusion that will be acted upon without a qualified human having read the underlying sources.",
      ],
    },
    {
      id: "conclusion",
      number: "16",
      title: "Conclusion",
      paragraphs: [
        "The Digital Provenance Passport takes a body of work that is slow, specialised, and applied to only a small fraction of the objects that need it, and asks what part of the first pass could be done automatically without becoming untrustworthy. Its answer is more careful than most work in this area. It refuses to record any claim that does not carry its source. It searches only recognised institutions. It computes its judgments with arithmetic that a non-programmer can read and dispute. It seals its output so that the assessment cannot be quietly improved after the fact. It records what it bought, what it paid, and why it thought the purchase worthwhile.",
        "The prototype is also, in its present state, mostly a demonstration. Its commercial database check is a stand-in, its default mode replays stored examples, its permitted-source list omits most of the field's principal resources, its keyword rules will misfire, its two scoring systems disagree with each other, and its interface labels its central number in a way that invites the opposite reading. None of this is concealed in the repository, and none of it should be concealed in a report about it.",
        "What is durable here is the argument rather than the software. It is the proposition that when automated tools are pointed at questions where the stakes include the return of stolen property and the resolution of historical injustice, the design should make fabrication structurally impossible rather than merely discouraged, should make every judgment traceable to a rule and every rule open to challenge, and should produce a record that cannot be edited without the edit becoming visible. Those are the right commitments. This prototype implements them incompletely, states its own limits without flattering itself, and leaves a workable foundation for someone to build on.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "UNESCO. Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property, 1970.",
    },
    {
      ref: "United States Department of State. Washington Conference Principles on Nazi-Confiscated Art, 3 December 1998.",
      url: "https://www.state.gov/washington-conference-principles-on-nazi-confiscated-art/",
    },
    {
      ref: "The Art Loss Register. Commercial database of stolen art and due-diligence search service.",
      url: "https://www.artloss.com",
    },
    {
      ref: "International Council of Museums. Red Lists of cultural objects at risk.",
      url: "https://icom.museum/en/resources/red-lists/",
    },
    {
      ref: "Getty Research Institute. Getty Provenance Index, holding more than two million records.",
      url: "https://www.getty.edu/research/tools/provenance/",
    },
    {
      ref: "The Metropolitan Museum of Art. Collection records, cited as a permitted source and as a party to several documented restitution cases.",
      url: "https://www.metmuseum.org",
    },
    {
      ref: "World Wide Web Consortium. Verifiable Credentials Data Model.",
      url: "https://www.w3.org/TR/vc-data-model/",
    },
    {
      ref: "Coinbase. x402, an open payment standard using HTTP status code 402, published 2025.",
      url: "https://github.com/coinbase/x402",
    },
    {
      ref: "Tavily. Web search service returning extracted text with source addresses, used for the grounding stage.",
      url: "https://tavily.com",
    },
    {
      ref: "Ethical Tech CoLab. provenance-search, the sibling repository described in Section 14.",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/arts-provenance-agent/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/arts-provenance-agent",
};
