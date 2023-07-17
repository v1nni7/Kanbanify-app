/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['cdn.discordapp.com', 'localhost'],
  },
  ignoreBuildErrors: true,
}

module.exports = nextConfig
