# Ethical Tech CoLab — Website

Public website for the **NYU Center for Global Affairs × Microsoft Research Ethical Tech CoLab**.

> *Exploring intervention opportunities at the intersection of emerging technologies and the human condition.*

🔗 **Live site:** <https://ethical-tech-colab.github.io/website/>
🎨 **Design system:** <https://ethical-tech-colab.github.io/website/design-system.html>

## Design system

The full visual identity — color tokens (dark + light), typography, atmosphere
effects, layout tokens, and the site map — is documented so it can be replicated
in other codebases:

- **Visual style guide** (theme-aware, live swatches, site-map diagram):
  <https://ethical-tech-colab.github.io/website/design-system.html>
- **Written spec:** [docs/DESIGN-SYSTEM.md](docs/DESIGN-SYSTEM.md)

The guide is a standalone static page (`public/design-system.html`); it is
published alongside the site but is not part of the site's navigation.

## About the CoLab

The NYU CGA Ethical Tech CoLab focuses on applied research at the frontier of AI, decentralized tech, and human rights — with an emphasis on migration, forced labor, refugees, and displaced people. Projects move from research question to fielded prototype within a semester-long cohort.

**Founding partners:** NYU School of Professional Studies · Center for Global Affairs · Microsoft Research

**Lab Director:** Prof. Yorke E. Rhodes III — NYU CGA Global Economy, cofounder of Blockchain at Microsoft, founding partner of ID2020.

## Current cohort — Summer 2026

Four active projects, seven applied researchers:

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
    /              # Home / hero + cohort history (CohortsShowcase)
    /about         # Mission, vision, director, collaborators
                   #   (hidden — the route is preserved but returns 404)
    /portfolio     # Research project cards
    /demos         # Live demo catalogue
    /publications  # Publication catalogue and report routes
    /media         # Media and event archive
    /newsletter    # Newsletter archive and embedded issues
    /team          # Founder + current cohort bios
    /contact       # Contact form
  components/      # Shared presentation and interaction
  content/
    site.ts        # General site data and copy (nav, cohorts, projects, team)
    newsletter.ts  # Newsletter listing metadata
    publications/  # Publication report content
  lib/
    asset.ts       # asset() — prefixes public/ paths with the base path
public/
  team/            # Headshot images (see public/team/README.md)
```

Most general site data lives in [src/content/site.ts](src/content/site.ts).
Publication reports and newsletter metadata have their own content modules as
shown above. Edit the relevant content source before changing presentation
components.

## Contributing and site operations

- **Safe contribution workflow:** [CONTRIBUTING.md](CONTRIBUTING.md)
- **Editing site content (people, projects, logos, links):** [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md)
- **Recommended repository controls:** [SITE-CONTROL-RECOMMENDATIONS.md](SITE-CONTROL-RECOMMENDATIONS.md)
- **Legacy updates and review-only discovery requests:** [UPDATES-NEEDED.md](UPDATES-NEEDED.md)
- **Open public-site content work:** [BACKLOG.md](BACKLOG.md)
- **Security reports:** [SECURITY.md](SECURITY.md)

## Dev

```bash
npm ci
npm run dev      # http://localhost:3000
```

## Team photos

Drop headshots in `public/team/` and uncomment the matching `photo:` line in `src/content/site.ts`. Square images crop best (displayed as circles). See [public/team/README.md](public/team/README.md) for expected filenames.