/**
 * Prefix a public/ asset path with the app's base path.
 *
 * next/image and raw <img> do NOT apply Next's `basePath` to `public/`
 * assets, so on GitHub Pages ("/website") a src of "/logo.png" would 404.
 * Wrap those paths with asset() so they resolve in both dev ("") and prod.
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${path}`;
}
