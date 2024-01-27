import { useMemo } from 'react';

import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import { isSameDay } from 'date-fns';

import styled from '@emotion/styled';
import '@styles/custom-slick.css';

import {
  useFetchEventDetailImageQuery,
  useFetchEventDetailIntroQuery,
  useFetchEventDetailQuery
} from './network/eventDetailQueries';
import InfoList from './components/InfoList';
import { DetailInfoType, DetailInfoUnionType } from './types/detail';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false
};

const EventDetailPage = () => {
  const { contentid } = useParams<{ contentid: string }>();

  const { data: eventDetail } = useFetchEventDetailQuery(contentid || '');
  const { data: eventDetailIntro } = useFetchEventDetailIntroQuery(
    contentid || ''
  );
  const { data: eventDetailImage } = useFetchEventDetailImageQuery(
    contentid || ''
  );

  const eventDetailInfo: DetailInfoType | null = useMemo(() => {
    if (!eventDetail || !eventDetailIntro) return null;

    const formatType = 'yyyy년 M월 d일 (eeeee)';

    // const startDate = format(eventDetailIntro.eventstartdate, formatType);
    // const endDate = format(eventDetailIntro.eventenddate, formatType);
    const hasPeriod =
      eventDetailIntro.eventenddate &&
      !isSameDay(
        eventDetailIntro.eventstartdate,
        eventDetailIntro.eventenddate
      );

    return {
      period: `${eventDetailIntro.eventstartdate}${
        hasPeriod ? ` ~ ${eventDetailIntro.eventenddate}` : ''
      }`,
      place: `${eventDetail.addr1} ${eventDetail.addr2}`,
      time: eventDetailIntro.playtime,
      hostName: eventDetailIntro.sponsor1,
      hostPhone: eventDetailIntro.sponsor1tel,
      homePageLink: eventDetail.homepage,
      description: eventDetail.overview
    };
  }, [eventDetail, eventDetailIntro]);

  return (
    <Container>
      <ContentWrapper>
        <SliderWrapper>
          {eventDetailImage ? (
            <Slider {...settings}>
              {eventDetailImage.map(detailImg => (
                <ImageWrapper key={detailImg.serialnum}>
                  <Image
                    src={detailImg.originimgurl}
                    alt={`festival-${detailImg.imgname}`}
                  />
                </ImageWrapper>
              ))}
            </Slider>
          ) : (
            <ImageWrapper>
              <Image
                src={eventDetail?.firstimage}
                alt={`festival-${eventDetail?.firstimage}`}
              />
            </ImageWrapper>
          )}
        </SliderWrapper>

        <DetailWrapper>
          <Title>{eventDetail?.title}</Title>
          <InfoListWrapper>
            {eventDetailInfo &&
              Object.entries(eventDetailInfo).map(
                ([key, value]) =>
                  value && (
                    <InfoList
                      key={key}
                      title={key as DetailInfoUnionType}
                      value={value}
                    />
                  )
              )}
          </InfoListWrapper>
        </DetailWrapper>
      </ContentWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 64px 48px;
`;

const ContentWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const SliderWrapper = styled.div`
  width: 360px;
  height: 480px;
  flex-shrink: 0;
  border-radius: 4px;
  overflow: hidden;
`;

const ImageWrapper = styled.div`
  width: 360px;
  height: 480px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailWrapper = styled.div`
  width: 100%;
`;

const Title = styled.h2`
  font-size: 22px;
  font-weight: 600;
  width: 100%;
  padding: 4px;
  text-align: center;
  background-color: rgba(255, 165, 0, 0.2);
  border-radius: 4px;
`;

const InfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export default EventDetailPage;
