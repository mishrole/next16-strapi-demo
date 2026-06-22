import type { NextConfig } from "next"

const STRAPI_HOST = process.env.STRAPI_BASE_URL
  ? new URL(process.env.STRAPI_BASE_URL).hostname
  : ""

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: STRAPI_HOST,
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
