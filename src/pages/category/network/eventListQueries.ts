import axios from 'axios';
import { useQuery } from 'react-query';
import { EventListResponseDto } from '../types';

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
