import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { AuthDataType } from '@domains/auth/types/auth';
import { getRedirectPath } from '@domains/auth/utils/authTokenHandler';

export async function GET(request: NextRequest) {
  const redirectPath = getRedirectPath({
    req: request
  });
  const response = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}${redirectPath || ''}`,
    { status: 302 }
  );

  const pkData = getCookie('pk', {
    req: request
  });

  if (!pkData) {
    return redirect('/');
  }

  const authData: AuthDataType = JSON.parse(pkData);

  Object.entries(authData).forEach(
    ([key, value]: [string, string | number]) => {
      response.cookies.set(`@auth/${key}`, String(value));
    }
  );

  response.cookies.delete('pk');

  return response;
}
