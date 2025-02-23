'use client';

import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import {
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardFooter as ChakraCardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useBooleanState } from '@toss/react';
import { formatDate } from '@logics/utils/dateFormat';
import Slider, { Settings } from 'react-slick';
import { formatISO } from 'date-fns/formatISO';

import { useFetchOngoingEventListQuery } from '../../network/homeQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { ChevronRightIcon } from '@chakra-ui/icons';

const CustomNextArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  right: 0;
  z-index: 3;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 50%;
  transform: translateY(-150%);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const CustomPrevArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 0;
  z-index: 3;
  background-color: rgba(128, 128, 128, 0.3);
  border-radius: 50%;
  transform: translateY(-150%);
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: gray;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const settings: Settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: true,
  touchThreshold: 100,
  arrows: true,
  nextArrow: (
    <CustomNextArrow>
      <ChevronRightIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomNextArrow>
  ),
  prevArrow: (
    <CustomPrevArrow>
      <ChevronLeftIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomPrevArrow>
  ),
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2.2,
        variableWidth: true,
        arrows: false
      }
    }
  ]
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
      <TitleContainer>
        <SectionTitle>진행 중인 행사</SectionTitle>
        <ViewMoreButton onClick={() => push('/category')}>
          더 보기
        </ViewMoreButton>
      </TitleContainer>
      <SliderWrapper>
        <Slider {...settings}>
          {eventData?.map(el => (
            <StyledCard
              key={el.title}
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
              <ChakraCardBody padding={0}>
                <ImageWrapper>
                  <Img
                    src={el?.image || '/logo/poster-fallback.png'}
                    alt={`festival-${el.title}`}
                    objectFit="cover"
                  />
                </ImageWrapper>
              </ChakraCardBody>
              <StyledCardFooter>
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
              </StyledCardFooter>
            </StyledCard>
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
  padding: 8px 0;

  .slick-list {
    margin: 0 -8px;
  }

  .slick-track {
    display: flex;
    margin-left: 0;
  }

  .slick-slide {
    padding: 0 8px;
    box-sizing: border-box;
  }

  .slick-slide > div {
    width: 100%;
  }

  @media (max-width: 768px) {
    overflow: hidden;
    width: calc(100% + 16px);
    padding: 0;

    .slick-list {
      overflow: visible;
      margin: 0;
    }

    .slick-track {
      gap: 16px;
    }

    .slick-slide {
      width: 136px !important;
      padding: 0;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
  max-width: 264px;
  max-height: 364px;

  @media (max-width: 768px) {
    width: 136px;
    height: 187px;
    max-width: none;
    max-height: none;
  }
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ViewMoreButton = styled.button`
  height: 30px;
  color: #ff6917;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;

  &:hover,
  &:focus {
    background-color: rgba(255, 105, 23, 0.1);
  }

  &:active {
    background-color: rgba(255, 105, 23, 0.2);
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 12px;
  }
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

const StyledCardFooter = styled(ChakraCardFooter)`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0px;
  margin-top: 8px;
`;

const StyledCard = styled(ChakraCard)`
  width: 100%;
  max-width: 264px;

  @media (max-width: 768px) {
    width: 136px;
    max-width: none;
  }
`;

export default OngoingEvents;
