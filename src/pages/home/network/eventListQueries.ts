import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import { EventListRequestDto, EventListResponseDto } from '../types';
import { UseQueryOptionsType } from '@src/common/types/utilType';
import { isAfter } from 'date-fns/isAfter';
import { parse } from 'date-fns/parse';

export const useFetchEventListQuery = (
  params: {
    numOfRows: number;
    areaCode?: string;
    sigunguCode?: string;
    eventStartDate: string;
    eventEndDate?: string;
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
            arrange: 'R',
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
      pages: pages
        .flatMap(({ data }) => data.response.body.items.item)
        .filter(
          ({ eventstartdate }) =>
            isAfter(parse(eventstartdate, 'yyyyMMdd', new Date()), new Date()) // NOTE: 행사 시작 날짜가 오늘 날짜보다 후일 때 진행 예정 행사로 처리
        ),
      pageParams
    })
  });
};
