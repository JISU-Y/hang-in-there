import axios from 'axios';
import { useQuery } from 'react-query';
import { EventDetailResponseDto } from '../types/detail';
import { UseQueryOptionsType } from '@src/common/types/utilType';

export const useFetchEventDetailQuery = (
  contentId: number,
  options?: Omit<UseQueryOptionsType<EventDetailResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventDetail/${contentId}`,
    queryFn: async () => {
      const data = await axios.get<EventDetailResponseDto>(
        `${
          import.meta.env.VITE_HANGINTHERE_API_END_POINT
        }/v1/admin/event/${contentId}` || ''
      );

      return data;
    },
    ...options,
    select: ({ data }) => data.data
  });
};
