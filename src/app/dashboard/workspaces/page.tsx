import { protectPage } from '@/lib/auth-guard';
import WorkspacesView from './workspaces-view';

export default async function Page() {
  await protectPage();
  return <WorkspacesView />;
}
