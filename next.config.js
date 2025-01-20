/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@toast-ui/editor'],
  webpack: (config) => {
    // toast ui editor에 필요한 설정

    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
