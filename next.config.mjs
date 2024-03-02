/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
};

export default nextConfig;
