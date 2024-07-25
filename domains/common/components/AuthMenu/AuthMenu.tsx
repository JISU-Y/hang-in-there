import styled from '@emotion/styled';
import Image from 'next/image';

const AuthMenu = () => {
  const kakaoLoginHandler = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${process.env.NEXT_PUBLIC_HANGINTHERE_API_END_POINT}/v1/user/kakao-login`,
      scope: 'profile_nickname,profile_image'
    });
  };

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
