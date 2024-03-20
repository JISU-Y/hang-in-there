import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';
import styled from '@emotion/styled';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@styles/custom-slick.css';

const settings: Settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4800,
  arrows: false,
  touchThreshold: 100
};

const Collections = () => {
  return (
    <Container>
      <Slider {...settings}>
        <ImageWrapper>
          <Image src={`/logo/intro.png`} alt="intro-logo" />
          <TitleWrapper>
            <Title>행인들 소개</Title>
            <DetailLink to="/">소개 보러가기</DetailLink>
          </TitleWrapper>
        </ImageWrapper>
        {[1, 2, 3, 4, 5, 6, 7].map(festival => (
          <ImageWrapper key={festival}>
            <Image
              src={`/temp/festival-${festival}.png`}
              alt={`festival-${festival}`}
            />
          </ImageWrapper>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 360px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TitleWrapper = styled.div`
  position: absolute;
  bottom: 36px;
  left: 112px;
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 16px;
`;

const DetailLink = styled(Link)`
  font-size: 24px;
  color: #ffffff;
`;

export default Collections;
