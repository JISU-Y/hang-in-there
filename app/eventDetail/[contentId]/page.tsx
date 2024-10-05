import { Suspense } from 'react';
import { QueryClient } from 'react-query';

import PageLayout from '@domains/common/layouts/PageLayout';
import EventDetailPage from '@domains/eventDetail';
import { PageParamProps } from '@domains/common/types';
import { eventDetailQueryKeys } from '@domains/eventDetail/constants/queryKeys';
import axios, { AxiosResponse } from 'axios';
import { EventDetailResponseDto } from '@domains/eventDetail/types/detail';

const Detail = async ({ params }: PageParamProps<{ contentId: string }>) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: eventDetailQueryKeys.getEventDetail({
      contentId: params.contentId
    }),
    queryFn: async () => {
      const data = await axios.get<AxiosResponse<EventDetailResponseDto>>(
        `/event/${params.contentId}`
      );

      return data;
    },
    retry: 0
  });

  const detailData = queryClient.getQueryData<
    AxiosResponse<EventDetailResponseDto>
  >(eventDetailQueryKeys.getEventDetail({ contentId: params.contentId }));
  console.log('🚀 ~ Detail ~ detailData:', detailData);

  return (
    <PageLayout>
      <Suspense fallback={<div>fallback</div>}>
        <EventDetailPage contentId={params.contentId} />
      </Suspense>
    </PageLayout>
  );
};

export default Detail;
