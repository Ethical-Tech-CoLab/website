import { cohorts, products, publications, researchAreas, team } from "@/content/site";

// ─────────────────────────────────────────────────────────────────────────
// Every figure the home page quotes about the CoLab, counted from
// src/content/site.ts at build time.
//
// None of these may be typed in by hand anywhere. The home page has shipped a
// wrong number twice: the portfolio link read "all five" while there were four
// research areas, and the hero advertised twenty six demos "you can open" when
// eight of the catalogue's entries were CoLab-only and seven of those had no
// demo to open at all. A hero that leads with figures is the worst place in
// the site for that, because it is the first thing a visitor reads and the
// last thing anyone thinks to re-check.
//
// Adding a project, demo, report, or researcher to site.ts therefore moves
// these on its own. Adding a NEW kind of figure to the hero means adding it
// here, not in the page.
// ─────────────────────────────────────────────────────────────────────────

/** Projects fielded across every research question, i.e. what /portfolio lists. */
const projects = researchAreas.reduce(
  (total, area) => total + area.projects.length,
  0,
);

/**
 * Demos a visitor can actually open.
 *
 * Not `products.length`. The Live Demos catalogue also carries CoLab-only
 * entries (internal how-to guides and decks), most of which have no demo URL
 * at all, so the catalogue total is roughly a third larger than the number of
 * things a visitor can click. The hero's line is "demos you can open", so it
 * has to count what that sentence claims.
 */
const openableDemos = products.filter(
  (product) =>
    (product.demo || product.demos?.length) && product.access !== "internal",
).length;

/**
 * Everything shelved on /publications, including the internal guides.
 *
 * This one IS the catalogue total on purpose: the publications page lists all
 * of them, and the hero says "in the catalogue" rather than "you can read".
 * If that wording ever changes to a promise about reading, switch this to the
 * readable subset, which is what the publications page's own "readable now"
 * filter computes.
 */
const catalogue = publications.items.length;

export const siteCounts = {
  projects,
  openableDemos,
  catalogue,
  /** Across every cohort, which is how the hero phrases it. */
  researchers: team.researchers.length,
  cohorts: cohorts.length,
  researchQuestions: researchAreas.length,
} as const;
