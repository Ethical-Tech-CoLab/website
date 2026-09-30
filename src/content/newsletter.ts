/**
 * Newsletter issues. Each issue's rendered HTML lives in
 * public/newsletter/<slug>.html (bundled from the Ethical-Tech-CoLab/newsletter
 * repo) and is embedded in-site at /newsletter/<slug>.
 */
export type NewsletterIssue = {
  slug: string;
  edition: string;
  date: string;
  blurb: string;
};

export const newsletterIssues: NewsletterIssue[] = [
  {
    slug: "2026-09",
    edition: "September 2026 · Edition 03",
    date: "September 2026",
    blurb:
      "Trace the Unseen and its winners, NYU inside the Microsoft Global Hackathon, Nepal's open-map flood response, the UN scientific brief on losing control of AI agents, California's AI bills, and the Opportunity Board.",
  },
  {
    slug: "2026-08",
    edition: "August 2026 · Edition 02",
    date: "August 2026",
    blurb:
      "WeatherNext Cyclones open-sourced, HungerMap Live in Somalia, an AI-targeted cash program's exclusions, EU AI Act transparency in force, and the Opportunity Board.",
  },
  {
    slug: "2026-07",
    edition: "July 2026 · Edition 01",
    date: "July 2026",
    blurb:
      "HASTE open-sourced for disaster response, the EU AI Act transparency deadline, the Opportunity Board, Tool of the Month, and more.",
  },
];
