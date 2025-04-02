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
        <CommunityTitle>커뮤니티</CommunityTitle>
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
  padding: 40px 16px;
`;

const CommunityTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 24px;
  }
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default CommunityLayout;
