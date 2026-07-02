"use client";

/**
 * Light/dark switch. The active theme lives in the `data-theme` attribute on
 * <html>, applied before hydration by the inline script in layout.tsx. This
 * button just flips that attribute and persists the choice to localStorage.
 *
 * Both icons are always rendered; CSS in globals.css shows the relevant one
 * per theme, so the markup is identical on server and client (no flash, no
 * hydration mismatch, no client state needed).
 */
export function ThemeToggle() {
  function toggle() {
    const el = document.documentElement;
    const next = el.getAttribute("data-theme") === "light" ? "dark" : "light";
    el.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light or dark mode"
      title="Toggle light or dark mode"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors hover:text-foreground hover:border-foreground/40"
    >
      {/* Sun — shown in dark mode (click to go light). */}
      <svg
        className="theme-icon-sun"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
      {/* Moon — shown in light mode (click to go dark). */}
      <svg
        className="theme-icon-moon"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  );
}
