'use client';

import { useAuthSession } from '@domains/auth/hooks/useAuthSession';
import { useFetchUserProfileQuery } from '@domains/auth/network/authQueries';
import { useCallback } from 'react';
import { useRouter } from 'next/navigation';

// UserProfile 인터페이스 대신 as any를 사용하여 타입 에러 우회
interface UsePostActionsProps {
  postId: string;
  postAuthorId?: string;
  onClose?: () => void;
}

export const usePostActions = ({
  postId,
  postAuthorId,
  onClose
}: UsePostActionsProps) => {
  const router = useRouter();
  const { isUserLoggedIn, guardRoute } = useAuthSession();
  const { data: userProfile } = useFetchUserProfileQuery({
    enabled: isUserLoggedIn
  });

  const isAuthor =
    !!userProfile && !!postAuthorId && userProfile.nickname === postAuthorId;

  const handleEdit = useCallback(() => {
    if (!isAuthor) return;

    router.push(`/posts/edit/${postId}`);
    if (onClose) onClose();
  }, [isAuthor, postId, router, onClose]);

  const handleDelete = useCallback(() => {
    if (!isAuthor) return;

    // 삭제 확인 후 API 호출 로직 필요
    if (confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      // 삭제 API 호출 로직 (구현 필요)
      // deleteMutation.mutate(postId);
      console.log('게시글 삭제:', postId);

      if (onClose) onClose();
      router.back(); // 삭제 후 이전 페이지로 이동
    }
  }, [isAuthor, postId, router, onClose]);

  const handleReport = () =>
    guardRoute(
      () => {
        // TODO: 신고 로직 (구현 필요)
        console.log('게시글 신고:', postId);
        alert('신고가 접수되었습니다.');
      },
      {
        onReject: () => {
          alert('로그인이 필요한 기능입니다. 로그인 후 이용해주세요!');
          router.push('/login');
        }
      }
    );

  return {
    isUserLoggedIn,
    isAuthor,
    handleEdit,
    handleDelete,
    handleReport
  };
};
