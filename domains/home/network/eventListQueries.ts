import axios from 'axios';
import { useQuery } from 'react-query';

import { UseQueryOptionsType } from '@domains/common/types/utilType';
import { EventListResponseDtoNew } from '@domains/category/types';

import { EventListResponseDto } from '../types';

export const useFetchOngoingEventListQuery = (
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
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
            // NOTE: on_going event 파라미터 고정
            size: 10,
            page: pageParam,
            status: 'on_going'
          }
        }
      );
      return data;
    },

    ...options,
    select: ({ data }) => ({
      list: data.data,
      pageInfo: {
        currentPage: data.pagination.page,
        totalPage: data.pagination.totalPage,
        totalCount: data.pagination.totalItem
      }
    })
  });
};

export const useFetchUpcomingEventListQuery = (
  params: {
    size: number;
    page: number;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventList/upcomingEvents/${params.size}/${params.page}`,
    queryFn: async ({ pageParam = params.page }) => {
      const data = await axios.get<EventListResponseDtoNew>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event` ||
          '',
        {
          params: {
            ...params,
            status: 'up_comming',
            category: '264', // A02
            page: pageParam
          }
        }
      );
      return data;
    },

    ...options,
    select: ({ data }) => ({
      list: data.data,
      pageInfo: {
        currentPage: data.pagination.page,
        totalPage: data.pagination.totalPage,
        totalCount: data.pagination.totalItem
      }
    })
  });
};
