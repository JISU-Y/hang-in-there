/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';
const secretKey = process.env.CRYPTO_KEY;

const nextConfig = {
  env: {
    secretKey
  },
  images: {
    unoptimized: isDevelopment,
    domains: [
      'tong.visitkorea.or.kr',
      'k.kakaocdn.net',
      't1.kakaocdn.net',
      'hid-profile.s3.ap-northeast-2.amazonaws.com'
    ]
  },
  experimental: {
    missingSuspenseWithCSRBailout: false
  }
};

export default nextConfig;
