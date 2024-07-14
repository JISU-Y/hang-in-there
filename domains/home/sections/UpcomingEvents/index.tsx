import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';

import { useFetchUpcomingEventListQuery } from '../../network/eventListQueries';

import { css } from '@emotion/react';
import { formatDate } from '@src/logics/utils/dateFormat';
import { formatISO } from 'date-fns/formatISO';
import { useState } from 'react';
import { ChevronRightIcon, ChevronLeftIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const UpcomingEvents = () => {
  const [pageNo, setPageNo] = useState(1);
  const {
    data: eventData,
    isLoading,
    isError
  } = useFetchUpcomingEventListQuery({
    page: pageNo,
    size: 30
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  const getFormattedDate = (date: string) => {
    const formattedDate = formatDate({
      date: formatISO(date),
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  return (
    <Container>
      <SectionTitle>진행 예정인 행사</SectionTitle>
      <CardListWrapper>
        {eventData?.list?.map(el => (
          <Card
            as={Link}
            to={`/eventDetail/${el.event_id}`}
            key={el.title}
            w="100%"
            h="auto"
            aspectRatio={2 / 3}
            size="sm"
            colorScheme="orange"
            direction="column"
            borderRadius={0}
            borderWidth={0}
            shadow="none"
            boxShadow="none"
          >
            <CardBody padding="0">
              <ImageWrapper>
                <Img
                  src={el?.image || '/logo/poster-fallback.png'}
                  alt={`festival-${el.title}`}
                  objectFit="cover"
                />
              </ImageWrapper>
            </CardBody>
            <CardFooter
              marginTop="20px"
              padding="0px"
              flexDirection="column"
              gap="8px"
            >
              <Heading
                as="h4"
                size="md"
                wordBreak="keep-all"
                fontWeight={700}
                css={HeadingCSS}
              >
                {el.title}
              </Heading>
              <Text>{el.addr?.split(' ').slice(0, 2).join(' ')}</Text>
              <Text color="#999999">{`${getFormattedDate(
                el.event_st
              )}-${getFormattedDate(el.event_ed)}`}</Text>
            </CardFooter>
          </Card>
        ))}
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
        {new Array(eventData?.pageInfo.totalPage)
          .fill(0)
          .map((_, i) => i + 1)
          .map(el => (
            <PageButton
              key={el}
              type="button"
              $isActive={el === pageNo}
              onClick={() => setPageNo(el)}
            >
              {el}
            </PageButton>
          ))}
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

const HeadingCSS = css`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Container = styled.section`
  width: 100%;

  @media (max-width: 1400px) {
    padding: 16px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 36px;
`;

const CardListWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PaginationWrapper = styled.div`
  margin: 56px auto;
  width: fit-content;
  display: block;
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

export default UpcomingEvents;
