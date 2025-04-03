/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV === 'production';

const nextConfig = {
    basePath: isDev ? '/horizonai' : '',
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true,
    }
};

module.exports = nextConfig;
