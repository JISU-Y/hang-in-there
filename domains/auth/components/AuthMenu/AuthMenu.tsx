import { useEffect } from 'react';
import Image from 'next/image';

import styled from '@emotion/styled';
import { useReissueTokenQuery } from '@domains/auth/network/authQueries';

const getCookie = (name: string) => {
  const parts = document.cookie.split(name + '=');
  if (parts.length === 2) {
    return parts[1].split(';')[0];
  }
};

const AuthMenu = () => {
  const { refetch: reissueToken } = useReissueTokenQuery();

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
      <KakaoLoginButton type="button" onClick={kakaoLoginHandler}>
        <KakaoIcon
          width={60}
          height={30}
          src="/assets/kakao_login_small.png"
          alt="kakao-login"
        />
      </KakaoLoginButton>
    </Container>
  );
};

export default AuthMenu;

const Container = styled.div`
  display: flex;
  gap: 40px;
  margin-left: auto;
  margin-bottom: 36px;
`;

const KakaoLoginButton = styled.button``;

const KakaoIcon = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
