import path from "path";
import { fileURLToPath } from "url";
import type { NextConfig } from "next";

// Served from https://ethical-tech-colab.github.io/website/ in production,
// so the app needs the "/website" base path there. Local dev stays at "/".
const isProd = process.env.NODE_ENV === "production";
const basePath = isProd ? "/website" : "";

const nextConfig: NextConfig = {
  // Emit a fully static site into out/ for GitHub Pages.
  output: "export",
  basePath,
  // Expose the base path to client code so public/ assets (logo, photos)
  // can be prefixed manually — next/image does not do this automatically.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  // GitHub Pages has no Next image optimization server.
  images: { unoptimized: true },
  // Serve each route as a directory (/portfolio/ -> /portfolio/index.html).
  trailingSlash: true,
  turbopack: {
    root: path.dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
