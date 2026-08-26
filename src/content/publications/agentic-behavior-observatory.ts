// ─────────────────────────────────────────────────────────────────────────
// "The Agentic Behavior Observatory" — the write-up of what the tool found
// once it was pointed at a corpus rather than at one repository at a time.
//
// Every figure here is computed from the committed corpus in
// Ethical-Tech-CoLab/agentic-behavior-observatory (data/reports/, indexed at
// docs/data/index.json), re-read on 26 August 2026 after the context-isolation
// axis was added: 22 repositories, 15 of them the CoLab's own. Rendered by
// src/app/publications/agentic-behavior-observatory/page.tsx.
//
// House style: no em dashes, no dash ranges, no inline bold. Emphasis is the
// `lead` field's job.
// ─────────────────────────────────────────────────────────────────────────

import type { Citation, Paragraph } from "./types";

export interface ReportSection {
  id: string;
  number: string;
  title: string;
  paragraphs: Paragraph[];
}

export const observatoryReport = {
  eyebrow: "Publications · Instrument and findings",
  title: "The Agentic Behavior Observatory",
  subtitle: "Reading What a Repository Models, and What It Leaves Out",
  org: "Ethical Tech CoLab",
  date: "August 2026",
  // The cover prints org and authors on consecutive lines, so this says
  // something the org line does not: when the corpus was read.
  authors:
    "Analysis and write-up by the Ethical Tech CoLab. Figures computed from the committed corpus of 22 repositories, read on 26 August 2026.",
  thesis:
    "A repository that simulates a population makes a claim about who that population contains, and the claim is legible in its source. This report describes an instrument that reads it, and what the instrument found across 22 repositories: work that models age and disability far more often than income or literacy, an evaluation layer that is strongest exactly where the subject matter is weakest, and eight repositories whose behavioral findings rest on a language model they never name.",

  stats: [
    {
      value: "22",
      label:
        "repositories analyzed, 15 of them the CoLab's own and 7 reference frameworks",
    },
    {
      value: "62",
      label: "signals across six axes, each traceable to the file and line it fired on",
    },
    {
      value: "3 of 22",
      label: "repositories that model income; 19 model children",
    },
    {
      value: "8",
      label: "repositories doing model-driven behavioral work that name no model version",
    },
  ],

  sections: [
    {
      id: "question",
      number: "01",
      title: "The question the instrument exists to answer",
      paragraphs: [
        "When a system generates or evaluates a synthetic population at scale, it is making a claim about who that population contains. The claim is rarely written down. It is implied by which attributes the code carries, which behaviors the agents are allowed to have, and which differences between people the model treats as differences at all. A population dimension nobody models is a population nobody simulates, and an unmodeled dimension is an implicit assertion that it does not matter to the outcome.",
        "That claim is legible in the source. The Agentic Behavior Observatory reads it. Paste a GitHub repository URL and it returns an evidence-linked account of how that repository models agentic behavior, scored on six axes, with the demographic dimensions and the model versions it rests on pulled out. Every point of every score links to the file and the line where its signal fired.",
        {
          lead: "What a score is not.",
          text: "A score is signal coverage, not a quality judgment. A small, sharp repository can and should score lower than a sprawling framework, and the tool says so on its own front page. The number answers one question only: how much of the taxonomy's vocabulary does this repository exhibit. Whether the work is good is a question for a reader, not a regular expression.",
        },
      ],
    },
    {
      id: "method",
      number: "02",
      title: "How the reading is done",
      paragraphs: [
        "The analyzer fetches a repository's metadata and file tree from the GitHub API, then reads up to 120 file bodies from the raw content host, chosen by a heuristic that favors manifests, prose, and modeling-core filenames. Text source in roughly 25 extensions counts, including the single-file HTML applications much of the CoLab's work ships as. Generated bundles and lockfiles are skipped. Nothing is cloned and nothing is executed.",
        "Each file is matched against 62 signals grouped into six axes. A signal is a dependency declaration, a file path, or a pattern in source and prose, and it carries a weight and a human-readable label. An axis score is the share of that axis's weighted signal set the repository covers, expressed on a 0 to 100 scale.",
        {
          table: {
            caption:
              "The six axes and the signals behind each. Counts are of distinct signals, not of matches.",
            headers: ["Axis", "Signals", "What it detects"],
            rows: [
              [
                "Agent-based simulation",
                "16",
                "Mesa, AgentPy, PettingZoo, NetLogo, Repast, SimPy; agent classes, schedulers, step loops, spatial environments",
              ],
              [
                "Synthetic data generation",
                "10",
                "SDV, CTGAN, synthcity, Faker, Gretel; population synthesis and IPF, census seeds, differential privacy, generation at scale",
              ],
              [
                "Model-based behavioral modeling",
                "10",
                "Anthropic and OpenAI SDKs, LangGraph, AutoGen, CrewAI, DSPy, local runtimes; personas, memory streams, generative-agent architectures, silicon sampling",
              ],
              [
                "Reinforcement learning",
                "8",
                "Gymnasium, Stable-Baselines3, RLlib, TorchRL; named algorithms, reward machinery, RLHF and DPO, the reset and step contract",
              ],
              [
                "Evaluation and validation",
                "8",
                "Tests, fidelity metrics such as KS, Wasserstein and TSTR, sensitivity analysis and ablations, seeded runs, experiment tracking, bias and representativeness audits",
              ],
              [
                "Context isolation",
                "10",
                "Private and privileged instructions, BATNAs and red lines; visibility and disclosure rules; per-agent scoped context; fresh sessions and state resets; independent replications; staying in character and knowledge-cutoff handling; contamination and leakage checks; blind evaluation",
              ],
            ],
          },
        },
        "The headline relevance score uses only the three subject axes, because the other three describe how work is done rather than what it is about.",
        {
          formula:
            "relevance = 0.6 x max(subject axes) + 0.4 x mean(subject axes)",
          note: "Subject axes are agent-based simulation, synthetic data generation, and model-based behavioral modeling. The max term keeps a repository that does one of them thoroughly in scope; the mean term rewards work that spans them.",
        },
        {
          lead: "One taxonomy, two runtimes.",
          text: "The scoring logic exists once, in signals.py, and is exported to the browser as JSON. The command-line analyzer that writes the committed corpus and the in-browser analyzer that scores a repository you paste therefore score identically. A visitor can reproduce any published number without installing anything.",
        },
      ],
    },
    {
      id: "corpus",
      number: "03",
      title: "The corpus",
      paragraphs: [
        "The committed corpus is 22 repositories: 7 reference frameworks that define the field's vocabulary, and 15 Ethical Tech CoLab projects, mostly evacuation and negotiation simulators, plus the CoLab's agent work and its evaluation tooling. The observatory analyzes itself as well, which is discussed as a limitation below rather than claimed as a validation.",
        {
          chart: {
            kind: "bars",
            caption:
              "Relevance across the corpus. The reference frameworks cluster at the top not because they are better work, but because they contain more of the taxonomy's vocabulary, which is what the score measures.",
            max: 100,
            rows: [
              {
                label: "agentic-behavior-observatory",
                note: "the tool scoring itself",
                value: 60,
                valueLabel: "60",
              },
              { label: "microsoft/autogen", value: 56, valueLabel: "56" },
              { label: "camel-ai/camel", value: 50, valueLabel: "50" },
              { label: "mesa/mesa", value: 48, valueLabel: "48" },
              {
                label: "joonspk-research/generative_agents",
                value: 32,
                valueLabel: "32",
              },
              { label: "race-condition-mod", value: 31, valueLabel: "31" },
              { label: "AgentTorch/AgentTorch", value: 29, valueLabel: "29" },
              {
                label: "Farama-Foundation/PettingZoo",
                value: 29,
                valueLabel: "29",
              },
              { label: "ercf", value: 25, valueLabel: "25" },
              { label: "sdv-dev/SDV", value: 25, valueLabel: "25" },
            ],
            data: {
              caption: "The ten highest relevance scores in the corpus.",
              headers: ["Repository", "Relevance"],
              rows: [
                ["Ethical-Tech-CoLab/agentic-behavior-observatory", "60"],
                ["microsoft/autogen", "56"],
                ["camel-ai/camel", "50"],
                ["mesa/mesa", "48"],
                ["joonspk-research/generative_agents", "32"],
                ["Ethical-Tech-CoLab/race-condition-mod", "31"],
                ["AgentTorch/AgentTorch", "29"],
                ["Farama-Foundation/PettingZoo", "29"],
                ["Ethical-Tech-CoLab/ercf", "25"],
                ["sdv-dev/SDV", "25"],
              ],
            },
          },
        },
        "Eleven of the 22 have model-based behavioral modeling as their strongest subject axis, 8 agent-based simulation, and 3 synthetic data generation. That distribution is a fact about which repositories were chosen, not about the field, and the corpus is small enough that a single addition moves it.",
      ],
    },
    {
      id: "findings",
      number: "04",
      title: "What the corpus turned out to model",
      paragraphs: [
        "Across all 22 repositories the analyzer found 33 distinct demographic dimensions in code and prose. They are not evenly distributed, and the shape of the imbalance is the most substantive finding in this report.",
        {
          chart: {
            kind: "bars",
            caption:
              "Repositories mentioning each demographic dimension, out of 22. Visible bodily and household attributes dominate; economic position is close to absent.",
            max: 22,
            rows: [
              { label: "Children", value: 19, valueLabel: "19" },
              { label: "Age", value: 15, valueLabel: "15" },
              { label: "Disability", value: 15, valueLabel: "15" },
              { label: "Region", value: 12, valueLabel: "12" },
              { label: "Gender", value: 8, valueLabel: "8" },
              { label: "Migration", value: 7, valueLabel: "7" },
              { label: "Education", value: 6, valueLabel: "6" },
              { label: "Race", value: 6, valueLabel: "6" },
              { label: "Income", value: 3, valueLabel: "3" },
              { label: "Religion", value: 1, valueLabel: "1" },
              { label: "Employment", value: 1, valueLabel: "1" },
              { label: "Literacy", value: 1, valueLabel: "1" },
            ],
            data: {
              caption:
                "Dimension prevalence across the 22-repository corpus, August 2026.",
              headers: ["Dimension", "Repositories"],
              rows: [
                ["Children", "19"],
                ["Age", "15"],
                ["Disability", "15"],
                ["Region", "12"],
                ["Gender", "8"],
                ["Migration", "7"],
                ["Education", "6"],
                ["Race", "6"],
                ["Income", "3"],
                ["Religion", "1"],
                ["Employment", "1"],
                ["Literacy", "1"],
              ],
            },
          },
        },
        {
          lead: "Populations with bodies but no economics.",
          text: "Nineteen of 22 repositories model children and 15 model disability, both of which change how a person moves in an evacuation. Three model income, one models employment, and one models literacy. In a body of work substantially about who gets out of a disaster and who does not, the attributes that determine whether a household has a car, can afford to leave early, or can read the warning are the ones least often represented. The instrument cannot say whether that is an oversight or a defensible modeling choice. It can say the choice is being made silently in most of these repositories.",
        },
        {
          lead: "Eight repositories name no model.",
          text: "The analyzer extracts every model identifier it finds. Across the corpus it found 42 distinct versions, led by gpt-4o-mini in 7 repositories. Eight repositories doing model-driven behavioral work name no version anywhere the analyzer could read. Behavioral findings drift between model versions, so a result whose model is unrecorded cannot be reproduced later even by the people who produced it.",
        },
        {
          lead: "The corpus is better at isolating contexts than at modelling economies.",
          text: "Context isolation was added to the taxonomy after the findings above, to ask whether a repository has any vocabulary for keeping information where it belongs: one agent out of another's private brief, one run out of the next, the model's own training out of the persona it was given, the test item out of the prompt meant to test it. Median across the corpus is 40. The clearest case is the Diplomatic Simulator at 73, its highest axis by a wide margin and not an accident of vocabulary: every delegation holds private instructions, a BATNA and red lines, and the table carries explicit rules for what crosses between parties. Its own paper states the principle outright. At the other end the Stanford generative agents repository scores 0, which is worth sitting with, because the memory stream is the architecture and nothing in it names a boundary between one agent's stream and another's.",
        },
        {
          lead: "Evaluation is strongest where the subject is weakest.",
          text: "Median evaluation across the corpus is 48, higher than any subject axis: the medians for agent-based simulation, synthetic data generation, and model-based behavioral modeling are 11.5, 7 and 17. AgentTorch scores 84 on evaluation against 29 relevance. The pattern is partly an artifact of the taxonomy, since test files and CI configuration are easy vocabulary to detect, and partly real: it is easier to add a test suite than to model an economy.",
        },
        {
          lead: "The landmark exception.",
          text: "The Stanford generative agents repository, the most cited artifact in this literature, scores 0 on evaluation. It is research code released to accompany a paper rather than a maintained framework, and the paper carried the validation. The score is accurate and would be misread as a verdict by anyone who took it for one, which is the clearest illustration in the corpus of why coverage is not merit.",
        },
      ],
    },
    {
      id: "limits",
      number: "05",
      title: "Limits worth stating",
      paragraphs: [
        {
          list: [
            "Regular expressions match vocabulary, not meaning. A repository that discusses differential privacy without implementing it fires that signal. Every signal therefore links to its evidence, and the evidence, not the score, is the finding.",
            "The word party is counted as a demographic dimension in 17 repositories, which is the corpus's clearest false positive: in a negotiation simulator a party is a side at the table, not a political affiliation. It is left in rather than special-cased, because the general problem it illustrates does not go away by patching one term.",
            "The demographic vocabulary is a fixed English list of 39 terms, so it under-reports populations described in other words or other languages. That limit is itself a finding about who the tooling was built by.",
            "Up to 120 files are read per repository. Large repositories are sampled, not read whole, and every report carries files_read, files_eligible and files_total so the sampling is never silent.",
            "The observatory scores itself 60, first in the corpus, and rose from 54 when the context-isolation signals were added to the very file it analyses. A repository whose contents are the taxonomy will match the taxonomy, so this number is close to tautological and should not be read as the tool validating itself. It is the sharpest available demonstration of the limit above it.",
            "Twenty-two repositories is a small corpus, and 15 of them come from one organization. The dimension counts above describe this corpus. They are a prompt to check your own, not a measurement of the field.",
          ],
          intro:
            "The instrument is a vocabulary detector. Reading it as anything more would reproduce exactly the error it was built to expose.",
        },
      ],
    },
    {
      id: "use",
      number: "06",
      title: "Using it, and extending it",
      paragraphs: [
        "The dashboard runs the analysis in the browser. Two calls to the GitHub API for metadata and the file tree, then file bodies from the raw content host, which is CORS-open and not rate limited: roughly thirty repositories an hour with no token at all. Results stay in the browser and are marked live. Downloading the JSON is how one joins the shared corpus.",
        "The command-line analyzer writes the committed corpus. It has no dependencies beyond the Python standard library, clones nothing, and picks up a GitHub token from the environment or from the gh CLI if one is available.",
        {
          lead: "Teaching it a framework.",
          text: "The taxonomy is one file. Adding a simulation framework is one tuple naming its axis, key, kind, pattern, weight and label. The build step exports the same taxonomy to the browser, so a single edit updates both runtimes and no score can differ between them.",
        },
        "Analyzing the CoLab's own corpus exposed three defects in the taxonomy, all since fixed: HTML and JSX source was not being read at all, the file size cap excluded single-file applications, and the agent-detection patterns assumed agents are called agents rather than members, families, or residents. Any repository analyzed before those fixes scored misleadingly low, which is the argument for versioning a taxonomy the way one versions a model.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Ethical Tech CoLab. Agentic Behavior Observatory: dashboard, methodology, and committed corpus.",
      url: "https://ethical-tech-colab.github.io/agentic-behavior-observatory/",
    },
    {
      ref: "Ethical Tech CoLab. agentic-behavior-observatory: analyzer, taxonomy (analyzer/signals.py), and per-repository reports (data/reports/).",
      url: "https://github.com/Ethical-Tech-CoLab/agentic-behavior-observatory",
    },
    {
      ref: "Park, J. S., O'Brien, J. C., Cai, C. J., Morris, M. R., Liang, P., and Bernstein, M. S. Generative Agents: Interactive Simulacra of Human Behavior.",
      url: "https://github.com/joonspk-research/generative_agents",
    },
    {
      ref: "Mesa. Mesa: agent-based modeling in Python.",
      url: "https://github.com/mesa/mesa",
    },
    {
      ref: "Microsoft. AutoGen: a programming framework for agentic AI.",
      url: "https://github.com/microsoft/autogen",
    },
    {
      ref: "Farama Foundation. PettingZoo: an API for multi-agent reinforcement learning.",
      url: "https://github.com/Farama-Foundation/PettingZoo",
    },
    {
      ref: "DataCebo. SDV: the Synthetic Data Vault.",
      url: "https://github.com/sdv-dev/SDV",
    },
    {
      ref: "AgentTorch. AgentTorch: differentiable large-scale agent-based models.",
      url: "https://github.com/AgentTorch/AgentTorch",
    },
    {
      ref: "CAMEL-AI. CAMEL: communicative agents for mind exploration of large language model society.",
      url: "https://github.com/camel-ai/camel",
    },
  ] as Citation[],
};
