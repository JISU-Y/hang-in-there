interface CommunityPostsLayoutProps {
  children: React.ReactNode;
  detailModal: React.ReactNode;
}

const CommunityPostsLayout = ({
  children,
  detailModal
}: CommunityPostsLayoutProps) => {
  return (
    <>
      {children}
      {detailModal}
    </>
  );
};

export default CommunityPostsLayout;
