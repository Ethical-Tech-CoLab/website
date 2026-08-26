import type { Metadata } from "next";
import { Link } from "next-view-transitions";
import {
  dictionaryDomains,
  dictionaryTerms,
  libraryShelves,
  librarySources,
} from "@/content/publications/cyber-dictionary-data";
import { ReportBookLink } from "@/components/ReportBookLink";
import { ReportPdfLink } from "@/components/ReportPdfLink";
import { SectionTabs } from "@/components/SectionTabs";
import { Reveal } from "@/components/motion/Reveal";

const LIVE_TOOL = "https://ethical-tech-colab.github.io/cyber-dictionary/";
const REPO = "https://github.com/Ethical-Tech-CoLab/cyber-dictionary";

export const metadata: Metadata = {
  title: "The Cyber Dictionary and Library",
  description:
    "An Ethical Tech CoLab reference edition: technology and cybersecurity terms defined in plain English, and open data sources catalogued by shelf — as a searchable tool, a printed dictionary, and a PDF.",
};

export default function CyberDictionaryPage() {
  const domainCounts = dictionaryDomains
    .map((domain) => ({
      domain,
      count: dictionaryTerms.filter((t) => t.domain === domain).length,
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  const shelfCounts = libraryShelves
    .map((shelf) => ({
      shelf,
      count: librarySources.filter((s) => s.shelf === shelf).length,
    }))
    .filter((s) => s.count > 0)
    .sort((a, b) => b.count - a.count);

  const freeSources = librarySources.filter((s) =>
    /^free/i.test(s.cost.trim()),
  ).length;

  const stats = [
    { value: String(dictionaryTerms.length), label: "terms defined in plain English" },
    {
      value: String(dictionaryDomains.length),
      label: "domains, from networking to compute hardware",
    },
    { value: String(librarySources.length), label: "open data sources and tools catalogued" },
    { value: String(freeSources), label: "of them free to use at the tier described" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <span className="aura" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 sm:py-24">
          <Reveal>
            <Link
              href="/publications"
              className="link-underline text-xs uppercase tracking-wider text-muted"
            >
              ← Reference edition
            </Link>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 fluid-hero font-heading uppercase leading-[0.9]">
              The Cyber <span className="display-em">Dictionary</span> and
              Library
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-2xl font-heading text-2xl uppercase tracking-wide text-muted sm:text-3xl">
              {dictionaryTerms.length} terms in plain English, and{" "}
              {librarySources.length} places to get the data
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-accent">
              <span className="font-semibold">Ethical Tech CoLab</span>
              <span aria-hidden className="text-muted">
                ·
              </span>
              <span>Reference</span>
              <span aria-hidden className="text-muted">
                ·
              </span>
              <span>August 2026</span>
            </div>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
              A searchable tool, a printed dictionary, and a PDF — all typeset
              from the same two files.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={LIVE_TOOL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-ink transition-transform hover:scale-[1.03]"
              >
                Search the live edition <span aria-hidden>↗</span>
              </a>
              <ReportBookLink
                slug="cyber-dictionary"
                title="The Cyber Dictionary and Library"
              />
              <ReportPdfLink slug="cyber-dictionary" />
              <a
                href={REPO}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
              >
                Source and citation <span aria-hidden>↗</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <SectionTabs />

      {/* Key figures */}
      <section className="border-b border-border bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-x border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-7">
              <p className="font-heading text-4xl uppercase leading-none text-accent sm:text-5xl">
                {stat.value}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <Reveal>
          <p className="border-l-2 border-accent pl-6 text-lg leading-relaxed text-foreground/90">
            A dictionary is a machine for the moment you looked something up.
            The live edition serves that moment with a search box. This one
            serves it the older way: the terms run A to Z, and the library is a
            catalogue you walk shelf by shelf rather than a search box you have
            to already know the answer for.
          </p>
        </Reveal>

        {/* Contents */}
        <Reveal delay={0.05}>
          <nav
            aria-label="Contents"
            className="mt-12 rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-xs uppercase tracking-wider text-muted">
              Contents
            </p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {[
                ["01", "Two rooms in one book", "two-rooms"],
                ["02", "How the entries are written", "how-written"],
                ["03", "Reading it as a book", "as-a-book"],
                ["04", "The Dictionary: terms by domain", "domains"],
                ["05", "The Library: sources by shelf", "shelves"],
              ].map(([number, title, id]) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="link-underline inline-flex gap-2 text-sm text-foreground/85"
                  >
                    <span className="font-mono text-accent">{number}</span>
                    {title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>

        <section id="two-rooms" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">01</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              Two rooms in one book
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
            <p>
              <span className="font-semibold text-accent">The Dictionary</span>{" "}
              defines {dictionaryTerms.length} technology and cybersecurity
              terms across {dictionaryDomains.length} domains, each in a
              sentence or two. It is written for the moment you actually looked
              the term up — mid-sentence in a meeting, mid-paragraph in a
              standard — rather than for someone reading the field from the
              beginning.
            </p>
            <p>
              <span className="font-semibold text-accent">The Library</span>{" "}
              catalogues {librarySources.length} open data sources and
              open-source technologies across {shelfCounts.length} shelves, from
              satellite imagery to conflict and rights data. Each card says what
              the source holds, how to connect a program to it, and what it
              costs. {freeSources} of the {librarySources.length} are free at
              the tier described.
            </p>
            <p>
              The two answer the two halves of the same question. The Dictionary
              tells you what the thing is called; the Library tells you where to
              get it.
            </p>
          </div>
        </section>

        <section id="how-written" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">02</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              How the entries are written
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
            <p>
              Definitions are written to be read cold, by someone who does not
              yet have the surrounding vocabulary. That is a deliberate
              constraint and it costs precision: where a term has a formal
              standards definition, the entry gives the working one instead, and
              says what the term is <em>for</em> rather than exactly what it
              denotes. Anyone who needs the normative wording should go to the
              standard; anyone who needs to follow the conversation should start
              here.
            </p>
            <p>
              Each entry carries the domain it belongs to, which answers the
              second question a reader usually has: not only what the term
              means, but which part of the field is talking. Where a term is
              normally met as an abbreviation, the expansion follows the
              headword; where it is normally met expanded, the abbreviation
              does.
            </p>
            <p>
              <span className="font-semibold text-accent">
                A note on currency.
              </span>{" "}
              Definitions age slowly; endpoints, licences and free tiers age
              fast. The live edition is the authority on the Library. Treat a
              cost line in the printed edition as a description of what the
              source offered when it was compiled, not as a promise about today.
            </p>
          </div>
        </section>

        <section id="as-a-book" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">03</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              Reading it as a book
            </h2>
          </Reveal>
          <div className="mt-6 space-y-5 leading-relaxed text-foreground/85">
            <p>
              The printed edition is typeset from the same two files the live
              tool serves, so the two cannot drift apart in wording. The
              Dictionary is set in two justified columns with a letter band
              travelling through the text, the way a dictionary has always been
              set; the Library is set as catalogue cards, shelf by shelf. Turn
              the pages in the reader, or take the PDF.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <ReportBookLink
              slug="cyber-dictionary"
              title="The Cyber Dictionary and Library"
            />
            <ReportPdfLink slug="cyber-dictionary" />
          </div>
        </section>

        <section id="domains" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">04</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              The Dictionary: terms by domain
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {domainCounts.map((d) => (
              <li
                key={d.domain}
                className="flex items-baseline justify-between gap-4 bg-card px-5 py-4"
              >
                <span className="text-sm text-foreground/85">{d.domain}</span>
                <span className="font-mono text-sm text-accent">{d.count}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="shelves" className="mt-16 scroll-mt-24">
          <Reveal>
            <p className="font-mono text-sm text-accent">05</p>
            <h2 className="mt-2 fluid-h2 font-heading uppercase">
              The Library: sources by shelf
            </h2>
          </Reveal>
          <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
            {shelfCounts.map((s) => (
              <li
                key={s.shelf}
                className="flex items-baseline justify-between gap-4 bg-card px-5 py-4"
              >
                <span className="text-sm text-foreground/85">{s.shelf}</span>
                <span className="font-mono text-sm text-accent">{s.count}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Every source is listed in full — operator, address, what it holds,
            how to connect, and cost — in the book and the PDF, and is
            searchable in the live edition.
          </p>
        </section>

        {/* Back link */}
        <div className="mt-16 border-t border-border pt-10">
          <Link
            href="/publications"
            className="btn-sweep inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-border-strong"
          >
            <span aria-hidden>←</span> All publications
          </Link>
        </div>
      </div>
    </>
  );
}
