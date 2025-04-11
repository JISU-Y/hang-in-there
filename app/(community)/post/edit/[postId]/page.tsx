'use client';

import { useParams } from 'next/navigation';

export default function CommunityPostEditPage() {
  const params = useParams();
  const postId = params.postId as string;

  return (
    <div>
      <h1>게시글 수정 페이지</h1>
      <p>Post ID: {postId}</p>
    </div>
  );
}
