import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import BaseApi from '@logics/api/baseApi';
import { UseQueryOptionsType } from '@domains/common/types/utilType';

import {
  PostDetailResponseDto,
  PostListRequestDto,
  PostTagListRequestDto,
  PostTagListResponseDto
} from '../types';
import { communityQueryKeys } from '../constants/queryKeys';
// Mock data import
import {
  createMockPostListResponse,
  createMockPostTagListResponse,
  createMockPostDetailResponse,
  generateLargeMockDataSet
} from '../mocks/communityMockData';

const communityApi = new BaseApi('');

// 게시글 목록 조회 (무한 스크롤)
export const useFetchPostListInfiniteQuery = (params: PostListRequestDto) => {
  return useInfiniteQuery({
    queryKey: communityQueryKeys.posts({ params }),
    queryFn: async ({ pageParam = params.page }) => {
      // 실제 API 호출 (현재 주석 처리)
      // const data = await communityApi.get<PostListResponseDto>('/posts', {
      //   params: {
      //     ...params,
      //     page: pageParam
      //   }
      // });
      // return data;

      // Mock data 사용
      await new Promise(resolve => setTimeout(resolve, 500)); // 로딩 시뮬레이션

      // 대량의 mock data 생성 (무한 스크롤 테스트용)
      const allPosts = generateLargeMockDataSet(50); // 총 50개의 포스트 생성

      // 태그 필터링
      let filteredPosts = allPosts;
      if (params.tags) {
        const tagArray = params.tags.split(',');
        filteredPosts = allPosts.filter(post =>
          post.tags.some(tag => tagArray.includes(tag))
        );
      }

      return createMockPostListResponse(
        undefined, // posts 파라미터는 사용하지 않음
        pageParam,
        params.size,
        filteredPosts // 전체 포스트 배열 전달
      );
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
      // 실제 API 호출 (현재 주석 처리)
      // const data = await communityApi.get<PostDetailResponseDto>(
      //   `/posts/${postId}`
      // );
      // return data;

      // Mock data 사용
      await new Promise(resolve => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      return createMockPostDetailResponse();
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
      // 실제 API 호출 (현재 주석 처리)
      // const data = await communityApi.get<PostTagListResponseDto>(
      //   '/posts/tags',
      //   { params }
      // );
      // return data;

      // Mock data 사용
      await new Promise(resolve => setTimeout(resolve, 200)); // 로딩 시뮬레이션
      return createMockPostTagListResponse(undefined, params?.tags);
    },
    ...options,
    select: ({ data }) => data
  });
};
