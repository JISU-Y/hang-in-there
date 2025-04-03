import { useMutation, useQueryClient } from '@tanstack/react-query';
import BaseApi from '@logics/api/baseApi';

import { CreatePostRequestDto } from '../types';
import { communityQueryKeys } from '../constants/queryKeys';

const communityApi = new BaseApi('');

// 글 작성 뮤테이션
export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: async (data: CreatePostRequestDto) => {
      await communityApi.post<void>('/posts', data);
    }
  });
};

// 글 수정 뮤테이션
// export const useUpdatePostMutation = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (data: UpdatePostRequestDto) => {
//       const response = await communityApi.put<{ data: CommunityPostType }>(
//         `/community/posts/${data.post_id}`,
//         data
//       );
//       return response.data;
//     },
//     onSuccess: (_, variables) => {
//       queryClient.invalidateQueries({
//         queryKey: communityQueryKeys.post(variables.post_id)
//       });
//       queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts() });
//     }
//   });
// };

// 글 삭제 뮤테이션
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      await communityApi.delete(`/community/posts/${postId}`);
      return postId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts() });
    }
  });
};

// 게시글 좋아요 토글 뮤테이션
export const useTogglePostLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postId: number) => {
      type LikeResponse = { data: { isLiked: boolean } };
      const response = await communityApi.post<LikeResponse>(
        `/community/posts/${postId}/like`
      );
      return { postId, isLiked: response.data.isLiked };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: communityQueryKeys.posts() });
    }
  });
};
