import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import BaseApi from '@logics/api/baseApi';
import { UseQueryOptionsType } from '@domains/common/types/utilType';

import {
  PostDetailResponseDto,
  PostListRequestDto,
  PostListResponseDto,
  PostTagListRequestDto,
  PostTagListResponseDto
} from '../types';
import { communityQueryKeys } from '../constants/queryKeys';

const communityApi = new BaseApi('');

// 게시글 목록 조회 (무한 스크롤)
export const useFetchPostListInfiniteQuery = (params: PostListRequestDto) => {
  return useInfiniteQuery({
    queryKey: communityQueryKeys.posts({ params }),
    queryFn: async ({ pageParam = params.page }) => {
      const data = await communityApi.get<PostListResponseDto>('/posts', {
        params: {
          ...params,
          page: pageParam
        }
      });
      return data;
    },
    getNextPageParam: lastPage => {
      const { totalPage, page: currentPage } = lastPage.pagination;

      if (currentPage >= totalPage) return null;

      return Number(currentPage) + 1;
    },
    initialPageParam: 1,
    select: ({ pages, pageParams }) => ({
      pages: pages.flatMap(({ data }) => data).filter(el => el),
      pageParams,
      total: pages[0].pagination
    })
  });
};

// 게시글 상세 조회
export const useFetchPostDetailQuery = (
  postId: number | string,
  options?: Omit<UseQueryOptionsType<PostDetailResponseDto>, 'select'>
) => {
  return useQuery<
    PostDetailResponseDto,
    unknown,
    PostDetailResponseDto['data'][0]
  >({
    queryKey: communityQueryKeys.postDetail({ postId }),
    queryFn: async () => {
      const data = await communityApi.get<PostDetailResponseDto>(
        `/posts/${postId}`
      );
      return data;
    },
    ...options,
    select: ({ data }) => data[0]
  });
};

// 게시글 태그 조회
export const useFetchPostTagListQuery = (
  params?: PostTagListRequestDto,
  options?: Omit<UseQueryOptionsType<PostTagListResponseDto>, 'select'>
) => {
  return useQuery<
    PostTagListResponseDto,
    unknown,
    PostTagListResponseDto['data']
  >({
    queryKey: communityQueryKeys.postTags(params && { params }),
    queryFn: async () => {
      const data = await communityApi.get<PostTagListResponseDto>(
        '/posts/tags',
        { params }
      );
      return data;
    },
    ...options,
    select: ({ data }) => [
      { name: '안녕' },
      { name: '하세요' },
      { name: 'ㄹㄹ' },
      { name: '하요' }
    ] // data,
  });
};
