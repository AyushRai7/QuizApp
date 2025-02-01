import { NextResponse } from 'next/server';

export function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname === '/') {
    return NextResponse.next();
  }

  const hasStartedQuiz = req.cookies.get('startedQuiz');

  if (!hasStartedQuiz && (pathname === '/quiz' || pathname.startsWith('/result'))) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/quiz', '/result'],
};
