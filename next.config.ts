import type { NextConfig } from "next";
import { imageHostnames } from "@/config/image-hostnames";
import {
  QueryClient,
  QueryClientProvider,
  useQuery
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const nextConfig: NextConfig = {
  /* config options here */
  // images: {
  //   remotePatterns: imageHostnames.map((hostname) => ({
  //     protocol: "https",
  //     hostname,
  //   })),
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**"
      }
    ],
  },
};

export default nextConfig;
