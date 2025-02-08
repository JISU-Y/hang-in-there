import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useBreakpointValue
} from '@chakra-ui/react';
import Loader from '@domains/common/components/Loader/Loader';
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';

import { useFetchNearEventListQuery } from '../network/eventListQueries';
import EventCard from '../components/EventCard';

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

  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Modal
      size={isMobile ? 'full' : 'xl'}
      scrollBehavior="inside"
      onClose={onClose}
      isOpen={isOpen}
      motionPreset={isMobile ? 'slideInBottom' : 'scale'}
      isCentered={!isMobile}
    >
      <ModalOverlay
        bg="rgba(0, 0, 0, 0.4)"
        css={css`
          @media (max-width: 768px) {
            backdrop-filter: blur(4px);
          }
        `}
      />
      <StyledModalContent isMobile={isMobile || false} isOpen={isOpen}>
        <ModalHeader>내 주변 행사</ModalHeader>
        <ModalCloseButton />
        <StyledModalBody isMobile={isMobile || false}>
          {(!nearEventList && isLoading) || isLocationLoading ? (
            <Loader
              spinnerSize="l"
              description="내 주변 행사를 불러오고 있어요"
            />
          ) : (
            (!nearEventList || nearEventList?.length === 0) && (
              <div>권한 재설정해주세요</div>
            )
          )}
          <SimpleGrid
            columns={{ base: 2, md: 3 }}
            spacing={{ base: '16px', md: '32px' }}
            width="100%"
          >
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
        </StyledModalBody>
      </StyledModalContent>
    </Modal>
  );
};

// const HeightImpressionArea = styled(ImpressionArea)`
//   height: 40px;
// `;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

const StyledModalContent = styled(ModalContent)<{
  isMobile: boolean;
  isOpen: boolean;
}>`
  ${({ isMobile, isOpen }) =>
    isMobile &&
    css`
      margin: 0;
      position: fixed;
      bottom: 0;
      border-radius: 20px 20px 0 0;
      min-height: 85vh;
      animation: ${isOpen ? slideUp : slideDown} 0.3s ease-in-out forwards;
      overflow: hidden;
    `}
`;

const StyledModalBody = styled(ModalBody)<{ isMobile: boolean }>`
  ${({ isMobile }) =>
    isMobile &&
    css`
      padding: 20px 16px;
      padding-bottom: calc(env(safe-area-inset-bottom) + 20px);
      height: calc(80dvh - 60px); /* 헤더 높이(60px) 제외 */
      overflow-y: auto;

      /* 스크롤바 스타일링 */
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #e2e8f0;
        border-radius: 2px;
      }
    `}
`;

export default NearEventListModal;
