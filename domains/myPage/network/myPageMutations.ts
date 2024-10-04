import { useMutation } from 'react-query';

import BaseApi from '@logics/api/baseApi';

const myPageApi = new BaseApi('');

export const usePatchUserNicknameMutation = () => {
  return useMutation({
    mutationFn: async (body: { nickName: string }) => {
      await myPageApi.patch('/nickName', body);
    }
  });
};

export const usePatchUserProfileImageMutation = () => {
  return useMutation({
    mutationFn: async (body: { imageUrl: string }) => {
      await myPageApi.patch('/profile', body);
    }
  });
};
