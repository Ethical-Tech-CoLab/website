"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";

/**
 * The Live Demos catalogue now lives at the top of /portfolio. This route stays
 * behind as a redirect because the old URL is printed in the newsletter and
 * linked from other repos, and a static export has no server to redirect for us.
 */
export default function DemosRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/portfolio");
  }, [router]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-32 text-center">
      <p className="text-xs uppercase tracking-wider text-muted">Moved</p>
      <h1 className="mt-4 font-heading text-3xl uppercase">
        The live demos are now on the portfolio.
      </h1>
      <p className="mt-6 text-muted">
        Taking you there —{" "}
        <Link href="/portfolio" className="text-accent underline">
          open the portfolio
        </Link>{" "}
        if nothing happens.
      </p>
    </div>
  );
}
