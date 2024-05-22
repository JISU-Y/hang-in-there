import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';

export default ({ mode }) => {
  // 현재 작업 디렉터리의 `mode`를 기반으로 env 파일을 불러옴
  // 세 번째 매개변수를 ''로 설정하면 `VITE_` 접두사에 관계없이 모든 환경 변수를 불러옴
  const env = loadEnv(mode, process.cwd(), '');

  return defineConfig({
    resolve: {
      alias: [
        { find: '@public', replacement: resolve(__dirname, 'public') },
        { find: '@src', replacement: resolve(__dirname, 'src') },
        {
          find: '@common',
          replacement: resolve(__dirname, 'src/common')
        },
        {
          find: '@styles',
          replacement: resolve(__dirname, 'src/styles')
        },
        {
          find: '@pages',
          replacement: resolve(__dirname, 'src/pages')
        }
      ]
    },
    plugins: [
      react(),
      viteTsconfigPaths(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            naverMapsClientId: env.VITE_NAVER_MAPS_CLIENT_ID
          }
        }
      })
    ]
  });
};
