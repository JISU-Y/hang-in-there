import styled from '@emotion/styled';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@styles/custom-slick.css';

const settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4800,
  arrows: false
};

const Collections = () => {
  return (
    <Container>
      <Slider {...settings}>
        <ImageWrapper>
          <Image src={`/logo/intro.png`} alt="intro-logo" />
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
  width: 100%;
  height: 360px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default Collections;
