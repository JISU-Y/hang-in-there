import { AxiosResponse } from 'axios';
import { UseQueryOptions } from '@tanstack/react-query';

/* API 이용 데이터 요청 시 정형화된 ResponseType을 만드는 유틸 타입 */
export interface ApiDataResponseType<T> {
  response: {
    body: {
      items: { item: T };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}

export interface ApiDataResponseTypeNew<T> {
  data: T;
  message: string;
  timeStamp: string;
}

export interface PaginationType {
  totalItem: number;
  totalPage: number;
  size: number;
  page: number;
}

export interface ApiPaginationDataResponseType<T> {
  data: T;
  pagination: PaginationType;
  message: string;
  timeStamp: string;
}

/* UseQuery 커스텀 훅 만들 때 options 인자의 타이핑을 도와주는 유틸 타입 */
export type UseQueryOptionsType<T> =
  T extends AxiosResponse<infer TData>
    ? UseQueryOptions<T, unknown, TData>
    : unknown;
