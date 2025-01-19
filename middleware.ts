import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  // const userAgent = request.headers.get('user-agent');

  // const isMobile =
  //   /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|BlackBerry|BB10|PlayBook|Mobile|webOS/i.test(
  //     userAgent || ''
  //   );

  // if (isMobile) {
  //   return NextResponse.redirect(
  //     process.env.NEXT_PUBLIC_MOBILE_BASE_URL || new URL('/m', request.url)
  //   );
  // }

  return NextResponse.next();
}

export const config = {
  matcher: '/'
};
