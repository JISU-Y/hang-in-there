'use client';

import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { css } from '@emotion/react';
import { useBooleanState } from '@toss/react';
import { formatDate } from '@logics/utils/dateFormat';
import Slider, { Settings } from 'react-slick';
import { formatISO } from 'date-fns/formatISO';

import { useFetchOngoingEventListQuery } from '../../network/eventListQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomNextArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  right: -3%;
  z-index: 3;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 50%;
  transform: translateY(-150%);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
  }
`;

const CustomPrevArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: -3%;
  z-index: 3;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 50%;
  transform: translateY(-150%);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
  }
`;

const settings: Settings = {
  // HACK: responsive 추가하면 breakpoint 1200 이하에서 왼쪽에 blank가 생김
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  touchThreshold: 100,
  initialSlide: 0,
  nextArrow: (
    <CustomNextArrow>
      <ChevronRightIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomNextArrow>
  ),
  prevArrow: (
    <CustomPrevArrow>
      <ChevronLeftIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomPrevArrow>
  )
};

const OngoingEvents = () => {
  const { push } = useRouter();

  const [isMouseMoving, setIsMouseMoving, unsetIsMouseMoving] =
    useBooleanState();

  const { data: eventData } = useFetchOngoingEventListQuery();

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

  return (
    <Container>
      <SectionTitle>진행 중인 행사</SectionTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {eventData?.map(el => (
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
  margin-bottom: 64px;

  @media (max-width: 1400px) {
    padding: 16px;
  }

  .slick-arrow {
    width: 40px;
    height: 40px;
    z-index: 1;
    border-radius: 50%;
  }

  .slick-arrow::before {
    width: 100%;
    height: 100%;
    display: none;
  }

  .slick-prev,
  .slick-next {
    .slick-prev::before,
    .slick-next::before {
      opacity: 0;
      display: none;
    }
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

export default OngoingEvents;
