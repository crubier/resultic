/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    concurrentFeatures: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "abs.twimg.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
    ],
  },
  reactStrictMode: true,
  compiler: {
    relay: {
      // This should match relay.config.js
      src: './',
      artifactDirectory: 'generated/relay',
      schema: "generated/schema.graphql",
      language: 'typescript',
      exclude: ["**/node_modules/**", "**/.yarn/**", "**/.next/**", "**/__mocks__/**", "**/generated/**",],
    },
  },
}

module.exports = nextConfig
