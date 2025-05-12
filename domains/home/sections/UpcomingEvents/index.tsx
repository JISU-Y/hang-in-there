'use client';

import { useState } from 'react';

import styled from '@emotion/styled';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import EventCard from '@domains/home/components/EventCard/EventCard';

import { useFetchUpcomingEventListQuery } from '../../network/homeQueries';

const UpcomingEvents = () => {
  const [pageNo, setPageNo] = useState(1);

  const {
    data: eventData,
    isLoading,
    isError
  } = useFetchUpcomingEventListQuery({
    page: pageNo,
    size: 28
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const getPaginationRange = () => {
    if (!eventData?.pageInfo.totalPage) return [];

    const totalPage = eventData.pageInfo.totalPage;
    const visiblePageCount = 5; // NOTE: 현재 페이지 + 양쪽 2개씩

    let startPage = Math.max(1, pageNo - 2);
    let endPage = Math.min(totalPage, pageNo + 2);

    if (endPage - startPage + 1 < visiblePageCount) {
      if (startPage === 1) {
        endPage = Math.min(visiblePageCount, totalPage);
      } else if (endPage === totalPage) {
        startPage = Math.max(1, totalPage - visiblePageCount + 1);
      }
    }

    const range = [];

    if (startPage > 1) {
      range.push(1);
      if (startPage > 2) range.push('ellipsis_start');
    }

    for (let i = startPage; i <= endPage; i++) {
      range.push(i);
    }

    if (endPage < totalPage) {
      if (endPage < totalPage - 1) range.push('ellipsis_end');
      range.push(totalPage);
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <Container>
      <TitleContainer>
        <SectionTitle>진행 예정인 행사</SectionTitle>
      </TitleContainer>
      <CardListWrapper>
        {eventData?.list?.map(el => <EventCard key={el.event_id} event={el} />)}
      </CardListWrapper>
      <PaginationWrapper>
        <ArrowButton
          type="button"
          disabled={pageNo === 1}
          onClick={() => setPageNo(prev => Math.max(prev - 1, 1))}
        >
          <ChevronLeftIcon
            w={6}
            h={6}
            strokeWidth={1}
            color={pageNo === 1 ? '#8B8B8B' : '#000000'}
          />
        </ArrowButton>

        {paginationRange.map((page, index) =>
          typeof page === 'number' ? (
            <PageButton
              key={`page-${page}`}
              type="button"
              $isActive={page === pageNo}
              onClick={() => setPageNo(page)}
            >
              {page}
            </PageButton>
          ) : (
            <EllipsisSpan key={`${page}-${index}`}>...</EllipsisSpan>
          )
        )}

        <ArrowButton
          type="button"
          disabled={eventData?.pageInfo.totalPage === pageNo}
          onClick={() => setPageNo(prev => prev + 1)}
        >
          <ChevronRightIcon
            w={6}
            h={6}
            strokeWidth={1}
            color={
              eventData?.pageInfo.totalPage === pageNo ? '#8B8B8B' : '#000000'
            }
          />
        </ArrowButton>
      </PaginationWrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;

  @media (max-width: 1400px) {
    padding: 16px;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  line-height: 150%;
  color: #191919;

  @media (max-width: 768px) {
    font-size: 16px;
    font-weight: 600;
    word-break: keep-all;
  }
`;

const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  width: 100%;

  & > * {
    width: 100%;
    max-width: 264px;
    aspect-ratio: 2/3;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;

    & > * {
      max-width: none;
      width: 100%;
    }
  }
`;

const PaginationWrapper = styled.div`
  margin: 56px auto;
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageButton = styled.button<{ $isActive?: boolean }>`
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  border-radius: 50%;

  width: 40px;
  height: 40px;
  color: #000000;

  background-color: ${({ $isActive }) =>
    $isActive ? 'rgba(255,105,23, 0.7)' : 'transparent'};

  transition: all 0.3s ease-in-out;
`;

const ArrowButton = styled(PageButton)`
  background-color: transparent;

  &:disabled {
    pointer-events: none;
  }
`;

const EllipsisSpan = styled.span`
  font-size: 16px;
  line-height: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default UpcomingEvents;
