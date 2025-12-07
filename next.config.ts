import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dtuwsi45y/**',
      },
    ],
    qualities: [75, 90, 95],
  },
};

export default nextConfig;
