const DISABLE_STATIC_EXPORT = process.env.NODE_ENV === 'development';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: DISABLE_STATIC_EXPORT ? undefined : 'export',

  // Optional: Change the output directory `out` -> `dist`
  distDir: 'dist',

  // Optional: Change links `/me` -> `/me/` and emit `/me.html` -> `/me/index.html`
  // trailingSlash: true,

  // Optional: Prevent automatic `/me` -> `/me/`, instead preserve `href`
  // skipTrailingSlashRedirect: true,
};

export default nextConfig;
