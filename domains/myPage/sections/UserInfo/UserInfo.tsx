import { Button, Input } from '@chakra-ui/react';
import { useFetchUserProfileQuery } from '@domains/auth/network/authQueries';
import { userInfoSchema } from '@domains/myPage/constants/myPageSchema';
import { usePatchUserNicknameMutation } from '@domains/myPage/network/myPageMutations';
import { UserInfoSchemaType } from '@domains/myPage/types';
import styled from '@emotion/styled';
import { yupResolver } from '@hookform/resolvers/yup';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

const UserInfo = () => {
  const queryClient = useQueryClient();

  const { refetch } = useFetchUserProfileQuery();
  const { mutateAsync: nicknameMutate } = usePatchUserNicknameMutation();

  const { register, handleSubmit, formState } = useForm<UserInfoSchemaType>({
    resolver: yupResolver(userInfoSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: async () => {
      const { data } = await refetch();

      return {
        nickName: data?.nickname || ''
      };
    }
  });

  const onValidSubmit: SubmitHandler<UserInfoSchemaType> = async ({
    nickName
  }) => {
    try {
      await nicknameMutate({ nickName });

      queryClient.invalidateQueries({
        queryKey: 'user-profile'
      });
    } catch (error) {
      alert('이름 변경에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <Container onSubmit={handleSubmit(onValidSubmit)}>
      <InputSection>
        <SectionTitle>닉네임</SectionTitle>
        <Input
          placeholder="닉네임 (10자 이내)"
          size="md"
          {...register('nickName')}
        />
      </InputSection>

      {/* <InputSection>
        <SectionTitle>소셜 계정</SectionTitle>
        <Input disabled size="md" />
      </InputSection> */}

      <SubmitButton size="md" type="submit" disabled={!formState.isValid}>
        저장
      </SubmitButton>
    </Container>
  );
};

export default UserInfo;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h5`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
`;

const SubmitButton = styled(Button)`
  background-color: blue;
  transition: all 0.2s ease-in-out;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;
