import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { useFetchEventListInfiniteQuery } from '../../network/eventListQueries';

import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { ImpressionArea } from '@toss/impression-area';
import { formatDate } from '@src/logics/utils/dateFormat';
import { formatISO } from 'date-fns/formatISO';
import { parse } from 'date-fns/parse';

const RecentEvents = () => {
  const { data: eventListPageData, fetchNextPage } =
    useFetchEventListInfiniteQuery({
      numOfRows: 10,
      eventStartDate: format(new Date(), 'yyyyMMdd'),
      pageNo: 1
    });

  const getFormattedDate = (date: string) => {
    const parsedDateString = parse(date, 'yyyyMMdd', new Date());

    const formattedDate = formatDate({
      date: formatISO(parsedDateString),
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  return (
    <Container>
      <SectionTitle>진행 예정인 행사</SectionTitle>
      <CardListWrapper>
        {eventListPageData?.pages?.flatMap(el => (
          <Card
            as={Link}
            to={`/eventDetail/${el.contentid}`}
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
                  src={el.firstimage}
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
              <Text>{el.addr1?.split(' ').slice(0, 2).join(' ')}</Text>
              <Text color="#999999">{`${getFormattedDate(
                el.eventstartdate
              )}-${getFormattedDate(el.eventenddate)}`}</Text>
            </CardFooter>
          </Card>
        ))}
        <HeightImpressionArea
          onImpressionStart={() => fetchNextPage()}
          areaThreshold={0.5}
        />
      </CardListWrapper>
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

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
`;

export default RecentEvents;
