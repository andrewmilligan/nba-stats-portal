const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const basePath = '/nba';
  const deploymentDomain = 'https://milligan.news';
  return {
    basePath,
    trailingSlash: true,
    reactStrictMode: true,
    publicRuntimeConfig: {
      basePath,
      deploymentDomain,
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
  };
};

module.exports = nextConfig
