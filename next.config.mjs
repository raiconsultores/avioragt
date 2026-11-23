/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: `npm run build` writes the site to /out (Cloudflare: build command `npm run build`, output dir `out`).
  // Remove this when adding API routes / server features, and switch to @opennextjs/cloudflare.
  output: 'export',
};
export default nextConfig;
