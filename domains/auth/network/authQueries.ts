import { useEffect, useState } from 'react';
import axios from 'axios';
import { useQuery, UseQueryOptions } from 'react-query';
import {
  ApiDataResponseTypeNew,
  UseQueryOptionsType
} from '@domains/common/types/utilType';
import { getAccessToken } from '../utils/authTokenHandler';

interface UserProfileDataType {
  nickname: string;
  img: string | null;
}

export const useFetchUserProfileQuery = (
  options?: Omit<UseQueryOptionsType<UserProfileDataType>, 'select'>
) => {
  const accessToken = getAccessToken(); // TODO: 공통 axios 인스턴스로 묶기

  return useQuery({
    queryKey: 'user-profile',
    queryFn: async () => {
      const data = await axios.get<ApiDataResponseTypeNew<UserProfileDataType>>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/data` ||
          '',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    },
    ...options,
    select: ({ data }) => data.data
  });
};

export const useFetchUserUnlinkQuery = (
  options?: Omit<UseQueryOptionsType<void>, 'select'>
) => {
  const accessToken = getAccessToken();

  return useQuery({
    queryKey: 'user-unlink',
    queryFn: async () => {
      const data = await axios.get<void>(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/unlink` ||
          '',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    },
    ...options
  });
};

export const useReissueTokenQuery = (options?: UseQueryOptions) => {
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storageAccessToken = localStorage.getItem('accessToken');

    setAccessToken(storageAccessToken || '');
  }, []);

  return useQuery({
    queryKey: 'token-reissue',
    queryFn: async () => {
      const data = await axios.get(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/reissue` ||
          '',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
      return data;
    },
    ...options,
    enabled: false
  });
};
