'use client';

import { useState } from 'react';
import Image from 'next/image';

import { isSameDay } from 'date-fns';

import styled from '@emotion/styled';
import LocationIcon from '@styles/icons/LocationIcon';
import CallOutgoingIcon from '@styles/icons/CallOutgoingIcon';
import ShareIcon from '@styles/icons/ShareIcon';
import { extractUrl } from '@logics/utils/extractUrl';
import { formatDate } from '@logics/utils/dateFormat';
import copyToClipboard from '@logics/utils/copyToClipboardHandler';

import DetailInfoSection from './sections/DetailInfoSection/DetailInfoSection';
import OtherEventListSection from './sections/OtherEventListSection/OtherEventListSection';
import { DetailInfoType } from './types/detail';
import { useFetchEventDetailQuery } from './network/eventDetailQueries';

import '@styles/custom-slick.css';
import MarkerIcon from '@styles/icons/MarkerIcon';
import CalendarIcon from '@styles/icons/CalendarIcon';

interface EventDetailPageProps {
  contentId: string;
}

// TODO: ViewModel 만들기, emotion server side 걷어 낼지...
const EventDetailPage = ({ contentId }: EventDetailPageProps) => {
  const [error, setError] = useState(false);

  const { data: eventDetail } = useFetchEventDetailQuery(contentId);

  const getEventDetailInfo = (): DetailInfoType | null => {
    if (!eventDetail) return null;

    const hasPeriod =
      eventDetail.event_ed &&
      !isSameDay(eventDetail.event_st, eventDetail.event_ed);

    return {
      period: `${formatDate({
        date: eventDetail.event_st,
        customType: 'yyyy. MM. dd.(EEE)'
      })}${
        hasPeriod
          ? ` ~ ${formatDate({
              date: eventDetail.event_ed,
              customType: 'yyyy. MM. dd.(EEE)'
            })}`
          : ''
      }`,
      place: `${eventDetail.addr} ${eventDetail.addr_detail}`,
      time: eventDetail.costInfo, // TODO: playtime 없음.
      sponsorName: eventDetail.sponsor,
      hostName: eventDetail.host,
      hostPhone: eventDetail.tel,
      homePageLink: extractUrl(eventDetail.homepage_url),
      description: eventDetail.description
    };
  };
  const eventDetailInfo = getEventDetailInfo();

  const handleClickShare = () => {
    copyToClipboard(window.location.href, {
      resolve: () => {
        alert('링크가 복사 되었습니다.');
      }
    });
  };

  return (
    <Container>
      <DetailContainer>
        <ContentWrapper>
          <ImageSection>
            <BackgroundImageWrapper>
              <BlurredBackground
                src={
                  !error && !!eventDetail?.img[0]
                    ? eventDetail?.img[0]?.url
                    : '/logo/poster-fallback.png'
                }
                alt=""
                fill
                style={{ objectFit: 'cover' }}
              />
              <Overlay />
            </BackgroundImageWrapper>

            <ImageWrapper>
              <Image
                width={112}
                height={150}
                src={
                  !error && !!eventDetail?.img[0]
                    ? eventDetail?.img[0]?.url
                    : '/logo/poster-fallback.png'
                }
                alt={`festival-${eventDetail?.title}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
                onError={() => setError(true)}
              />
            </ImageWrapper>

            <IconsWrapper>
              <IconButton type="button" onClick={handleClickShare}>
                <ShareIcon color="#ffffff" />
              </IconButton>
            </IconsWrapper>
          </ImageSection>

          <DetailWrapper>
            <Title>{eventDetail?.title}</Title>

            <EventTimeWrapper>
              <CalendarIcon width="16px" height="16px" color="#191919" />
              <EventPeriodTimeBox>
                {eventDetailInfo?.period && (
                  <EventTime
                    dangerouslySetInnerHTML={{
                      __html: eventDetailInfo?.period || ''
                    }}
                  />
                )}
                {eventDetailInfo?.time && (
                  <EventTime
                    dangerouslySetInnerHTML={{
                      __html: eventDetailInfo?.time || ''
                    }}
                  />
                )}
              </EventPeriodTimeBox>
            </EventTimeWrapper>

            <EventInfoWrapper>
              <EventPlace>
                <MarkerIcon width="16px" height="16px" color="#FF6917" />
                <span>{eventDetailInfo?.place}</span>
              </EventPlace>
              {eventDetailInfo?.hostPhone && (
                <EventHostPhone>
                  <CallOutgoingIcon
                    width="16px"
                    height="16px"
                    color="#FF6917"
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: eventDetailInfo?.hostPhone
                    }}
                  />
                </EventHostPhone>
              )}
            </EventInfoWrapper>

            <ShareButton type="button" onClick={handleClickShare}>
              <ShareIcon />
            </ShareButton>

            <EventHostInfoSection>
              <EventHostInfoWrapper>
                <HostInfoKey>주관</HostInfoKey>
                <HostInfoValue>{eventDetailInfo?.sponsorName}</HostInfoValue>
              </EventHostInfoWrapper>
              <EventHostInfoWrapper>
                <HostInfoKey>주최</HostInfoKey>
                <HostInfoValue>
                  {eventDetailInfo?.homePageLink ? (
                    <a href={eventDetailInfo?.homePageLink} target="_blank">
                      {eventDetailInfo?.hostName ||
                        eventDetailInfo?.homePageLink}
                    </a>
                  ) : (
                    <span>{eventDetailInfo?.hostName}</span>
                  )}
                </HostInfoValue>
              </EventHostInfoWrapper>
            </EventHostInfoSection>
          </DetailWrapper>
        </ContentWrapper>

        <Divider />

        <DetailInfoSection contentId={contentId} />
      </DetailContainer>

      {eventDetail && (
        <OtherEventListSection
          areaCode={eventDetail.area_cd}
          eventId={eventDetail.event_id}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 0;

  @media (min-width: 768px) {
    padding: 32px 48px 64px;
  }
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 808px;
  margin: auto;

  @media (min-width: 768px) {
    gap: 32px;
  }
`;

const ContentWrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 24px;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 191px;

  @media (min-width: 768px) {
    width: 60%;
    max-width: 394px;
    height: 563px;
  }
`;

const BackgroundImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  @media (min-width: 768px) {
    display: none;
  }
`;

const BlurredBackground = styled(Image)`
  filter: blur(10px);
  transform: scale(1.1);
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const ImageWrapper = styled.div`
  width: 112px;
  height: 150px;
  position: absolute;
  left: 20px;
  bottom: -23px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    position: relative;
    width: 100%;
    min-width: 360px;
    height: 100%;
    left: 0;
    bottom: 0;
    flex-shrink: 0;
  }
`;

const IconsWrapper = styled.div`
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  gap: 8px;

  @media (min-width: 768px) {
    bottom: 24px;
    right: 24px;
  }
`;

const DetailWrapper = styled.div`
  width: 100%;
  padding: 12px 20px 0;

  @media (min-width: 768px) {
    width: 100%;
    max-width: 496px;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 563px;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  line-height: 28px;
  width: 100%;
  margin-bottom: 16px;
  color: #191919;

  @media (min-width: 768px) {
    font-size: 36px;
    line-height: 44px;
    font-weight: 600;
    margin-bottom: 24px;
  }
`;

const EventTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
  margin-bottom: 4px;

  @media (min-width: 768px) {
    margin-bottom: 8px;
  }
`;

const EventPeriodTimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const EventTime = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #191919;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const EventInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    gap: 16px;
    margin-bottom: 4px;
  }
`;

const EventPlace = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #ff6917;
  display: flex;
  align-items: center;
  gap: 6px;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

const EventHostPhone = styled.p`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
  color: #ff6917;
  display: flex;
  align-items: flex-start;
  gap: 6px;

  @media (min-width: 768px) {
    font-size: 16px;
    line-height: 22px;
  }
`;

export const EventHostInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  @media (min-width: 768px) {
    margin-top: auto;
  }
`;

const EventHostInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

const HostInfoKey = styled.p`
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;
  color: #767676;

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const HostInfoValue = styled.p`
  font-size: 12px;
  line-height: 16px;
  font-weight: 400;
  color: #767676;

  a {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  * {
    fill: #ffffff;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const ShareButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 6px;
  background: #ededed;
  margin: 80px 0 34px;

  @media (min-width: 768px) {
    display: none;
  }
`;

export default EventDetailPage;
