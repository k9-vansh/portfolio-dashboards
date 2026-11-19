import { protectPage } from '@/lib/auth-guard';
import { delay } from '@/constants/mock-api';
import { RecentSales } from '@/features/overview/components/recent-sales';

export default async function Sales() {
  await protectPage();

  await delay(3000);
  return <RecentSales />;
}
