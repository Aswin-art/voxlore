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
    ]
  },
}

export default nextConfig
