import axios from 'axios';
import { useMutation } from 'react-query';

export const useCreateViewCountMutation = () => {
  return useMutation({
    mutationFn: async (body: { eventId: number }) => {
      await axios.post(
        `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/event/view-count` ||
          '',
        body
      );
    }
  });
};
