import { EventListResponseDtoNew } from '@domains/category/types';
import { ApiDataResponseTypeNew } from '@domains/common/types/utilType';
import BaseApi from '@logics/api/baseApi';
import { BannerType } from '../types';

const homeApi = new BaseApi('');

export const getBannerList = () =>
  homeApi.get<ApiDataResponseTypeNew<BannerType[]>>('/banner');

export const getEventList = (
  status: string,
  param?: { page: number; size: number }
) =>
  homeApi.get<EventListResponseDtoNew>('/event', {
    params: {
      page: param?.page || 1,
      size: param?.size || 10,
      status
    }
  });
