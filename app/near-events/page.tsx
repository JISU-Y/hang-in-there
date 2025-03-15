'use client';

import { Suspense } from 'react';
import styled from '@emotion/styled';
import { Spinner } from '@chakra-ui/react';
import PageLayout from '@domains/common/layouts/PageLayout';
import NearEventsMap from '@domains/near-events/components/NearEventsMap';
import NearEventsList from '@domains/near-events/components/NearEventsList';

const NearEventsPage = () => {
  return (
    <PageLayout withFooter={false}>
      <PageContainer>
        <PageTitle>내 주변 행사</PageTitle>
        <ContentContainer>
          <MapSection>
            <Suspense fallback={<LoadingFallback />}>
              <NearEventsMap />
            </Suspense>
          </MapSection>

          <ListSection>
            <Suspense fallback={<LoadingFallback />}>
              <NearEventsList />
            </Suspense>
          </ListSection>
        </ContentContainer>
      </PageContainer>
    </PageLayout>
  );
};

const LoadingFallback = () => {
  return (
    <LoadingContainer>
      <Spinner size="xl" color="orange.500" thickness="4px" />
      <LoadingText>내 주변 행사를 불러오고 있어요</LoadingText>
    </LoadingContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 149px); /* PC에서 헤더 높이 149px 제외 */

  @media (max-width: 768px) {
    height: calc(100vh - 119px); /* 모바일에서 헤더 높이 119px 제외 */
  }
`;

const PageTitle = styled.h1`
  font-size: 24px;
  font-weight: 700;
  padding: 0 40px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    padding: 0 24px;
    font-size: 20px;
    margin-bottom: 12px;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  flex: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MapSection = styled.div`
  flex: 1;
  height: 100%;

  @media (max-width: 768px) {
    height: calc(100% - 60px); /* 제목 영역 높이 제외 */
    min-height: 400px;
  }
`;

const ListSection = styled.div`
  width: 380px;
  height: 100%;
  overflow-y: auto;
  padding: 0 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 16px;
`;

const LoadingText = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #666;
  text-align: center;
`;

export default NearEventsPage;
