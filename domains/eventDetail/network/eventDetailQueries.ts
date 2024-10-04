import { useQuery } from 'react-query';

import { UseQueryOptionsType } from '@domains/common/types/utilType';
import BaseApi from '@logics/api/baseApi';

import {
  EventDetailResponseDto,
  EventListResponseDtoNew
} from '../types/detail';
import { eventDetailQueryKeys } from '../constants/queryKeys';

const eventApi = new BaseApi('');

export const useFetchEventDetailQuery = (
  contentId: number,
  options?: Omit<UseQueryOptionsType<EventDetailResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: eventDetailQueryKeys.getEventDetail({ contentId }),
    queryFn: async () => {
      const data = await eventApi.get<EventDetailResponseDto>(
        `/event/${contentId}`
      );

      return data;
    },
    ...options,
    select: ({ data }) => data
  });
};

export const useFetchOtherEventListQuery = (
  eventId: number,
  area_cd?: number,
  options?: Omit<UseQueryOptionsType<EventListResponseDtoNew>, 'select'>
) => {
  return useQuery({
    queryKey: eventDetailQueryKeys.getOngoingEventList({ eventId, area_cd }),
    queryFn: async ({ pageParam = 1 }) => {
      const data = await eventApi.get<EventListResponseDtoNew>('/event', {
        params: {
          category: '264', // A02
          // NOTE: 이 주변 event 파라미터 고정
          area_cd,
          size: 10,
          page: pageParam,
          status: 'on_going,up_comming'
        }
      });
      return data;
    },

    ...options,
    select: ({ data, pagination }) => ({
      list: data.filter(el => el.event_id !== eventId),
      pageInfo: {
        currentPage: pagination.page,
        totalPage: pagination.totalPage,
        totalCount: pagination.totalItem
      }
    })
  });
};
