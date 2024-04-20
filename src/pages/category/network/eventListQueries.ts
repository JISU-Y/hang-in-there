import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  AreaCodeRequestDto,
  AreaCodeResponseDto,
  EventListRequestDto,
  EventListResponseDto,
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
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            radius: '5000' // 반경 5KM 이내
          } as NearEventListRequestDto
        }
      );
      return data;
    },
    getNextPageParam: lastPage => lastPage.data.response.body.pageNo + 1,
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data.response.body.items.item),
      pageParams
    }),
    ...options
  });
};

export const useFetchEventListInfiniteQuery = (params: {
  numOfRows: number;
  areaCode?: string;
  sigunguCode?: string;
  eventStartDate: string;
  eventEndDate?: string;
  pageNo: number;
}) => {
  return useInfiniteQuery({
    queryKey: [`getEventList/${params.eventStartDate}/${params.areaCode}`],
    queryFn: async ({ pageParam = params.pageNo }) => {
      const data = await axios.get<EventListResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/searchFestival1` || '',
        {
          params: {
            ...params,
            pageNo: pageParam,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            arrange: 'R',
            MobileOS: 'ETC',
            MobileApp: 'hanginthere'
          } as EventListRequestDto
        }
      );
      return data;
    },
    getNextPageParam: lastPage => lastPage.data.response.body.pageNo + 1,
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data.response.body.items.item),
      pageParams
    })
  });
};
