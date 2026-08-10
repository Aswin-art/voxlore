import type { NextConfig } from "next"

// In production (Vercel), set NEXT_PUBLIC_API_URL to your NestJS backend URL
// e.g. https://your-api.up.railway.app
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001"

const API_ROUTES = [
  "auth",
  "destinations",
  "festivals",
  "downloads",
  "favorites",
  "packages",
  "profile",
  "scan",
  "security",
  "admin",
  "vacation-plan",
  "travel-plans",
]

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  async rewrites() {
    return API_ROUTES.map((route) => ({
      source: `/api/${route}/:path*`,
      destination: `${API_URL}/${route}/:path*`,
    }))
  },
}

export default nextConfig
