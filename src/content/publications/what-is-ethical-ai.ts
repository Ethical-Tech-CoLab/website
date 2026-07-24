// ─────────────────────────────────────────────────────────────────────────
// "What Is Ethical AI? Ethics, Ethical Technology, and Ethical International
// Relations for the Age of Intelligent Machines" — the Ethical Tech CoLab's
// foundational framing paper (July 2026). Transcribed from the source
// document. Rendered by src/app/publications/what-is-ethical-ai/page.tsx.
// Kept here so the page stays presentational, matching the site's content/
// convention.
//
// House style for these reports: no em dashes, no dash ranges, no inline
// bold. Emphasis is carried by the `lead` field, not by markup. The source
// paper follows those rules; keep them if you edit this file.
// ─────────────────────────────────────────────────────────────────────────

import type { Citation, Paragraph, ReportSection } from "./types";

export const whatIsEthicalAiReport = {
  eyebrow: "Publications · Academic paper",
  title: "What Is Ethical AI?",
  subtitle:
    "Ethics, Ethical Technology, and Ethical International Relations for the Age of Intelligent Machines",
  org: "Ethical Tech CoLab",
  advisor: "NYU Center for Global Affairs · in collaboration with Microsoft",
  date: "July 2026",
  authors:
    "Ethical Tech CoLab · NYU School of Professional Studies Center for Global Affairs, in collaboration with Microsoft. Master's Research · M.S. in Global Affairs.",
  repoUrl: "https://github.com/Ethical-Tech-CoLab/what-is-ethical-ai",
  // PDF slot is wired but not yet filled. Drop the designed PDF into the
  // repo at docs/pdf/What-Is-Ethical-AI-ETC-Report.pdf, then set this to
  // "https://ethical-tech-colab.github.io/what-is-ethical-ai/pdf/What-Is-Ethical-AI-ETC-Report.pdf"
  // and add the same string as `pdf` on this entry in src/content/site.ts.
  // Until then the download button is hidden rather than left to 404.
  pdfUrl: "",
  disclaimer:
    "The Ethical Tech CoLab is a research initiative of the NYU School of Professional Studies Center for Global Affairs, conducted in collaboration with Microsoft. Views and findings are those of the researchers and do not represent the official positions of New York University, Microsoft, or any partner institution. External programs cited are referenced as evidence, not as CoLab partnerships.",

  thesis:
    "What is ethics, and why did humanity invent it? What makes technology ethical, international relations ethical, and artificial intelligence ethical? This paper answers those questions in that order, on the conviction that the issue at the heart of artificial intelligence is power and that ethics is humanity's oldest and most tested answer to the problem of governing power. It traces ethics from its origins in the earliest civilizations through international affairs and human rights law to the responsible AI movement, the humanitarian sector, and the United Nations system, and closes with the motivation and research philosophy of the Ethical Tech CoLab.",

  // Figures pulled from the body for the hero stat band.
  stats: [
    {
      value: "4,000",
      label:
        "years of ethics: the paper reads AI not as a rupture but as the latest chapter in humanity's effort to govern power",
    },
    {
      value: "84",
      label:
        "AI ethics guidelines mapped by Jobin, Ienca, and Vayena, converging on five principles but diverging on how to apply them",
    },
    {
      value: "34.7%",
      label:
        "Gender Shades error rate misclassifying darker-skinned women, against 0.8% for lighter-skinned men",
    },
    {
      value: "118",
      label:
        "countries, overwhelmingly in the Global South, party to none of the major AI governance initiatives the UN surveyed",
    },
  ],

  sections: [
    {
      id: "executive-summary",
      number: "01",
      title: "Executive Summary",
      paragraphs: [
        `Humanity has repeatedly transformed itself through technological innovation. Fire, agriculture, metallurgy, writing, navigation, industrialization, electricity, nuclear energy, biotechnology, and digital computing each expanded human capability while simultaneously increasing humanity's capacity to cause harm. Every technological revolution therefore forced societies to develop new ethical frameworks capable of governing newly acquired power. Artificial intelligence represents the latest and perhaps most consequential chapter in this historical process. The ethical questions confronting AI are not unprecedented, because they concern the same enduring challenge that has shaped civilizations for millennia: how should power be exercised responsibly? The issue is power. Ethics is the answer.`,
        `This paper deliberately resists the convention, common in the AI ethics literature, of opening with principles such as fairness, transparency, and accountability. Principles detached from their foundations are easily reduced to slogans, and slogans are easily captured by the institutions they are meant to constrain. The paper therefore begins with prior questions. Section 2 frames the oldest of them, humanity's relationship with power, the paradox by which every expansion of capability has expanded the capacity for harm. Sections 3 through 5 ask what ethics is, why human beings created it, and how it evolved from local custom into universal human rights. Section 6 asks what ethical international relations means, drawing on the Carnegie Council's framework of ethical realism and structured ethical deliberation. Section 7 asks what makes technology ethical, and Section 8 arrives, on that foundation, at the question that titles the paper: what is ethical AI?`,
        `The answer defended throughout is institutional rather than technical. Ethical AI is not a product feature. It is artificial intelligence whose entire lifecycle remains accountable to ethical deliberation, to human rights as a floor, to the do no harm obligation, and to the inclusive participation of those the technology affects. No system is ethical in itself; systems are made ethical, or fail to be, by the institutions that govern them.`,
        `The second half of the paper tests that answer where the stakes are highest. Section 9 traces the rise of the responsible AI movement through its three acts of principles, reckoning, and operationalization. Sections 10 and 11 turn to humanitarian action, tracing the evolution of AI in humanitarian work from the crisis mapping of 2008 to the generative systems of 2026, and showing why humanitarian AI is fundamentally different from commercial AI: consent collapses, experimentation finds the least protected subjects, accountability runs to people with no vote and no purchase, and the cost of failure is measured in lives. Sections 12 through 14 supply the governance context: the geopolitics of AI regulation, the human rights foundations that predate the technology, and the United Nations system's evolving approach, which in 2026 produced the first report of the Independent International Scientific Panel on AI and the first Global Dialogue on AI Governance in Geneva.`,
        `Section 15 presents the Ethical Tech CoLab, whose portfolio, from civilian evacuation models to a forced labour risk index, puts the paper's argument into practice, and Section 16 concludes. The paper is written for policymakers, humanitarian practitioners, donors, and researchers rather than AI engineers, in the conviction that the disciplines it draws together, philosophy, ethics, international affairs, humanitarian ethics, digital ethics, and responsible innovation, are not six literatures but one conversation. Societies do not flourish because they possess increasingly powerful tools. They flourish because they develop increasingly trustworthy ways of governing them.`,
      ],
    },
    {
      id: "power",
      number: "02",
      title: "Humanity's Relationship with Power",
      paragraphs: [
        {
          lead: "The paradox of capability.",
          text: `The history of civilization is not merely the history of technological innovation. It is the history of humanity learning to govern increasingly powerful forms of power. Human beings possess a remarkable capacity to create tools that extend their abilities beyond natural biological limits. Fire transformed survival. Agriculture transformed settlement. Writing transformed memory. Navigation transformed geography. Industrial machinery transformed production. Nuclear physics transformed warfare and medicine. Artificial intelligence now promises to transform decision making itself. Each of these revolutions increased humanity's ability to reshape the world, and every expansion of capability simultaneously increased humanity's capacity to cause harm.`,
        },
        `Power itself is the oldest subject of social thought. Max Weber defined it as the probability that an actor within a social relationship will be in a position to carry out his own will despite resistance, a definition that fits an algorithm allocating aid as readily as a sovereign commanding subjects. Bertrand Russell went further, arguing that power is the fundamental concept in social science, in the same sense in which energy is the fundamental concept in physics. And Lord Acton supplied the warning that every constitutional tradition has since repeated: power tends to corrupt, and absolute power corrupts absolutely. Read together, these three claims frame the problem this paper addresses. Power is universal, power is the currency of social life, and power unrestrained degrades the one who holds it and endangers everyone subject to it.`,
        `History therefore reveals a recurring pattern. Technological innovation alone has never guaranteed human progress. Every major expansion of human capability has required a corresponding expansion of humanity's ethical, legal, and political institutions. Writing required legal systems. Commerce required contracts. Industrialization generated unprecedented prosperity while requiring labor protections, environmental regulation, and public health institutions. Nuclear physics transformed medicine while necessitating international non proliferation regimes. Without such institutions, technological power becomes detached from moral responsibility, and societies confront crises of legitimacy, injustice, and instability.`,
        `Artificial intelligence is the latest expression of this enduring dynamic. Its ethical significance lies not in its novelty but in the type of power it creates. AI increasingly participates in decisions concerning healthcare, education, employment, humanitarian assistance, migration, policing, financial services, and national security, and in doing so it redistributes authority between human institutions and computational systems. The fundamental question is therefore not whether AI is intelligent, but whether societies possess institutions capable of governing this new concentration of power responsibly. Ethics is not an external constraint imposed on innovation after the fact. It is the normative architecture through which societies determine how newly acquired forms of power should be exercised.`,
      ],
    },
    {
      id: "what-is-ethics",
      number: "03",
      title: "What Is Ethics?",
      paragraphs: [
        `Few concepts have shaped human civilization more profoundly than ethics, yet few are as frequently invoked without careful definition. Governments invoke ethics when justifying interventions or humanitarian assistance; corporations establish ethics committees; international organizations describe ethical obligations toward refugees and future generations. Despite its ubiquity, the term is often reduced to a synonym for compliance, legality, or professional conduct.`,
        `At its most fundamental level, ethics is the systematic study of how human beings ought to act, what values should guide individual and collective behavior, and how competing moral claims should be evaluated. The Carnegie Council for Ethics in International Affairs puts the point plainly: ethics is about how things ought to be, not simply how things are or are likely to be, and it forces us to look beyond our own immediate interests to consider the interests of others. Its president Joel Rosenthal describes ethics as making the effort to evaluate competing points of view and then truly caring about the impact of the choices you have made, adding that ethics is not some cure-all for the world's problems, but it is an actual process for finding solutions. Ethics, on this understanding, is not a fixed doctrine but a disciplined practice of judgment.`,
        {
          lead: "Ethics and morality.",
          text: `The word originates from the ancient Greek ethos, referring to character, custom, and habitual ways of living. Aristotle used the concept to describe the cultivation of virtues that enable individuals to flourish within a political community. Scholarship often distinguishes ethics from morality: morality generally refers to the beliefs, norms, and practices that characterize a particular community, while ethics represents the critical examination of those beliefs. As the anthropologist James Laidlaw observes, the study of ethics concerns not only the moral rules a society enforces but the ways people consciously deliberate about how they ought to live. This is why ethical inquiry frequently challenges existing arrangements: slavery, colonial domination, racial segregation, and child labor were all questioned and ultimately rejected through ethical reasoning that appealed to principles beyond inherited custom.`,
        },
        {
          lead: "Ethics, law, and power.",
          text: `Ethics should not be confused with law. Apartheid in South Africa and the Nuremberg Laws in Nazi Germany were legally enforceable while violating principles now recognized as universal human rights. Conversely, many ethical obligations exceed legal requirements. Ethical questions emerge wherever human beings exercise power over one another, operating at several levels at once: the decisions of individuals, the conduct of organizations, and the behavior of states and international institutions. Technological capability alone offers no guidance as to whether a given application advances justice, respects human dignity, or contributes to the common good. Ethics is the bridge between human capability and human responsibility.`,
        },
      ],
    },
    {
      id: "why-ethics",
      number: "04",
      title: "Why Humanity Created Ethics",
      paragraphs: [
        `One persistent misconception is the belief that moral philosophy began as an intellectual exercise conducted by ancient philosophers seeking abstract truths. While philosophers transformed ethics into a systematic field of inquiry, ethical behavior itself predates philosophy by thousands of years. Ethics emerged not because human beings suddenly became virtuous, but because societies discovered that power without restraint ultimately destroys the communities upon which power itself depends. Michael Tomasello's research on the natural history of human morality argues that distinctively human moral psychology, including the sense of fairness, obligation, and shared commitment, arose from the demands of interdependent cooperation. Ethical norms reduced uncertainty in human interaction long before economists developed the vocabulary of transaction costs.`,
        {
          lead: "The earliest ethical systems.",
          text: `The earliest documented normative systems make the connection between ethics and the governance of power explicit. In ancient Egypt, the principle of Maat, embodying truth, justice, balance, and reciprocity, served as the foundation upon which political authority derived its legitimacy. In Mesopotamia, the Code of Hammurabi justified its standards in terms that remain strikingly modern: the laws existed, its prologue declares, so that the strong might not injure the weak. The transition from unwritten custom to publicly accessible legal standards anticipated a principle central to contemporary technology governance. Citizens cannot comply with secret laws, and individuals cannot meaningfully contest algorithmic decisions whose logic remains opaque. The modern demand for explainable artificial intelligence reflects a very old ethical commitment to public accountability. In China, Confucius articulated an ethics of cultivated relationships centered on ren, or humaneness, in which those who hold power bear heightened responsibilities.`,
        },
        `Political philosophy generalized these insights. Thomas Hobbes argued that without commonly accepted rules, human societies risk descending into perpetual conflict. Locke, Rousseau, and Kant increasingly linked political legitimacy to the protection of rights rather than to coercive power alone. Modern institutional economics reaches a similar conclusion: Douglass North demonstrated that long term prosperity depends upon institutions capable of generating trust and credible commitments, and Elinor Ostrom showed empirically that communities can govern shared resources sustainably when they develop norms of reciprocity, monitoring, and accountability. Ethics, on this view, functions as institutional infrastructure.`,
        `The humanitarian sector illustrates the relationship with particular clarity. Humanitarian organizations frequently operate where formal state institutions have weakened or collapsed, and the principles of humanity, impartiality, neutrality, and independence generate the trust on which humanitarian access depends. Artificial intelligence introduces a comparable challenge. Refugees cannot audit the machine learning models that help determine assistance eligibility, and displaced families cannot meaningfully contest automated decisions influencing access to shelter or protection. As throughout history, trust cannot be engineered; it must be earned by legitimate institutions operating under shared ethical principles.`,
      ],
    },
    {
      id: "universal-ethics",
      number: "05",
      title: "From Custom to Universal Ethics",
      paragraphs: [
        `The history of ethics is, in many respects, the history of an expanding moral community. Early societies focused their strongest obligations on those with whom individuals shared kinship, language, territory, or faith. As societies became larger and more interconnected, ethical thought expanded with them. Peter Singer describes this trajectory as the expanding circle of moral concern, in which the reach of ethical consideration widens from family to tribe, from tribe to nation, and from nation toward humanity as a whole. Kwame Anthony Appiah frames the same process as an ongoing cosmopolitan conversation across difference, and Martha Nussbaum argues that ethical reasoning challenges individuals to regard themselves as citizens of a wider human community whose dignity deserves equal consideration.`,
        `The catastrophes of the twentieth century converted this philosophical trajectory into institutional fact. The Holocaust demonstrated that legality and prevailing social morality could become instruments of profound injustice when detached from broader commitments to human dignity. The adoption of the Universal Declaration of Human Rights in 1948 marked the decisive turn: its first article declares that all human beings are born free and equal in dignity and rights, establishing dignity rather than citizenship as the normative foundation of international order.`,
        {
          lead: "Universalism without uniformity.",
          text: `Universal ethics does not imply ethical uniformity. Core principles such as protection from torture and recognition of equal dignity apply everywhere, while their practical expression legitimately varies across societies. UNESCO's Recommendation on the Ethics of Artificial Intelligence adopts precisely this position, grounding AI governance in universal human rights commitments while recognizing the importance of cultural diversity, linguistic plurality, and local participation.`,
        },
        `Artificial intelligence intensifies this old tension in a new form. Algorithmic systems are typically developed within particular social, linguistic, and economic contexts before being deployed globally, and they may encode the assumptions of the societies that built them. Research on algorithmic fairness has demonstrated that models trained primarily on data from wealthy, highly connected populations frequently perform worse for marginalized communities and underrepresented languages. A technically sophisticated system that systematically disadvantages displaced populations or excludes minority languages may satisfy engineering benchmarks while failing the standards on which humanitarian action itself is founded.`,
      ],
    },
    {
      id: "ethical-ir",
      number: "06",
      title: "What Is Ethical International Relations?",
      paragraphs: [
        `International affairs pose the hardest case for ethics, because they are the arena in which power is least constrained. Two extreme views have long competed. Realism, in its strongest version, holds that states pursue power and narrowly defined self interest, and that ethics has little to contribute; Henry Kissinger captured its spirit in the warning that a country that demands moral perfection in its foreign policy will achieve neither perfection nor security. Idealism holds that what matters is adherence to principles and international law, in the lineage of Kant's proposal for a federation of states in Perpetual Peace. Each view captures something real, and each is insufficient on its own.`,
        {
          lead: "Ethical realism.",
          text: `The Carnegie Council's answer, and the orientation this paper adopts, is ethical realism: a view of morality in global politics that takes seriously both the role of ethics and the nature of power. Hans Morgenthau, the founder of modern realism, framed the choice not between moral principles and the national interest devoid of moral dignity, but between one set of moral principles divorced from political reality and another set of moral principles derived from political reality. Ethical realism refuses both the cynicism that treats ethics as decoration and the utopianism that ignores power. It asks what the most ethical policy is that is also possible.`,
        },
        `Ethical realism operates through a structured process of ethical deliberation: identifying goals, finding means to satisfy them, and assessing and revising both against standards, values, principles, duties, and rights, then running the cycle from problem through choice and action to reflection and the taking of responsibility. Two features deserve emphasis. First, deliberation is pluralistic. The main Western frameworks, consequentialism, virtue ethics, and rights or duty based ethics, each illuminate a different aspect of a decision, and solving real problems may require drawing on each without endorsing any single one as uniquely correct. Second, deliberation is inclusive. It is best done with others, especially those most affected, because on our own we cannot see the full picture and we tend to be biased toward decisions that benefit us. These two commitments, pluralism and inclusion, are the methodological core of what the CoLab means by ethical technology.`,
      ],
    },
    {
      id: "ethical-tech",
      number: "07",
      title: "What Is Ethical Tech?",
      paragraphs: [
        `Before the question of ethical AI can be answered, a broader one deserves a direct answer: what makes technology ethical? The founding insight of the scholarly tradition is that technologies are not neutral instruments whose moral character depends entirely on their users. Langdon Winner's classic essay asked whether artifacts have politics and answered that they do: the design of a bridge, a machine, or a system can embody and enforce social arrangements, settling questions of power before any user makes a choice. James Moor, founding the field of computer ethics, observed that computing creates policy vacuums, situations in which technology confers new capabilities faster than societies can form rules for their use, and that filling those vacuums is a conceptual and ethical task, not a technical one. Technology is, in this sense, frozen judgment.`,
        {
          lead: "Value sensitive design and responsible innovation.",
          text: `Two research programs give ethical technology operational content. Value sensitive design, developed by Batya Friedman and colleagues, provides a method for identifying the stakeholders of a system, direct and indirect, surfacing the values at stake, and building those values into the design rather than auditing for them afterward. The responsible research and innovation literature, associated with Jack Stilgoe, Richard Owen, and Phillip Macnaghten, adds four commitments any innovating institution can be held to: anticipation of plausible harms, reflexivity about the innovator's own assumptions, inclusion of affected publics, and responsiveness, the demonstrated capacity to change course when evidence demands it. These frameworks establish that the ethics of a technology is decided in its governance, upstream in design and downstream in oversight, and not in its marketing.`,
        },
        `This is the sense in which the CoLab uses the term ethical tech. It does not name a category of inherently benign products. It names a practice: choosing problems by the harm they address rather than the market they open, designing with the affected rather than for them, embedding safeguards as constraints rather than aspirations, and accepting accountability structures with the power to stop a build. The definition of ethical AI developed next is a special case of this practice.`,
      ],
    },
    {
      id: "what-is-ethical-ai",
      number: "08",
      title: "What Is Ethical AI?",
      paragraphs: [
        {
          lead: "A definition.",
          text: `With these foundations in place, the question that titles this paper can be answered without slogans. Ethical AI is not a product feature, a compliance checkbox, or a marketing claim. It is artificial intelligence whose entire lifecycle, from problem selection and data collection through design, deployment, and retirement, remains accountable to ethical deliberation: to human rights as a floor, to the humanitarian principle of doing no harm, and to the inclusive participation of those the technology affects. On this definition, no system is ethical in itself. Systems are made ethical, or fail to be, by the institutions that govern them.`,
        },
        `The field's own history supports this institutional definition. When Anna Jobin, Marcello Ienca, and Effy Vayena mapped eighty four AI ethics guidelines published worldwide, they found an apparent global convergence around five principles, transparency, justice and fairness, non maleficence, responsibility, and privacy, but substantive divergence over how those principles were interpreted, why they mattered, to whom they applied, and how they should be implemented. They also documented the near absence of the Global South from the production of the guidelines themselves. Luciano Floridi and Josh Cowls proposed that the recurring principles map closely onto the classical principles of bioethics, beneficence, non maleficence, autonomy, and justice, with one addition specific to AI: explicability, the requirement that systems be intelligible and that someone be answerable for them.`,
        `The limits of principles became apparent almost immediately. Brent Mittelstadt's critique observed that AI development lacks precisely what makes principlism work in medicine: common aims and fiduciary duties, professional norms, proven methods to translate principles into practice, and robust accountability mechanisms. A principle that no profession is bound to, no method operationalizes, and no institution enforces is an aspiration, not a governance instrument. This is why the intergovernmental instruments matter. The OECD AI Principles, the IEEE's Ethically Aligned Design, and UNESCO's Recommendation do not invent new moral values for the digital age. They translate enduring ethical principles into practical guidance, which is exactly what ethics has done at every previous technological transition.`,
        {
          lead: "Accuracy is not ethics.",
          text: `One further clarification completes the definition. Ethical AI is frequently conflated with accurate AI, as though sufficient technical performance would resolve the ethical questions. It would not. A perfectly accurate system pursuing an unethical objective remains unethical, and efficiency without legitimacy may strengthen injustice rather than reduce it. The question ethics asks of an AI system is the one the deliberative framework asks of any policy: not only whether the means work, but whether the ends are justified, and whether the relationship between ends and means respects the dignity of those affected.`,
        },
      ],
    },
    {
      id: "responsible-ai",
      number: "09",
      title: "The Rise of Responsible AI",
      paragraphs: [
        `The movement now called responsible AI emerged in three acts, and each act refined the answer to what ethical AI requires. The first act was the age of principles. Between roughly 2016 and 2019, ethics codes issued from every quarter: the Asilomar AI Principles from the research community, which declared that the goal of AI research should be to create not undirected intelligence but beneficial intelligence; the Montreal Declaration, distinctive for its methodology of citizen deliberation; the IEEE's engineering framework; and the OECD Principles. The proliferation itself was evidence of sincerity, but also of fragmentation.`,
        {
          intro:
            "The first act left behind a canon. Ten resources remain the standard references for any institution building an AI ethics framework, each contributing something distinct:",
          list: [
            "IEEE Ethically Aligned Design, the engineering profession's handbook, which seeded the P7000 series of technical standards.",
            "The EU Ethics Guidelines for Trustworthy AI, which defined trustworthy AI as lawful, ethical, and robust and set out seven requirements that shaped the EU AI Act.",
            "The Montreal Declaration, whose ten principles emerged from an extended public deliberation with citizens.",
            "The Asilomar AI Principles, twenty three principles framing the goal of the field as beneficial rather than merely capable intelligence.",
            "The Partnership on AI Tenets, committing technology companies and civil society to safety, fairness, transparency, and accountability.",
            "The OECD AI Principles, the first intergovernmental AI standard and the reference point for national policy.",
            "The Toronto Declaration, the human rights community's entry, applying equality and non discrimination law to machine learning.",
            "The AI Now Institute's research program, which pressed the field on accountability, labor, and bias, and popularized algorithmic impact assessments.",
            "The FAT/ML Principles for Accountable Algorithms, five commitments addressed to the developers who build the systems.",
            "The Berkman Klein Center's Principled Artificial Intelligence, mapping thirty six prominent documents into eight recurring themes.",
          ],
        },
        `Read as a set, the ten resources trace the same arc as this paper: from professional self regulation through public deliberation and intergovernmental standards to human rights law, and from principles addressed to institutions toward instruments usable by the practitioners who build and the communities who bear the consequences.`,
        {
          lead: "The reckoning.",
          text: `The second act was the reckoning, and its evidence was empirical. Joy Buolamwini and Timnit Gebru's Gender Shades study demonstrated that commercial facial analysis systems misclassified darker skinned women at error rates approaching 34.7 percent while the maximum error rate for lighter skinned men was 0.8 percent, a single result that legitimized the independent algorithmic audit as a discipline. Safiya Umoja Noble showed how search algorithms reinforce racism through technological redlining. Ruha Benjamin diagnosed the New Jim Code, discriminatory design that encodes inequity while appearing benevolent. Kate Crawford's Atlas of AI reframed the technology as an extractive industry whose costs in minerals, labor, and data fall far from its beneficiaries. And Elettra Bietti named ethics washing, the instrumental use of ethics language by industry to forestall binding regulation.`,
        },
        `The third act was operationalization. The critique produced tools: model cards for standardized reporting, datasheets for datasets, and end to end internal audit frameworks adapted from aerospace and finance. It then produced institutions. The United States National Institute of Standards and Technology released its AI Risk Management Framework in January 2023, organizing practice into four functions, govern, map, measure, and manage. ISO and IEC published ISO/IEC 42001 in December 2023, the first certifiable AI management system standard. From late 2023 the center of gravity shifted from fairness in deployed systems to safety in frontier models: the Bletchley Declaration, signed by twenty eight countries and the European Union, acknowledged the potential for catastrophic harm, and the International AI Safety Report chaired by Yoshua Bengio became the scientific reference of the safety era. The humanitarian reading of this decade is the one on which its sharpest critics converge: principles without accountability structures protect institutions, not people.`,
      ],
    },
    {
      id: "humanitarian-history",
      number: "10",
      title: "The Historical Evolution of AI in Humanitarian Work",
      paragraphs: [
        `The story of AI in humanitarian action does not begin with algorithms but with people. In the aftermath of Kenya's disputed 2008 election, a small group of technologists built Ushahidi, a platform for crowdsourcing reports of violence by text message and web. When a magnitude 7.0 earthquake devastated Haiti in 2010, volunteers around the world adapted the same model to map urgent needs in near real time, while Mission 4636 mobilized thousands of Kreyol speaking diaspora volunteers to translate and triage tens of thousands of text messages from survivors. Patrick Meier chronicled this era of digital humanitarians. Crucially, these early systems were hybrids of human and machine intelligence: the human computation of volunteer translators became the training substrate for early natural language processing tools in crisis response. The artificial intelligence of the humanitarian sector was built on the labor and knowledge of affected communities from the start.`,
        {
          lead: "Institutionalization and prediction.",
          text: `In 2009 the UN Secretary General launched Global Pulse, premised on the idea that the digital traces of mobile phone use could provide real time insight into human wellbeing. By the mid 2010s, operational machine learning had arrived. The World Food Programme's HungerMap LIVE began nowcasting food insecurity across dozens of countries from mobile surveys, satellite imagery, and market data. The World Bank's Famine Action Mechanism linked machine learning famine prediction to pre arranged financing. OCHA's Centre for Humanitarian Data built a peer review framework for predictive analytics that allowed the UN's Central Emergency Response Fund to release money before forecasted floods struck Bangladesh in 2020.`,
        },
        {
          lead: "Identification and biometrics.",
          text: `Alongside prediction came identification. UNHCR had experimented with iris scan registration of Afghan returnees as early as 2002, and by the late 2010s biometric registration had become standard infrastructure across UNHCR and WFP operations. In Jordan's Azraq and Zaatari camps, WFP's Building Blocks system coupled iris scan authentication to a permissioned blockchain, allowing refugees to buy groceries with a glance. These systems, celebrated by their builders as efficient and fraud resistant, would become the focal point of the sector's fiercest ethical controversies.`,
        },
        `The generative era arrived abruptly. The most rigorous published evaluation to date, the Signpost AI pilot led by the International Rescue Committee across four countries, tested a large language model information assistant for refugees and migrants: response quality improved and moderator handling time for complex queries fell from as much as twenty five minutes to under five, but roughly fifteen percent of responses could not be rated safe, leading the evaluators to conclude that the tool is not safe without a human in the loop. Three features of this history deserve emphasis. First, the arc runs from participation toward prediction and automation, progressively distancing affected people from the systems that decide about them. Second, each wave arrived with private sector partners. Third, governance consistently lagged deployment.`,
      ],
    },
    {
      id: "humanitarian-difference",
      number: "11",
      title: "Why Humanitarian AI Is Fundamentally Different",
      paragraphs: [
        `It is tempting to treat humanitarian AI as commercial AI with a nobler mission statement. That view is mistaken, and the difference is structural rather than rhetorical. It begins with the humanitarian principles of humanity, neutrality, impartiality, and independence, which are not aspirational values but operational commitments on which access to conflict zones, the trust of affected communities, and the safety of aid workers depend. As the ICRC's Pierrick Devidal argues, the reflex that if technology can help it should be used risks quietly subordinating those principles to innovation logics imported from the commercial world.`,
        {
          lead: "Consent and power.",
          text: `The deepest difference concerns consent and power. Commercial AI at least nominally rests on user agreement. In humanitarian settings even that fiction collapses. A person who must submit to iris scanning to feed her children has not consented in any meaningful sense; she has complied. Mark Latonero named this dynamic surveillance humanitarianism, the enormous data collection systems deployed by aid organizations that inadvertently increase the vulnerability of people in urgent need, writing in the wake of the 2019 standoff in Yemen, where WFP suspended aid amid a dispute over biometric registration. The ICRC's own Handbook on Data Protection in Humanitarian Action concedes that consent is frequently an unusable legal basis in displacement contexts.`,
        },
        {
          lead: "Humanitarian experimentation.",
          text: `A second structural difference is the asymmetry of experimentation. Kristin Bergtora Sandvik, Katja Lindskov Jacobsen, and Sean Martin McDonald have developed a taxonomy of humanitarian experimentation, showing how untested technologies are routinely piloted on crisis affected populations without the ethics infrastructure that governs experimentation elsewhere: there is a stark ethical and practical difference between managing risk and introducing it. Mirca Madianou presses the critique further with the concept of technocolonialism, arguing that digital innovation and data practices in aid rework colonial relationships of extraction, with affected people's data generating value for agencies, states, and technology firms while the risks remain with the data subjects.`,
        },
        `Third, the accountability geometry is inverted. A commercial firm answers, however imperfectly, to customers, shareholders, and regulators. A humanitarian organization's primary obligation runs to affected populations who are neither customers nor voters, who often cannot see the algorithm that ranked their vulnerability, and who typically have no avenue of redress. This is why the sector's own standards center the do no harm obligation rather than product liability, and why scholars conclude that human rights law, not voluntary ethics, must govern humanitarian AI across its lifecycle. Finally, the cost of failure is categorically different. A mistargeted advertisement wastes attention; a mistargeted famine forecast, a false fraud flag on a food ration, or a leaked refugee database can cost lives. The ICRC's 2024 institutional AI policy codifies the resulting posture: a precautionary approach that permits deployment only with evidence of positive impact, mandates human oversight, and preserves non digital alternatives.`,
      ],
    },
    {
      id: "international-affairs",
      number: "12",
      title: "The International Affairs Context",
      paragraphs: [
        `Humanitarian AI does not unfold in a geopolitical vacuum. The technologies aid agencies adopt, the rules that constrain them, and the funding that sustains them are all shaped by a contest among what Anu Bradford calls the three digital empires: the American market driven model, the Chinese state driven model, and the European rights driven model. The European Union struck first: the EU Artificial Intelligence Act, in force since August 2024, establishes the world's first horizontal, risk based AI regime, prohibiting practices such as social scoring outright and designating migration and asylum management as high risk, a category of direct humanitarian relevance. The Council of Europe's Framework Convention on Artificial Intelligence, the first legally binding international AI treaty, extends the rights based model into international law.`,
        {
          lead: "The geopolitics of competition.",
          text: `Against this regulatory current runs the geopolitics of competition. The United States' October 2022 semiconductor export controls marked, in Gregory Allen's phrase, a strategy of choking off China's access to the future of AI. Scholars of compute governance argue that computing power has become the most governable input to AI, detectable, excludable, and concentrated in a narrow supply chain, making chips the decisive lever of AI policy. Paul Scharre frames the resulting contest as a struggle across four battlegrounds: data, compute, talent, and institutions.`,
        },
        `The multilateral response has been real but fragile. The Bletchley Declaration of November 2023 achieved a joint acknowledgment by the United States, China, the European Union, and twenty five other states that frontier AI carries the potential for catastrophic harm. By the Paris AI Action Summit of February 2025, the consensus had visibly fractured: the United States and the United Kingdom declined to sign the summit statement, and the framing shifted from safety to action and innovation. The UN's High level Advisory Body quantified the exclusion built into this landscape: only seven countries were parties to all of the major AI governance initiatives it surveyed, while 118 countries, overwhelmingly in the Global South, were parties to none.`,
        `War has sharpened every one of these debates. The ICRC has called on states to adopt new legally binding rules on autonomous weapon systems. Reports that an AI decision support system known as Lavender was used to generate targeting recommendations in Gaza have produced the first sustained legal scholarship on AI assisted targeting under international humanitarian law. For the humanitarian sector the conclusion is sobering. The rules governing AI are being written by and for the powerful, in fora where affected populations, and often the states that host them, have no seat. Humanitarian AI governance must therefore be understood as, among other things, a project of representation: an attempt to force the interests of the excluded into rooms where they are otherwise absent.`,
      ],
    },
    {
      id: "human-rights",
      number: "13",
      title: "Human Rights Foundations",
      paragraphs: [
        `If the geopolitics of AI is a story of fragmentation, human rights law offers the opposite: a nearly universal, binding normative floor that predates the technology and does not need to be reinvented for it. The Universal Declaration of Human Rights, the International Covenant on Civil and Political Rights, and the International Covenant on Economic, Social and Cultural Rights already guarantee privacy, non discrimination, social security, food, and health, every one of which is implicated when an algorithm allocates aid, flags an asylum claim, or scores vulnerability.`,
        {
          lead: "The UN machinery.",
          text: `The UN human rights machinery grasped this early. Philip Alston's 2019 report as Special Rapporteur on extreme poverty remains the canonical warning: examining the digitization of welfare systems, he described private vendors operating in a human rights free zone and cautioned against the grave risk of stumbling, zombie-like, into a digital welfare dystopia. A year later, E. Tendayi Achiume delivered the first systematic UN analysis of how emerging digital technologies produce structurally racialized outcomes: technology is not neutral or objective, she wrote, it is fundamentally shaped by the inequalities prevalent in society, and typically makes these inequalities worse. The Office of the High Commissioner for Human Rights went further in 2021, calling for a moratorium on AI systems that pose serious risks to human rights until adequate safeguards are in place.`,
        },
        `Scholars have built a rigorous framework on this foundation. Lorna McGregor, Daragh Murray, and Vivian Ng argue that international human rights law supplies what scattered AI ethics cannot: an end to end accountability framework spanning the full algorithmic lifecycle. The human rights approach has honest internal critics. Nathalie Smuha warns that human rights are a necessary floor but not a sufficient ceiling: without concretizing legislation, enforcement capacity, and supporting societal infrastructure, any human rights based framework risks falling short. The point is precisely why the humanitarian sector matters. Humanitarian organizations cannot wait for enforcement infrastructure to mature; they operate today, in jurisdictions where none exists. For them, the human rights framework functions less as enforceable law than as professional ethic and design constraint.`,
      ],
    },
    {
      id: "un-system",
      number: "14",
      title: "The UN System's Evolving Approach to AI",
      paragraphs: [
        `The United Nations came to AI along two tracks, using it and governing it, and the story of the past decade is the gradual convergence of the two. On the usage track, Global Pulse made the UN an early adopter of big data analytics; the ITU's AI for Good Global Summit became the system's flagship platform; and individual agencies developed their own instruments, from UNICEF's policy guidance on AI for children to UNHCR's rights based AI approach and WFP's system wide AI principles. On the governance track, the High level Panel on Digital Cooperation delivered The Age of Digital Interdependence in 2019, the Secretary General's Roadmap committed the UN to trustworthy, human rights based, safe, and sustainable AI, UNESCO's Recommendation became the first global normative instrument on AI ethics in 2021, and in 2022 the UN bound its own operations to ten Principles for the Ethical Use of Artificial Intelligence in the United Nations System.`,
        {
          lead: "The political breakthrough.",
          text: `In March 2024 the General Assembly adopted by consensus its first resolution on AI, led by the United States with more than 120 co sponsors, linking safe, secure, and trustworthy AI to sustainable development. In July 2024 a resolution led by China, likewise adopted by consensus, addressed AI capacity building for developing countries. The twin resolutions displayed a distinctive dynamic: strategic rivals competing for normative leadership through consensus rather than against it. The Secretary General's High level Advisory Body supplied the synthesis in Governing AI for Humanity, diagnosing the deficit bluntly: no global framework exists to govern AI, and with its development in the hands of a few multinational companies in a few countries, the impacts risk being imposed on most people without their having any say. The Global Digital Compact translated diagnosis into commitment, creating an Independent International Scientific Panel on AI and a Global Dialogue on AI Governance.`,
        },
        `Resolution 79/325 of August 2025 gave both mechanisms their terms of reference, and 2026 brought them to life. A forty member panel drawn from all five UN regions, selected from more than 2,600 applications, held its inaugural meeting in March 2026 and elected Yoshua Bengio and Maria Ressa as co chairs. Its first annual report appeared on 1 July 2026, and the first Global Dialogue on AI Governance convened in Geneva the following week. The safety discourse born at Bletchley has migrated into the UN system, where it now shares a room with the development, human rights, and humanitarian agendas. As Secretary General Guterres framed the stakes, a world of AI haves and have-nots would be a world of perpetual instability. The UN's approach remains more scaffolding than edifice: the Scientific Panel assesses but does not regulate, and the Global Dialogue convenes but does not bind. Yet for the first time the institutions that coordinate humanitarian response, the norms that protect human rights, and the fora that govern AI sit within a single system.`,
      ],
    },
    {
      id: "colab",
      number: "15",
      title: "The Ethical Tech CoLab",
      paragraphs: [
        `The Ethical Tech CoLab is a research initiative of New York University's School of Professional Studies Center for Global Affairs, conducted in collaboration with Microsoft from 2024 to 2026. Its mission is to explore intervention opportunities at the intersection of emerging technologies and the human condition. Its founding observation is the one with which this paper began. The problem is power; ethics is the answer. Technology companies possess capabilities that reshape the lives of people who never chose them, and the populations most affected, refugees, trafficking survivors, communities in conflict, are precisely those least represented in the rooms where technological choices are made. The CoLab's motivation is therefore corrective, and the collaboration between a university and a technology company is itself a methodological statement: the academy contributes independence, historical depth, and the pluralism of ethical frameworks, while industry contributes operational knowledge of how systems are actually built, deployed, and misused.`,
        {
          lead: "The portfolio through three lenses.",
          text: `Each project is best understood through three lenses: the humanitarian problem it addresses, the ethical safeguards it incorporates, and the measurable public value it seeks to create. The largest body of work concerns civilian evacuation in armed conflict, through the Civilian Evacuation Risk Anticipation Index, the Evacuation Simulator, the Mariupol Corridor Severity Model, and After the Corridor. These are decision support instruments for human judgment, not automated directives, built on documented, contestable data. A second cluster addresses exploitation and traceability: the Forced Labor Structural Risk Index assesses the structural conditions under which forced labor flourishes, a fight documented in the author's fieldwork at the European Parliament and sharpened by the ILO's estimate of 236 billion dollars in annual illegal profits from forced labour. Further projects extend the same logic to cultural property provenance, disaster response, multi party negotiation, and the technology's own carbon footprint.`,
        },
        {
          intro:
            "Three commitments define the research philosophy, resting on a foundation of international human rights law and the humanitarian principles:",
          list: [
            "Ethics before algorithms: the CoLab treats the current wave of AI not as an unprecedented rupture but as the latest chapter in a four thousand year effort to govern power, and begins from moral philosophy, international relations, and humanitarian ethics rather than from model architectures.",
            "Ethical deliberation as method: following the Carnegie Council's framework, it identifies the ethical stakes, deliberates across plural frameworks, acts, and takes responsibility, wherever possible with those most affected rather than about them.",
            "The human rights floor: it evaluates every proposed technology against internationally agreed rights rather than against corporate or institutional convenience, and treats the do no harm obligation as a hard constraint rather than an optimization target.",
          ],
        },
        `The CoLab's ambition, of which this paper is a first expression, is a body of research useful to policymakers, humanitarian practitioners, donors, and researchers who must make decisions about artificial intelligence without becoming AI engineers. Its wager is that the disciplines this paper has drawn together are not six literatures but one conversation, and that the institutions that learn to hold that conversation well will be the ones that earn the trust on which the legitimate use of artificial intelligence depends.`,
      ],
    },
    {
      id: "conclusion",
      number: "16",
      title: "Conclusion",
      paragraphs: [
        `This paper set out to answer a question that is asked constantly and defined rarely: what is ethical AI? The answer it has defended is institutional rather than technical. Ethical AI is artificial intelligence governed by the same disciplines humanity has always required of power: deliberation across plural values, accountability to those affected, a floor of universal rights, and the humility to take responsibility when judgment fails. Ethics did not emerge because human beings became virtuous. It emerged because societies learned that power without restraint destroys the communities on which power depends. Artificial intelligence does not change that lesson. It makes the lesson urgent.`,
        `The humanitarian sector is where the urgency is greatest and the test is hardest. There, consent collapses, experimentation finds the least protected subjects, accountability runs to people with no vote and no purchase, and the cost of failure is measured in lives. A technology that can be governed ethically there can be governed ethically anywhere. The frameworks now taking shape, from UNESCO's Recommendation to the UN's Scientific Panel and Global Dialogue, from the EU AI Act to the ICRC's precautionary policy, are the scaffolding of that governance. Whether they become an edifice depends on whether institutions, including universities, technology companies, and the collaborations between them, do the slow deliberative work this paper has tried to model.`,
        `Societies do not flourish because they possess increasingly powerful tools. They flourish because they develop increasingly trustworthy ways of governing them. That has been the purpose of ethics for four thousand years. It is the purpose of ethical AI now.`,
      ],
    },
  ] satisfies ReportSection[],

  // The paper's Works Cited, transcribed from the source document.
  citations: [
    { ref: "Achiume, E. Tendayi. Racial Discrimination and Emerging Digital Technologies: A Human Rights Analysis. UN Doc. A/HRC/44/57, United Nations, June 2020." },
    { ref: "Acton, John Emerich Edward Dalberg. Letter to Mandell Creighton, 5 Apr. 1887. Historical Essays and Studies, Macmillan, 1907." },
    { ref: "Adams, Rachel. The New Empire of AI: The Future of Global Inequality. Polity, 2025." },
    { ref: "Allen, Gregory C. “Choking Off China's Access to the Future of AI.” Center for Strategic and International Studies, 11 Oct. 2022.", url: "https://www.csis.org/analysis/choking-chinas-access-future-ai" },
    { ref: "Alston, Philip. Digital Welfare States and Human Rights: Report of the Special Rapporteur on Extreme Poverty and Human Rights. UN Doc. A/74/493, United Nations, 11 Oct. 2019." },
    { ref: "Amnesty International and Access Now. The Toronto Declaration: Protecting the Rights to Equality and Non-Discrimination in Machine Learning Systems. 16 May 2018." },
    { ref: "Andersin, Emelie. “The Use of the ‘Lavender’ in Gaza and the Law of Targeting.” Journal of International Humanitarian Legal Studies, vol. 16, no. 2, 2025, pp. 336 to 370." },
    { ref: "Appiah, Kwame Anthony. Cosmopolitanism: Ethics in a World of Strangers. W. W. Norton, 2006." },
    { ref: "Aristotle. Nicomachean Ethics. Translated by Terence Irwin, 2nd ed., Hackett, 1999." },
    { ref: "Beduschi, Ana. “Harnessing the Potential of Artificial Intelligence for Humanitarian Action.” International Review of the Red Cross, vol. 104, no. 919, 2022, pp. 1149 to 1169." },
    { ref: "Bengio, Yoshua, et al. International AI Safety Report 2026. AI Security Institute, Feb. 2026.", url: "https://internationalaisafetyreport.org" },
    { ref: "Benjamin, Ruha. Race After Technology: Abolitionist Tools for the New Jim Code. Polity, 2019." },
    { ref: "Bietti, Elettra. “From Ethics Washing to Ethics Bashing.” Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency, ACM, 2020, pp. 210 to 219." },
    { ref: "“The Bletchley Declaration by Countries Attending the AI Safety Summit, 1 and 2 November 2023.” GOV.UK, 1 Nov. 2023.", url: "https://www.gov.uk/government/publications/ai-safety-summit-2023-the-bletchley-declaration" },
    { ref: "Bradford, Anu. Digital Empires: The Global Battle to Regulate Technology. Oxford UP, 2023." },
    { ref: "Buolamwini, Joy, and Timnit Gebru. “Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification.” Proceedings of Machine Learning Research, vol. 81, 2018, pp. 77 to 91." },
    { ref: "Carnegie Council for Ethics in International Affairs. Ethics in International Affairs 101. Carnegie Council.", url: "https://www.carnegiecouncil.org" },
    { ref: "Centre for Humanitarian Data. Peer Review Framework for Predictive Analytics in Humanitarian Response. UN OCHA, Mar. 2020." },
    { ref: "The Code of Hammurabi. Translated by L. W. King, 1910. The Avalon Project, Yale Law School.", url: "https://avalon.law.yale.edu/ancient/hamframe.asp" },
    { ref: "Confucius. Analects. Translated by Edward Slingerland, Hackett, 2003." },
    { ref: "Coppi, Giulio, Rebeca Moreno Jimenez, and Sofia Kyriazi. “Explicability of Humanitarian AI: A Matter of Principles.” Journal of International Humanitarian Action, vol. 6, art. 19, 2021." },
    { ref: "Council of Europe. Framework Convention on Artificial Intelligence and Human Rights, Democracy and the Rule of Law. Council of Europe Treaty Series no. 225, 5 Sept. 2024." },
    { ref: "Crawford, Kate. Atlas of AI: Power, Politics, and the Planetary Costs of Artificial Intelligence. Yale UP, 2021." },
    { ref: "The Danish Institute for Human Rights. Guidance on Human Rights Impact Assessment of Digital Activities. DIHR, 2020." },
    { ref: "Devidal, Pierrick. “Lost in Digital Translation? The Humanitarian Principles in the Digital Age.” International Review of the Red Cross, vol. 106, no. 925, 2024." },
    { ref: "Diakopoulos, Nicholas, et al. “Principles for Accountable Algorithms and a Social Impact Statement for Algorithms.” FAT/ML.", url: "https://www.fatml.org/resources/principles-for-accountable-algorithms" },
    { ref: "The Engine Room and Oxfam. Biometrics in the Humanitarian Sector. The Engine Room, 2018, updated 2023." },
    { ref: "European Parliament and Council of the European Union. Regulation (EU) 2024/1689 (Artificial Intelligence Act). Official Journal of the European Union, 12 July 2024." },
    { ref: "Fjeld, Jessica, et al. Principled Artificial Intelligence: Mapping Consensus in Ethical and Rights-Based Approaches to Principles for AI. Berkman Klein Center Research Publication no. 2020-1, Harvard University, 2020." },
    { ref: "Floridi, Luciano, and Josh Cowls. “A Unified Framework of Five Principles for AI in Society.” Harvard Data Science Review, vol. 1, no. 1, 2019." },
    { ref: "Friedman, Batya, and David G. Hendry. Value Sensitive Design: Shaping Technology with Moral Imagination. MIT Press, 2019." },
    { ref: "Future of Life Institute. “Asilomar AI Principles.” Future of Life Institute, 2017.", url: "https://futureoflife.org/open-letter/ai-principles" },
    { ref: "Gebru, Timnit, et al. “Datasheets for Datasets.” Communications of the ACM, vol. 64, no. 12, 2021, pp. 86 to 92." },
    { ref: "“Global Push for AI Governance amid Warnings of ‘Catastrophic Harm.’” UN News, 5 July 2026.", url: "https://news.un.org/en/story/2026/07/1167862" },
    { ref: "Heinzelman, Jessica, and Carol Waters. Crowdsourcing Crisis Information in Disaster-Affected Haiti. Special Report 252, United States Institute of Peace, 2010." },
    { ref: "High-level Committee on Programmes, UN System Chief Executives Board for Coordination. Principles for the Ethical Use of Artificial Intelligence in the United Nations System. United Nations, Sept. 2022." },
    { ref: "High-Level Expert Group on Artificial Intelligence. Ethics Guidelines for Trustworthy AI. European Commission, 8 Apr. 2019." },
    { ref: "Hobbes, Thomas. Leviathan. Edited by Richard Tuck, Cambridge UP, 1996." },
    { ref: "IEEE Global Initiative on Ethics of Autonomous and Intelligent Systems. Ethically Aligned Design. 1st ed., IEEE, 2019." },
    { ref: "Inter-Agency Standing Committee. IASC Operational Guidance on Data Responsibility in Humanitarian Action. IASC, 2023." },
    { ref: "International Committee of the Red Cross. Building a Responsible Humanitarian Approach: The ICRC's Policy on Artificial Intelligence. ICRC, Nov. 2024." },
    { ref: "International Committee of the Red Cross. “ICRC Position on Autonomous Weapon Systems.” ICRC, 12 May 2021." },
    { ref: "International Labour Organization. Profits and Poverty: The Economics of Forced Labour. 2nd ed., ILO, Mar. 2024." },
    { ref: "International Organization for Standardization and International Electrotechnical Commission. ISO/IEC 42001:2023, Information Technology, Artificial Intelligence, Management System. ISO, Dec. 2023." },
    { ref: "International Telecommunication Union. United Nations Activities on Artificial Intelligence. ITU, annual editions." },
    { ref: "Jacobsen, Katja Lindskov. “Experimentation in Humanitarian Locations: UNHCR and Biometric Registration of Afghan Refugees.” Security Dialogue, vol. 46, no. 2, 2015, pp. 144 to 164." },
    { ref: "Jobin, Anna, Marcello Ienca, and Effy Vayena. “The Global Landscape of AI Ethics Guidelines.” Nature Machine Intelligence, vol. 1, 2019, pp. 389 to 399." },
    { ref: "Johnson, Emily. “AI Ethics Frameworks: 10 Essential Resources to Build an Ethical AI Framework.” SecureITWorld, 12 Mar. 2025." },
    { ref: "Juskalian, Russ. “Inside the Jordan Refugee Camp That Runs on Blockchain.” MIT Technology Review, 12 Apr. 2018." },
    { ref: "Kant, Immanuel. “Toward Perpetual Peace.” Practical Philosophy, translated by Mary J. Gregor, Cambridge UP, 1996." },
    { ref: "Karenga, Maulana. Maat, the Moral Ideal in Ancient Egypt: A Study in Classical African Ethics. Routledge, 2004." },
    { ref: "Kuner, Christopher, and Massimo Marelli, editors. Handbook on Data Protection in Humanitarian Action. 2nd ed., ICRC and Brussels Privacy Hub, 2020." },
    { ref: "Laidlaw, James. The Subject of Virtue: An Anthropology of Ethics and Freedom. Cambridge UP, 2014." },
    { ref: "Latonero, Mark. “Stop Surveillance Humanitarianism.” The New York Times, 11 July 2019." },
    { ref: "Libertas Council. “Developing Guidelines on the Intersection of Human Trafficking and Technology.” Working group meeting, European Parliament, Brussels, 3 Dec. 2024." },
    { ref: "Madianou, Mirca. “Technocolonialism: Digital Innovation and Data Practices in the Humanitarian Response to Refugee Crises.” Social Media + Society, vol. 5, no. 3, 2019, pp. 1 to 13." },
    { ref: "Madianou, Mirca. Technocolonialism: When Technology for Good Is Harmful. Polity, 2024." },
    { ref: "Mantelero, Alessandro. Beyond Data: Human Rights, Ethical and Social Impact Assessment in AI. T.M.C. Asser Press, 2022." },
    { ref: "McGregor, Lorna, Daragh Murray, and Vivian Ng. “International Human Rights Law as a Framework for Algorithmic Accountability.” International and Comparative Law Quarterly, vol. 68, no. 2, 2019, pp. 309 to 343." },
    { ref: "Meier, Patrick. Digital Humanitarians: How Big Data Is Changing the Face of Humanitarian Response. CRC Press, 2015." },
    { ref: "Moor, James H. “What Is Computer Ethics?” Metaphilosophy, vol. 16, no. 4, 1985, pp. 266 to 275." },
    { ref: "Mitchell, Margaret, et al. “Model Cards for Model Reporting.” Proceedings of the Conference on Fairness, Accountability, and Transparency, ACM, 2019, pp. 220 to 229." },
    { ref: "Mittelstadt, Brent. “Principles Alone Cannot Guarantee Ethical AI.” Nature Machine Intelligence, vol. 1, 2019, pp. 501 to 507." },
    { ref: "Morgenthau, Hans J. Politics Among Nations: The Struggle for Power and Peace. Alfred A. Knopf, 1948." },
    { ref: "Munro, Robert. “Crowdsourcing and the Crisis-Affected Community: Lessons Learned and Looking Forward from Mission 4636.” Information Retrieval, vol. 16, no. 2, 2013, pp. 210 to 266." },
    { ref: "National Institute of Standards and Technology. Artificial Intelligence Risk Management Framework (AI RMF 1.0). NIST AI 100-1, U.S. Department of Commerce, Jan. 2023." },
    { ref: "Nearing, Grey, et al. “Global Prediction of Extreme Floods in Ungauged Watersheds.” Nature, vol. 627, 2024, pp. 559 to 563." },
    { ref: "Noble, Safiya Umoja. Algorithms of Oppression: How Search Engines Reinforce Racism. New York UP, 2018." },
    { ref: "North, Douglass C. Institutions, Institutional Change and Economic Performance. Cambridge UP, 1990." },
    { ref: "Nussbaum, Martha C. “Patriotism and Cosmopolitanism.” Boston Review, vol. 19, no. 5, 1994." },
    { ref: "NYU Ethical Tech CoLab. “Publications.” NYU School of Professional Studies Center for Global Affairs and Microsoft.", url: "https://ethical-tech-colab.github.io/website/publications" },
    { ref: "Office of the United Nations High Commissioner for Human Rights. Guiding Principles on Business and Human Rights. United Nations, 2011." },
    { ref: "Office of the United Nations High Commissioner for Human Rights, B-Tech Project. Taxonomy of Human Rights Risks Connected to Generative AI. OHCHR, Nov. 2023." },
    { ref: "Organisation for Economic Co-operation and Development. Recommendation of the Council on Artificial Intelligence. OECD/LEGAL/0449, OECD, 2019, amended 2024." },
    { ref: "OSCE Office of the Special Representative and Co-ordinator for Combating Trafficking in Human Beings, and Tech Against Trafficking. Leveraging Innovation to Fight Trafficking in Human Beings. OSCE, 2020." },
    { ref: "Ostrom, Elinor. Governing the Commons: The Evolution of Institutions for Collective Action. Cambridge UP, 1990." },
    { ref: "Partnership on AI. “Our Tenets.” Partnership on AI, 2016.", url: "https://www.partnershiponai.org" },
    { ref: "Palen, Leysia, and Kenneth M. Anderson. “Crisis Informatics: New Data for Extraordinary Times.” Science, vol. 353, no. 6296, 2016, pp. 224 to 225." },
    { ref: "Pizzi, Michael, Mila Romanoff, and Tim Engelhardt. “AI for Humanitarian Action: Human Rights and Ethics.” International Review of the Red Cross, vol. 102, no. 913, 2020, pp. 145 to 180." },
    { ref: "Raji, Inioluwa Deborah, et al. “Closing the AI Accountability Gap: Defining an End-to-End Framework for Internal Algorithmic Auditing.” Proceedings of the 2020 Conference on Fairness, Accountability, and Transparency, ACM, 2020, pp. 33 to 44." },
    { ref: "Russell, Bertrand. Power: A New Social Analysis. George Allen and Unwin, 1938." },
    { ref: "Risse, Mathias. “Human Rights and Artificial Intelligence: An Urgently Needed Agenda.” Human Rights Quarterly, vol. 41, no. 1, 2019, pp. 1 to 16." },
    { ref: "Roberts, Huw, et al. “Global AI Governance: Barriers and Pathways Forward.” International Affairs, vol. 100, no. 3, 2024, pp. 1275 to 1286." },
    { ref: "Sandvik, Kristin Bergtora, Katja Lindskov Jacobsen, and Sean Martin McDonald. “Do No Harm: A Taxonomy of the Challenges of Humanitarian Experimentation.” International Review of the Red Cross, vol. 99, no. 904, 2017." },
    { ref: "Sastry, Girish, et al. “Computing Power and the Governance of Artificial Intelligence.” arXiv:2402.08797, Feb. 2024." },
    { ref: "Scharre, Paul. Four Battlegrounds: Power in the Age of Artificial Intelligence. W. W. Norton, 2023." },
    { ref: "Signpost AI. “Pilot Report: Signpost AI Information Assistant.” International Rescue Committee, 27 June 2025.", url: "https://signpostai.org/research/pilot-report-signpost-ai-information-assistant" },
    { ref: "Singer, Peter. The Expanding Circle: Ethics, Evolution, and Moral Progress. Princeton UP, 2011." },
    { ref: "Smuha, Nathalie A. “Beyond a Human Rights-Based Approach to AI Governance: Promise, Pitfalls, Plea.” Philosophy and Technology, vol. 34, no. 1, 2021, pp. 91 to 104." },
    { ref: "Spencer, Sarah W. Humanitarian AI: The Hype, the Hope and the Future. Network Paper 85, Humanitarian Practice Network, ODI, Nov. 2021." },
    { ref: "Spencer, Sarah W. Humanitarian AI Revisited: Seizing the Potential and Sidestepping the Pitfalls. Network Paper 89, Humanitarian Practice Network, ODI, May 2024." },
    { ref: "“Statement on Inclusive and Sustainable Artificial Intelligence for People and the Planet.” AI Action Summit, Paris, 11 Feb. 2025." },
    { ref: "Stilgoe, Jack, Richard Owen, and Phillip Macnaghten. “Developing a Framework for Responsible Innovation.” Research Policy, vol. 42, no. 9, 2013, pp. 1568 to 1580." },
    { ref: "Tomasello, Michael. A Natural History of Human Morality. Harvard UP, 2016." },
    { ref: "UNESCO. Recommendation on the Ethics of Artificial Intelligence. UNESCO, 23 Nov. 2021." },
    { ref: "UNHCR. “Our Approach to Artificial Intelligence.” UNHCR Digital Transformation Strategy 2022 to 2026, UNHCR." },
    { ref: "UNICEF. Policy Guidance on AI for Children 2.0. UNICEF Office of Global Insight and Policy, Nov. 2021." },
    { ref: "United Nations. Global Digital Compact. Annex to Resolution A/RES/79/1, United Nations, 22 Sept. 2024." },
    { ref: "United Nations Development Programme. AI Hub for Sustainable Development. UNDP, 2024." },
    { ref: "United Nations General Assembly. Enhancing International Cooperation on Capacity-Building of Artificial Intelligence. Resolution A/RES/78/311, 1 July 2024." },
    { ref: "United Nations General Assembly. International Covenant on Civil and Political Rights. United Nations, 16 Dec. 1966." },
    { ref: "United Nations General Assembly. International Covenant on Economic, Social and Cultural Rights. United Nations, 16 Dec. 1966." },
    { ref: "United Nations General Assembly. Resolution A/RES/79/325, Terms of Reference and Modalities for the Independent International Scientific Panel on Artificial Intelligence and the Global Dialogue on Artificial Intelligence Governance. 26 Aug. 2025." },
    { ref: "United Nations General Assembly. Seizing the Opportunities of Safe, Secure and Trustworthy Artificial Intelligence Systems for Sustainable Development. Resolution A/RES/78/265, 21 Mar. 2024." },
    { ref: "United Nations General Assembly. Universal Declaration of Human Rights. Resolution 217 A (III), 10 Dec. 1948." },
    { ref: "United Nations High Commissioner for Human Rights. The Right to Privacy in the Digital Age. UN Doc. A/HRC/48/31, United Nations, Sept. 2021." },
    { ref: "United Nations High-level Advisory Body on Artificial Intelligence. Governing AI for Humanity: Final Report. United Nations, Sept. 2024." },
    { ref: "United Nations Secretary-General. Our Common Agenda Policy Brief 11: UN 2.0. United Nations, Sept. 2023." },
    { ref: "United Nations Secretary-General. Roadmap for Digital Cooperation. UN Doc. A/74/821, United Nations, June 2020." },
    { ref: "UN Global Pulse. Big Data for Development: Challenges and Opportunities. United Nations, May 2012." },
    { ref: "UN OCHA. Briefing Note on Artificial Intelligence and the Humanitarian Sector. OCHA, 2024." },
    { ref: "UN OCHA. OCHA Data Responsibility Guidelines. Centre for Humanitarian Data, Oct. 2021." },
    { ref: "UN Secretary-General's High-level Panel on Digital Cooperation. The Age of Digital Interdependence. United Nations, June 2019." },
    { ref: "Université de Montréal. Montreal Declaration for a Responsible Development of Artificial Intelligence. 2018.", url: "https://www.montrealdeclaration-responsibleai.com" },
    { ref: "Veale, Michael, and Frederik Zuiderveen Borgesius. “Demystifying the Draft EU Artificial Intelligence Act.” Computer Law Review International, vol. 22, no. 4, 2021, pp. 97 to 112." },
    { ref: "Weber, Max. Economy and Society: An Outline of Interpretive Sociology. Edited by Guenther Roth and Claus Wittich, U of California P, 1978." },
    { ref: "World Bank. “Famine Action Mechanism (FAM).” World Bank, 2018.", url: "https://www.worldbank.org/en/programs/famine-early-action-mechanism" },
    { ref: "World Food Programme. “WFP Releases HungerMap LIVE.” WFP, 2019." },
    { ref: "World Food Programme Innovation Accelerator. “New Global Principles for Innovative and Ethical AI.” WFP, 2022." },
    { ref: "Whittaker, Meredith, et al. AI Now Report 2018. AI Now Institute, New York University, Dec. 2018." },
    { ref: "Winner, Langdon. “Do Artifacts Have Politics?” Daedalus, vol. 109, no. 1, 1980, pp. 121 to 136." },
    { ref: "Yeung, Karen, Andrew Howes, and Ganna Pogrebna. “AI Governance by Human Rights-Centred Design, Deliberation and Oversight: An End to Ethics Washing.” The Oxford Handbook of Ethics of AI, Oxford UP, 2020, pp. 77 to 106." },
  ] satisfies Citation[],
};
