// ─────────────────────────────────────────────────────────────────────────
// "AI Model Performance, Capabilities, Accuracy, Speed, Energy Use, and
// Token Economics": comparative research review of frontier, open-weight,
// and efficient model families, transcribed from the July 2026 write-up.
// Rendered by src/app/publications/ai-models-research/page.tsx. Kept here so
// the page stays presentational, matching the site's content/ convention.
//
// House style for this report: no em dashes, no dash ranges, no inline bold.
// The source review follows those rules; keep them if you edit this file.
//
// Evidence discipline carried over from the source: every figure names the
// party that produced it. Provider-reported results are labelled as such and
// are never presented as independent replication.
// ─────────────────────────────────────────────────────────────────────────

import type { Citation, Paragraph, ReportSection } from "./types";

export const aiModelsResearchReport = {
  eyebrow: "Publications · Research review",
  title: "AI Model Performance",
  subtitle:
    "Capabilities, Accuracy, Speed, Energy Use, and Token Economics Across Frontier, Open-Weight, and Efficient Model Families",
  org: "Ethical Tech CoLab",
  advisor: "Academic and primary-source synthesis",
  date: "July 2026",
  authors:
    "Carolina Morón. Prepared as a comparative research review, drawing on peer-reviewed research, institutional benchmarks, model cards, and official technical documentation. Research cut-off 22 July 2026.",
  thesis:
    "There is no universally best AI model. Model selection is a constrained optimisation problem across verified task quality, factual reliability, latency, throughput, token consumption, energy per accepted output, privacy, controllability, and total deployment cost.",

  // Figures pulled from the body for the hero stat band. Each is sourced in
  // the section that carries it, and each names its evidence class there.
  stats: [
    {
      value: "0.34 Wh",
      label:
        "median estimated energy for a representative frontier-scale query, rising to 4.32 Wh at fifteen times the token use",
    },
    {
      value: "73%",
      label:
        "energy reduction achievable through inference optimisation alone, against an unoptimised baseline",
    },
    {
      value: "30%",
      label:
        "of difficult multi-turn conversations on which the strongest web-enabled configuration tested still hallucinated",
    },
    {
      value: "26×",
      label:
        "spread in nominal cost for one identical document-analysis request across published price schedules",
    },
  ],

  sections: [
    {
      id: "evidence",
      number: "01",
      title: "How to read the evidence",
      paragraphs: [
        "This review distinguishes three classes of evidence throughout, and every cross-model comparison should be read with the class in mind. Ranking claims are strongest when the same evaluator, prompt set, tool access, reasoning budget, and scoring method are held constant. They are weakest, and frequently meaningless, when they are not.",
        {
          table: {
            caption:
              "The three evidence grades used throughout the review and in the underlying research repository.",
            headers: ["Grade", "Evidence class", "Interpretation"],
            rows: [
              [
                "A",
                "Independent or peer-reviewed",
                "Peer-reviewed papers, reproducible benchmarks, standardised institutional evaluations, and public datasets.",
              ],
              [
                "B",
                "Institutional primary research",
                "University or research-lab reports, model cards, benchmark methodology pages, and public technical reports.",
              ],
              [
                "C",
                "Provider-reported",
                "Vendor launch benchmarks, self-reported latency, and product documentation. Useful, but not independently reproduced by default.",
              ],
            ],
          },
        },
        "The distinction matters because the three are routinely printed in the same table, to the same number of decimal places, as though they were the same kind of fact. A provider launch table is produced by the party that benefits from the result, under conditions the provider chose and usually did not disclose. A benchmark maintainer's evaluation is produced under a published protocol by a party with no stake in which model wins.",
        {
          lead: "Interpretation rule.",
          text: "Treat vendor benchmark numbers as hypotheses for local testing. They are useful for narrowing a candidate set and are not sufficient for procurement.",
        },
      ],
    },
    {
      id: "landscape",
      number: "02",
      title: "The 2026 landscape",
      paragraphs: [
        "The frontier shifted from a single scale race toward a multi-dimensional competition among reasoning quality, agentic execution, token efficiency, multimodality, long-context handling, and operational efficiency. By mid-2026, leading proprietary systems commonly offer configurable reasoning, tool use, image input, context windows near one million tokens, and output limits above 100,000 tokens.",
        "Open-weight systems increasingly use mixture-of-experts architectures, sparse attention, quantization, and smaller active parameter counts to approach frontier performance with lower serving requirements. The market now contains three overlapping classes: frontier hosted models optimising broad capability and tool integration, efficient hosted models optimising latency and price, and open-weight models optimising control and deployment flexibility.",
        {
          lead: "Parameter count is an incomplete proxy for inference cost.",
          text: "A mixture-of-experts model stores many parameters but activates a smaller subset for each token. That reduces compute per token relative to a dense model of the same stored size, but it does not eliminate memory, routing, communication, or serving overhead. Active parameter count should be reported alongside total parameters, precision, hardware, batch size, and measured throughput.",
        },
        {
          table: {
            caption:
              "Share of stored parameters activated per token, from disclosed architectures. Provider architecture disclosures, Grade B.",
            headers: ["Model", "Total stored", "Active per token", "Share"],
            rows: [
              ["Mistral Medium 3.5", "128B, dense", "128B", "100 percent"],
              ["Mistral Small 4", "119B", "6B", "about 5 percent"],
              ["DeepSeek V4 Flash", "284B", "13B", "about 5 percent"],
              ["Llama 4 Maverick", "400B", "17B", "about 4 percent"],
              ["DeepSeek V4 Pro", "1.6T", "49B", "about 3 percent"],
            ],
          },
        },
      ],
    },
    {
      id: "performance",
      number: "03",
      title: "What performance actually means",
      paragraphs: [
        "Performance is not a scalar property. The holistic evaluation framework argued for assessment across accuracy, calibration, robustness, fairness, bias, toxicity, and efficiency rather than a single number. That argument is stronger now that models use tools, accept several modalities, and vary their reasoning effort per request, because one score hides differences in reliability, cost, and behaviour that determine whether a system works in production.",
        {
          intro:
            "Rankings disagree because evaluations change the computational and informational conditions under which a model operates:",
          list: [
            "A model tested with web search and code execution is not comparable to a closed-book model.",
            "A model allowed maximum reasoning effort, or several samples, has a larger inference budget than a model tested once at default settings.",
            "Agent benchmarks are sensitive to the scaffolding that manages tools, context, retries, and termination, so the result belongs to a model-and-scaffold pair rather than to a model.",
            "Prompt formulation alters scores and can reorder models, especially on open-ended and instruction-following tasks.",
            "Contamination inflates performance when evaluation items or near variants appear in training data.",
            "Judging by another model introduces judge bias, positional effects, verbosity preference, and family favouritism.",
            "Pass-at-k and majority voting spend more compute than single-attempt evaluation and are not equivalent to it.",
            "Provider tables mix internal tasks with public benchmarks and may evaluate competitor models under the publishing provider's own harness.",
          ],
        },
        "Benchmark progress through 2026 is real but uneven. Models approach saturation on some mathematics and knowledge tests while remaining materially weaker on application construction, long-horizon agents, and open-world computer use.",
        {
          table: {
            caption:
              "Best reported model results against human baselines on interactive benchmarks. Stanford HAI, AI Index Report 2026, Technical Performance chapter. Grade B. Snapshots, not permanent rankings.",
            headers: [
              "Benchmark",
              "Capability",
              "Best reported",
              "Human baseline",
            ],
            rows: [
              [
                "OSWorld",
                "Computer use in realistic desktop environments",
                "66.3 percent",
                "72.35 percent",
              ],
              [
                "WebArena",
                "Web navigation and task completion",
                "74.3 percent",
                "78.24 percent",
              ],
              [
                "Terminal-Bench 2.0",
                "Terminal-based coding and system tasks",
                "77.3 percent",
                "Not reported",
              ],
              [
                "Vibe Code Bench",
                "End-to-end application construction",
                "About 57.6 percent",
                "Not reported",
              ],
            ],
          },
        },
        "Two readings follow. Agents approach human performance on these benchmarks without consistently exceeding it. And building a functioning application remains materially harder than completing an isolated task, which is what a long-horizon workload actually requires. Human scores are frequently measured under different time, tool, and incentive conditions than model scores, so the gap is indicative rather than exact.",
      ],
    },
    {
      id: "accuracy",
      number: "04",
      title: "Accuracy, factuality, and hallucination",
      paragraphs: [
        "Accuracy cannot be represented by one score. A model may excel at scientific multiple choice and still fabricate citations, invent software packages, omit constraints in a long document, or select the wrong tool in an agent loop. These are four different failure modes with four different measurements.",
        {
          table: {
            caption:
              "Four distinct accuracy problems, each requiring its own evaluation.",
            headers: ["Type", "Question", "How it is evaluated"],
            rows: [
              [
                "Parametric factuality",
                "Is the answer correct from internal model knowledge?",
                "Closed-book factual question answering",
              ],
              [
                "Groundedness",
                "Does every material claim follow from the supplied sources?",
                "Claim-level entailment against provided evidence",
              ],
              [
                "Procedural correctness",
                "Did the model follow the required method and constraints?",
                "Schema validation, unit tests, workflow checks",
              ],
              [
                "Epistemic behaviour",
                "Does the model recognise when evidence is insufficient?",
                "Calibration, selective accuracy, abstention",
              ],
            ],
          },
        },
        "HalluHard evaluates 950 difficult multi-turn conversations in legal, research, medical, and coding settings, and checks whether cited material actually supports the generated claims. The strongest web-enabled configuration tested still hallucinated on about 30 percent of conversations, and rates without web access were substantially higher. The same work reports that early errors cascade as a conversation lengthens, which makes multi-turn reliability a property of the system rather than of a single answer.",
        "Software generation carries a distinct and concrete risk. Research at NYU's OSIRIS Lab on package hallucination, in which a model recommends dependencies that do not exist, found invented package names in roughly 4.6 to 6.1 percent of tested package suggestions across frontier systems, with some fabricated names recurring across models. That is a supply-chain exposure rather than a quality nuisance: a name that several models hallucinate can be registered by an attacker and then installed by automation.",
        {
          lead: "Fluency is not calibration.",
          text: "Confidence can be expressed through verbal hedging, an explicit probability, token log-probabilities, agreement across samples, or a separate verifier, and these signals do not always agree with one another. Uncertainty estimators can correlate weakly with actual hallucination depending on the error type and the model, so a production system should validate its uncertainty signal against its own domain rather than assume a confident model is right.",
        },
        {
          intro:
            "Reliability is a property of the system, not of the model choice. The controls that matter more than selection are:",
          list: [
            "Retrieval with provenance: retrieve a small evidence set, preserve source identifiers, and require claim-level citation.",
            "Constrained generation: schemas, grammars, enumerated values, and deterministic validators wherever possible.",
            "Verification: run the calculation, the code, the query, or the citation check against the first output.",
            "Selective escalation: route low-confidence, high-risk, or contradictory cases to a stronger model or a human reviewer.",
            "Abstention policy: define when the system must say the evidence is insufficient, and what would resolve it.",
            "Version control: pin model snapshots and rerun regression evaluations before an upgrade.",
            "Adversarial evaluation: test prompt injection, conflicting documents, missing evidence, and long-context distractors.",
          ],
        },
      ],
    },
    {
      id: "speed",
      number: "05",
      title: "Speed is not generation rate",
      paragraphs: [
        "Speed must be decomposed into queueing time, prefill, time to first token, time per output token, tool latency, and total task completion time. A model that streams at a high token rate can still be slow if it emits excessive reasoning tokens or requires repeated attempts. Conversely, a slower frontier model can finish sooner if it needs fewer steps, fewer tool calls, and less rework.",
        "Published throughput figures illustrate the problem rather than solving it. Google reports 363 output tokens per second for Gemini 3.1 Flash-Lite in its own evaluation. xAI reports 80 tokens per second for Grok 4.5 on its launch page. These come from different test environments and different model classes, are both provider-reported, and are not a controlled head-to-head comparison. They show that fast tiers exist and are positioned for interactive and high-volume use. They do not measure how long a task takes.",
        {
          lead: "Configurable reasoning moves the frontier rather than sitting on it.",
          text: "Low or disabled reasoning suits extraction, rewriting, classification, and deterministic tool routing. High reasoning effort earns its cost on mathematics, scientific analysis, difficult coding, and planning, where an incorrect result costs more than the additional compute. Research on test-time compute identifies diminishing returns and overthinking, in which longer chains introduce new errors, lose the objective, or exhaust the context budget. The correct stopping rule is quality-conditioned rather than a fixed token allowance.",
        },
        {
          intro: "Operational reporting requirements follow from this:",
          list: [
            "Report p50, p90, and p95 time to first token, never a mean alone.",
            "Report p50 and p95 end-to-end completion time, including tools and retries.",
            "Separate cold starts from warm requests, and cache hits from cache misses.",
            "Compare models at the same latency and cost budget, not at their own defaults.",
            "Track output tokens, tool calls, failed steps, and retries per accepted task.",
            "Test at the concurrency you expect, because batching raises throughput while raising individual latency.",
          ],
        },
      ],
    },
    {
      id: "tokens",
      number: "06",
      title: "Context windows and token economics",
      paragraphs: [
        "One-million-token windows are now common in leading hosted families, but nominal capacity exceeds reliable capacity. Stanford's long-context evaluation states that support for long inputs does not imply strong long-context capability. LongCodeBench finds degradation on real code tasks as context scales toward one million tokens. LongProc finds that models accept long inputs yet lose coherence when they must integrate dispersed information and produce structured output over thousands of tokens.",
        {
          table: {
            caption:
              "Long-context failure modes. A retrieval probe measures whether a single fact can be located; it does not measure whether dispersed facts can be reasoned over.",
            headers: ["Failure mode", "Description"],
            rows: [
              [
                "Lost evidence",
                "Relevant information is overlooked among distractors.",
              ],
              [
                "Position bias",
                "Material at the start and end is used more reliably than material in the middle.",
              ],
              [
                "Aggregation failure",
                "Individual facts are extracted correctly but combined incorrectly.",
              ],
              [
                "Instruction decay",
                "Constraints stated early are forgotten during long generation.",
              ],
              [
                "Context pollution",
                "Stale tool results, abandoned plans, and irrelevant documents interfere with current decisions.",
              ],
              [
                "Cost explosion",
                "Large prompts raise prefill latency, memory use, and input charges.",
              ],
            ],
          },
        },
        "Nominal per-token price is not total cost. Output tokens are frequently priced three to six times above input tokens, and reasoning workflows can generate large hidden or visible outputs. Tokenizer changes move cost without moving price: Anthropic notes that Claude Sonnet 5 uses a tokenizer that can produce about 30 percent more tokens for the same text than its predecessor, so an unchanged per-token rate still raises the cost of an equivalent request.",
        {
          table: {
            caption:
              "Nominal cost of one identical document-analysis request: 100,000 uncached input tokens and 5,000 output tokens. Computed from public prices on 22 July 2026, provider-reported. Excludes tools, long-context surcharges, caching, batch discounts, and tax. Quality is not held constant.",
            headers: ["Model", "Input cost", "Output cost", "Nominal total"],
            rows: [
              ["Claude Fable 5", "1.00 USD", "0.25 USD", "1.25 USD"],
              ["GPT-5.6 Sol", "0.50 USD", "0.15 USD", "0.65 USD"],
              ["Claude Opus 4.8", "0.50 USD", "0.125 USD", "0.625 USD"],
              ["Claude Sonnet 5", "0.30 USD", "0.075 USD", "0.375 USD"],
              ["GPT-5.6 Terra", "0.25 USD", "0.075 USD", "0.325 USD"],
              ["Grok 4.5", "0.20 USD", "0.03 USD", "0.23 USD"],
              ["GPT-5.6 Luna", "0.10 USD", "0.03 USD", "0.13 USD"],
              ["DeepSeek V4 Pro", "0.0435 USD", "0.00435 USD", "0.04785 USD"],
            ],
          },
        },
        {
          lead: "The decision-relevant quantity is cost per accepted task.",
          text: "A cheap model becomes expensive when it requires repeated prompts, long outputs, human correction, or escalation. A high-priced model can be economical when it succeeds on the first attempt and uses fewer tools and fewer tokens. An accepted task is one that passes a domain-specific quality check without manual correction beyond a defined tolerance, and the acceptance criterion must be stated wherever the figure is used.",
        },
      ],
    },
    {
      id: "energy",
      number: "07",
      title: "Energy and environmental performance",
      paragraphs: [
        "Training energy is a large, episodic expenditure. Inference energy is distributed across every production request. Neither is interpretable without a stated system boundary covering direct accelerator energy, host and network energy, facility overhead, embodied impacts, and water and grid effects. Two correctly computed figures for the same workload can differ by a large factor because they draw that boundary differently.",
        "Fernandez and colleagues evaluated inference across workloads, hardware, serving frameworks, batching, decoding strategies, and parallelism. They report that estimates derived from floating-point operation counts understate real energy use, and that appropriate combinations of optimisations reduced energy by as much as 73 percent against an unoptimised baseline. That is the strongest argument against attaching a single energy number to a model name: the same weights on the same hardware under two serving configurations are two different energy propositions.",
        "Oviedo and colleagues developed a bottom-up estimate for frontier-scale inference. Under stated H100 utilisation and power usage effectiveness assumptions, the median estimate was 0.34 watt-hours per representative query, with an interquartile range of 0.18 to 0.67 watt-hours. Raising token use by a factor of 15 for test-time scaling raised the median to 4.32 watt-hours, about 13 times higher. Combined model, serving, and hardware improvements were estimated to offer an 8 to 20 times efficiency opportunity. These are analytical estimates, not measurements of a named commercial service.",
        {
          lead: "Do not divide sector totals by a presumed query count.",
          text: "The International Energy Agency projects global data-centre electricity consumption reaching about 945 terawatt-hours in 2030 in its base case, roughly double the 2024 level, and reports that data-centre electricity demand grew 17 percent in 2025 with AI-focused facilities growing faster. That aggregate covers every data-centre workload, not AI queries alone, and utilisation patterns differ across them.",
        },
        {
          intro:
            "A credible energy disclosure identifies all of the following. A figure missing any of them is not comparable to another figure:",
          list: [
            "Model version and hardware",
            "Numerical precision",
            "Prompt and output length distributions",
            "Batch size and utilisation",
            "Serving software stack",
            "Power usage effectiveness",
            "Measurement or estimation method, and the measurement interval",
            "The quality threshold at which the work counts as useful",
          ],
        },
        "The central environmental variable is therefore not model size. It is the energy required to produce an accepted, useful result at the required service level. Energy spent on an output that fails a quality check is energy spent for nothing.",
      ],
    },
    {
      id: "selection",
      number: "08",
      title: "A selection framework",
      paragraphs: [
        "Selection starts from failure cost, not from capability. What a wrong answer costs sets the control posture, and the control posture constrains the candidate set before any benchmark is consulted.",
        {
          table: {
            caption:
              "Risk tiers and the minimum control posture each requires.",
            headers: ["Risk tier", "Examples", "Minimum control posture"],
            rows: [
              [
                "Low",
                "Drafting, brainstorming, rewriting",
                "Fast low-cost model, light validation",
              ],
              [
                "Moderate",
                "Internal summarisation, extraction, analytics assistance",
                "Schema validation, citations, sampled human review",
              ],
              [
                "High",
                "Public research, financial analysis, legal support, code deployment",
                "Strong model, source verification, tests, approvals",
              ],
              [
                "Critical",
                "Clinical decisions, autonomous transactions, safety systems",
                "Narrow validated system, expert oversight, formal governance",
              ],
            ],
          },
        },
        {
          intro:
            "The right system is frequently not a single model. Six architecture patterns recur:",
          list: [
            "Cascade: a small model handles easy cases and a frontier model handles escalations, for high-volume mixed-difficulty workloads.",
            "Router: a classifier selects model, tools, and reasoning budget, for multiple task types under a cost constraint.",
            "Generator and verifier: one model produces and another checks claims or execution, where error cost is high and outputs are verifiable.",
            "Retrieval-grounded: the model answers only from a controlled evidence set, for research, policy, legal, and enterprise knowledge.",
            "Human in the loop: a person approves uncertain or consequential actions, for high-stakes decisions and transactions.",
            "Local plus cloud: a private local model handles sensitive data and a cloud model handles de-identified hard tasks, under sovereignty and privacy constraints.",
          ],
        },
        {
          lead: "No model is selected on a published benchmark.",
          text: "The benchmark narrows the candidate set; a local evaluation selects. Define the task contract, build a representative evaluation set including adversarial and multilingual cases, hold prompts and tool access constant, measure end-to-end outcomes rather than single answers, inspect variance rather than the mean, and pin versions before every upgrade.",
        },
      ],
    },
    {
      id: "gaps",
      number: "09",
      title: "Research gaps and outlook",
      paragraphs: [
        {
          table: {
            caption:
              "Gaps that the current evidence base cannot close, and why each matters.",
            headers: ["Gap", "Why it matters"],
            rows: [
              [
                "Comparable energy disclosure",
                "Named commercial models rarely publish measured joules per token under a standardised workload.",
              ],
              [
                "Agent reliability",
                "Benchmarks do not capture multi-day workflows, changing environments, permissions, and recovery.",
              ],
              [
                "Evaluation contamination",
                "Public benchmarks become training targets and lose diagnostic value.",
              ],
              [
                "Effective long context",
                "Better tests are needed for dispersed reasoning, long outputs, memory, and context compaction.",
              ],
              [
                "Multilingual equity",
                "Tokenization, cost, accuracy, and safety remain uneven across languages and scripts.",
              ],
              [
                "Model updates",
                "Endpoint behaviour changes without a new public model name, defeating reproducibility.",
              ],
              [
                "Human baselines",
                "Human scores are measured under different time, tool, and incentive conditions than model scores.",
              ],
              [
                "Environmental systems accounting",
                "Embodied carbon, water, grid constraints, and rebound effects remain underreported.",
              ],
            ],
          },
        },
        "The likely near-term direction is adaptive systems that vary model size, reasoning budget, context, and tool use by task difficulty. That improves quality per unit of cost and energy while creating a new evaluation problem: the object being evaluated becomes a dynamic policy rather than a single model. Future benchmarks should report the complete resource budget, including hidden reasoning, retries, verification, and tool calls.",
        "Open-weight models will continue to narrow capability gaps while supporting sovereign and specialised deployments. Their advantage will depend less on raw benchmark parity than on the ability to optimise the full stack, including quantization, retrieval, domain fine-tuning, caching, and hardware. Hosted frontier models will retain advantages in integrated tools, rapid updates, and breadth, and buyers should demand stronger transparency and version stability in exchange.",
        {
          lead: "Conclusion.",
          text: "AI model selection should be treated as empirical engineering and governance, not brand preference. The right system is the least resource-intensive configuration that reliably meets the task contract and the risk threshold. This requires local evaluation, explicit evidence standards, controlled reasoning budgets, token and energy measurement, and continuous monitoring. Frontier capability is valuable, but unverified capability is not reliability.",
        },
      ],
    },
    {
      id: "scope",
      number: "10",
      title: "Scope and limitations",
      paragraphs: [
        "This is a structured narrative review rather than a formal meta-analysis. A meta-analysis would mislead, because benchmark definitions, model versions, prompts, inference budgets, and access conditions change faster than a stable pooled effect can be estimated. The review therefore reports ranges, mechanisms, and measurement cautions rather than forcing every model into a composite score.",
        "The unit of analysis is the deployed model system rather than the neural network alone. A deployed system may include a tokenizer, a routing layer, a hidden reasoning process, search, code execution, retrieval, prompt caching, safety classifiers, and agent orchestration. Two systems built on identical weights can differ in accuracy, latency, cost, and failure mode.",
        {
          lead: "Prices and rankings change without notice.",
          text: "Model aliases, context limits, hosted features, and price schedules in this review are accurate to the research cut-off of 22 July 2026 and should be rechecked before procurement or production deployment. Nothing here is legal, financial, or procurement advice.",
        },
        "The accompanying research repository carries the full source register, the extraction protocol, the JSON schemas, and the validation tooling that enforce these rules mechanically. Comparison tables there are generated from a machine-readable data layer rather than written by hand, so no figure can appear without a source behind it.",
      ],
    },
  ] as ReportSection[],

  citations: [
    {
      ref: "Stanford Institute for Human-Centered Artificial Intelligence (2026). AI Index Report 2026. Grade B.",
      url: "https://hai.stanford.edu/ai-index/2026-ai-index-report",
    },
    {
      ref: "Stanford Center for Research on Foundation Models (2026). HELM Capabilities. Grade A.",
      url: "https://crfm.stanford.edu/helm/capabilities/latest/",
    },
    {
      ref: "Stanford Center for Research on Foundation Models (2025). HELM Long Context. Grade A.",
      url: "https://crfm.stanford.edu/helm/long-context/latest/",
    },
    {
      ref: "Liang, P. and others (2022). Holistic evaluation of language models. arXiv:2211.09110. Grade B.",
      url: "https://arxiv.org/abs/2211.09110",
    },
    {
      ref: "Fernandez, J., Na, C., Tiwari, V., Bisk, Y., Luccioni, S. and Strubell, E. (2025). Energy considerations of large language model inference and efficiency optimizations. Proceedings of ACL 2025. Grade A.",
      url: "https://aclanthology.org/2025.acl-long.1563/",
    },
    {
      ref: "Oviedo, F., Kazhamiaka, F., Choukse, E., Kim, A., Luers, A., Nakagawa, M., Bianchini, R. and Lavista Ferres, J. M. (2026). Energy use of AI inference: efficiency pathways and test-time compute. Joule. Grade A.",
      url: "https://www.sciencedirect.com/science/article/pii/S2542435126001145",
    },
    {
      ref: "Wilhelm, P., Wittkopp, T. and Kao, O. (2025). Beyond test-time compute strategies: advocating energy-per-token in LLM inference. EuroMLSys 2025. Grade A.",
      url: "https://dl.acm.org/doi/10.1145/3721146.3721945",
    },
    {
      ref: "Jin, Y., Wei, G.-Y. and Brooks, D. (2025). The energy cost of reasoning: analyzing energy usage in LLMs with test-time compute. arXiv:2505.14733. Grade B.",
      url: "https://arxiv.org/abs/2505.14733",
    },
    {
      ref: "Fan, D., Delsad, S., Flammarion, N. and Andriushchenko, M. (2026). HalluHard: a hard multi-turn hallucination benchmark. arXiv:2602.01031. Grade B.",
      url: "https://arxiv.org/abs/2602.01031",
    },
    {
      ref: "NYU OSIRIS Lab (2026). LLM package hallucination research. Grade B.",
      url: "https://osiris.cyber.nyu.edu/research/",
    },
    {
      ref: "Google DeepMind (2024). FACTS Grounding: a benchmark for evaluating factuality. Grade B.",
      url: "https://deepmind.google/blog/facts-grounding-a-new-benchmark-for-evaluating-the-factuality-of-large-language-models/",
    },
    {
      ref: "Rando, S. and others (2025). LongCodeBench: evaluating coding LLMs at 1M context windows. arXiv:2505.07897. Grade B.",
      url: "https://arxiv.org/abs/2505.07897",
    },
    {
      ref: "Ye, X., Yin, F., He, Y., Zhang, J., Yen, H., Gao, T., Durrett, G. and Chen, D. (2025). LongProc: benchmarking long-context language models on long procedural generation. arXiv:2501.05414. Grade B.",
      url: "https://arxiv.org/abs/2501.05414",
    },
    {
      ref: "Asirvatham, H. and others (2026). GPT as a measurement tool. Harvard University. Grade B.",
      url: "https://shleifer.scholars.harvard.edu/sites/g/files/omnuum10626/files/2026-02/Paper%20PDF%20(February%202026).pdf",
    },
    {
      ref: "International Energy Agency (2025). Energy and AI: energy demand from AI. Grade B.",
      url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai",
    },
    {
      ref: "International Energy Agency (2026). Key questions on energy and AI. Grade B.",
      url: "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary",
    },
    {
      ref: "Anthropic (2026). Models overview and Claude Sonnet 5 pricing notes. Claude Platform Documentation. Grade B for commercial terms.",
      url: "https://platform.claude.com/docs/en/about-claude/models/overview",
    },
    {
      ref: "OpenAI (2026). GPT-5.6 model documentation. Grade B for commercial terms, Grade C for performance claims.",
      url: "https://developers.openai.com/api/docs/models",
    },
    {
      ref: "Google DeepMind (2026). Gemini 3.1 Pro, and the Gemini 3.1 Flash-Lite model card. Grade C for performance claims.",
      url: "https://deepmind.google/models/model-cards/gemini-3-1-flash-lite/",
    },
    {
      ref: "xAI (2026). Introducing Grok 4.5, and the Grok 4.5 model documentation. Grade C for performance claims.",
      url: "https://x.ai/news/grok-4-5",
    },
    {
      ref: "DeepSeek (2026). DeepSeek V4 preview release, and models and pricing. Grade B for architecture and commercial terms.",
      url: "https://api-docs.deepseek.com/quick_start/pricing/",
    },
    {
      ref: "Mistral AI (2026). Mistral Medium 3.5 and remote agents, and Introducing Mistral Small 4. Grade B.",
      url: "https://mistral.ai/news/mistral-small-4/",
    },
    {
      ref: "Meta (2025). The Llama 4 herd: natively multimodal open-weight models. Grade B.",
      url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/",
    },
    {
      ref: "Bench360 authors (2025). Bench360: benchmarking local LLM inference from 360 degrees. arXiv:2511.16682. Grade B.",
      url: "https://arxiv.org/abs/2511.16682",
    },
  ] as Citation[],

  // The published handbook, the interactive instrument, and the source
  // repository that carries the data layer and the validation tooling.
  liveUrl: "https://ethical-tech-colab.github.io/AI-Models-Research/interactive/",
  docsUrl: "https://ethical-tech-colab.github.io/AI-Models-Research/",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/AI-Models-Research",
};

export type { Citation, Paragraph, ReportSection };
