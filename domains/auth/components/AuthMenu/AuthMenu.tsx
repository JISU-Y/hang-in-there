import styled from '@emotion/styled';
import { Avatar, Tooltip, useDisclosure } from '@chakra-ui/react';
import { useFetchUserProfileQuery } from '@domains/auth/network/authQueries';
import { useAuthSession } from '@domains/auth/hooks/useAuthSession';
import LoginModal from '@domains/auth/modal/LoginModal';

const AuthMenu = () => {
  const { isUserLoggedIn } = useAuthSession();

  const { isOpen, onOpen: handleLoginButtonClick, onClose } = useDisclosure();

  const { data: userProfile } = useFetchUserProfileQuery({
    enabled: isUserLoggedIn
  });

  return (
    <>
      <Container>
        {isUserLoggedIn && userProfile ? (
          <Tooltip label="로그인 상태입니다. 마이페이지는 준비 중입니다. 🙇‍♂️">
            <UserMy type="button">
              <Avatar
                size="sm"
                name={userProfile.nickname || 'Name'}
                src={userProfile.img || ''}
              />
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

const UserMy = styled.button`
  cursor: pointer;
`;
