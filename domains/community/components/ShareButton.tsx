'use client';

import { IconButton } from '@chakra-ui/react';
import { useCallback } from 'react';

interface ShareButtonProps {
  postId: string;
}

const ShareButton = ({ postId }: ShareButtonProps) => {
  const handleShare = useCallback(() => {
    // 현재 URL 복사
    const url = `${window.location.origin}/posts/${postId}`;

    // 클립보드에 복사
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert('게시글 링크가 클립보드에 복사되었습니다.');
      })
      .catch(err => {
        console.error('클립보드 복사 실패:', err);
      });
  }, [postId]);

  return (
    <IconButton
      aria-label="공유하기"
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
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
          <polyline points="16 6 12 2 8 6"></polyline>
          <line x1="12" y1="2" x2="12" y2="15"></line>
        </svg>
      }
      variant="ghost"
      onClick={handleShare}
      mr={2}
    />
  );
};

export default ShareButton;
