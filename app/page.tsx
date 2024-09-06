'use client';

import { Suspense } from 'react';
import Script from 'next/script';

import PageLayout from '@domains/common/layouts/PageLayout';
import HomePage from '@domains/home';

export default function Page() {
  const initKakaoScript = () => {
    if (window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  };

  return (
    <PageLayout withLineBanner>
      <Suspense fallback={<div>fallback</div>}>
        <HomePage />
        {/* TODO: Script를 page에 두면 그 page에만 Script 적용됨. Layout에 넣으면 onload 때문에 에러남. */}
        <Script
          defer
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.3.0/kakao.min.js"
          integrity="sha384-70k0rrouSYPWJt7q9rSTKpiTfX6USlMYjZUtr1Du+9o4cGvhPAWxngdtVZDdErlh"
          crossOrigin="anonymous"
          onLoad={initKakaoScript}
        />
      </Suspense>
    </PageLayout>
  );
}
