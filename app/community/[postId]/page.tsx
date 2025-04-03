'use client';

import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import styled from '@emotion/styled';
import { useFetchPostDetailQuery } from '@domains/community/network/communityQueries';
import {
  useDeletePostMutation,
  useTogglePostLikeMutation
} from '@domains/community/network/communityMutations';
import { formatDiffDate } from '@logics/utils/dateFormat';

interface CommunityDetailPageProps {
  params: {
    postId: string;
  };
}

export default function CommunityDetailPage({
  params
}: CommunityDetailPageProps) {
  const router = useRouter();
  const { postId } = params;

  // 게시글 조회
  const {
    data: post,
    isLoading,
    isError
  } = useFetchPostDetailQuery(postId, {
    enabled: !!postId && !isNaN(Number(postId))
  });

  // 뮤테이션 훅 사용
  const deletePostMutation = useDeletePostMutation();
  const toggleLikeMutation = useTogglePostLikeMutation();

  if (isNaN(Number(postId))) {
    notFound();
  }

  if (isLoading) {
    return <LoadingContainer>로딩 중...</LoadingContainer>;
  }

  if (isError || !post) {
    return <ErrorContainer>게시글을 불러오는 데 실패했습니다.</ErrorContainer>;
  }

  const handleDeleteClick = async () => {
    if (window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      try {
        await deletePostMutation.mutateAsync(Number(postId));
        alert('게시글이 삭제되었습니다.');
        router.push('/community');
      } catch (error) {
        console.error('게시글 삭제 오류:', error);
        alert('게시글 삭제에 실패했습니다.');
      }
    }
  };

  const handleLikeClick = async () => {
    try {
      await toggleLikeMutation.mutateAsync(Number(postId));
    } catch (error) {
      console.error('좋아요 토글 오류:', error);
      alert('좋아요 처리에 실패했습니다.');
    }
  };

  return (
    <Container>
      <PostContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <ActionButtons>
            <EditButton href={`/community/${postId}/edit`}>수정</EditButton>
            <DeleteButton
              type="button"
              onClick={handleDeleteClick}
              disabled={deletePostMutation.isPending}
            >
              {deletePostMutation.isPending ? '삭제 중...' : '삭제'}
            </DeleteButton>
          </ActionButtons>
        </PostHeader>

        <PostInfo>
          <PostInfoItem>{post.createId}</PostInfoItem>
          <PostInfoDivider>•</PostInfoDivider>
          <PostInfoItem>{formatDiffDate(post.createDt)}</PostInfoItem>
          <PostInfoDivider>•</PostInfoDivider>
          <PostInfoItem>조회 {post.viewCount}</PostInfoItem>
          <PostInfoDivider>•</PostInfoDivider>
          <PostInfoItem>좋아요 {post.like}</PostInfoItem>
        </PostInfo>

        {/* <PostContent>{post.content}</PostContent> */}

        <LikeButtonContainer>
          <LikeButton
            type="button"
            onClick={handleLikeClick}
            disabled={toggleLikeMutation.isPending}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
            </svg>
            좋아요 {post.like}
          </LikeButton>
        </LikeButtonContainer>
      </PostContainer>

      <FooterActions>
        <ListButton href="/community">목록으로</ListButton>
      </FooterActions>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const PostContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 24px 16px;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const PostTitle = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const EditButton = styled(Link)`
  padding: 6px 12px;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  background-color: #fef2f2;
  color: #e53e3e;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #fee2e2;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #718096;
  margin-bottom: 24px;
`;

const PostInfoItem = styled.span``;

const PostInfoDivider = styled.span`
  margin: 0 8px;
`;

const PostContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #2d3748;
  padding: 24px 0;
  border-top: 1px solid #e2e8f0;
  border-bottom: 1px solid #e2e8f0;
  white-space: pre-line;
`;

const LikeButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const LikeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #ebf8ff;
  color: #3182ce;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #bee3f8;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

const FooterActions = styled.div`
  padding: 16px 24px;
  border-top: 1px solid #e2e8f0;
  background-color: #f8fafc;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ListButton = styled(Link)`
  padding: 8px 16px;
  background-color: #e2e8f0;
  color: #4a5568;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #cbd5e0;
  }
`;

const LoadingContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #4a5568;
`;

const ErrorContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 32px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #e53e3e;
`;
