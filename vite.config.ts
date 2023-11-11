import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: [
      { find: '@public', replacement: resolve(__dirname, 'public') },
      { find: '@src', replacement: resolve(__dirname, 'src') },
      {
        find: '@common',
        replacement: resolve(__dirname, 'src/common'),
      },
      {
        find: '@styles',
        replacement: resolve(__dirname, 'src/styles'),
      },
      {
        find: '@pages',
        replacement: resolve(__dirname, 'src/pages'),
      },
    ],
  },
  plugins: [react(), viteTsconfigPaths()],
});
