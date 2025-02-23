'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useMediaQuery, Tooltip } from '@chakra-ui/react';

import Slider, { Settings } from 'react-slick';
import styled from '@emotion/styled';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { getOpacityColor } from '@styles/mixins';
import { useFetchBannerListQuery } from '@domains/home/network/homeQueries';
import { getAverageColorFromUrl } from '@logics/utils/imageHandler';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CATEGORIES = [
  {
    id: 'festival',
    name: '축제',
    icon: '/assets/festival.svg',
    code: 'A0207'
  },
  {
    id: 'performance',
    name: '공연',
    icon: '/assets/performance.svg',
    code: 'A0208'
  },
  {
    id: 'exhibition',
    name: '전시',
    icon: '/assets/exhibition.svg',
    code: 'A0209'
  },
  {
    id: 'education',
    name: '교육/체험',
    icon: '/assets/education.svg',
    code: 'A0209',
    disabled: true
  },
  {
    id: 'youth',
    name: '아동/청소년',
    icon: '/assets/youth.svg',
    code: 'A0209',
    disabled: true
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
  const { data: bannerList } = useFetchBannerListQuery();
  const [themeColors, setThemeColors] = useState<{ [key in string]: string }>(
    {}
  );
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const buildSearchParams = () => {
    const params = new URLSearchParams();

    const searchKeyword = searchParams.get('search');
    const areaCode = searchParams.getAll('areaCode')?.[0];
    const status = searchParams.getAll('status')?.[0];

    if (searchKeyword) {
      params.append('searchKeyword', searchKeyword);
    }
    if (areaCode) {
      params.append('areaCode', areaCode);
    }
    if (status) {
      params.append('status', status);
    }

    return params.toString();
  };

  const handleCategoryClick = (categoryId: string) => {
    const queryString = buildSearchParams();
    push(
      `/category?category=${categoryId}${queryString ? `&${queryString}` : ''}`
    );
  };

  const getImageThemeColor = async (imageUrl: string) => {
    const averageColor = (await getAverageColorFromUrl(imageUrl)) as {
      r: number;
      g: number;
      b: number;
    };

    // 여기서 평균 색상을 HEX 문자열로 변환
    return `#${((1 << 24) + (averageColor.r << 16) + (averageColor.g << 8) + averageColor.b).toString(16).slice(1)}`;
  };

  useEffect(() => {
    const fetchThemeColors = async () => {
      if (!bannerList) return;

      const colors = {} as { [key in string]: string };
      for (const festival of bannerList) {
        const themeColor = await getImageThemeColor(festival.event_image);
        colors[festival.content] = themeColor;
      }
      setThemeColors(colors);
    };

    if (bannerList) {
      fetchThemeColors();
    }
  }, [bannerList]);

  const renderCategoryItem = (category: (typeof CATEGORIES)[0]) => {
    const content = (
      <CategoryItem
        key={category.id}
        $disabled={category?.disabled}
        onClick={() => !category.disabled && handleCategoryClick(category.code)}
      >
        <CategoryIcon>
          <Image
            src={category.icon}
            alt={category.name}
            width={24}
            height={24}
          />
        </CategoryIcon>
        <CategoryName>{category.name}</CategoryName>
      </CategoryItem>
    );

    if (category.disabled) {
      return (
        <Tooltip
          key={category.id}
          label="준비 중입니다."
          placement="top"
          hasArrow
        >
          {content}
        </Tooltip>
      );
    }

    return content;
  };

  if (isMobile) {
    return (
      <MobileContainer>
        <MobileSliderWrapper {...settings}>
          {bannerList?.map(festival => (
            <BannerCard key={festival.content}>
              <TitleWrapper>
                <Title>{festival.content}</Title>
                <DetailLink href="/">
                  <span>자세히 알아보기</span>
                  <ChevronRightIcon
                    w={8}
                    h={8}
                    strokeWidth={1}
                    color="#ffffff"
                  />
                </DetailLink>
              </TitleWrapper>

              <PosterImageWrapper>
                <Image
                  src={festival.event_image}
                  alt={`festival-${festival.content}-poster`}
                  width={400}
                  height={580}
                />
              </PosterImageWrapper>
            </BannerCard>
          ))}
        </MobileSliderWrapper>

        <CategoryList>{CATEGORIES.map(renderCategoryItem)}</CategoryList>
        <HorizontalLine />
      </MobileContainer>
    );
  }

  return (
    <Container>
      <Slider {...settings}>
        {bannerList?.map(festival => (
          <BannerCard key={festival.content}>
            <BackgroundImageWrapper>
              <Image
                src={festival.bg_image}
                alt={`festival-${festival.content}-background`}
                width={1920}
                height={580}
              />
            </BackgroundImageWrapper>

            <BlurWrapper $themeColor={themeColors[festival.content]} />

            <TitleWrapper>
              <Title>{festival.content}</Title>
              <DetailLink href="/">
                <span>자세히 알아보기</span>
                <ChevronRightIcon w={8} h={8} strokeWidth={1} color="#ffffff" />
              </DetailLink>
            </TitleWrapper>

            <PosterImageWrapper>
              <Image
                src={festival.event_image}
                alt={`festival-${festival.content}-poster`}
                width={400}
                height={580}
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

  .custom-dots {
    position: absolute;
    bottom: 8px;
    left: 50%;
    transform: translateX(-50%);
    display: inline-block;
    vertical-align: middle;
  }

  .custom-dots li {
    list-style: none;
    cursor: pointer;
    display: inline-block;
    margin: 0 6px;
    padding: 0;
  }

  .custom-dots li button {
    border: none;
    background: rgba(255, 255, 255, 0.5);
    color: transparent;
    cursor: pointer;
    display: block;
    height: 8px;
    width: 8px;
    border-radius: 100%;
    padding: 0;
  }

  .custom-dots li.slick-active button {
    background-color: #ffffff;
  }

  .slick-arrow {
    width: 40px;
    height: 40px;
    z-index: 1;
    border-radius: 50%;

    &::before {
      width: 100%;
      height: 100%;
      display: none;
    }
  }

  .slick-prev,
  .slick-next {
    .slick-prev::before,
    .slick-next::before {
      opacity: 0;
      display: none;
    }
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

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const BackgroundImageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const BlurWrapper = styled.div<{ $themeColor?: string }>`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background-color: ${({ $themeColor }) =>
    getOpacityColor($themeColor || '#000000', 0.6)};
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

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;

    @media (max-width: 768px) {
      width: 100%;
      height: 50%;
      background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.7));
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
  }
`;

const TitleWrapper = styled.div`
  max-width: 740px;
  margin: auto 0 36px;
  z-index: 2;

  @media (max-width: 768px) {
    position: absolute;
    bottom: 20px;
    left: 20px;
    margin: 0;
    max-width: 204px;
  }
`;

const Title = styled.h2`
  font-size: 52px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
  white-space: pre-line;

  @media (max-width: 768px) {
    font-size: 32px;
    font-weight: 600;
    word-break: keep-all;
  }
`;

const DetailLink = styled(Link)`
  font-size: 24px;
  color: #ffffff;
  z-index: 1;

  display: flex;
  align-items: center;
`;

const MobileContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  background-color: #ffffff;
  position: relative;

  .slick-arrow {
    display: none !important;
  }

  .slick-prev,
  .slick-next {
    display: none;
  }

  .custom-dots {
    position: absolute;
    bottom: 20px;
    right: 46px;
    display: flex !important;
    flex-direction: column;
    gap: 8px;
    z-index: 2;
    transform: none;
    left: auto;
  }

  .custom-dots li {
    margin: 0;
    padding: 0;
    width: 8px;
    height: 8px;
  }

  .custom-dots li button {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    color: transparent;
    font-size: 0;
    padding: 0;
    margin: 0;
  }

  .custom-dots li.slick-active button {
    background-color: #ffffff;
  }
`;

export const MobileSliderWrapper = styled(Slider)`
  position: relative;
  padding: 0 20px;
`;

const CategoryList = styled.ul`
  display: flex;
  justify-content: space-between;
  list-style: none;
  padding: 0 20px;
  margin: 0;
  width: 100%;
  height: 54px;
`;

const CategoryItem = styled.li<{ $disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 60px;
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};

  a {
    text-decoration: none;
    color: inherit;
    width: 100%;
    cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  }
`;

const CategoryIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  border-radius: 50%;
`;

const CategoryName = styled.span`
  font-size: 16px;
  color: #333333;
  text-align: center;
  white-space: nowrap;
`;

const HorizontalLine = styled.div`
  width: 100%;
  height: 6px;
  background-color: #ededed;
`;

export default Collections;
