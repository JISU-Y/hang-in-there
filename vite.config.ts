import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';

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
    plugins: [react(), viteTsconfigPaths()],
    server: {
      // Proxy 설정
      proxy: {
        // 경로가 "/api" 로 시작하는 요청을 대상으로 proxy 설정
        '/api': {
          // 요청 전달 대상 서버 주소 설정
          target: env.VITE_HANGINTHERE_API_END_POINT,
          // 요청 헤더 host 필드 값을 대상 서버의 호스트 이름으로  변경
          changeOrigin: true,
          // 요청 경로에서 '/api' 제거
          rewrite: path =>
            path.replace(/^\/api/, env.VITE_HANGINTHERE_API_END_POINT),
          // SSL 인증서 검증 무시
          secure: false
        }
      }
    }
  });
};
