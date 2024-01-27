import axios from 'axios';
import { useQuery } from 'react-query';
import {
  EventCommonDetailRequestDto,
  EventCommonDetailResponseDto,
  EventDetailImageRequestDto,
  EventDetailImageResponseDto,
  EventDetailIntroRequestDto,
  EventDetailIntroResponseDto
} from '../types/detail';
import { UseQueryOptionsType } from '@src/common/types/utilType';

// TODO: useQueries 로 변경
export const useFetchEventDetailQuery = (
  contentId: EventCommonDetailRequestDto['contentId'],
  options?: Omit<UseQueryOptionsType<EventCommonDetailResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventDetail/${contentId}`,
    queryFn: async () => {
      const data = await axios.get<EventCommonDetailResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/detailCommon1` || '',
        {
          params: {
            contentId,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            defaultYN: 'Y',
            firstImageYN: 'Y',
            areacodeYN: 'Y',
            catcodeYN: 'Y',
            addrinfoYN: 'Y',
            mapinfoYN: 'Y',
            overviewYN: 'Y'
          }
        }
      );
      return data;
    },
    ...options,
    enabled: !!contentId,
    select: ({ data }) => data.response.body.items.item?.[0]
  });
};

export const useFetchEventDetailIntroQuery = (
  contentId: EventDetailIntroRequestDto['contentId'],
  options?: Omit<UseQueryOptionsType<EventDetailIntroResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventDetail/intro/${contentId}`,
    queryFn: async () => {
      const data = await axios.get<EventDetailIntroResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/detailIntro1` || '',
        {
          params: {
            contentId,
            contentTypeId: 15,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere'
          } as EventCommonDetailRequestDto
        }
      );
      return data;
    },
    ...options,
    enabled: !!contentId,
    select: ({ data }) => data.response.body.items.item?.[0]
  });
};

export const useFetchEventDetailImageQuery = (
  contentId: EventDetailImageRequestDto['contentId'],
  options?: Omit<UseQueryOptionsType<EventDetailImageResponseDto>, 'select'>
) => {
  return useQuery({
    queryKey: `getEventDetail/imageList/${contentId}`,
    queryFn: async () => {
      const data = await axios.get<EventDetailImageResponseDto>(
        `${import.meta.env.VITE_TOUR_API_END_POINT}/detailImage1` || '',
        {
          params: {
            contentId,
            _type: 'json',
            serviceKey: import.meta.env.VITE_TOUR_API_KEY,
            MobileOS: 'ETC',
            MobileApp: 'hanginthere',
            imageYN: 'Y',
            subImageYN: 'Y'
          } as EventDetailImageRequestDto
        }
      );
      return data;
    },
    ...options,
    enabled: !!contentId,
    select: ({ data }) => data.response.body.items.item
  });
};
