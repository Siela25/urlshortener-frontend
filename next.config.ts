import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8080',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  experimental: {
    // Enable optimizations
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  // Enable static exports for faster builds (optional)
  typescript: {
    // Type check during build
    ignoreBuildErrors: false,
  },
  eslint: {
    // Lint during build
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
