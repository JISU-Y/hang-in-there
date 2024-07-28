/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    unoptimized: isDevelopment,
    domains: ['tong.visitkorea.or.kr']
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
