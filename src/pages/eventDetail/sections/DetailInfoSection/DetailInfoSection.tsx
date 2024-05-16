import { useNavigate, useParams } from 'react-router-dom';

import styled from '@emotion/styled';

import { useFetchEventDetailQuery } from '../../network/eventDetailQueries';
// import EventMap from '../../components/EventMap/EventMap';

const DetailInfoSection = () => {
  const { contentid } = useParams<{ contentid: string }>();
  const navigate = useNavigate();

  const { data: eventDetail } = useFetchEventDetailQuery(Number(contentid));

  const handleClickBackToList = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/category?=축제'); // TODO: 행사에 해당하는 category로 보내주기
    }
  };

  return (
    <DetailInfoContainer>
      {eventDetail?.img?.map((image, index) => (
        <ImageWrapper key={`${image.sort_order}-${index}`}>
          <Image src={image.url} />
        </ImageWrapper>
      ))}
      {/* TODO: 접기 / 더보기 */}
      <Description
        dangerouslySetInnerHTML={{
          __html: eventDetail?.description || ''
        }}
      />

      {/* <EventMap /> */}

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
  white-space: pre-line;
`;

const BackToListButton = styled.button`
  font-size: 16px;
  font-weight: 400;
  color: #ffffff;
  padding: 8px 74px;
  background-color: #ff6917;
  margin: 0 auto;
  display: block;
`;
