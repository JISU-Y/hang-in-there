'use client';

import { Suspense } from 'react';
import { notFound, useRouter } from 'next/navigation';
import PostDetailModal from '@domains/community/modal/PostDetailModal';
import CommunityPage from '../../page';

interface PostDetailPageProps {
  params: { postId: string };
}

const PostDetailPage = ({ params }: PostDetailPageProps) => {
  const { postId } = params;
  const router = useRouter();

  if (!postId) {
    notFound();
  }

  const handleModalClose = () => {
    router.push('/posts');
  };

  return (
    <>
      <CommunityPage />

      <Suspense fallback={<div>로딩 중...</div>}>
        <PostDetailModal
          postId={postId}
          isOpen={true}
          onClose={handleModalClose}
        />
      </Suspense>
    </>
  );
};

export default PostDetailPage;
