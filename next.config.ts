import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      require("./scripts/generate-prisma-client");
    }
    return config;
  },
};

export default nextConfig;
