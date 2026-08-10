import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:3001/auth/:path*",
      },
      {
        source: "/api/destinations/:path*",
        destination: "http://localhost:3001/destinations/:path*",
      },
      {
        source: "/api/festivals/:path*",
        destination: "http://localhost:3001/festivals/:path*",
      },
      {
        source: "/api/admin/:path*",
        destination: "http://localhost:3001/admin/:path*",
      },
      {
        source: "/api/vacation-plan/:path*",
        destination: "http://localhost:3001/vacation-plan/:path*",
      },
      {
        source: "/api/travel-plans/:path*",
        destination: "http://localhost:3001/travel-plans/:path*",
      },

    ]
  },
}

export default nextConfig
