'use client';

import { Suspense } from 'react';
import styled from '@emotion/styled';
import PageLayout from '@domains/common/layouts/PageLayout';

interface CommunityLayoutProps {
  children: React.ReactNode;
}

const CommunityLayout = ({ children }: CommunityLayoutProps) => {
  return (
    <PageLayout>
      <CommunityContainer>
        <Suspense fallback={<LoadingContainer>로딩 중...</LoadingContainer>}>
          {children}
        </Suspense>
      </CommunityContainer>
    </PageLayout>
  );
};

const CommunityContainer = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export default CommunityLayout;
