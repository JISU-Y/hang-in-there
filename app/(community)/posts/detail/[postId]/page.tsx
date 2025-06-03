'use client';

import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import PostDetailModal from '@domains/community/modal/PostDetailModal';
import CommunityPage from '../../page';

interface PostDetailPageProps {
  params: { postId: string };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postId } = params;

  if (!postId) {
    notFound();
  }

  return (
    <>
      <CommunityPage />

      <Suspense fallback={<div>로딩 중...</div>}>
        <PostDetailModal postId={postId} isOpen={true} />
      </Suspense>
    </>
  );
};

export default PostDetailPage;
