import { useQuery } from 'react-query';

import { UseQueryOptionsType } from '@domains/common/types/utilType';
import { EventListResponseDtoNew } from '@domains/category/types';
import BaseApi from '@logics/api/baseApi';

import { EventListResponseDto } from '../types';
import { homeQueryKeys } from '../constants/queryKeys';

const homeApi = new BaseApi('');

export const useFetchOngoingEventListQuery = (
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: homeQueryKeys.getOngoingEventList(),
    queryFn: async ({ pageParam = 1 }) => {
      const data = await homeApi.get<EventListResponseDtoNew>('/event', {
        params: {
          category: '264', // A02
          // NOTE: on_going event 파라미터 고정
          size: 10,
          page: pageParam,
          status: 'on_going'
        }
      });
      return data;
    },
    ...options,
    select: ({ data, pagination }) => ({
      list: data,
      pageInfo: {
        currentPage: pagination.page,
        totalPage: pagination.totalPage,
        totalCount: pagination.totalItem
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
    queryKey: homeQueryKeys.getUpcomingEventList(params),
    queryFn: async ({ pageParam = params.page }) => {
      const data = await homeApi.get<EventListResponseDtoNew>(
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
    select: ({ data, pagination }) => ({
      list: data,
      pageInfo: {
        currentPage: pagination.page,
        totalPage: pagination.totalPage,
        totalCount: pagination.totalItem
      }
    })
  });
};
