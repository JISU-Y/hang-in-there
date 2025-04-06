'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from '@emotion/styled';
import {
  useFetchPostListInfiniteQuery,
  useFetchPostTagListQuery
} from '@domains/community/network/communityQueries';
import useDebounceValue from '@logics/hooks/useDebounceValue';
import { formatDiffDate } from '@logics/utils/dateFormat';

export default function CommunityPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [tagSearchWord, setTagSearchWord] = useState('');
  const debouncedTagSearchWord = useDebounceValue(tagSearchWord, 500);
  const inputRef = useRef<HTMLInputElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const postListRef = useRef<HTMLDivElement>(null);

  const tagsParam =
    selectedTags.length > 0 ? selectedTags.join(',') : undefined;

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useFetchPostListInfiniteQuery({
      page: 1,
      size: 10,
      boardIdx: 1,
      tags: tagsParam
    });
  const { data: postTags } = useFetchPostTagListQuery(
    debouncedTagSearchWord ? { tags: debouncedTagSearchWord } : undefined
  );

  const posts = data?.pages || [];

  // 태그 선택 처리
  const handleTagClick = (tag: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // 검색 아이콘 클릭 처리
  const handleSearchIconClick = () => {
    setIsSearchInputVisible(prev => !prev);
    setTimeout(() => {
      if (!isSearchInputVisible && inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
  };

  // 검색어 입력 처리
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagSearchWord(e.target.value);
  };

  // 검색어 입력 시 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isSearchInputVisible &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !(event.target as Element).closest('.search-icon')
      ) {
        setIsSearchInputVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchInputVisible]);

  // 선택된 태그가 변경될 때마다 게시글 목록 다시 가져오기
  useEffect(() => {
    if (selectedTags.length > 0) {
      // ref를 사용하여 스크롤 처리
      if (postListRef.current) {
        postListRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [selectedTags]);

  // 무한 스크롤 설정
  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.5 }
    );

    if (loaderRef.current) {
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <Container>
      {postTags && (
        <TagsContainer>
          <SearchIconWrapper
            className="search-icon"
            onClick={handleSearchIconClick}
            isActive={isSearchInputVisible}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </SearchIconWrapper>

          <SearchInputWrapper isVisible={isSearchInputVisible}>
            <SearchInput
              ref={inputRef}
              type="text"
              placeholder="태그 검색..."
              value={tagSearchWord}
              onChange={handleSearchInputChange}
            />
          </SearchInputWrapper>

          <TagChipList isSearchVisible={isSearchInputVisible}>
            {postTags.length > 0 ? (
              postTags.map((tag, index) => (
                <TagChip
                  key={index}
                  onClick={() => handleTagClick(tag.name)}
                  isSelected={selectedTags.includes(tag.name)}
                >
                  #{tag.name}
                </TagChip>
              ))
            ) : (
              <EmptyTagsMessage>검색 결과가 없습니다</EmptyTagsMessage>
            )}
          </TagChipList>
        </TagsContainer>
      )}

      <HeaderContainer>
        <ListTitle>게시글 목록</ListTitle>
        <WriteButton href="/community/write">글쓰기</WriteButton>
      </HeaderContainer>

      <PostListContainer ref={postListRef}>
        {isLoading ? (
          <LoadingWrapper>
            <LoadingText>게시글을 불러오는 중입니다...</LoadingText>
          </LoadingWrapper>
        ) : posts.length > 0 ? (
          posts.map(post => (
            <PostItem key={post.idx} href={`/posts/${post.idx}`}>
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                {post.images && post.images.length > 0 && (
                  <PostImage>
                    <Image
                      src={post.images[0]}
                      alt={post.title}
                      width={74}
                      height={74}
                      style={{ objectFit: 'cover' }}
                    />
                  </PostImage>
                )}
              </PostHeader>
              <PostFooter>
                <PostInfoItem>{post.createId}</PostInfoItem>
                <PostInfoItem>{formatDiffDate(post.createDt)}</PostInfoItem>
                <PostInfoItem>조회 {post.viewCount || 0}</PostInfoItem>
                <PostInfoItem>좋아요 {post.like}</PostInfoItem>
              </PostFooter>
            </PostItem>
          ))
        ) : (
          <EmptyState>
            <EmptyText>게시글이 없습니다.</EmptyText>
          </EmptyState>
        )}

        {/* 무한 스크롤을 위한 로더 요소 */}
        {(hasNextPage || isFetchingNextPage) && (
          <LoaderElement ref={loaderRef}>
            {isFetchingNextPage && <LoadingDots>로딩 중...</LoadingDots>}
          </LoaderElement>
        )}
      </PostListContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const TagsContainer = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% + 20px);
  margin-bottom: 24px;
  position: relative;
`;

interface SearchIconWrapperProps {
  isActive: boolean;
}

const SearchIconWrapper = styled.div<SearchIconWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => (props.isActive ? '#ff6917' : '#718096')};
  margin-right: 12px;
  cursor: pointer;
  transition:
    color 0.2s ease,
    transform 0.2s ease;
  flex-shrink: 0;

  &:hover {
    color: #ff6917;
    transform: scale(1.1);
  }
`;

interface SearchInputWrapperProps {
  isVisible: boolean;
}

const SearchInputWrapper = styled.div<SearchInputWrapperProps>`
  max-width: ${props => (props.isVisible ? '200px' : '0')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  margin-right: ${props => (props.isVisible ? '12px' : '0')};
  transition:
    max-width 0.3s ease,
    opacity 0.2s ease,
    margin-right 0.3s ease;
  overflow: hidden;
`;

const SearchInput = styled.input`
  border: none;
  background-color: transparent;
  border-bottom: 1px solid #cbd5e0;
  padding: 4px 0;
  width: 100%;
  font-size: 14px;
  color: #4a5568;

  &:focus {
    outline: none;
    border-bottom-color: #ff6917;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

interface TagChipListProps {
  isSearchVisible: boolean;
}

const TagChipList = styled.div<TagChipListProps>`
  display: flex;
  flex-wrap: nowrap;
  gap: 8px;
  flex: 1;
  transition: margin-left 0.3s ease;
  overflow-x: auto;
  padding: 4px 0;
  padding-right: 12px;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  max-width: 100%;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    height: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #a0aec0;
  }
`;

interface TagChipProps {
  isSelected: boolean;
}

const TagChip = styled.div<TagChipProps>`
  display: inline-flex;
  align-items: center;
  padding: 5px 10px;
  background-color: ${props => (props.isSelected ? '#FF691770' : '#ededed')};
  color: ${props => (props.isSelected ? '#ffffff' : '#767676')};
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background-color: ${props => (props.isSelected ? '#FF691770' : '#ededed')};
  }
`;

const EmptyTagsMessage = styled.div`
  font-size: 14px;
  color: #718096;
  font-style: italic;
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
  overflow: hidden;
  min-height: 200px;
  gap: 32px;
  padding-bottom: 32px;
`;

const PostItem = styled(Link)`
  display: block;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:last-of-type {
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
  margin-bottom: 12px;
  gap: 16px;
`;

const PostTitle = styled.h3`
  font-size: 18px;
  font-weight: 500;
  color: #1a202c;
  flex: 1;
`;

const PostImage = styled.div`
  width: 74px;
  height: 74px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
  color: #8b8b8b;
  gap: 12px;
`;

const PostInfoItem = styled.span`
  white-space: nowrap;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingText = styled.p`
  color: #8b8b8b;
  font-size: 16px;
`;

const EmptyState = styled.div`
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmptyText = styled.p`
  color: #8b8b8b;
  font-size: 16px;
`;

const LoaderElement = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDots = styled.div`
  color: #8b8b8b;
  font-size: 14px;
`;
