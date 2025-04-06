import { notFound } from 'next/navigation';

interface CommunityDetailPageProps {
  params: Promise<{ postId: string }>;
}

const CommunityDetailPage = async ({ params }: CommunityDetailPageProps) => {
  const { postId } = await params;

  if (!postId) {
    notFound();
  }

  return (
    <div>
      <h1>CommunityDetailPage</h1>
    </div>
  );
};

export default CommunityDetailPage;
