import { EventListResponseDtoNew } from '@domains/category/types';
import BaseApi from '@logics/api/baseApi';

const homeApi = new BaseApi('');

export const getEventList = (
  status: string,
  param?: { page: number; size: number }
) =>
  homeApi.get<EventListResponseDtoNew>('/event', {
    params: {
      page: param?.page || 1,
      size: param?.size || 10,
      // NOTE: on_going event 파라미터 고정
      category: '264', // A02
      status
    }
  });
