import { object, string } from 'yup';

export const userInfoSchema = object({
  nickName: string()
    .required('닉네임은 필수값입니다.')
    .max(10, '닉네임은 10자까지만 가능합니다.')
});
