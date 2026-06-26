"use client";

import { useState } from "react";

interface ContactFormProps {
  email: string;
}

/**
 * A backend-free contact form: on submit it composes a pre-filled mailto link
 * so the message goes through the visitor's own email client. Swap this for a
 * server action or form service (Resend, Formspree) when one is available.
 */
export function ContactForm({ email }: ContactFormProps) {
  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = `New inquiry from ${name || "the website"}`;
    const body = [
      `Name: ${name}`,
      org && `Organization: ${org}`,
      from && `Email: ${from}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  const fieldClass =
    "w-full rounded-lg border border-border bg-surface/60 px-4 py-3 text-sm text-foreground placeholder:text-muted outline-none transition-colors focus:border-accent";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Name
          </span>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
            Email
          </span>
          <input
            type="email"
            required
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="you@org.org"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Organization <span className="normal-case">(optional)</span>
        </span>
        <input
          type="text"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
          placeholder="Institution, agency, or community"
          className={fieldClass}
        />
      </label>

      <label className="block">
        <span className="mb-1.5 block text-xs uppercase tracking-wider text-muted">
          Message
        </span>
        <textarea
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What are you working on?"
          className={`${fieldClass} resize-y`}
        />
      </label>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
      >
        Send message <span aria-hidden>→</span>
      </button>
    </form>
  );
}
