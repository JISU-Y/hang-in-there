import axios from 'axios';
import { useQuery } from 'react-query';
import { ApiDataResponseTypeNew } from '../types/utilType';

export interface PopularEventDataType {
  title: string;
  address: string;
  view_count: number;
  create_dt: string;
  event_id: number;
}

export interface SearchEventResultType {
  title: string;
  event_id: number;
}

const DEFAULT_POPULAR_LIST = 5;
const SEARCH_EVENT_LIST = 5;

export const useFetchPopularEventListQuery = (size?: number) => {
  return useQuery({
    queryKey: 'getPopularEventList',
    queryFn: async () => {
      const data = await axios.get<
        ApiDataResponseTypeNew<PopularEventDataType[]>
      >(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event/popular`,
        {
          params: {
            size: size || DEFAULT_POPULAR_LIST
          }
        }
      );
      return data;
    },
    select: ({ data }) =>
      data.data.map((event, index) => ({
        ...event,
        rank: index + 1
      }))
  });
};

export const useFetchSearchEventResultQuery = (searchWord: string) => {
  return useQuery({
    queryKey: `getSearchEventResult/${searchWord}`,
    queryFn: async () => {
      const data = await axios.get<
        ApiDataResponseTypeNew<SearchEventResultType[]>
      >(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event/title-auto-completion`,
        {
          params: {
            title: searchWord,
            size: SEARCH_EVENT_LIST
          }
        }
      );
      return data;
    },
    select: ({ data }) => data.data
  });
};
