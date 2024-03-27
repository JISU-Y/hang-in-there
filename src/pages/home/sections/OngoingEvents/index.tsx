import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import Slider, { Settings } from 'react-slick';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { css } from '@emotion/react';
import { useBooleanState } from '@toss/react';
import { formatDate } from '@src/logics/utils/dateFormat';
import { formatISO } from 'date-fns/formatISO';
import { parse } from 'date-fns/parse';

import { useFetchEventListQuery } from '../../network/eventListQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css';

const settings: Settings = {
  dots: false,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  touchThreshold: 100,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4
      }
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2
      }
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1
      }
    }
  ]
};

const OngoingEvents = () => {
  const navigate = useNavigate();

  const [isMouseMoving, setIsMouseMoving, unsetIsMouseMoving] =
    useBooleanState();

  const { data: eventListData } = useFetchEventListQuery({
    numOfRows: 10,
    eventStartDate: format(new Date(), 'yyyyMMdd'),
    eventEndDate: format(new Date(), 'yyyyMMdd'),
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

  const handleClickCard = (contentId: string) => {
    if (isMouseMoving || !contentId) return;

    navigate(`/eventDetail/${contentId}`);
  };

  return (
    <Container>
      <SectionTitle>진행 중인 행사</SectionTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {eventListData?.map(el => (
            <Card
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
              draggable={false}
              onMouseMove={() => setIsMouseMoving()}
              onMouseDown={() => unsetIsMouseMoving()}
              onMouseUp={() => handleClickCard(el.contentid)}
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
        </Slider>
      </SliderWrapper>
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

const SliderWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 8px 0;
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

export default OngoingEvents;
