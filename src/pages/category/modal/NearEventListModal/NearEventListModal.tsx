import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid
} from '@chakra-ui/react';
import { ImpressionArea } from '@toss/impression-area';
import styled from '@emotion/styled';
import { useFetchNearEventListInfiniteQuery } from '../../network/eventListQueries';
import EventCard from '../../components/EventCard';

// const DEFAULT_GEO_LOCATION = { mapX: '127.0016985', mapY: '37.5642135' }; // 서울 시청

interface NearEventListModalProps {
  isLocationLoading: boolean;
  mapX: string;
  mapY: string;
  isOpen: boolean;
  onClose: () => void;
}

const NearEventListModal = ({
  isLocationLoading,
  mapX,
  mapY,
  isOpen,
  onClose
}: NearEventListModalProps) => {
  const {
    data: nearEventList,
    fetchNextPage,
    isLoading,
    isFetchingNextPage
  } = useFetchNearEventListInfiniteQuery(
    {
      numOfRows: 10,
      pageNo: 1,
      mapX,
      mapY
    },
    { enabled: !!mapX && !!mapY }
  );

  return (
    <Modal
      size="xl"
      scrollBehavior="inside"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>내 주변 행사</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {(isLoading || isLocationLoading) && (
            <div>내 주변 행사 로딩 중...</div>
          )}
          <SimpleGrid minChildWidth="232px" spacing="32px">
            {nearEventList &&
              nearEventList.pages?.map(event => (
                <EventCard
                  key={event.contentid}
                  eventId={event.contentid}
                  imageUrl={event.firstimage}
                  title={event.title}
                  status="always"
                  location={event.addr1}
                />
              ))}
            {isFetchingNextPage && <div>...</div>}
          </SimpleGrid>
          <HeightImpressionArea
            onImpressionStart={() => fetchNextPage()}
            areaThreshold={0.5}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
`;

export default NearEventListModal;
