const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

/** @type {import('next').NextConfig} */
const nextConfig = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const deploymentDomain = 'https://milligan.news';
  const basePath = '/nba';
  return {
    basePath,
    trailingSlash: true,
    reactStrictMode: true,
    env: {
      BASE_PATH: basePath,
      DEPLOYMENT_DOMAIN: deploymentDomain,
      IS_DEVELOPMENT: isDev,
    },
    async rewrites() {
      return [
        {
          source: '/backend/:path*',
          destination: `${deploymentDomain}/:path*`,
        },
      ];
    },
  };
};

module.exports = nextConfig
