/** @type {import('next').NextConfig} */
// eslint-disable-next-line no-undef
const isDevelopment = process.env.NODE_ENV === 'development';

const nextConfig = {
  output: 'export', // Outputs a Single-Page Application (SPA).
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    unoptimized: isDevelopment
  }
};

export default nextConfig;
