/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://wadadak.xyz/:path*',
      },
      // {
      //   source: '/img/:path*',
      //   destination:
      //     'https://running-service.s3.ap-northeast-2.amazonaws.com/:path*',
      // },
    ];
  },
};

export default nextConfig;