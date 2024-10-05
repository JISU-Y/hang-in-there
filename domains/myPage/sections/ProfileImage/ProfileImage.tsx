import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { SettingsIcon } from '@chakra-ui/icons';
import { useFetchUserProfileQuery } from '@domains/auth/network/authQueries';
import { usePatchUserProfileImageMutation } from '@domains/myPage/network/myPageMutations';
import styled from '@emotion/styled';
import { uploadFile } from '@logics/utils/imageHandler';
import useToastMessage from '@logics/hooks/useToastMessage';

const ProfileImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: userProfile, refetch } = useFetchUserProfileQuery();

  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);

  const { mutateAsync: updateUserProfileImage } =
    usePatchUserProfileImageMutation();

  const { toastSuccess, toastError } = useToastMessage();

  const handleClickImageChange = () => {
    if (!inputRef.current) return;

    inputRef.current.click();
  };

  // TODO: 바로 S3 업로드 요청하는 것이 아니라 이미지 preview로 보여주고 이미지 변경 할 수 있게끔 한 후 저장할 때 업로드 요청하도록 변경 필요
  const handleImageUpload: ChangeEventHandler<HTMLInputElement> = async e => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const imageUrl = await uploadFile(file, 'profile');

      if (imageUrl) {
        await updateUserProfileImage({ imageUrl });

        const { data: newUserProfile } = await refetch();

        if (!newUserProfile?.img) {
          throw Error();
        }

        setProfileImageUrl(newUserProfile?.img);

        toastSuccess({ title: '사진을 성공적으로 변경했습니다!' });
      }
    } catch (error) {
      toastError({ title: '사진 변경에 실패했습니다. 다시 시도해주세요.' });
      setProfileImageUrl('');
    }
  };

  useEffect(() => {
    if (!userProfile) return;

    setProfileImageUrl(userProfile.img);
  }, [userProfile]);

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImg
          width={100}
          height={100}
          src={profileImageUrl || '/logo/poster-fallback.png'}
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
