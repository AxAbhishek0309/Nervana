import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

// 👇 Add this export for middleware matching
export const config = {
  matcher: ["/((?!_next|favicon.ico|assets|.*\\.svg$).*)"],
};
