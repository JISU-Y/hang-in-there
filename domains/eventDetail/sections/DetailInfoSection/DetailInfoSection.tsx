'use client';

import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';

import EventMap from '../../components/EventMap/EventMap';
import Image from 'next/image';
import { useFetchEventDetailQuery } from '@domains/eventDetail/network/eventDetailQueries';

interface DetailInfoSectionProps {
  contentId: string;
}

const DetailInfoSection = ({ contentId }: DetailInfoSectionProps) => {
  const { push, back } = useRouter();

  const { data: eventDetail } = useFetchEventDetailQuery(contentId);

  const handleClickBackToList = () => {
    if (window.history.length > 1) {
      back();
    } else {
      push('/category?=축제'); // TODO: 행사에 해당하는 category로 보내주기
    }
  };

  return (
    <DetailInfoContainer>
      {eventDetail?.img?.map((image, index) => (
        <ImageWrapper key={`${image.sort_order}-${index}`}>
          <EventDetailImage
            width={394}
            height={557}
            src={image.url}
            alt="event-detail"
          />
        </ImageWrapper>
      ))}
      <Description
        dangerouslySetInnerHTML={{
          __html: eventDetail?.description || ''
        }}
      />

      {eventDetail && (
        <EventMap
          position={{
            lat: eventDetail?.map_y || 37.3595704,
            lng: eventDetail?.map_x || 127.105399
          }}
        />
      )}

      <BackToListButton type="button" onClick={handleClickBackToList}>
        목록으로
      </BackToListButton>
    </DetailInfoContainer>
  );
};

export default DetailInfoSection;

const DetailInfoContainer = styled.section`
  width: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
`;

const EventDetailImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #191919;
  margin: 24px 0 96px;
  white-space: pre-line;
`;

const BackToListButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  padding: 8px 74px;
  background-color: #ff6917;
  margin: 39px auto 0;
  display: block;
`;
