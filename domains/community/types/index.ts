import {
  ApiDataResponseTypeNew,
  ApiPaginationDataResponseType
} from '@domains/common/types/utilType';

export interface PostListType {
  createId: string;
  createDt: string;
  updateDt: string;
  idx: string;
  boardIdx: number;
  title: string;
  like: number;
  viewCount: number;
  tags: string[];
  images: string[];
  useYn: string;
}

export interface PostDetailType {
  createId: string;
  createDt: string;
  updateDt: string;
  idx: string;
  boardIdx: number;
  title: string;
  content: string;
  like: number;
  viewCount: number;
  tags: string[];
  images: string[];
  useYn: string;
}

export interface CreatePostRequestDto {
  boardIdx: number;
  title: string;
  content: string;
  tags: string[];
  images: string[];
}

export interface UpdatePostRequestDto {
  boardIdx: number;
  title: string;
  content: string;
  tags: string[];
  images: string[];
}

export type PostListResponseDto = ApiPaginationDataResponseType<PostListType[]>;

export type PostDetailResponseDto = ApiDataResponseTypeNew<PostDetailType>;

export interface PostListRequestDto {
  page: number;
  size: number;
  boardIdx: number;
  title?: string;
  content?: string;
  tags?: string;
  order?: 'createDt' | 'viewCount' | 'like';
}

export interface PostTagListRequestDto {
  tags?: string;
}

export interface PostTagType {
  name: string;
}

export type PostTagListResponseDto = ApiDataResponseTypeNew<PostTagType[]>;
