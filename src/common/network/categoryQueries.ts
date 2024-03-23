import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiDataResponseType } from '@src/common/types/utilType';

export interface CategoryType {
  code: string;
  name: string;
  rnum: number;
}

export const useFetchCategoriesQuery = (params: {
  numOfRows: number;
  areaCode?: string;
  sigunguCode?: string;
  eventStartDate: string;
  pageNo: number;
}) => {
  return useQuery({
    queryKey: `getEventList/${params.eventStartDate}/${params.areaCode}`,
    queryFn: async () => {
      const data = await axios.get<ApiDataResponseType<CategoryType>>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/searchFestival1` || '',
        {
          params: {
            ...params,
            _type: 'json',
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY
          }
        }
      );
      return data;
    },
    select: ({ data }) => data.response.body.items.item
  });
};
