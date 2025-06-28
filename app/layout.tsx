import type { Metadata } from 'next';
import Script from 'next/script';
import { Providers } from './providers';
import { CustomThemeProvider } from '@contexts/ThemeContext'; // 경로 수정

export const metadata: Metadata = {
  title: 'Hang-in-there 행인들',
  description: '행사를 즐기는 인싸들',
  icons: {
    icon: '/logo/hanginthere-logo.svg'
  }
};

export default function RootLayout({
  children,
  auth
}: {
  children: React.ReactNode;
  auth: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <CustomThemeProvider>
          <Providers>
            {children}
            {auth}
          </Providers>
        </CustomThemeProvider>
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.6.0/kakao.min.js"
          integrity="sha384-6MFdIr0zOira1CHQkedUqJVql0YtcZA1P0nbPrQYJXVJZUkTk/oX4U9GhUIs3/z8"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
