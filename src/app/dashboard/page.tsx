import { getAuthOrGuest } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

export default async function Dashboard() {
  const { isGuest, userId } = await getAuthOrGuest();

  if (!isGuest && !userId) {
    return redirect('/auth/sign-in');
  } else {
    redirect('/dashboard/overview');
  }
}
