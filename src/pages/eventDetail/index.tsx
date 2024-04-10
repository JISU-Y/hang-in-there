import { useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { isSameDay } from 'date-fns';

import styled from '@emotion/styled';
import '@styles/custom-slick.css';

import {
  useFetchEventDetailIntroQuery,
  useFetchEventDetailQuery
} from './network/eventDetailQueries';
import { DetailInfoType } from './types/detail';

import { extractUrl } from '@src/logics/utils/extractUrl';
import DetailInfoSection from './sections/DetailInfoSection/DetailInfoSection';

const EventDetailPage = () => {
  const { contentid } = useParams<{ contentid: string }>();

  const { data: eventDetail } = useFetchEventDetailQuery(contentid || '');
  const { data: eventDetailIntro } = useFetchEventDetailIntroQuery(
    contentid || ''
  );

  const eventDetailInfo: DetailInfoType | null = useMemo(() => {
    if (!eventDetail || !eventDetailIntro) return null;

    // const formatType = 'yyyy년 M월 d일 (eeeee)';

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
      sponsorName: eventDetailIntro.sponsor1,
      hostName: eventDetailIntro.sponsor2,
      hostPhone: eventDetailIntro.sponsor2tel,
      homePageLink: extractUrl(eventDetail.homepage),
      description: eventDetail.overview
    };
  }, [eventDetail, eventDetailIntro]);

  return (
    <Container>
      <ContentWrapper>
        <ImageWrapper>
          <Image
            src={eventDetail?.firstimage}
            alt={`festival-${eventDetail?.firstimage}`}
          />
        </ImageWrapper>

        <DetailWrapper>
          <Title>{eventDetail?.title}</Title>
          <EventTimeWrapper>
            <EventTime
              dangerouslySetInnerHTML={{
                __html: eventDetailInfo?.period || ''
              }}
            />
            <EventTime
              dangerouslySetInnerHTML={{ __html: eventDetailInfo?.time || '' }}
            />
          </EventTimeWrapper>

          <EventInfoWrapper>
            <EventPlace>{eventDetailInfo?.place}</EventPlace>
            <EventHostPhone>{eventDetailInfo?.hostPhone}</EventHostPhone>
          </EventInfoWrapper>

          <EventHostInfoWrapper>
            <HostInfoKey>주관</HostInfoKey>
            <HostInfoValue>{eventDetailInfo?.sponsorName}</HostInfoValue>
          </EventHostInfoWrapper>
          <EventHostInfoWrapper>
            <HostInfoKey>주최</HostInfoKey>
            <HostInfoValue>
              <a href={eventDetailInfo?.homePageLink} target="_blank">
                {eventDetailInfo?.hostName}
              </a>
            </HostInfoValue>
          </EventHostInfoWrapper>
        </DetailWrapper>
      </ContentWrapper>

      <DetailInfoSection />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding: 64px 48px;
`;

const ContentWrapper = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const ImageWrapper = styled.div`
  width: 60%;
  max-width: 760px;
  height: auto;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DetailWrapper = styled.div`
  width: 40%;
  max-width: 496px;
  padding: 56px 0;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  line-height: 36px;
  width: 100%;
  margin-bottom: 24px;
  color: #191919;
`;

const EventTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 32px;
`;

const EventTime = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  color: #191919;
`;

const EventInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`;

const EventPlace = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  color: #191919;
`;

const EventHostPhone = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  color: #191919;
`;

const EventHostInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-bottom: 8px;
`;

const HostInfoKey = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: #767676;
`;

const HostInfoValue = styled.p`
  font-size: 16px;
  line-height: 22px;
  font-weight: 400;
  color: #767676;

  a {
    text-decoration: underline;
  }
`;

const InfoListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export default EventDetailPage;
