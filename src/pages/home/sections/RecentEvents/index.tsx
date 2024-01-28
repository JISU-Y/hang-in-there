import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  // CardHeader,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import Slider from 'react-slick';
import { format } from 'date-fns';

import { useFetchEventListQuery } from '../../network/eventListQueries';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';

type SlickArrowProps = Pick<
  HTMLAttributes<HTMLDivElement>,
  'className' | 'style' | 'onClick'
>;

function CustomNextArrow({ className, style, onClick }: SlickArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'red' }}
      onClick={onClick}
    />
  );
}

function CustomPrevArrow({ className, style, onClick }: SlickArrowProps) {
  return (
    <div
      className={className}
      style={{ ...style, display: 'block', background: 'green' }}
      onClick={onClick}
    />
  );
}

const settings = {
  dots: true,
  dotsClass: 'custom-dots',
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <CustomNextArrow />,
  prevArrow: <CustomPrevArrow />
};

const RecentEvents = () => {
  const { data: eventList } = useFetchEventListQuery({
    numOfRows: 10,
    eventStartDate: format(new Date(), 'yyyyMMdd'),
    pageNo: 1
  });

  return (
    <Container>
      <SliderWrapper>
        <Slider {...settings}>
          {eventList?.map(el => (
            <Card
              as={Link}
              to={`/eventDetail/${el.contentid}`}
              key={el.title}
              maxW="275px"
              h="100%"
              maxH="420px"
              size="sm"
              colorScheme="orange"
              direction="column"
              margin={1}
            >
              {/* <CardHeader backgroundColor="#F3F72480">진행 예정</CardHeader> */}
              <CardBody padding="0">
                <ImageWrapper>
                  <Img
                    src={el.firstimage}
                    alt={`festival-${el.title}`}
                    objectFit="cover"
                  />
                </ImageWrapper>
              </CardBody>
              <CardFooter
                h="160px"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Heading
                  as="h4"
                  size="md"
                  wordBreak="keep-all"
                  marginBottom={4}
                  css={HeadingCSS}
                >
                  {el.title}
                </Heading>
                <Text>{el.addr1}</Text>
              </CardFooter>
            </Card>
          ))}
        </Slider>
      </SliderWrapper>
    </Container>
  );
};

const HeadingCSS = css`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Container = styled.section`
  width: 100%;
`;

const SliderWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  border-radius: 4px;
  padding: 8px 0;
`;

const ImageWrapper = styled.div`
  width: auto;
  height: 240px;
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export default RecentEvents;
