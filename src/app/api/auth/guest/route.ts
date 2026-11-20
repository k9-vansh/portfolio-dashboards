import { NextRequest, NextResponse } from 'next/server';
import { GUEST_COOKIE_NAME } from '@/lib/auth-guard';

export async function GET(request: NextRequest) {
  const url = new URL('/dashboard/overview', request.url);
  const response = NextResponse.redirect(url);
  response.cookies.set(GUEST_COOKIE_NAME, 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  return response;
}

export async function POST() {
  const response = NextResponse.json({ success: true, mode: 'guest' });
  response.cookies.set(GUEST_COOKIE_NAME, 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, mode: 'logged_out' });
  response.cookies.delete(GUEST_COOKIE_NAME);
  return response;
}
