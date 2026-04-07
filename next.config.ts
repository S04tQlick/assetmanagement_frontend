import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        // remotePatterns: [
        //     {
        //         protocol: "https",
        //         hostname: "cdn.sanity.io",
        //         port: "",
        //         pathname: "/**",
        //     },
        //     {
        //         protocol: "https",
        //         hostname: "placehold.co",
        //         port: "",
        //         pathname: "/**",
        //     },
        // ],
        domains: ['images.unsplash.com'],
    }
}

export default nextConfig;
