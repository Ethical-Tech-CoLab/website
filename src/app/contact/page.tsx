import type { Metadata } from "next";
import { about, site } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Partner with the NYU Ethical Tech CoLab. Start a conversation about interventions at the edge of technology and society.",
};

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-xs uppercase tracking-wider text-muted">Contact</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Start a <span className="display-em">conversation.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            Have a hard problem at the edge of technology and society? We partner
            with institutions, agencies, and communities to prototype
            interventions that hold up outside the lab.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-px overflow-hidden border-b border-border md:grid-cols-[1fr_1.2fr]">
        {/* Direct channels */}
        <div className="bg-surface/40 px-6 py-16 md:px-10">
          <p className="text-xs uppercase tracking-wider text-muted">Reach us</p>

          <div className="mt-8 space-y-8">
            <div>
              <p className="text-sm text-muted">Email</p>
              <a
                href={`mailto:${site.email}`}
                className="mt-1 inline-block text-xl font-semibold tracking-tight transition-colors hover:text-accent"
              >
                {site.email}
              </a>
            </div>

            <div>
              <p className="text-sm text-muted">LinkedIn</p>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-xl font-semibold tracking-tight transition-colors hover:text-accent"
              >
                Ethical Tech CoLab ↗
              </a>
            </div>

            <div>
              <p className="text-sm text-muted">Where we are</p>
              <p className="mt-1 text-lg">{site.partnersLine}</p>
            </div>
          </div>

          <div className="mt-12 border-t border-border pt-8">
            <p className="text-xs uppercase tracking-wider text-muted">
              Founding partners
            </p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm text-foreground/85">
              {about.foundingPartners.map((partner) => (
                <span key={partner}>{partner}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-background px-6 py-16 md:px-10">
          <p className="text-xs uppercase tracking-wider text-muted">
            Tell us about it
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight">
            Send a message
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            This opens your email client with the details filled in, or write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent hover:opacity-80"
            >
              {site.email}
            </a>{" "}
            directly.
          </p>
          <div className="mt-8">
            <ContactForm email={site.email} />
          </div>
        </div>
      </div>
    </>
  );
}
