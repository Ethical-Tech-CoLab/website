# Ethical Tech CoLab — Website

Public website for the **NYU Center for Global Affairs × Microsoft Research Ethical Tech CoLab**.

> *Exploring intervention opportunities at the intersection of emerging technologies and the human condition.*

🔗 **Live site:** <https://ethical-tech-colab.github.io/website/>

## About the CoLab

The NYU CGA Ethical Tech CoLab focuses on applied research at the frontier of AI, decentralized tech, and human rights — with an emphasis on migration, forced labor, refugees, and displaced people. Projects move from research question to fielded prototype within a semester-long cohort.

**Founding partners:** NYU School of Professional Studies · Center for Global Affairs · Microsoft Research

**Lab Director:** Prof. Yorke E. Rhodes III — NYU CGA Global Economy, cofounder of Blockchain at Microsoft, founding partner of ID2020.

## Current cohort — Summer 2026

Four active projects, eight applied researchers:

| # | Project | Focus |
|---|---------|-------|
| 01 | Evacuation Information Index | Disaster response · Civic tech · Information equity |
| 02 | Arts & Artifacts Repatriation | Cultural heritage · Provenance · Restorative justice |
| 03 | Ethical Supply Chain & Traceability | Labor rights · Climate accountability · Trust infrastructure |
| 04 | Diplomatic Simulator | Diplomacy · AI safety · Pedagogy |

## Site structure

```
src/
  app/             # Next.js App Router pages
    /              # Home / hero
    /about         # Mission, vision, director, collaborators
    /cohorts       # Cohort history (Spring 2025 → Summer 2026)
    /portfolio     # Research project cards
    /team          # Founder + current cohort bios
    /contact       # Contact form
  components/      # SiteHeader, SiteFooter, HeroVisual, ContactForm
  content/
    site.ts        # All copy — edit here, pages stay presentational
public/
  team/            # Headshot images (see public/team/README.md)
```

All site copy lives in [src/content/site.ts](src/content/site.ts). Pages are purely presentational — update content there first.

## Dev

```bash
npm install
npm run dev      # http://localhost:3000
```

## Team photos

Drop headshots in `public/team/` and uncomment the matching `photo:` line in `src/content/site.ts`. Square images crop best (displayed as circles). See [public/team/README.md](public/team/README.md) for expected filenames.