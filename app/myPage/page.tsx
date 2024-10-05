import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import MyPageComponent from '@domains/myPage';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { COOKIE_KEY } from '@domains/common/constants/cookieKeys';

const MyPage = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get(COOKIE_KEY.ACCESS_TOKEN)?.value;

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
