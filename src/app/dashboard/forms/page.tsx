import { protectPage } from '@/lib/auth-guard';
import { redirect } from 'next/navigation';

export default async function Page() {
  await protectPage();

  redirect('/dashboard/forms/basic');
}
