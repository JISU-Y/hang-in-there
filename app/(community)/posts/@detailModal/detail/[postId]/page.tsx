'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PostDetailModal from '@domains/community/modal/PostDetailModal';

interface CommunityDetailPageProps {
  params: { postId: string };
}

const CommunityDetailPage = ({ params }: CommunityDetailPageProps) => {
  const { postId } = params;

  if (!postId) {
    notFound();
  }

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PostDetailModal postId={postId} isOpen={true} />
    </Suspense>
  );
};

export default CommunityDetailPage;
