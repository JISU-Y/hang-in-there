import { InferType } from 'yup';
import { userInfoSchema } from '../constants/myPageSchema';

export type UserInfoSchemaType = InferType<typeof userInfoSchema>;

export type UserInfoSchemaKeyType = keyof UserInfoSchemaType;
