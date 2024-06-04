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
import { useFetchNearEventListQuery } from '../../network/eventListQueries';
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
  const { data: nearEventList, isLoading } = useFetchNearEventListQuery({
    mapX,
    mapY
  });

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
          {isLoading || isLocationLoading ? (
            <div>내 주변 행사 로딩 중...</div>
          ) : (
            (!nearEventList || nearEventList?.length === 0) && (
              <div>권한 재설정해주세요</div>
            )
          )}
          <SimpleGrid minChildWidth="232px" spacing="32px">
            {nearEventList &&
              nearEventList.map(event => (
                <EventCard
                  key={event.event_id}
                  eventId={String(event.event_id)}
                  imageUrl={event.image}
                  title={event.title}
                  status="always"
                  location={event.addr}
                />
              ))}
          </SimpleGrid>
          {/* TODO: 페이지네이션(무한 스크롤) 추가되면 주석 제거 */}
          {/* <HeightImpressionArea
            onImpressionStart={() => {
              if (!!mapX && !!mapY) {
                fetchNextPage();
              }
            }}
            areaThreshold={0.5}
          /> */}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const HeightImpressionArea = styled(ImpressionArea)`
  height: 40px;
`;

export default NearEventListModal;
