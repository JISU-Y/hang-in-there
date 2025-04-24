'use client';

import { useRouter } from 'next/navigation';
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
import { setRedirectPath } from '@domains/auth/utils/authTokenHandler';

export default function LoginModal() {
  const router = useRouter();

  const kakaoLoginHandler = () => {
    if (!window.Kakao) return;

    // 현재 페이지의 경로를 저장해둡니다 (로그인 후 돌아오기 위함)
    setRedirectPath(
      `${window.location.pathname.replace('/login', '')}${window.location.search}`
    );

    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/kakao-login`,
      scope: 'profile_nickname,profile_image'
    });
  };

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal
      size="sm"
      scrollBehavior="inside"
      onClose={handleClose}
      isOpen={true}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton color="black" />
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
}

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
