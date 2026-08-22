// Everything under /print is a printable edition: the report alone, on paper.
//
// These rules live in a layout rather than in the page so they are plain global
// selectors. They only ever load on /print/* routes, so they can reach out and
// switch off the site frame the root layout wraps every route in without
// qualifying each selector.

export default function PrintLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style>{`
        /* The site is dark-first, and a dark color-scheme makes Chrome paint
           the printed sheet's margin area dark too. Paper is light. */
        html { color-scheme: light !important; }
        html, body { background: #ffffff !important; }
        body::after { content: none !important; }
        header, footer, .site-bg, .aura { display: none !important; }
      `}</style>
      {children}
    </>
  );
}
