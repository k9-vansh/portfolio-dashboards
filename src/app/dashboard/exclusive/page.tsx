import { protectPage } from '@/lib/auth-guard';
import ExclusiveView from './exclusive-view';

export default async function Page() {
  await protectPage();
  return <ExclusiveView />;
}
