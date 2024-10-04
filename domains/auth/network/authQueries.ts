import axios from 'axios';
import { useQuery } from 'react-query';
import {
  ApiDataResponseTypeNew,
  UseQueryOptionsType
} from '@domains/common/types/utilType';
import BaseApi from '@logics/api/baseApi';
import { authQueryKeys } from '../constants/queryKeys';

const userApi = new BaseApi('');

interface UserProfileDataType {
  nickname: string;
  img: string | null;
}

export const useFetchUserProfileQuery = (
  options?: Omit<UseQueryOptionsType<UserProfileDataType>, 'select'>
) => {
  return useQuery({
    queryKey: authQueryKeys.getUserProfile(),
    queryFn: async () => {
      const data =
        await userApi.get<ApiDataResponseTypeNew<UserProfileDataType>>('/data');
      return data;
    },
    ...options,
    select: ({ data }) => data
  });
};

export const useFetchUserUnlinkQuery = (
  options?: Omit<UseQueryOptionsType<void>, 'select'>
) => {
  return useQuery({
    queryKey: authQueryKeys.unlinkUser(),
    queryFn: async () => {
      const data = await axios.get<void>('/unlink');
      return data;
    },
    ...options
  });
};
