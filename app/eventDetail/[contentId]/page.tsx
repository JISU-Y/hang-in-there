import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import EventDetailPage from '@domains/eventDetail';

const Detail = () => {
  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <EventDetailPage />
      </Suspense>
    </PageLayout>
  );
};

export default Detail;
