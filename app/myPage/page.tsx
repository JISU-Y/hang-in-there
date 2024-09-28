import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import MyPageComponent from '@domains/myPage';

const MyPage = () => {
  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <MyPageComponent />
      </Suspense>
    </PageLayout>
  );
};

export default MyPage;
