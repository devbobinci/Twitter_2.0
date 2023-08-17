/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    // Wszystkie domeny dzialaja
    domains: ["localhost", "pbs.twimg.com", "ocdn.eu"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.**",
      },
    ],
  },
};

module.exports = nextConfig;
