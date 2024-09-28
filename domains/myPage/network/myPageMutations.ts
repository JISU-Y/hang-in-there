import { getAccessToken } from '@domains/auth/utils/authTokenHandler';
import axios from 'axios';
import { useMutation } from 'react-query';

export const usePatchUserNicknameMutation = () => {
  const accessToken = getAccessToken();

  return useMutation({
    mutationFn: async (body: { nickName: string }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/nickName` ||
          '',
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
    }
  });
};

export const usePatchUserProfileImageMutation = () => {
  const accessToken = getAccessToken();

  return useMutation({
    mutationFn: async (body: { imageUrl: string }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/profile` ||
          '',
        body,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        }
      );
    }
  });
};
