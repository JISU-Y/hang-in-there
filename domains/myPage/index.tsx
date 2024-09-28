'use client';

import styled from '@emotion/styled';
import '@styles/custom-slick.css';
import ProfileImage from './sections/ProfileImage/ProfileImage';
import UserInfo from './sections/UserInfo/UserInfo';

const MyPageComponent = () => {
  return (
    <Container>
      <DetailContainer>
        <ProfileImage />
        <UserInfo />
      </DetailContainer>
    </Container>
  );
};

export default MyPageComponent;

const Container = styled.div`
  padding: 32px 48px 64px;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 808px;
  gap: 72px;
  margin: auto;
`;
