import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import { PageParamProps } from '@domains/common/types';
import { eventDetailQueryKeys } from '@domains/eventDetail/constants/queryKeys';
import { getEventDetail } from '@domains/eventDetail/network/eventDetailFetchHandlers';
import { getDehydratedQuery, Hydrate } from '@logics/utils/reactQuery';
import EventDetailPage from '@domains/eventDetail';

const Detail = async ({ params }: PageParamProps<{ contentId: string }>) => {
  const query = await getDehydratedQuery({
    queryKey: eventDetailQueryKeys.getEventDetail({
      contentId: params.contentId
    }),
    queryFn: async () => await getEventDetail(params.contentId)
  });

  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <Hydrate state={{ queries: [query] }}>
          <EventDetailPage contentId={params.contentId} />
        </Hydrate>
      </Suspense>
    </PageLayout>
  );
};

export default Detail;
