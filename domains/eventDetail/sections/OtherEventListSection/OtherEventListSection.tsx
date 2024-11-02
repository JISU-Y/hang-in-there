'use client';

import Slider, { Settings } from 'react-slick';

import styled from '@emotion/styled';
import { EventCard } from '@domains/eventDetail/components/EventCard/EventCard';

import { useFetchOtherEventListQuery } from '../../network/eventDetailQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings: Settings = {
  dots: false,
  infinite: false,
  slidesToShow: 5,
  slidesToScroll: 1,
  swipeToSlide: true,
  touchThreshold: 100,
  initialSlide: 0
};

interface OtherEventListSectionProps {
  eventId: number;
  areaCode: number;
}

const OtherEventListSection = ({
  eventId,
  areaCode
}: OtherEventListSectionProps) => {
  const { data: eventData } = useFetchOtherEventListQuery(eventId, areaCode);

  if (eventData && eventData.list.length < 1) return null;

  return (
    <Container>
      <SectionTitle>이 지역 다른 행사</SectionTitle>
      <SliderWrapper>
        <Slider {...settings}>
          {eventData?.list?.map(el => <EventCard event={el} />)}
        </Slider>
      </SliderWrapper>
    </Container>
  );
};

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

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 36px;
`;

export default OtherEventListSection;
