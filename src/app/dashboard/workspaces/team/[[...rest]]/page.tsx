import { protectPage } from '@/lib/auth-guard';
import TeamView from './team-view';

export default async function Page() {
  await protectPage();
  return <TeamView />;
}
