// ─────────────────────────────────────────────────────────────────────────
// "Provenance Search": plain-language research report on the Provenance
// Search prototype, transcribed from Provenance-Search-Paper.md in the
// provenance-search repository. Rendered by
// src/app/publications/provenance-search/page.tsx. Kept here so the page
// stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

/** A paragraph is plain prose, prose introduced by a bold lead-in (used for
 *  the labelled limitation entries), a bulleted or numbered list, or a table.
 *  The list and table variants carry structure the source paper had: the
 *  numbered objectives, the three input routes, the watchlist domains and the
 *  institutions behind them, the four score penalties, the display bands, and
 *  the restricted domain list. */
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

export const provenanceSearchReport = {
  eyebrow: "Publications · Academic report",
  title: "Provenance Search",
  subtitle:
    "An Automated Ownership-History Check for Artworks and Cultural Objects",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs",
  date: "July 2026",
  authors:
    "Developed under the Ethical Tech CoLab at the NYU Center for Global Affairs as part of masters research, 2026. The repository's commit history records a single contributor, working under the identifier yagorocha-web.",
  thesis:
    "Every object in a museum, a saleroom, or a private collection carries an invisible second history alongside its artistic one: the record of who has owned it, when, and how it passed from hand to hand. The problem is not that this information does not exist. It is that it is scattered. Provenance Search assembles what the free public sources say into a single ownership timeline, marks the places where the timeline has holes, and puts a transparent number on how much of the picture is actually supported by retrieved evidence.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "7",
      label:
        "free public sources queried at once, one primary web search and six corroborating references",
    },
    {
      value: "5",
      label:
        "watchlist domains that trigger a high-severity flag by fixed rule, never by model judgment",
    },
    {
      value: "30",
      label:
        "points deducted from the confidence score for each custody gap, the heaviest penalty in the calculation",
    },
    {
      value: "12",
      label:
        "limitations the report states about itself, beginning with the restricted databases it does not search",
    },
  ],

  sections: [
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        "Provenance Search is a small web application that takes a description of an artwork and returns a structured summary of that artwork's documented ownership history, together with a numerical confidence score and a list of risk flags. It is published as a live public demonstration and is intended for academic and demonstration purposes.",
        "The tool queries seven free public information sources. One of them, a commercial web-search service called Tavily, is treated as the primary research engine and is deliberately restricted to a fixed list of authoritative websites, including INTERPOL, UNESCO, the Getty, the German Lost Art Database, the Central Registry of Information on Looted Cultural Property, the United States Federal Bureau of Investigation, and major auction houses. The remaining six sources, drawn from museum collections and encyclopedic and structured reference data, are used to corroborate and to supply exact dates.",
        "A general-purpose artificial-intelligence model, Google's Gemini, performs two jobs: it can identify an artwork from a photograph, and it arranges the retrieved facts into a chronological ownership timeline. It is instructed to use only facts present in the retrieved material, and to mark any period of ownership that the sources do not account for as an explicit gap.",
        "The most important design decision in the project is that the confidence score is not produced by the artificial-intelligence model. It is calculated by a short, fixed, published arithmetic rule written into the server software. The same set of findings will always produce the same score, and any reader can check the arithmetic.",
        "The tool is candid in its own output about the limits of what it has done. The digital signature attached to each passport states that the record attests to process, not to underlying truth. That framing is accurate and is the right way for a policy reader to understand the entire system.",
        "Provenance Search does not query the restricted law-enforcement and commercial databases that professional due diligence relies on. It reads the public web pages of some of the organisations that maintain those databases. The distinction is central to interpreting its output.",
      ],
    },
    {
      id: "background",
      number: "02",
      title: "Background and Rationale",
      paragraphs: [
        {
          lead: "The problem.",
          text: "The trade in art and cultural objects is among the largest asset markets with comparatively little mandatory disclosure. Ownership history is held in records that were built for different purposes by institutions with no obligation to share, and there is no single register that a buyer, journalist, heir, or customs officer can consult to see the whole chain.",
        },
        {
          lead: "Why gaps matter.",
          text: "Provenance research does not usually produce a clean finding of theft. It produces an absence. An object whose recorded ownership jumps from 1932 to 1948 with nothing in between is not thereby proven to have been looted, but the years between 1933 and 1945 are precisely the window in which Jewish and other persecuted owners across continental Europe were dispossessed by confiscation, forced sale, and sale under duress. An unexplained gap in that period is what a suppressed transfer looks like from the outside. The professional convention, reflected in museum guidance in both the United States and Europe, is to treat such a gap as a trigger for further research rather than as a verdict.",
        },
        {
          lead: "The gap in tooling.",
          text: "The public resources that do exist are good but fragmented, and most require the researcher to know which one to consult and what to type into it. Assembling a first-pass picture across all of them is slow, repetitive clerical work. It is exactly the kind of work that software can usefully do, provided the software is honest about the difference between finding a record and establishing a fact.",
        },
        {
          lead: "The response.",
          text: "Provenance Search automates the first pass. It runs the same query against several sources at once, gathers what comes back, arranges it in date order, names the holes, and puts a transparent number on how much of the picture is actually supported by retrieved evidence. It is presented by its own interface as a tool that flags what cannot be verified rather than one that confirms what can.",
        },
        {
          lead: "Relationship to related work.",
          text: "The repository's package metadata, its earliest commit, and the identifier embedded in every passport signature all carry the name arts and artifacts, which is also the name of a sibling repository in the same organisation. Provenance Search is best understood as the deployed, publicly hosted web version of that line of work. This report describes only what is present in this repository.",
        },
      ],
    },
    {
      id: "objectives",
      number: "03",
      title: "Objectives",
      paragraphs: [
        {
          intro: "The tool is designed to:",
          ordered: true,
          list: [
            "Assemble, from free and public sources only, whatever documented ownership history exists for a named artwork, without requiring the user to hold a subscription to any commercial database.",
            "Present that history as a dated chronological timeline in which every entry carries the source it came from, so that a reader can follow any claim back to its origin.",
            "Report the absence of information as a finding in its own right, rather than presenting an incomplete chain as though it were complete.",
            "Raise an explicit, high-severity alert when the search turns up material on the public sites of the recognised stolen-art and looted-art registries.",
            "Express overall reliability as a single number produced by a fixed published rule, so that the score cannot drift with the mood of a language model and can be audited by anyone.",
            "Work in the setting where the question is most often asked, including on a mobile telephone in a gallery, by allowing the object to be photographed rather than described.",
          ],
        },
      ],
    },
    {
      id: "how-it-works",
      number: "04",
      title: "How the Tool Works",
      paragraphs: [
        "The system has four stages. A user's request passes through all of them in a single operation that takes a few seconds.",
        {
          lead: "Stage one, describing the object.",
          text: "The user supplies what they know through one of three routes.",
        },
        {
          list: [
            "A text form with fields for title, artist, period or date, medium, and an optional last known sale price.",
            "An uploaded photograph of the object.",
            "A photograph taken there and then with the device camera, which is the mode intended for use in a museum or a saleroom.",
          ],
        },
        "If a photograph is supplied, it is sent to Gemini's image-reading capability, which returns its best guess at title, artist, period, and medium, together with its own self-reported certainty about that identification and a short note. Those values are written into the form, and the search then runs automatically. Only the title and the artist are strictly required to proceed. Large photographs are reduced in size before they are sent, so that a high-resolution telephone image does not exceed the limits of the free service.",
        {
          lead: "Stage two, querying the sources.",
          text: "The title and artist are combined into a search phrase and sent to seven sources at the same time. Each source returns one of three verdicts about the object: a hit was found and it raises no alarm; a hit was found on a registry of lost or stolen property; or nothing matching was found.",
        },
        {
          lead: "Stage three, assembling the timeline.",
          text: "Everything the seven sources returned is gathered into a single block of text and passed to Gemini with a set of written instructions. The model is told that the restricted web search is the primary basis for the timeline and that the museum and reference sources are supplementary corroboration. It is told to use only facts present in the material supplied. It is told that where the sources leave a period of ownership unaccounted for, it must insert an entry marked as a gap with a note explaining what is missing, on the stated principle that a gap is itself a fact worth reporting.",
        },
        "The model is also given one narrow permission to go beyond the retrieved material. For works it recognises as very well documented, where the live sources returned little or nothing, it may fill in widely known ownership history from its own training. Every such entry must be labelled as general knowledge, must be marked unverified, must carry no source link, and may never contradict what a live source actually said. Whenever this permission is used, the software itself adds a medium-severity flag to the result, so the reader sees that part of the timeline rests on the model's memory rather than on a citation.",
        {
          lead: "Stage four, scoring and signing.",
          text: "The assembled timeline and flag list are then handed back to the server's own code, which does three things without any further involvement from the artificial-intelligence model. It adds a high-severity flag for every hit on a registry domain, independently of whether the model noticed it. It computes the confidence score by fixed arithmetic. And it attaches a signature block recording the time of the check and a digital fingerprint, a short string of characters derived mathematically from the title, the artist, and the timestamp, which allows a later reader to detect whether those details have been altered.",
        },
      ],
    },
    {
      id: "variables",
      number: "05",
      title: "The Variables Explained",
      paragraphs: [
        "This section is the heart of the report. It sets out every input the tool takes, every rule it applies, and how each one reaches the final result.",
        {
          lead: "Title and artist.",
          text: "These are the only required fields. They are combined into the phrase sent to every source, so they determine everything that follows. A misspelled artist name or a title in the wrong language will quietly produce a thin result rather than an error, which is a real practical caution for users.",
        },
        {
          lead: "Period or date, and medium.",
          text: "These are optional and are not used to filter the searches. They are passed to the model as descriptive context, helping it distinguish between different works that share a title and helping it judge whether a returned record is really the same object.",
        },
        {
          lead: "Last known sale price.",
          text: "This optional figure exists to support a single check. If the user supplies a price, the model is asked whether that price is clearly out of line with a comparable figure actually present in the retrieved sources. If, and only if, such a comparable exists and the supplied price is inconsistent with it, the valuation is marked anomalous. The instruction is deliberately conservative: with no price supplied, or no comparable found, the answer is always no. A price far above or below the plausible market level is a recognised signal in art-market due diligence, since valuation is one of the few numbers that has to be stated openly and is therefore one of the few that can be checked against the record.",
        },
        {
          intro: "Each of the seven sources returns one of three verdicts.",
          list: [
            "Clear means the source found at least one matching record and nothing alarming.",
            "Flagged means the restricted web search returned a result hosted on one of the loss and stolen-property registries.",
            "Not found means the source returned nothing, or was skipped because no access key was configured, or failed.",
          ],
        },
        "Only the primary web search can return the flagged verdict. The museum and reference sources can only ever say clear or not found, because they hold collection catalogues rather than loss reports.",
        {
          table: {
            caption:
              "The watchlist. If any result returned by the primary web search is hosted on one of these five domains, the software adds a risk flag of type watchlist match at high severity, records which domain it came from, and links to the page.",
            headers: ["Domain", "Institution behind it"],
            rows: [
              ["interpol.int", "INTERPOL's stolen works of art database"],
              ["artloss.com", "The Art Loss Register"],
              ["lostart.de", "The German Lost Art Foundation's database"],
              [
                "lootedart.com",
                "The Central Registry of Information on Looted Cultural Property",
              ],
              ["fbi.gov", "The FBI's stolen art file"],
            ],
          },
        },
        "This rule is deterministic. It runs in the server's own code after the model has finished, it compares the address of each returned page against the list of five, and it does not ask the model's opinion. That is a deliberate safeguard: the single most consequential signal the tool can produce is the one signal that a language model is not permitted to suppress or to invent. It is also the one signal that disappears entirely if the web-search service is not configured, a dependency the repository documents plainly.",
        {
          table: {
            caption:
              "The confidence score begins at 100 per cent, is reduced by these four penalties, and is then held within the range of 0 to 100. The result is divided by 100 and reported as a proportion, which the interface displays as a percentage.",
            headers: ["Penalty", "Deduction", "When it applies"],
            rows: [
              [
                "Custody gap",
                "30 points each",
                "Any timeline entry the model marked as a period of unaccounted-for ownership",
              ],
              [
                "Thin corroboration",
                "25 points",
                "Fewer than three of the seven sources returned anything at all",
              ],
              [
                "High-severity risk flag",
                "10 points each",
                "Automatic watchlist matches, and any high-severity flag the model raised from the retrieved material, such as a documented forced transfer or an unresolved legal claim",
              ],
              [
                "Anomalous valuation",
                "10 points",
                "The supplied sale price was marked anomalous against a comparable figure found in the sources",
              ],
            ],
          },
        },
        "The custody-gap penalty is the heaviest in the calculation, and the weighting reflects the professional convention that in provenance work an unexplained break in the chain is the primary warning sign, not a minor blemish. Its severity also means the score falls very fast. Two gaps alone remove 60 points. Three take the score to zero on their own.",
        "The corroboration term measures corroboration rather than content. A finding supported by one source is a lead; a finding that four independent sources recognise is an established record. The threshold of three out of seven is a judgment call by the developer rather than a derived figure. Note also that the test counts any verdict other than not found, so a flagged result counts towards corroboration in the same way a clear result does, on the reasoning that a registry hit still demonstrates that the object is known to the record.",
        "Two properties of this calculation deserve to be stated clearly, because they shape how the number should be interpreted. First, the score measures how well documented the ownership history is, not how likely it is that the object is legitimate. A famous work with a complete and well-known history that includes a documented wartime confiscation will score very low, because that confiscation registers as a break in title and attracts high-severity flags. An obscure object about which almost nothing is known may also score low, because too few sources returned anything. The two cases are very different in substance and can look similar in the number. The written rationale that accompanies the score is intended to distinguish them, and a reader should always read it.",
        "Second, because the penalties are subtractive and large, the score reaches zero easily and then stops. Once it is at zero, further findings do not change it. Zero therefore means at least this bad rather than a measured floor. The repository's own worked example, a demonstration record for Egon Schiele's Portrait of Wally, scores zero for exactly this reason, with several custody gaps and several high-severity flags in combination.",
        {
          table: {
            caption:
              "The display bands. These are presentational thresholds only. Nothing in the software behaves differently according to which band a score falls into, and the bands carry no legal or institutional meaning.",
            headers: ["Score", "Colour"],
            rows: [
              ["Below 40 per cent", "Red"],
              ["40 to 70 per cent", "Amber"],
              ["70 per cent or above", "Green"],
            ],
          },
        },
      ],
    },
    {
      id: "reading-the-results",
      number: "06",
      title: "Reading the Results",
      paragraphs: [
        {
          lead: "The passport.",
          text: "The output is a single structured record. It contains the artwork's details as searched, the confidence score, a short written rationale in plain language explaining what is and is not verified, the ownership timeline, the risk flags, the valuation assessment, the list of sources consulted with each one's verdict, and the signature block.",
        },
        {
          lead: "The timeline.",
          text: "Each entry gives a period, an owner, and where available a note, a source link, and the name of the source authority. Entries that represent gaps are shown with the owner field marked and tagged as a custody gap in the interface. Entries drawn from the model's own knowledge rather than a retrieved source are tagged as general knowledge. A reader can therefore see at a glance which parts of the chain are cited and which are not.",
        },
        {
          lead: "The risk flags.",
          text: "Each flag has a type, a severity of high, medium, or low, a plain-language detail sentence, and where applicable a link. Severity governs the colour of the flag in the interface and, for high-severity flags only, feeds the score.",
        },
        {
          lead: "The sources consulted panel.",
          text: "This lists all seven sources with their verdicts, so that a reader can see not only what was found but where nothing was found. This matters more than it might appear. A not-found verdict from a museum collection means only that the museum does not hold the object. It is not evidence of anything about the object's history.",
        },
        {
          lead: "The signature.",
          text: "Each passport records the identifier of the software version that produced it, the exact time, a digital fingerprint, and an attestation sentence. The attestation states that the passport records the results of automated queries to free public sources and attests to process, not to underlying truth. This is the single most important sentence in the output and should be read as governing everything above it.",
        },
      ],
    },
    {
      id: "data-sources",
      number: "07",
      title: "The Data Sources in Plain Terms",
      paragraphs: [
        {
          lead: "Tavily.",
          text: "A commercial web-search service designed to be used by software rather than by a person browsing. In this project it is the primary research engine, and it is restricted to a fixed list of thirteen websites so that it cannot return results from the open web. The query sent is the title and artist followed by the words provenance, ownership, history, looting, theft, and restitution.",
        },
        {
          intro: "The thirteen permitted domains are:",
          list: [
            "metmuseum.org",
            "getty.edu",
            "interpol.int",
            "unesco.org",
            "artloss.com",
            "lostart.de",
            "lootedart.com",
            "christies.com",
            "sothebys.com",
            "artnet.com",
            "fbi.gov",
            "ifar.org",
            "wikipedia.org",
          ],
        },
        "For a reader not familiar with the field: INTERPOL maintains the only global database of police-certified records of stolen cultural objects, publicly searchable since 2021 through its free ID-Art application. The FBI's National Stolen Art File, established in 1997, is a publicly searchable United States register of stolen art and cultural property, populated only by law-enforcement agencies. The German Lost Art Foundation's Lost Art Database records cultural assets seized between 1933 and 1945 as a result of persecution, and objects whose history cannot exclude such a seizure; it is free and public. lootedart.com is the Central Registry of Information on Looted Cultural Property 1933 to 1945, established in 2001 by the Commission for Looted Art in Europe, and holds both a documentary database and an object database.",
        "The Art Loss Register is a private London-based commercial company operating what it describes as the largest private database of stolen art; its data is not publicly accessible and searches are a paid service. The Getty Research Institute's Provenance Index is a large free scholarly resource built from transcribed sale catalogues, dealer stock books, and household inventories, weighted towards Western European art from the sixteenth to the early twentieth century. IFAR, the International Foundation for Art Research, was a New York non-profit founded in 1969 whose provenance guide has long been a standard plain-language reference; it announced in 2024 that it was winding down operations. Christie's, Sotheby's, and Artnet are commercial auction and art-market sources whose catalogue entries frequently include provenance statements.",
        {
          lead: "The Metropolitan Museum of Art.",
          text: "The Met publishes an open interface to its collection catalogue requiring no key. The tool retrieves up to three matching objects and reads their title, artist, date, medium, credit line, and public web address. The credit line is useful because it often names the donor or bequest through which the museum acquired the work.",
        },
        {
          lead: "The Art Institute of Chicago.",
          text: "Also an open collection catalogue requiring no key. This is the only museum source in the set that returns a dedicated provenance text field, and it is therefore the most directly valuable of the three museum sources for the tool's purpose.",
        },
        {
          lead: "The Museum of Modern Art.",
          text: "MoMA publishes no live search facility, and its website blocks automated access, so the project takes a different approach. MoMA's collection is published as an open static dataset on a public code-sharing site. The repository includes a script that downloads that dataset, keeps six fields for each work, and compresses it into a single file of roughly four megabytes covering about 159,000 works. That file is loaded into the server's memory when it starts, so a MoMA search happens instantly and involves no network request at all. The matching rule is simple: every word of the title must appear in the record and at least one word of the artist name longer than two characters must also appear.",
        },
        {
          lead: "Wikipedia and Wikidata.",
          text: "The English-language encyclopedia's search facility is used for general background, returning up to three article summaries. Wikidata, a companion project holding structured facts rather than prose, is searched for the artwork, picks the best-matching entry by looking for the artist's surname in the entry description, and then asks for five specific categories of fact: when the work was made, where it is now, which collections have held it and between which dates, who has owned it and between which dates, and any significant events recorded against it. This is the most precisely targeted of the supplementary sources, because those categories map directly onto the shape of a provenance timeline.",
        },
        {
          lead: "Europeana.",
          text: "A European Union cultural-heritage aggregator that brings together records from thousands of European galleries, libraries, archives, and museums. It requires a free key, and the tool skips it if none is configured.",
        },
        {
          lead: "Gemini.",
          text: "Google's family of large language models, capable of reading images as well as text. It is used for the photograph identification and for the assembly of the timeline. It is not used for the score.",
        },
      ],
    },
    {
      id: "legal-backdrop",
      number: "08",
      title: "The Legal and Ethical Backdrop",
      paragraphs: [
        "The tool does not implement any legal test, and this report does not claim that it does. But the reason its outputs matter is set by a body of international commitments that a policy reader will recognise, and the registries it searches exist because of them.",
        "The Washington Conference Principles on Nazi-Confiscated Art, agreed in December 1998 by 44 states, set out eleven principles including the identification of art confiscated by the Nazis and not subsequently restituted, the opening of archives to researchers, the publicising of unidentified works, and the achievement of just and fair solutions for claims. They are explicitly non-binding: a moral and political commitment rather than a treaty, with no enforcement mechanism. The Terezin Declaration of June 2009 extended the same approach to immovable property, Judaica, and archives, and in March 2024 a set of Best Practices for the Washington Principles was issued for the twenty-fifth anniversary, likewise non-binding, which among other things treats sales under duress between 1933 and 1945 as equivalent to involuntary transfers.",
        "lootedart.com, one of the five watchlist domains, was created specifically to fulfil the sixth of the Washington Principles, which called for a central repository of information. The German Lost Art Database serves the same purpose within Germany's national framework. The tool's watchlist is thus not an arbitrary list of websites; it is a list of the public faces of the institutional infrastructure built in response to those commitments.",
        "For objects other than Nazi-era losses, the governing instrument is the 1970 UNESCO Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property, which entered into force in April 1972 and now has around 150 states parties. It obliges states to maintain inventories, to operate export certification, to bar museums from acquiring undocumented material, and to return stolen inventoried objects on request. It is not retroactive, binding states only in respect of transfers after it entered into force between the states concerned, which is why 1970 functions in practice as a due-diligence cut-off date for antiquities, and why it does not reach the 1933 to 1945 period. The 1995 UNIDROIT Convention on Stolen or Illegally Exported Cultural Objects, in force since July 1998, was designed to address the private-law gaps the UNESCO Convention leaves open, but has far fewer parties.",
        "It should be stated plainly that the tool applies none of these instruments. It does not determine title, assess a restitution claim, or decide whether an export was lawful. What it does is surface the public traces that the institutions created under these frameworks have left on the open web. Deciding what any of it means remains a matter for lawyers, provenance researchers, and the claims processes those frameworks established.",
      ],
    },
    {
      id: "design-choices",
      number: "09",
      title: "Design Choices",
      paragraphs: [
        {
          lead: "Why the score is not produced by the model.",
          text: "A language model asked to rate its own confidence will produce a number that sounds reasonable and cannot be reproduced or checked. The project instead computes the score in ordinary code from countable facts: how many gaps, how many sources responded, how many high-severity flags, whether the valuation was anomalous. The result is that two runs producing the same findings produce the same score, and a reader who disagrees with the score can identify exactly which term they disagree with. This is the strongest design decision in the project.",
        },
        {
          lead: "Why the primary search is restricted.",
          text: "An unrestricted web search for the words looting and theft alongside a famous artist's name would return a great deal of journalism, speculation, and commercial content. Restricting the search to thirteen named institutional and market domains means that the material the model reasons over comes from sources with an identifiable custodian, at the cost of missing anything held elsewhere.",
        },
        {
          lead: "Why gaps are recorded rather than smoothed over.",
          text: "The instruction given to the model states that a gap is itself a fact worth reporting, and the interface displays gaps prominently in red. A system that quietly produced an unbroken chain wherever it lacked data would be worse than useless in this domain, because the incomplete chain is the finding.",
        },
        {
          lead: "Why the general-knowledge fallback exists and why it is fenced.",
          text: "Without it, the tool would return an almost empty result for the most famous works in the world, since the free sources it uses may hold little ownership detail even for a painting whose history is taught in schools. The fallback lets the model fill those blanks, but it is constrained on four sides: every such entry is labelled in the data, tagged in the display, never marked verified, and never allowed to override a live source, and its use triggers an automatic medium-severity flag. The constraint is well designed. It remains the part of the system where an error is hardest for a non-specialist reader to detect.",
        },
        {
          lead: "Why the MoMA data is bundled rather than queried.",
          text: "Because MoMA offers no live search and blocks automated access, the only lawful and reliable route to its collection is its own published open dataset. Bundling a compressed copy makes the search instant and removes a point of failure, at the cost that the copy is only as current as the last time it was rebuilt.",
        },
        {
          lead: "Why everything runs on the server.",
          text: "The user's browser never contacts any external service directly. It speaks only to this project's own server, which holds the access keys. This keeps the keys out of the browser, where they would be readable by anyone.",
        },
      ],
    },
    {
      id: "limitations",
      number: "10",
      title: "Limitations and Caveats",
      paragraphs: [
        "The report states twelve limitations. They are reproduced here because they are the most important part of the document for any reader considering what weight to give the tool.",
        {
          lead: "It does not search the restricted databases.",
          text: "This is the most important limitation and the one most likely to be misread. The interface names INTERPOL, the Art Loss Register, Lost Art, and the FBI among the sources it searches. What it actually searches is the public web pages of those organisations, by way of a general web-search service. The Art Loss Register's database is a paid commercial service with no public access at all. A negative result from this tool is therefore not a clearance against the Art Loss Register, and must never be presented as one. INTERPOL and the FBI files are publicly searchable through their own interfaces, but the tool does not query those interfaces directly either.",
        },
        {
          lead: "An absence of findings is not a clean history.",
          text: "Every not-found verdict in the panel means only that the source returned nothing for the phrase that was searched. It carries no information about the object.",
        },
        {
          lead: "The score conflates two different situations.",
          text: "A well-documented history containing a wartime seizure and an obscure object with no history at all can both produce a very low score. The number alone does not distinguish them.",
        },
        {
          lead: "The weights are the developer's judgment.",
          text: "Thirty points for a gap, twenty-five for thin corroboration, ten per high-severity flag, ten for a valuation anomaly, three sources as the corroboration threshold: none of these figures is derived from a study, an expert panel, or a validation exercise against known cases. They are reasonable choices that produce sensible orderings, and they should be described as such rather than as a measurement.",
        },
        {
          lead: "The timeline depends on a language model.",
          text: "The model is instructed to use only retrieved facts, and its temperature setting is kept very low to make its output as consistent as possible, but it is still a language model reading messy source material. It can misread a date, attach a record to the wrong object, or mistake a similarly titled work for the one being searched. Nothing in the system checks its assembly against the retrieved material after the fact.",
        },
        {
          lead: "Identification from a photograph is a guess.",
          text: "The image step returns a best-effort identification with a self-reported certainty figure. That figure is the model's own estimate, it is not carried into the confidence score, and an incorrect identification will produce a fully formed passport for the wrong object.",
        },
        {
          lead: "The searches are simple text matches.",
          text: "The query is the title and artist as typed. There is no handling of alternative titles, transliterations, works known by different names in different languages, or the many objects for which no single agreed title exists. This weighs most heavily against exactly the categories of object where provenance questions are most acute, including antiquities and non-Western material, which frequently have no title and no named artist at all.",
        },
        {
          lead: "The source list is Western-weighted.",
          text: "Two of the three museum sources are American, the aggregator is European, and the market sources are the two large London and New York auction houses. Objects from collections and markets outside that orbit will be under-represented, and this limitation compounds the previous one.",
        },
        {
          lead: "The sources change beneath the tool.",
          text: "The domain list is fixed in the software. One of the thirteen domains, ifar.org, belongs to an organisation that announced in 2024 that it was winding down. Domain lists of this kind require periodic review, and nothing in the repository schedules one.",
        },
        {
          lead: "Dependencies and degradation.",
          text: "If the web-search key is absent, the tool runs on the supplementary sources alone and the watchlist rule cannot fire at all, which removes its single most consequential signal without any visible change in the shape of the output. If the Europeana key is absent, that source is silently skipped and counts as not found, which can push the corroboration count below the threshold and cost 25 points for a reason unrelated to the artwork.",
        },
        {
          lead: "The written rationale is not the arithmetic.",
          text: "The plain-language explanation shown beside the score is composed by the language model and describes the substance of the case. It does not narrate the calculation, and a reader should not assume the two are saying the same thing.",
        },
        {
          lead: "Status.",
          text: "This is a research prototype by a single developer, deployed as a public demonstration. It is not an accredited due-diligence service, it carries no professional indemnity, and its passport is not a certificate. Its own attestation says so.",
        },
      ],
    },
    {
      id: "deployment",
      number: "11",
      title: "Practical Nature and Deployment",
      paragraphs: [
        "The tool is a single web page backed by a small server program. A user needs only a web browser and no installation. The public demonstration is hosted on a commercial application-hosting platform, and the project's repository page redirects visitors to it.",
        "The repository also contains three stored example results, for Leonardo da Vinci's Salvator Mundi, Vincent van Gogh's The Starry Night, and Egon Schiele's Portrait of Wally. These are saved copies of earlier live runs, included so that the output can be demonstrated without a working connection or a configured key. Their signature blocks are marked as static snapshots. They are teaching material and should not be read as current findings.",
        "The choice of examples is apt. Portrait of Wally is the case that did more than any other to establish that a loan to an American museum could expose an unresolved Nazi-era claim: taken from the Jewish Viennese dealer Lea Bondi Jaray around the time she fled Vienna in 1939, it was seized in New York in 1998 while on loan to the Museum of Modern Art, and after some thirteen years of federal forfeiture litigation the matter settled in July 2010 with the Leopold Museum paying the Bondi estate 19 million United States dollars to retain the painting and agreeing to display its true provenance permanently alongside it. Salvator Mundi, sold at Christie's in November 2017 for 450.3 million dollars including fees, is the case most associated with the opposite problem: a chain of ownership with a long blank stretch, an attribution that remains contested, and a present location that is not publicly confirmed.",
        "All access keys are held in server configuration and are excluded from the repository. The README notes explicitly that if any key file was ever committed or shared, the keys should be rotated. That is the right instruction and it is good practice to have written it down.",
      ],
    },
    {
      id: "audience",
      number: "12",
      title: "Intended Audience and Use",
      paragraphs: [
        "The tool is aimed at the person who needs a fast first look: a student researcher, a journalist, a small institution without a provenance department, a family beginning to trace an object, or a visitor standing in front of a work with a question about it. For that audience it does something genuinely useful, which is to run in seconds a set of searches that would otherwise take an afternoon, and to say clearly which parts of the answer are cited and which are not.",
        "It is not aimed at, and should not be used for, the decision points where the answer carries legal or commercial weight. An acquisition, a sale, a restitution claim, an export licence, or a repatriation request all require searches of the restricted registries, examination of physical and archival evidence, and professional judgment. The right way to read a passport from this tool is as a list of leads and of questions that have not been answered.",
      ],
    },
    {
      id: "conclusion",
      number: "13",
      title: "Conclusion",
      paragraphs: [
        "The value of Provenance Search lies less in what it finds than in how carefully it reports what it did not find. Its timeline names its gaps. Its source panel shows silences as well as answers. Its most consequential signal, the registry match, is computed by rule rather than by a language model. Its score can be recomputed by hand from four numbers. Its signature states that it attests to process and not to truth. In a field where an incomplete chain presented as a complete one is the characteristic harm, that discipline is the substance of the contribution.",
        "The prototype's weaknesses are the ones its own design invites. It reads the public faces of registries rather than the registries themselves, and its interface language does not make that distinction as sharply as its documentation does. Its scoring weights are informed guesses. Its search strategy assumes a world of titled works by named artists, which is not the world in which most contested cultural property sits. These are addressable, and naming them is more useful than the tool's current score would be to anyone making a decision.",
        "What the project demonstrates is a pattern worth carrying into other domains: let the automated system gather and arrange, let fixed published rules do the judging, mark every claim with its origin, and treat the absence of evidence as a reportable finding rather than a blank to be filled.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Washington Conference Principles on Nazi-Confiscated Art, agreed December 1998 by 44 states. Non-binding.",
      url: "https://www.state.gov/washington-conference-principles-on-nazi-confiscated-art/",
    },
    {
      ref: "Terezin Declaration on Holocaust Era Assets and Related Issues, June 2009. Best Practices for the Washington Principles, March 2024.",
    },
    {
      ref: "UNESCO. Convention on the Means of Prohibiting and Preventing the Illicit Import, Export and Transfer of Ownership of Cultural Property, 1970, in force April 1972.",
      url: "https://www.unesco.org",
    },
    {
      ref: "UNIDROIT. Convention on Stolen or Illegally Exported Cultural Objects, 1995, in force July 1998.",
      url: "https://www.unidroit.org",
    },
    {
      ref: "INTERPOL. Stolen Works of Art Database and the ID-Art application, publicly searchable since 2021.",
      url: "https://www.interpol.int",
    },
    {
      ref: "Federal Bureau of Investigation. National Stolen Art File, established 1997.",
      url: "https://www.fbi.gov/investigate/violent-crime/art-theft",
    },
    {
      ref: "German Lost Art Foundation. Lost Art Database, cultural assets seized between 1933 and 1945.",
      url: "https://www.lostart.de",
    },
    {
      ref: "Commission for Looted Art in Europe. Central Registry of Information on Looted Cultural Property 1933 to 1945, established 2001.",
      url: "https://www.lootedart.com",
    },
    {
      ref: "The Art Loss Register. Private commercial database of stolen art; searches are a paid service.",
      url: "https://www.artloss.com",
    },
    {
      ref: "Getty Research Institute. Provenance Index, transcribed sale catalogues, dealer stock books, and household inventories.",
      url: "https://www.getty.edu",
    },
    {
      ref: "International Foundation for Art Research. Provenance guide. Founded 1969; announced wind-down in 2024.",
      url: "https://www.ifar.org",
    },
    {
      ref: "The Metropolitan Museum of Art. Open Access collection interface.",
      url: "https://metmuseum.github.io",
    },
    {
      ref: "Art Institute of Chicago. Open collection interface, including a dedicated provenance field.",
      url: "https://api.artic.edu",
    },
    {
      ref: "Museum of Modern Art. Open collection dataset, roughly 159,000 works.",
      url: "https://github.com/MuseumofModernArt/collection",
    },
    {
      ref: "Wikidata. Structured facts on collections, owners, and significant events.",
      url: "https://www.wikidata.org",
    },
    {
      ref: "Europeana. European Union cultural-heritage aggregator.",
      url: "https://www.europeana.eu",
    },
    {
      ref: "Tavily. Commercial web-search service for software, used as the restricted primary research engine.",
      url: "https://tavily.com",
    },
    {
      ref: "Google. Gemini family of large language models, used for image identification and timeline assembly.",
      url: "https://ai.google.dev",
    },
  ] as Citation[],

  // The live prototype and the source paper.
  liveUrl: "https://ethical-tech-colab.github.io/provenance-search/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/provenance-search",
};
