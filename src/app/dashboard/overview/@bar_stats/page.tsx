import { protectPage } from '@/lib/auth-guard';
import { delay } from '@/constants/mock-api';
import { BarGraph } from '@/features/overview/components/bar-graph';

export default async function BarStats() {
  await protectPage();

  await delay(1000);

  return <BarGraph />;
}
