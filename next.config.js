const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => ({
  basePath: '/nba',
  trailingSlash: true,
  reactStrictMode: true,
  publicRuntimeConfig: {
    IS_DEVELOPMENT: phase === PHASE_DEVELOPMENT_SERVER,
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://d19kaplwqv19rl.cloudfront.net/:path*',
      },
    ];
  },
});

module.exports = nextConfig
