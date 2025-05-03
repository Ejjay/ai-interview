"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nextConfig = {
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
exports.default = nextConfig;
