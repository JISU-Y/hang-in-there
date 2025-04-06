import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';

interface PostDetailModalProps {
  postId: string;
  isOpen: boolean;
  onClose: () => void;
}

const PostDetailModal = ({ isOpen, onClose, postId }: PostDetailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>게시글 상세</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <h1>게시글 상세</h1>
          <p>{postId}</p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default PostDetailModal;
