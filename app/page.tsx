import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import HomePage from '@domains/home';

export default function Page() {
  return (
    <PageLayout withLineBanner>
      <Suspense fallback={<div>fallback</div>}>
        <HomePage />
      </Suspense>
    </PageLayout>
  );
}
