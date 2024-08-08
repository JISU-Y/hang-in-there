import axios from 'axios';
import { useInfiniteQuery, useQuery } from 'react-query';
import {
  EventListRequestDtoNew,
  EventListResponseDto,
  EventListResponseDtoNew,
  NearEventListRequestDto
} from '../types';
import { UseQueryOptionsType } from '@domains/common/types/utilType';

export const useFetchNearEventListQuery = (
  params: {
    mapX: string;
    mapY: string;
  },
  options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getNearEventList/${params.mapX}/${params.mapY}`,
    queryFn: async () => {
      const data = await axios.get<EventListResponseDto>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event/local` ||
          '',
        {
          params: {
            currentLat: params.mapY,
            currentLng: params.mapX,
            distance: 5000 // 반경 5KM 이내
          } as NearEventListRequestDto
        }
      );
      return data;
    },
    select: ({ data }) => data.data, //.response.body.items.item,
    ...options,
    enabled: !!params.mapX && !!params.mapY
  });
};

export const useFetchEventListInfiniteQuery = (params: {
  area_cd?: string;
  sigungu_cd?: string;
  sub_category?: string;
  detail_sub_category?: string;
  title?: string;
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
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event` ||
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
    getNextPageParam: lastPage => lastPage.data.pagination?.page + 1,
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data.data).filter(el => el),
      pageParams,
      total: pages[0].data.pagination
    })
  });
};

// export const useFetchNearEventListInfiniteQuery = (
//   params: {
//     numOfRows: number;
//     pageNo: number;
//     mapX: string;
//     mapY: string;
//   },
//   options?: Omit<UseQueryOptionsType<EventListResponseDto>, 'select'>
// ) => {
//   return useInfiniteQuery({
//     queryKey: `getNearEventList/${params.mapX}/${params.mapY}`,
//     queryFn: async ({ pageParam = params.pageNo }) => {
//       const data = await axios.get<EventListResponseDto>(
//         `${process.env.NEXT_PUBLIC_TOUR_API_END_POINT}/locationBasedList1` || '',
//         {
//           params: {
//             ...params,
//             pageNo: pageParam,
//             _type: 'json',
//             serviceKey: process.env.NEXT_PUBLIC_TOUR_API_KEY,
//             contentTypeId: 15,
//             MobileOS: 'ETC',
//             MobileApp: 'hanginthere',
//             radius: '5000' // 반경 5KM 이내
//           } as NearEventListRequestDto
//         }
//       );
//       return data;
//     },
//     getNextPageParam: lastPage => lastPage.data.response?.body.pageNo + 1,
//     select: ({ pages, pageParams }) => ({
//       pages: pages
//         .flatMap(({ data }) => data.response?.body.items.item)
//         .filter(el => el),
//       pageParams
//     }),
//     ...options,
//     enabled: !!params.mapX && !!params.mapY
//   });
// };
