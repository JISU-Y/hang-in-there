'use client';

import { Suspense } from 'react';
import PostDetailModal from '@domains/community/modal/PostDetailModal';
import { notFound, useRouter } from 'next/navigation';

interface CommunityDetailPageProps {
  params: { postId: string };
}

const CommunityDetailPageSlotInterceptor = ({
  params
}: CommunityDetailPageProps) => {
  const { postId } = params;
  const { push, back } = useRouter();

  if (!postId) {
    notFound();
  }

  const handleModalClose = () => {
    if (window.history.length > 1) {
      back();
    } else {
      push('/posts');
    }
  };

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostDetailModal
        postId={postId}
        isOpen={true}
        onClose={handleModalClose}
      />
    </Suspense>
  );
};

export default CommunityDetailPageSlotInterceptor;
