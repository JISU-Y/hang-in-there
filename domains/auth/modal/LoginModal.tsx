import Image from 'next/image';

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react';
import styled from '@emotion/styled';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const kakaoLoginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/kakao-login`,
      scope: 'profile_nickname,profile_image'
    });
  };

  return (
    <Modal
      size="sm"
      scrollBehavior="inside"
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>

        <StyledModalBody>
          <LogoImage
            width={100}
            height={35}
            src="/logo/hanginthere-full-logo.svg"
            alt="logo"
          />

          <KakaoLoginButton type="button" onClick={kakaoLoginHandler}>
            <KakaoIcon
              width={352}
              height={45}
              src="/assets/kakao_login_button.png"
              alt="kakao-login"
            />
          </KakaoLoginButton>
        </StyledModalBody>
      </ModalContent>
    </Modal>
  );
};

const StyledModalBody = styled(ModalBody)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 34px;
  padding: 37px 0;
`;

const LogoImage = styled(Image)`
  width: auto;
  height: 35px;
  object-fit: cover;
  cursor: pointer;
`;

const KakaoLoginButton = styled.button`
  border-radius: 12px;
  background-color: #fee500;
  width: 100%;
  max-width: 352px;
  height: 45px;
  font-size: 15px;
  font-weight: 500;
`;

const KakaoIcon = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export default LoginModal;
