import { protectPage } from '@/lib/auth-guard';
import BillingView from './billing-view';

export default async function Page() {
  await protectPage();
  return <BillingView />;
}
