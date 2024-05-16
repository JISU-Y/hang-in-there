import { useMemo } from 'react';

import { useParams } from 'react-router-dom';
import { isSameDay } from 'date-fns';

import styled from '@emotion/styled';
import '@styles/custom-slick.css';

import { useFetchEventDetailQuery } from './network/eventDetailQueries';
import { DetailInfoType } from './types/detail';

import { extractUrl } from '@src/logics/utils/extractUrl';
import DetailInfoSection from './sections/DetailInfoSection/DetailInfoSection';
import LocationIcon from '@src/styles/icons/LocationIcon';
import CallOutgoingIcon from '@src/styles/icons/CallOutgoingIcon';
import ShareIcon from '@src/styles/icons/ShareIcon';
import copyToClipboard from '@src/logics/utils/copyToClipboardHandler';
import usePreventScrollRestoration from '@src/logics/hooks/usePreventScrollRestoration';

const EventDetailPage = () => {
  const { contentid } = useParams<{ contentid: string }>();

  usePreventScrollRestoration();

  const { data: eventDetail } = useFetchEventDetailQuery(Number(contentid));

  const eventDetailInfo: DetailInfoType | null = useMemo(() => {
    if (!eventDetail) return null;

    const hasPeriod =
      eventDetail.event_ed &&
      !isSameDay(eventDetail.event_st, eventDetail.event_ed);

    return {
      period: `${eventDetail.event_st}${
        hasPeriod ? ` ~ ${eventDetail.event_ed}` : ''
      }`,
      place: `${eventDetail.addr} ${eventDetail.addr_detail}`,
      time: eventDetail.costInfo, // TODO: playtime 없음.
      sponsorName: eventDetail.sponsor,
      hostName: eventDetail.host,
      hostPhone: eventDetail.tel,
      homePageLink: extractUrl(eventDetail.homepage_url),
      description: eventDetail.description
    };
  }, [eventDetail]);

  const handleClickShare = () => {
    copyToClipboard(window.location.href, {
      resolve: () => {
        alert('링크가 복사 되었습니다.');
      }
    });
  };

  return (
    <Container>
      {/* <BreadcrumWrapper>
        <Breadcrumbs />
      </BreadcrumWrapper> */}

      <ContentWrapper>
        <ImageWrapper>
          <Image
            src={eventDetail?.img[0].url}
            alt={`festival-${eventDetail?.img[0].url}`}
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
              dangerouslySetInnerHTML={{
                __html: eventDetailInfo?.time || ''
              }}
            />
          </EventTimeWrapper>

          <EventInfoWrapper>
            <EventPlace>
              <LocationIcon color="#000000" />
              <span>{eventDetailInfo?.place}</span>
            </EventPlace>
            {eventDetailInfo?.hostPhone && (
              <EventHostPhone>
                <CallOutgoingIcon color="#000000" />
                <span>{eventDetailInfo?.hostPhone}</span>
              </EventHostPhone>
            )}
            <IconButton type="button" onClick={handleClickShare}>
              <ShareIcon color="#000000" />
            </IconButton>
          </EventInfoWrapper>

          <EventHostInfoWrapper>
            <HostInfoKey>주관</HostInfoKey>
            <HostInfoValue>{eventDetailInfo?.sponsorName}</HostInfoValue>
          </EventHostInfoWrapper>
          <EventHostInfoWrapper>
            <HostInfoKey>주최</HostInfoKey>
            <HostInfoValue>
              {eventDetailInfo?.homePageLink ? (
                <a href={eventDetailInfo?.homePageLink} target="_blank">
                  {eventDetailInfo?.hostName || eventDetailInfo?.homePageLink}
                </a>
              ) : (
                <span>{eventDetailInfo?.hostName}</span>
              )}
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
  padding: 32px 48px 64px;
`;

const BreadcrumWrapper = styled.div`
  width: 100%;
  margin-bottom: -27px;
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
  display: flex;
  align-items: center;
  gap: 6px;
`;

const EventHostPhone = styled.p`
  width: 100%;
  font-size: 18px;
  line-height: 24px;
  font-weight: 400;
  color: #191919;
  display: flex;
  align-items: center;
  gap: 6px;
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

const IconButton = styled.button`
  width: fit-content;
  cursor: pointer;
`;

export default EventDetailPage;
