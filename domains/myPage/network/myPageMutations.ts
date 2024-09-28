import axios from 'axios';
import { useMutation } from 'react-query';

export const usePatchUserNicknameMutation = () => {
  return useMutation({
    mutationFn: async (body: { nickName: string }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/nickName` ||
          '',
        body
      );
    }
  });
};

export const usePatchUserProfileImageMutation = () => {
  return useMutation({
    mutationFn: async (body: { imageUrl: string }) => {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/profile` ||
          '',
        body
      );
    }
  });
};
