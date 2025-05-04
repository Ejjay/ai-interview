"use strict";
const nextConfig = {
    /* config options here */
    // images: {
    //   remotePatterns: [
    //     {
    //       protocol: "https",
    //       hostname: "ik.imagekit.io",
    //       port: "",
    //     },
    //   ],
    // },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
        serverActions: true,
    },
};

export default nextConfig;