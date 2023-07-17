/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'cdn.discordapp.com',
      'localhost',
      'kanbanify-backend.onrender.com',
    ],
  },
}

module.exports = nextConfig
