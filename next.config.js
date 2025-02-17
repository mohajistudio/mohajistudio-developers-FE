/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@toast-ui/editor', 'react-syntax-highlighter'],
  webpack: (config) => {
    // toast ui editor에 필요한 설정
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'example.com',
        port: '',
        pathname: '/thumbnails/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.githubusercontent.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

module.exports = nextConfig;
