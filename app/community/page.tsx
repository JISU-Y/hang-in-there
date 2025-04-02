'use client';

import Link from 'next/link';
import styled from '@emotion/styled';

export default function CommunityPage() {
  // 임시 데이터
  const posts = Array.from({ length: 5 }, (_, i) => ({
    id: i + 1,
    title: `샘플 게시물 제목 ${i + 1}`,
    content:
      '이 게시물은 샘플 내용입니다. 실제 게시물은 데이터베이스에서 불러올 예정입니다.',
    author: `사용자${i + 1}`,
    createdAt: `2023-04-0${i + 1}`,
    commentCount: (i + 1) * 2,
    likeCount: (i + 1) * 5
  }));

  return (
    <Container>
      <HeaderContainer>
        <ListTitle>게시글 목록</ListTitle>
        <WriteButton href="/community/write">글쓰기</WriteButton>
      </HeaderContainer>

      <PostListContainer>
        {posts.map(post => (
          <PostItem key={post.id} href={`/community/${post.id}`}>
            <PostHeader>
              <PostTitle>{post.title}</PostTitle>
              <PostDate>{post.createdAt}</PostDate>
            </PostHeader>
            <PostContent>{post.content}</PostContent>
            <PostFooter>
              <PostInfoItem>{post.author}</PostInfoItem>
              <PostInfoDivider>•</PostInfoDivider>
              <PostInfoItem>댓글: {post.commentCount}</PostInfoItem>
              <PostInfoDivider>•</PostInfoDivider>
              <PostInfoItem>좋아요: {post.likeCount}</PostInfoItem>
            </PostFooter>
          </PostItem>
        ))}
      </PostListContainer>

      <PaginationContainer>
        <PaginationWrapper>
          {[1, 2, 3, 4, 5].map(page => (
            <PaginationButton key={page} isActive={page === 1}>
              {page}
            </PaginationButton>
          ))}
        </PaginationWrapper>
      </PaginationContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const ListTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
`;

const WriteButton = styled(Link)`
  padding: 10px 16px;
  background-color: #3182ce;
  color: white;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2b6cb0;
  }
`;

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

const PostItem = styled(Link)`
  display: block;
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f7fafc;
  }
`;

const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
`;

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #1a202c;
`;

const PostDate = styled.span`
  font-size: 14px;
  color: #718096;
`;

const PostContent = styled.p`
  font-size: 15px;
  color: #4a5568;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #718096;
`;

const PostInfoItem = styled.span``;

const PostInfoDivider = styled.span`
  margin: 0 8px;
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const PaginationWrapper = styled.nav`
  display: inline-flex;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

interface PaginationButtonProps {
  isActive: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  padding: 10px 16px;
  border: 1px solid ${props => (props.isActive ? '#3182CE' : '#E2E8F0')};
  background-color: ${props => (props.isActive ? '#3182CE' : '#FFFFFF')};
  color: ${props => (props.isActive ? '#FFFFFF' : '#4A5568')};

  &:hover {
    background-color: ${props => (props.isActive ? '#2B6CB0' : '#F7FAFC')};
  }
`;
