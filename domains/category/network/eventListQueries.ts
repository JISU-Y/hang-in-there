import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { omit } from 'lodash';

import BaseApi from '@logics/api/baseApi';
import { UseQueryOptionsType } from '@domains/common/types/utilType';

import {
  EventListRequestDtoNew,
  EventListResponseDto,
  EventListResponseDtoNew,
  NearEventListRequestDto
} from '../types';
import { eventListQueryKeys } from '../constants/queryKeys';

const eventListApi = new BaseApi('');

export const useFetchNearEventListQuery = (
  params: {
    mapX: string;
    mapY: string;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: eventListQueryKeys.getNearEventList(params),
    queryFn: async () => {
      const data = await eventListApi.get<EventListResponseDto>(
        '/event/local',
        {
          params: {
            currentLat: params.mapY,
            currentLng: params.mapX,
            distance: 5000 // NOTE: 반경 5KM 이내
          } as NearEventListRequestDto
        }
      );
      return data;
    },
    ...options,
    select: ({ data }) => data,
    enabled: !!params.mapX && !!params.mapY
  });
};

export const useFetchEventListInfiniteQuery = (params: {
  area_cd?: string;
  sigungu_cd?: string;
  sub_category?: string;
  detail_sub_category?: string;
  title?: string;
  status: string;
  size: number;
  page: number;
}) => {
  return useInfiniteQuery({
    queryKey: eventListQueryKeys.getNearEventList(
      omit(params, ['size', 'page']) // NOTE: infinite query 사용 시 size와 page 별로 query key를 구분하면 잘 동작하지 않음.
    ),
    queryFn: async ({ pageParam = params.page }) => {
      const data = await axios.get<EventListResponseDtoNew>('/event', {
        params: {
          ...params,
          category: '264', // A02
          page: pageParam
        } as EventListRequestDtoNew
      });

      return data;
    },
    getNextPageParam: lastPage => {
      const { totalPage, page: currentPage } = lastPage.data.pagination;

      if (currentPage >= totalPage) return null;

      return currentPage + 1;
    },
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data.data).filter(el => el),
      pageParams,
      total: pages[0].data.pagination
    })
  });
};
