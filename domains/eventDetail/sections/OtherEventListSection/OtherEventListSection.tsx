import { useRouter } from 'next/navigation';

import Slider, { Settings } from 'react-slick';
import { formatISO } from 'date-fns/formatISO';

import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useBooleanState } from '@toss/react';
import { formatDate } from '@logics/utils/dateFormat';

import { useFetchOtherEventListQuery } from '../../network/eventDetailQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings: Settings = {
  dots: false,
  infinite: false,
  slidesToShow: 5.5,
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

interface OtherEventListSectionProps {
  eventId: number;
  areaCode: number;
}

const OtherEventListSection = ({
  eventId,
  areaCode
}: OtherEventListSectionProps) => {
  const { push } = useRouter();

  const [isMouseMoving, setIsMouseMoving, unsetIsMouseMoving] =
    useBooleanState();

  const { data: eventData } = useFetchOtherEventListQuery(eventId, areaCode);

  const getFormattedDate = (date: string) => {
    const formattedDate = formatDate({
      date: formatISO(date),
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  const handleClickCard = (contentId: number) => {
    if (isMouseMoving || !contentId) return;

    push(`/eventDetail/${contentId}`);
  };

  if (eventData && eventData.list.length < 1) return null;

  return (
    <Container>
      <SectionTitle>이 지역 다른 행사</SectionTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {eventData?.list?.map(el => (
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
              onMouseUp={() => handleClickCard(el.event_id)}
            >
              <CardBody padding="0">
                <ImageWrapper>
                  <Img
                    src={el.image}
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

  .slick-list {
    margin: 0 -7px;

    & .slick-slide > div {
      padding: 0 16px;
    }
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

export default OtherEventListSection;
