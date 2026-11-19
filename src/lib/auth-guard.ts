import { auth } from '@clerk/nextjs/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const GUEST_COOKIE_NAME = 'agentops_guest_access';

export type AuthState = {
  isGuest: boolean;
  userId: string | null;
};

/**
 * Checks whether the incoming request is from a guest session or an authenticated Clerk user.
 */
export async function getAuthOrGuest(): Promise<AuthState> {
  try {
    const cookieStore = await cookies();
    const isGuest = cookieStore.get(GUEST_COOKIE_NAME)?.value === 'true';

    if (isGuest) {
      return {
        isGuest: true,
        userId: 'guest_operator_01'
      };
    }

    const { userId } = await auth();
    return {
      isGuest: false,
      userId: userId ?? null
    };
  } catch {
    try {
      const cookieStore = await cookies();
      if (cookieStore.get(GUEST_COOKIE_NAME)?.value === 'true') {
        return { isGuest: true, userId: 'guest_operator_01' };
      }
    } catch {
      // fallback
    }
    return {
      isGuest: false,
      userId: null
    };
  }
}

/**
 * Server-side guard for dashboard pages and layouts.
 * Allows access if the user is signed in OR in guest mode.
 * Otherwise redirects to /auth/sign-in.
 */
export async function protectPage(): Promise<AuthState> {
  const state = await getAuthOrGuest();

  if (!state.isGuest && !state.userId) {
    return redirect('/auth/sign-in');
  }

  return state;
}
