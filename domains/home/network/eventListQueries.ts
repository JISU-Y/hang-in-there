import { useQuery } from '@tanstack/react-query';

import { UseQueryOptionsType } from '@domains/common/types/utilType';

import { EventListResponseDto } from '../types';
import { homeQueryKeys } from '../constants/queryKeys';
import { getEventList } from './eventListFetchHandlers';

export const useFetchOngoingEventListQuery = (
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: homeQueryKeys.getOngoingEventList(),
    queryFn: async () => await getEventList('on_going'),
    ...options,
    select: ({ data }) => data
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
    queryFn: async () =>
      await getEventList('up_comming', {
        page: params.page,
        size: params.size
      }),
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
