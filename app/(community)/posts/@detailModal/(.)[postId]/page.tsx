'use client';

import { Suspense } from 'react';
import PostDetailModal from '@domains/community/modal/PostDetailModal';
import { notFound } from 'next/navigation';

interface CommunityDetailPageProps {
  params: { postId: string };
}

const CommunityDetailPageSlotInterceptor = ({
  params
}: CommunityDetailPageProps) => {
  const { postId } = params;

  if (!postId) {
    notFound();
  }

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostDetailModal postId={postId} isOpen={true} onClose={() => {}} />
    </Suspense>
  );
};

export default CommunityDetailPageSlotInterceptor;
