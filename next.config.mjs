/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  images: {
    unoptimized: isDevelopment
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
