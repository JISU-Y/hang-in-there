import axios from 'axios';
import { useQuery } from 'react-query';
import { EventListResponseDto } from '../types';
import { UseQueryOptionsType } from '@src/common/types/utilType';
import {
  EventListRequestDtoNew,
  EventListResponseDtoNew
} from '@src/pages/category/types';

export const useFetchEventListQuery = (
  params: {
    area_cd?: string;
    sigungu_cd?: string;
    sub_category?: string;
    detail_sub_category?: string;
    size: number;
    page: number;
    status: string;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventList/${params.status}`,
    queryFn: async ({ pageParam = params.page }) => {
      const data = await axios.get<EventListResponseDtoNew>(
        `${import.meta.env.VITE_HANGINTHERE_API_END_POINT}/v1/admin/event` ||
          '',
        {
          params: {
            ...params,
            category: '264', // A02
            page: pageParam
          } as EventListRequestDtoNew
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
