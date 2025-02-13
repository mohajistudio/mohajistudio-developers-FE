/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@toast-ui/editor'],
  webpack: (config) => {
    // toast ui editor에 필요한 설정
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

module.exports = nextConfig;
