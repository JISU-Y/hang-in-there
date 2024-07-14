import Link from 'next/link';
import Image from 'next/image';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card, CardBody, CardFooter, Heading, Text } from '@chakra-ui/react';
import { formatDate } from '@logics/utils/dateFormat';

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
    const formattedDate = formatDate({
      date,
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  return (
    <Card
      as={Link}
      href={`/eventDetail/${eventId}`}
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
          <Image
            fill
            src={imageUrl}
            alt={`festival-${title}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
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
  position: relative;
  width: 100%;
  height: auto;
  aspect-ratio: 2/3;
`;
