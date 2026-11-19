import { protectPage } from '@/lib/auth-guard';
import { delay } from '@/constants/mock-api';
import { PieGraph } from '@/features/overview/components/pie-graph';

export default async function Stats() {
  await protectPage();

  await delay(1000);
  return <PieGraph />;
}
