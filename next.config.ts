import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "pixoloproductions.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
      },
      {
        protocol: "https",
        hostname: "bhopalliteraturefestival.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
        port: "",
      },

      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
