import { useEffect } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import { Tooltip, useDisclosure } from '@chakra-ui/react';
import UserIcon from '@styles/icons/UserIcon';
import { useReissueTokenQuery } from '@domains/auth/network/authQueries';
import { useAuthSession } from '@domains/auth/hooks/useAuthSession';
import LoginModal from '@domains/auth/modal/LoginModal';

const getCookie = (name: string) => {
  const parts = document.cookie.split(name + '=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
};

const AuthMenu = () => {
  const { isUserLoggedIn } = useAuthSession();

  const { isOpen, onOpen: handleLoginButtonClick, onClose } = useDisclosure();

  const { refetch: reissueToken } = useReissueTokenQuery();

  useEffect(() => {
    const cookiePk = getCookie('pk');

    if (cookiePk) {
      const pk = JSON.parse(cookiePk);

      Object.entries(pk).map(([key, value]) => {
        localStorage.setItem(key, value as string);
      });
    }
  }, []);

  return (
    <>
      <Container>
        {isUserLoggedIn ? (
          <Tooltip label="로그인 상태입니다. 마이페이지는 준비 중입니다. 🙇‍♂️">
            <UserMy type="button">
              <UserIcon />
              {/* <ProfileImage
            width={60}
            height={30}
            src="/assets/kakao_login_small.png"
            alt="profile"
            /> */}
            </UserMy>
          </Tooltip>
        ) : (
          <LoginButton type="button" onClick={handleLoginButtonClick}>
            로그인
          </LoginButton>
        )}
      </Container>

      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default AuthMenu;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const LoginButton = styled.button`
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  font-weight: 500;
  width: 42px;
  flex-shrink: 0;
`;
const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserMy = styled.button`
  cursor: pointer;
`;
