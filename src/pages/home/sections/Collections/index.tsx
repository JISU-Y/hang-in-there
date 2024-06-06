import { Link } from 'react-router-dom';
import Slider, { Settings } from 'react-slick';

import styled from '@emotion/styled';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getOpacityColor } from '@src/styles/mixins';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const bannerList = [
  {
    themeColor: '#4B2E6C',
    title: `궁궐 곳곳 숨은 옛이야기\n창덕궁 달빛기행`,
    contentId: '1',
    link: '',
    backgroundImageUrl: 'banner/changduckgung-festival-background.png',
    posterImageUrl: 'banner/changduckgung-festival-poster.png'
  },
  {
    themeColor: '#EA553F',
    title: `횡단, 도시, 숲, 광장\n안산 국제 거리극 축제`,
    contentId: '2',
    link: '',
    backgroundImageUrl: 'banner/ansan-street-arts-festival-background.png',
    posterImageUrl: 'banner/ansan-street-arts-festival-poster.png'
  },
  {
    themeColor: '#FF7D34',
    title: `마주, 봄.\n함께라서 행복한 자기\n여주 도자기 축제`,
    contentId: '3',
    link: '',
    backgroundImageUrl: 'banner/yeoju-festival-background.png',
    posterImageUrl: 'banner/yeoju-festival-background.png'
  },
  {
    themeColor: '#3F3D3C',
    title: `선화 공주의 사랑 이야기\n익산 서동 축제`,
    contentId: '4',
    link: '',
    backgroundImageUrl: 'banner/iksan-seodong-festival-background.png',
    posterImageUrl: 'banner/iksan-seodong-festival-poster.png'
  },
  {
    themeColor: '#3F3D3C',
    title: `지구인에서 우주인으로\n고흥 우주항공축제`,
    contentId: '5',
    link: '',
    backgroundImageUrl: 'banner/goheung-universe-festival-background.png',
    posterImageUrl: 'banner/goheung-universe-festival-poster.png'
  }
];

const CustomNextArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  right: 3%;
  z-index: 3;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  & svg {
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateX(5px);
    }
  }
`;

const CustomPrevArrow = styled.button`
  width: 40px;
  height: 40px;
  position: absolute;
  top: 50%;
  left: 3%;
  z-index: 3;
  border-radius: 50%;
  transition: all 0.3s ease-in-out;

  & svg {
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateX(-5px);
    }
  }
`;

const settings: Settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4800,
  touchThreshold: 100,
  nextArrow: (
    <CustomNextArrow>
      <ChevronRightIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomNextArrow>
  ),
  prevArrow: (
    <CustomPrevArrow>
      <ChevronLeftIcon w={10} h={10} strokeWidth={1} color="#ffffff" />
    </CustomPrevArrow>
  )
};

const Collections = () => {
  return (
    <Container>
      <Slider {...settings}>
        {bannerList.map(festival => (
          <BannerCard key={festival.title}>
            <BackgroundImageWrapper key={festival.contentId}>
              <Image
                src={festival.backgroundImageUrl}
                alt={`festival-${festival.title}-background`}
              />
            </BackgroundImageWrapper>

            <BlurWrapper $themeColor={festival.themeColor} />

            <TitleWrapper>
              <Title>{festival.title}</Title>
              <DetailLink to="/">
                <span>자세히 알아보기</span>
                <ChevronRightIcon w={8} h={8} strokeWidth={1} color="#ffffff" />
              </DetailLink>
            </TitleWrapper>

            <PosterImageWrapper>
              <Image
                src={festival.posterImageUrl}
                alt={`festival-${festival.title}-poster`}
              />
            </PosterImageWrapper>
          </BannerCard>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 580px;

  .slick-list {
    margin: 0 -7px;
  }
`;

const BannerCard = styled.div`
  display: flex !important;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100% !important;
  height: 580px;
  padding: 0 112px;
  gap: 24px;
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BlurWrapper = styled.div<{ $themeColor: string }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ $themeColor }) =>
    getOpacityColor($themeColor || '#EA553F', 0.4)};
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const PosterImageWrapper = styled.div`
  position: relative;
  width: 363px;
  height: 480px;
  flex-shrink: 0;
`;

const TitleWrapper = styled.div`
  max-width: 740px;
  margin: auto 0 36px;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  white-space: pre-line;
`;

const DetailLink = styled(Link)`
  font-size: 24px;
  color: #ffffff;
  z-index: 1;

  display: flex;
  align-items: center;
`;

export default Collections;
