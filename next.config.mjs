/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains : ['m.media-amazon.com']
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    }
};

export default nextConfig;
