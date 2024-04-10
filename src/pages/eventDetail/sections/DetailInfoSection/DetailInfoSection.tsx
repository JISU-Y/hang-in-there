import { useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import {
  useFetchEventDetailImageQuery,
  useFetchEventDetailQuery
} from '../../network/eventDetailQueries';

const DetailInfoSection = () => {
  const { contentid } = useParams<{ contentid: string }>();

  const { data: eventDetail } = useFetchEventDetailQuery(contentid || '');
  const { data: eventDetailImage } = useFetchEventDetailImageQuery(
    contentid || ''
  );

  return (
    <DetailInfoContainer>
      {eventDetailImage?.map(image => (
        <ImageWrapper key={image.contentid}>
          <Image src={image.originimgurl} />
        </ImageWrapper>
      ))}
      {/* TODO: 접기 / 더보기 */}
      <Description>{eventDetail?.overview}</Description>
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

const Image = styled.img`
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
`;
