import type { NextConfig } from "next";
import { imageHostnames } from "@/config/image-hostnames";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: imageHostnames.map((hostname) => ({
      protocol: "https",
      hostname,
    })),
  },
};

export default nextConfig;
