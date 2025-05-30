'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useRef } from 'react';
import Image from 'next/image';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Avatar,
  Flex,
  Box,
  Text,
  IconButton,
  Divider,
  Spinner
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useFetchPostDetailQuery } from '../network/communityQueries';
import { formatISO } from 'date-fns';
import { formatDate, ignoreTimezone } from '@logics/utils/dateFormat';
import PostMenuOptions from '../components/PostMenuOptions';
import ShareButton from '../components/ShareButton';

interface PostDetailModalProps {
  postId: string;
  isOpen?: boolean;
  onClose?: () => void;
}

const PostDetailModal = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
  postId
}: PostDetailModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const sliderRef = useRef<Slider>(null);
  const { isOpen } = useDisclosure({
    isOpen: propIsOpen,
    onClose: propOnClose
  });

  const { data, isLoading } = useFetchPostDetailQuery(postId);

  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      // NOTE: 현재 경로가 /posts/detail/[id] 형태의 직접 접근의 경우
      if (pathname.includes('/posts/detail/')) {
        router.push('/posts');
      } else {
        router.back();
      }
    }
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <HeaderContainer>
          <CloseButtonContainer>
            <ModalCloseButton position="static" color="black" />
          </CloseButtonContainer>
        </HeaderContainer>

        {isLoading ? (
          <LoadingContainer>
            <Spinner size="xl" color="blue.500" />
          </LoadingContainer>
        ) : data ? (
          <>
            {data.images && data.images.length > 0 && (
              <SliderContainer>
                <StyledSlider {...sliderSettings} ref={sliderRef}>
                  {data.images.map((image, index) => (
                    <SlideItem key={index}>
                      <Image
                        src={image}
                        alt={`게시글 이미지 ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index === 0}
                      />
                    </SlideItem>
                  ))}
                </StyledSlider>
              </SliderContainer>
            )}

            <ModalBody>
              <Flex justifyContent="space-between" alignItems="center" mb={4}>
                <Flex alignItems="center">
                  <Avatar
                    size="md"
                    name={data.createId}
                    src="/default-avatar.png"
                    mr={3}
                  />
                  <Box>
                    <Text fontWeight="bold">{data.createId}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {formatDate({
                        date: formatISO(ignoreTimezone(data.createDt)),
                        type: 'ISO_DATE'
                      })}
                    </Text>
                  </Box>
                </Flex>

                <Flex>
                  <ShareButton postId={postId} />
                  <PostMenuOptions
                    postId={postId}
                    postAuthorId={data?.createId}
                    onClose={handleClose}
                  />
                </Flex>
              </Flex>

              <Box mt={2}>
                <Text fontSize="xl" fontWeight="bold" mb={3}>
                  {data.title}
                </Text>
                <Divider mb={4} />

                <ContentContainer>
                  {data?.content?.split(/(\s+)/).map((word, index) => {
                    if (word.startsWith('#')) {
                      return (
                        <span key={index} className="tag">
                          {word}
                        </span>
                      );
                    }
                    return <span key={index}>{word}</span>;
                  })}
                </ContentContainer>

                {data.tags && data.tags.length > 0 && (
                  <TagsContainer>
                    {data.tags.map((tag, index) => (
                      <Tag key={index}>#{tag}</Tag>
                    ))}
                  </TagsContainer>
                )}

                <Flex mt={6} justifyContent="space-between" alignItems="center">
                  <Flex alignItems="center">
                    <IconButton
                      aria-label="좋아요"
                      icon={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                      }
                      variant="ghost"
                      mr={2}
                    />
                    <Text>{data.like || 0}</Text>
                  </Flex>

                  <Text fontSize="sm" color="gray.500">
                    조회 {data.viewCount || 0}
                  </Text>
                </Flex>
              </Box>
            </ModalBody>
          </>
        ) : (
          <ModalBody p={6}>
            <Text>게시글을 찾을 수 없습니다.</Text>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};

const HeaderContainer = styled.div`
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;
`;

const CloseButtonContainer = styled.div`
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const StyledSlider = styled(Slider)`
  .slick-dots {
    bottom: 20px;
    z-index: 1;

    li button:before {
      color: white;
      opacity: 0.5;
    }

    li.slick-active button:before {
      color: white;
      opacity: 1;
    }
  }
`;

const SlideItem = styled.div`
  position: relative;
  height: 400px;
  width: 100%;
`;

const ContentContainer = styled.div`
  font-size: 16px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
  min-height: 100px;

  /* 태그 스타일링 */
  & > span {
    display: inline;
  }

  & .tag {
    color: #ff6917;
    font-weight: 500;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 20px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 10px;
  background-color: #f0f0f0;
  color: #666;
  border-radius: 20px;
  font-size: 14px;
`;

export default PostDetailModal;
