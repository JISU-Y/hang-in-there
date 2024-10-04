import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import MyPageComponent from '@domains/myPage';
import { getAccessToken } from '@domains/auth/utils/authTokenHandler';
import { redirect } from 'next/navigation';

const MyPage = () => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    redirect('/');
  }

  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <MyPageComponent />
      </Suspense>
    </PageLayout>
  );
};

export default MyPage;
