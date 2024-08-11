import { useEffect } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import { Tooltip } from '@chakra-ui/react';
import UserIcon from '@styles/icons/UserIcon';
import { useReissueTokenQuery } from '@domains/auth/network/authQueries';
import { useAuthSession } from '@domains/auth/hooks/useAuthSession';

const getCookie = (name: string) => {
  const parts = document.cookie.split(name + '=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
};

const AuthMenu = () => {
  const { isUserLoggedIn } = useAuthSession();

  const { refetch: reissueToken } = useReissueTokenQuery();

  const handleLoginButtonClick = () => {
    // modal open
  };

  const kakaoLoginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/kakao-login`,
      scope: 'profile_nickname,profile_image'
    });
  };

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
    <Container>
      {isUserLoggedIn ? (
        <Tooltip label="로그인 상태입니다. 마이페이지는 준비 중입니다. 🙇‍♂️">
          <UserMy type="button">
            <UserIcon />
          </UserMy>
        </Tooltip>
      ) : (
        <LoginButton type="button" onClick={handleLoginButtonClick}>
          로그인
          {/* <KakaoIcon
            width={60}
            height={30}
            src="/assets/kakao_login_small.png"
            alt="kakao-login"
          /> */}
        </LoginButton>
      )}
    </Container>
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

const KakaoIcon = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserMy = styled.button`
  cursor: pointer;
`;
