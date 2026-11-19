'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { GUEST_COOKIE_NAME } from '@/lib/auth-guard';

export async function enterGuestMode() {
  const cookieStore = await cookies();
  cookieStore.set(GUEST_COOKIE_NAME, 'true', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production'
  });

  redirect('/dashboard/overview');
}

export async function exitGuestMode() {
  const cookieStore = await cookies();
  cookieStore.delete(GUEST_COOKIE_NAME);
  redirect('/auth/sign-in');
}
