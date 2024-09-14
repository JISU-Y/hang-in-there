import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';
import { AuthDataType } from '@domains/auth/types/auth';
import { getRedirectPath } from '@domains/auth/utils/authTokenHandler';
import cryptoUtils from '@logics/utils/crypto';

export async function GET(request: NextRequest) {
  const redirectPath = getRedirectPath({
    req: request
  });

  const nextResponse = NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_BASE_URL}${redirectPath || ''}`,
    { status: 302 }
  );

  const tokenData = cryptoUtils.deCodeURI(
    request.nextUrl.searchParams.get('t') || ''
  );

  if (!tokenData) {
    return redirect('/');
  }

  const authData: AuthDataType = JSON.parse(tokenData);

  Object.entries(authData).forEach(
    ([key, value]: [string, string | number]) => {
      nextResponse.cookies.set(`@auth/${key}`, String(value));
    }
  );

  return nextResponse;
}
