import { format, isValid, parse } from 'date-fns';
import { css } from '@emotion/react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Image,
  Stack,
  Tag,
  Text
} from '@chakra-ui/react';
import { LinkIcon } from '@chakra-ui/icons';
import { ko } from 'date-fns/locale';

interface EventCardProps {
  imageUrl: string;
  title: string;
  status: 'ongoing' | 'soon' | 'always' | 'closed';
  range: {
    startDate: string;
    endDate: string;
  };
  location: string;
}

const EventCard = ({
  imageUrl,
  title,
  status,
  range,
  location
}: EventCardProps) => {
  const formatRange = () => {
    const formatType = 'MM. dd. yy (eee)';

    const startDate = parse(range.startDate, 'yyyyMMdd', new Date());
    const endDate = parse(range.endDate, 'yyyyMMdd', new Date());

    if (!isValid(startDate) || !isValid(endDate)) return;

    return `${format(startDate, formatType, { locale: ko })} ~ ${format(
      endDate,
      formatType,
      { locale: ko }
    )} `;
  };

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      variant="elevated"
      height={210}
      css={css`
        position: 'relative';
        top: 0;
        transition: top ease 0.2s;
        cursor: pointer;
        overflow: hidden;

        &:hover {
          top: -5px;
        }
      `}
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '160px' }}
        src={
          imageUrl ||
          'https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        }
        alt="Caffe Latte"
      />

      <Stack
        css={css`
          width: 100%;
        `}
      >
        <CardHeader py={2}>
          <Stack
            direction={['column', 'row']}
            justify="space-between"
            spacing="24px"
          >
            <Tag size="sm">{status || '진행예정'}</Tag>
            <Button
              rightIcon={<LinkIcon />}
              colorScheme="blue"
              size="xs"
              variant="link"
            >
              공유하기
            </Button>
          </Stack>
        </CardHeader>

        <CardBody
          py={0}
          paddingBottom={2}
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Heading as="h3" size="md" fontWeight={700} noOfLines={2}>
            {title || '제목은 이렇게 굵게 표시 두 줄일 때'}
          </Heading>
          <Text py="1" pb={0} fontSize="sm">
            기간: {formatRange()}
          </Text>
          <Text py="1" pt={0} fontSize="sm">
            장소: {location}
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default EventCard;
