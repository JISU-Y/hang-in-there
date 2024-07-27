/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    unoptimized: isDevelopment
  }
};

export default nextConfig;
