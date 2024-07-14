import axios from 'axios';
import { useQuery } from 'react-query';
import {
  EventDetailResponseDto,
  EventListResponseDtoNew
} from '../types/detail';
import { UseQueryOptionsType } from '@src/common/types/utilType';

export const useFetchEventDetailQuery = (
  contentId: number,
  options?: Omit<UseQueryOptionsType<EventDetailResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventDetail/${contentId}`,
    queryFn: async () => {
      const data = await axios.get<EventDetailResponseDto>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event/${contentId}` ||
          ''
      );

      return data;
    },
    ...options,
    select: ({ data }) => data.data
  });
};

export const useFetchOtherEventListQuery = (
  eventId: number,
  area_cd?: number,
  options?: Omit<UseQueryOptionsType<EventListResponseDtoNew>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventList/ongoingEvents`,
    queryFn: async ({ pageParam = 1 }) => {
      const data = await axios.get<EventListResponseDtoNew>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event` ||
          '',
        {
          params: {
            category: '264', // A02
            // NOTE: 이 주변 event 파라미터 고정
            area_cd,
            size: 10,
            page: pageParam,
            status: 'on_going,up_comming'
          }
        }
      );
      return data;
    },

    ...options,
    select: ({ data }) => ({
      list: data.data.filter(el => el.event_id !== eventId),
      pageInfo: {
        currentPage: data.pagination.page,
        totalPage: data.pagination.totalPage,
        totalCount: data.pagination.totalItem
      }
    })
  });
};
