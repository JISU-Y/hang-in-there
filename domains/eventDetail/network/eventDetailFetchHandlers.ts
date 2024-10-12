import BaseApi from '@logics/api/baseApi';
import {
  EventDetailResponseDto,
  EventListResponseDtoNew
} from '../types/detail';

const eventApi = new BaseApi('');

export const getEventDetail = (contentId: string) =>
  eventApi.get<EventDetailResponseDto>(`/event/${contentId}`);

export const getOtherEventList = ({ area_cd }: { area_cd?: number }) =>
  eventApi.get<EventListResponseDtoNew>('/event', {
    params: {
      area_cd,
      // NOTE: 이 주변 event 파라미터 고정
      page: 1,
      size: 10,
      category: '264', // A02
      status: 'on_going,up_comming'
    }
  });
