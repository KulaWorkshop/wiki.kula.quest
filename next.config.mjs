import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
    output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
    trailingSlash: true,
    images: { unoptimized: true },
    serverExternalPackages: ['@takumi-rs/image-response'],
    reactStrictMode: true,
};

export default withMDX(config);
