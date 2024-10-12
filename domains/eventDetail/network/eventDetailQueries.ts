import { useQuery } from '@tanstack/react-query';

import { UseQueryOptionsType } from '@domains/common/types/utilType';

import {
  EventDetailResponseDto,
  EventListResponseDtoNew
} from '../types/detail';
import { eventDetailQueryKeys } from '../constants/queryKeys';
import { getEventDetail, getOtherEventList } from './eventDetailFetchHandlers';

export const useFetchEventDetailQuery = (
  contentId: string,
  options?: Omit<UseQueryOptionsType<EventDetailResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: eventDetailQueryKeys.getEventDetail({ contentId }),
    queryFn: async () => await getEventDetail(contentId),
    ...options,
    select: ({ data }) => data
  });
};

export const useFetchOtherEventListQuery = (
  eventId: number,
  area_cd?: number,
  options?: Omit<
    UseQueryOptionsType<EventListResponseDtoNew>,
    'select' | 'enabled'
  >
) => {
  return useQuery({
    queryKey: eventDetailQueryKeys.getOngoingEventList({ area_cd }),
    queryFn: async () => await getOtherEventList({ area_cd }),
    ...options,
    enabled: !!area_cd,
    select: response => {
      const { data, pagination } = response;
      return {
        list: data.filter(el => el.event_id !== eventId),
        pagination: {
          page: pagination.page,
          totalPage: pagination.totalPage,
          totalItem: pagination.totalItem,
          size: pagination.size
        }
      };
    }
  });
};
