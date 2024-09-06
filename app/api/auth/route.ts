import {
  getAccessToken,
  getRedirectPath,
  setAuthData
} from '@domains/auth/utils/authTokenHandler';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  setAuthData({
    req: request
  });

  const token = getAccessToken({
    req: request
  });

  if (!token) {
    redirect(process.env.NEXT_PUBLIC_BASE_URL || ''); // 로그인 실패
  }

  const redirectPath = getRedirectPath({
    req: request
  });
  console.log(redirectPath);

  redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/${redirectPath}`);
}
