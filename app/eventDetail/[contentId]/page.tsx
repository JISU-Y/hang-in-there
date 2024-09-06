import { Suspense } from 'react';
import Script from 'next/script';

import PageLayout from '@domains/common/layouts/PageLayout';
import EventDetailPage from '@domains/eventDetail';

const Detail = () => {
  const initKakaoScript = () => {
    if (window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
    }
  };

  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <EventDetailPage />
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
};

export default Detail;
