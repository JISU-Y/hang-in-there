import axios from 'axios';
import { useQuery } from 'react-query';
import { EventListRequestDto, EventListResponseDto } from '../types';
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
