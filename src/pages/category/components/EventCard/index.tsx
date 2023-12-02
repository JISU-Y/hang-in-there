import styled from '@emotion/styled';
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
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="elevated"
      maxH={200}
      cursor="pointer"
    >
      <Image
        objectFit="cover"
        maxW={{ base: '100%', sm: '120px' }}
        src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
        alt="Caffe Latte"
      />

      <Stack>
        <CardHeader py={2}>
          <Stack
            direction={['column', 'row']}
            justify="space-between"
            spacing="24px"
          >
            <Tag size="sm">진행예정</Tag>
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

        <CardBody py={0}>
          <Heading as="h3" size="sm" fontWeight={700} noOfLines={2}>
            제목은 이렇게 굵게 표시 두 줄일 때
          </Heading>

          <Text py="1" pb={0} fontSize="sm">
            기간: 00. 00. 00.(월) ~ 00. 00. 00.(금)
          </Text>
          <Text py="1" pt={0} fontSize="sm">
            장소: 어쩌구저쩌구
          </Text>
        </CardBody>
      </Stack>
    </Card>
  );
};

export default EventCard;
