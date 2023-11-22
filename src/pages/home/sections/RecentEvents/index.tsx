import { HTMLAttributes } from 'react';
import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './custom-slick.css';

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
  return (
    <Container>
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(el => (
          <Card
            key={el}
            maxW="275px"
            size="sm"
            colorScheme="orange"
            direction="column"
          >
            <CardHeader backgroundColor="#F3F72480">진행 예정</CardHeader>
            <CardBody padding="0">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                objectFit="cover"
              />
            </CardBody>
            <CardFooter flexDirection="column">
              <Heading as="h4" size="md">
                제목 000문화 축제 (축제 이름)
              </Heading>
              <Text>2023.11.16(목) 18시 서울시 광진구</Text>
            </CardFooter>
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
`;

export default RecentEvents;
