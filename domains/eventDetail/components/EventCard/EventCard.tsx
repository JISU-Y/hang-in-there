import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { formatISO } from 'date-fns/formatISO';

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
import { useBooleanState } from '@toss/react';
import { formatDate } from '@logics/utils/dateFormat';
import { EventDataTypeNew } from '@domains/category/types';

interface EventCardProps {
  event: EventDataTypeNew;
}

export const EventCard = ({ event }: EventCardProps) => {
  const [error, setError] = useState(false);

  const { push } = useRouter();

  const [isMouseMoving, setIsMouseMoving, unsetIsMouseMoving] =
    useBooleanState();

  const getFormattedDate = (date: string) => {
    const formattedDate = formatDate({
      date: formatISO(date),
      customType: 'yy/MM/dd'
    });

    return formattedDate;
  };

  const handleClickCard = (contentId: number) => {
    if (isMouseMoving || !contentId) return;

    push(`/eventDetail/${contentId}`);
  };

  return (
    <Card
      key={event.title}
      w="100%"
      h="auto"
      aspectRatio={2 / 3}
      size="sm"
      colorScheme="orange"
      direction="column"
      borderRadius={0}
      borderWidth={0}
      shadow="none"
      boxShadow="none"
      draggable={false}
      onMouseMove={() => setIsMouseMoving()}
      onMouseDown={() => unsetIsMouseMoving()}
      onMouseUp={() => handleClickCard(event.event_id)}
    >
      <CardBody padding="0">
        <ImageWrapper>
          <Img
            src={!error && !!event ? event.image : '/logo/poster-fallback.png'}
            alt={`festival-${event.title}`}
            objectFit="cover"
            onError={() => setError(true)}
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
          {event.title}
        </Heading>
        <Text>{event.addr?.split(' ').slice(0, 2).join(' ')}</Text>
        <Text color="#999999">{`${getFormattedDate(
          event.event_st
        )}-${getFormattedDate(event.event_ed)}`}</Text>
      </CardFooter>
    </Card>
  );
};

const HeadingCSS = css`
  text-overflow: eventlipsis;
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
