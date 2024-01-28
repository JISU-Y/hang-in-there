import axios from 'axios';
import { useQuery } from 'react-query';
import {
  AreaCodeRequestDto,
  AreaCodeResponseDto,
  EventListResponseDto
} from '../types';
import { UseQueryOptionsType } from '@src/common/types/utilType';

export const useFetchEventListQuery = (params: {
  numOfRows: number;
  eventStartDate: string;
  pageNo: number;
}) => {
  return useQuery(
    'getEventList',
    async () => {
      const data = await axios.get<EventListResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/searchFestival1` || '',
        {
          params: {
            ...params,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC', // ETC | AND | ...
            MobileApp: 'hanginthere'
          }
        }
      );
      return data;
    },
    {
      select: ({ data }) => data.response.body.items.item
    }
  );
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
            numOfRows: 20
          } as AreaCodeRequestDto
        }
      );
      return data;
    },
    ...options,
    select: ({ data }) => data.response.body.items.item
  });
};
