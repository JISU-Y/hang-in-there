import { parse } from 'date-fns';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { formatDate } from '@src/logics/utils/dateFormat';
import { formatISO } from 'date-fns/fp';

interface EventCardProps {
  eventId: string;
  imageUrl: string;
  title: string;
  status: 'ongoing' | 'soon' | 'always' | 'closed';
  range?: {
    startDate: string;
    endDate: string;
  };
  location: string;
}

const EventCard = ({
  eventId,
  imageUrl,
  title,
  range,
  location
}: EventCardProps) => {
  const getFormattedDate = (date: string) => {
    const parsedDateString = parse(date, 'yyyyMMdd', new Date());

    const formattedDate = formatDate({
      date: formatISO(parsedDateString),
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  return (
    <Card
      as={Link}
      to={`/eventDetail/${eventId}`}
      key={title}
      w="233px"
      h="auto"
      aspectRatio={2 / 3}
      size="sm"
      colorScheme="orange"
      direction="column"
      borderRadius={0}
      borderWidth={0}
      shadow="none"
      boxShadow="none"
    >
      <CardBody padding="0">
        <ImageWrapper>
          <Img src={imageUrl} alt={`festival-${title}`} objectFit="cover" />
        </ImageWrapper>
      </CardBody>
      <CardFooter
        marginTop="20px"
        padding="0px"
        flexDirection="column"
        gap="8px"
      >
        <Heading
          as="h4"
          size="md"
          wordBreak="keep-all"
          fontWeight={700}
          css={HeadingCSS}
        >
          {title}
        </Heading>
        <Text>{location?.split(' ').slice(0, 2).join(' ')}</Text>
        {range && (
          <Text color="#999999">{`${getFormattedDate(
            range.startDate
          )}-${getFormattedDate(range.endDate)}`}</Text>
        )}
      </CardFooter>
    </Card>
  );
};

export default EventCard;

const HeadingCSS = css`
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
`;

const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
