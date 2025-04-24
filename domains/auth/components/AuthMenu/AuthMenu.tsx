import styled from '@emotion/styled';
import { Avatar, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import {
  useFetchUserProfileQuery,
  useFetchUserUnlinkQuery
} from '@domains/auth/network/authQueries';
import { useAuthSession } from '@domains/auth/hooks/useAuthSession';
import { ChevronRightIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const AuthMenu = () => {
  const { push } = useRouter();

  const { isUserLoggedIn, logout } = useAuthSession();

  const { data: userProfile } = useFetchUserProfileQuery({
    enabled: isUserLoggedIn
  });
  const { refetch: withdraw } = useFetchUserUnlinkQuery({
    enabled: false
  });

  const handleClickMyPageMenu = () => {
    push('/myPage');
  };

  const handleLoginButtonClick = () => {
    push('/login');
  };

  return (
    <Container>
      {isUserLoggedIn && userProfile ? (
        <MenuBox autoSelect={false}>
          <UserMy>
            <Avatar
              size="sm"
              name={userProfile.nickname || 'Name'}
              src={userProfile.img || ''}
            />
          </UserMy>
          <MenuList>
            <UserMenuMyPage onClick={handleClickMyPageMenu}>
              <Avatar
                size="sm"
                name={userProfile.nickname || 'Name'}
                src={userProfile.img || ''}
              />
              <UserName>{userProfile.nickname || 'Name'}</UserName>
              <ChevronRightIcon w={6} h={6} />
            </UserMenuMyPage>
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
            <UnlinkButton onClick={() => withdraw()}>회원탈퇴</UnlinkButton>
          </MenuList>
        </MenuBox>
      ) : (
        <LoginButton type="button" onClick={handleLoginButtonClick}>
          로그인
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
  white-space: nowrap;
`;

const MenuBox = styled(Menu)`
  max-width: 200px;
`;

const UserMy = styled(MenuButton)`
  cursor: pointer;
`;

const UserMenuMyPage = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: 100%;
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: 600;
  line-height: 36px;
`;

const LogoutButton = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff0000;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  text-align: center;
`;

const UnlinkButton = styled(MenuItem)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b8b8b;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: center;
`;
