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
  arrows: false,
  swipeToSlide: true,
  touchThreshold: 1000,
  initialSlide: 0,
  variableWidth: false,
  slidesToShow: 5,
  slidesToScroll: 1
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
          {eventData?.list?.map(el => (
            <CardWrapper key={el.event_id}>
              <EventCard event={el} />
            </CardWrapper>
          ))}
        </Slider>
      </SliderWrapper>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 93px 20px 0;

  @media (max-width: 768px) {
    padding: 36px 16px 0;
  }
`;

const SliderWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  overflow: hidden;

  .slick-track {
    display: flex;
    gap: 16px;
    margin-left: 0;
  }

  .slick-slide {
    width: calc((100% - 64px) / 5) !important;
    min-width: 136px;
    max-width: 264px;
  }
`;

const CardWrapper = styled.div`
  width: 100%;
`;

const SectionTitle = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: #191919;
  margin-bottom: 4px;
`;

export default OtherEventListSection;
