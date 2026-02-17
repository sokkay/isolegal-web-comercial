import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pocketbase-production-019d.up.railway.app",
        pathname: "/api/files/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/seed/picsum/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  reactCompiler: true,
};

export default nextConfig;
