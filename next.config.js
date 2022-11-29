/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: '/nba',
  trailingSlash: true,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://d19kaplwqv19rl.cloudfront.net/:path*',
      },
    ];
  },
}

module.exports = nextConfig
