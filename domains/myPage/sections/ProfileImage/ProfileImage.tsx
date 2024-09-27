import { SettingsIcon } from '@chakra-ui/icons';
import styled from '@emotion/styled';
import Image from 'next/image';

const ProfileImage = () => {
  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImg
          width={100}
          height={100}
          src="/logo/poster-fallback.png"
          alt="profile"
        />
      </ProfileImageWrapper>
      <SettingButton type="button">
        <SettingsIcon width={5} height={5} />
      </SettingButton>
    </Container>
  );
};

export default ProfileImage;

const Container = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  margin: auto;
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
`;

const ProfileImg = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const SettingButton = styled.button`
  position: absolute;
  right: 6px;
  bottom: 6px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #dddddd;
`;
