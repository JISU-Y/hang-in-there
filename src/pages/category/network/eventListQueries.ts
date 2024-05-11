import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  AreaCodeRequestDto,
  AreaCodeResponseDto,
  EventListRequestDto,
  EventListRequestDtoNew,
  EventListResponseDto,
  EventListResponseDtoNew,
  NearEventListRequestDto
} from '../types';
import { UseQueryOptionsType } from '@src/common/types/utilType';

export const useFetchEventListQuery = (
  params: {
    numOfRows: number;
    areaCode?: string;
    sigunguCode?: string;
    eventStartDate: string;
    pageNo: number;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventList/${params.eventStartDate}/${params.areaCode}`,
    queryFn: async () => {
      const data = await axios.get<EventListResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/searchFestival1` || '',
        {
          params: {
            ...params,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere'
          } as EventListRequestDto
        }
      );
      return data;
    },
    ...options,
    select: ({ data }) => data.response.body.items.item
  });
};

export const useFetchAreaCodeListQuery = (
  areaCode: AreaCodeRequestDto['areaCode'],
  options?: Omit<UseQueryOptionsType<AreaCodeResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: 'getAreaCode',
    queryFn: async () => {
      const data = await axios.get<AreaCodeResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/areaCode1` || '',
        {
          params: {
            areaCode,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            numOfRows: 30
          } as AreaCodeRequestDto
        }
      );
      return data;
    },
    ...options,
    select: ({ data }) =>
      data.response.body.items.item.map(({ code, name }) => ({
        code: `${areaCode}-${code}`,
        name
      }))
  });
};

export const useFetchNearEventListInfiniteQuery = (
  params: {
    numOfRows: number;
    pageNo: number;
    mapX: string;
    mapY: string;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useInfiniteQuery({
    queryKey: `getNearEventList/${params.mapX}/${params.mapY}`,
    queryFn: async ({ pageParam = params.pageNo }) => {
      const data = await axios.get<EventListResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/locationBasedList1` || '',
        {
          params: {
            ...params,
            pageNo: pageParam,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            contentTypeId: 15,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            radius: '5000' // 반경 5KM 이내
          } as NearEventListRequestDto
        }
      );
      return data;
    },
    getNextPageParam: lastPage => lastPage.data.response?.body.pageNo + 1,
    select: ({ pages, pageParams }) => ({
      pages: pages
        .flatMap(({ data }) => data.response?.body.items.item)
        .filter(el => el),
      pageParams
    }),
    ...options,
    enabled: !!params.mapX && !!params.mapY
  });
};

export const useFetchEventListInfiniteQuery = (params: {
  area_cd?: string;
  sigungu_cd?: string;
  sub_category?: string;
  detail_sub_category?: string;
  size: number;
  page: number;
  status: string;
}) => {
  return useInfiniteQuery({
    queryKey: [
      `event/${params.area_cd}/${params.status}/${params.sigungu_cd}/${params.sub_category}/${params.detail_sub_category}`
    ],
    queryFn: async ({ pageParam = params.page }) => {
      const data = await axios.get<EventListResponseDtoNew>(
        `/api/v1/user/event` || '',
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
    getNextPageParam: lastPage => lastPage.data.pagination.page + 1,
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data.data),
      pageParams
    })
  });
};
