import { useQuery, UseQueryOptions } from 'react-query';

import BaseApi from '@logics/api/baseApi';

import { ApiDataResponseTypeNew } from '../types/utilType';
import { commonQueryKeys } from '../constants/queryKeys';

const searchApi = new BaseApi('');

export interface PopularEventDataType {
  title: string;
  address: string;
  view_count: number;
  create_dt: string;
  event_id: number;
}

export interface SearchEventResultType {
  title: string;
  event_id: number;
}

const DEFAULT_POPULAR_LIST = 5;
const SEARCH_EVENT_LIST = 5;

export const useFetchPopularEventListQuery = (
  size?: number,
  options?: Omit<
    UseQueryOptions<
      ApiDataResponseTypeNew<PopularEventDataType[]>,
      unknown,
      PopularEventDataType[]
    >,
    'select'
  >
) => {
  return useQuery({
    queryKey: commonQueryKeys.getPopularEventList(),
    queryFn: async () => {
      const data = await searchApi.get<
        ApiDataResponseTypeNew<PopularEventDataType[]>
      >('/event/popular', {
        params: {
          size: size || DEFAULT_POPULAR_LIST
        }
      });
      return data;
    },
    ...options,
    select: ({ data }) =>
      data.map((event, index) => ({
        ...event,
        rank: index + 1
      }))
  });
};

export const useFetchSearchEventResultQuery = (
  searchWord: string,
  options?: Omit<
    UseQueryOptions<
      ApiDataResponseTypeNew<SearchEventResultType[]>,
      unknown,
      SearchEventResultType[]
    >,
    'select' | 'staleTime' | 'keepPreviousData' | 'placeholderData'
  >
) => {
  return useQuery({
    queryKey: commonQueryKeys.getSearchEventResult({ searchWord }),
    queryFn: async () => {
      const data = await searchApi.get<
        ApiDataResponseTypeNew<SearchEventResultType[]>
      >('/event/title-auto-completion', {
        params: {
          title: searchWord,
          size: SEARCH_EVENT_LIST
        }
      });
      return data;
    },
    ...options,
    staleTime: 500,
    select: ({ data }) => data
  });
};
