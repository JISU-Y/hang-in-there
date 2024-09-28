import { ChangeEventHandler, useRef, useState } from 'react';
import Image from 'next/image';

import { useQueryClient } from 'react-query';
import { SettingsIcon } from '@chakra-ui/icons';
import { useFetchUserProfileQuery } from '@domains/auth/network/authQueries';
import { usePatchUserProfileImageMutation } from '@domains/myPage/network/myPageMutations';
import styled from '@emotion/styled';
import { uploadFile } from '@logics/utils/imageHandler';

const ProfileImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const queryClient = useQueryClient();
  const { data: userProfile } = useFetchUserProfileQuery();

  const [profileImageUrl, setProfileImageUrl] = useState(
    userProfile?.img || '/logo/poster-fallback.png'
  );

  const { mutateAsync: updateUserProfileImage } =
    usePatchUserProfileImageMutation();

  const handleClickImageChange = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadFile(file, 'profile');

      if (imageUrl) {
        // REMOVE: 배포 환경 확인 용 console
        console.log('imageUrl:', imageUrl);
        setProfileImageUrl(imageUrl);

        await updateUserProfileImage({ imageUrl });

        queryClient.invalidateQueries({
          queryKey: 'user-profile'
        });
      }
    } catch (error) {
      alert('사진 변경에 실패했습니다. 다시 시도해주세요.');
      setProfileImageUrl('');
    }
  };

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImg
          width={100}
          height={100}
          src={profileImageUrl}
          alt="profile"
        />
      </ProfileImageWrapper>
      <input
        type="file"
        accept="image/*"
        id="profile"
        multiple={false}
        ref={inputRef}
        onChange={handleImageUpload}
        hidden
      />
      <SettingButton type="button" onClick={handleClickImageChange}>
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
