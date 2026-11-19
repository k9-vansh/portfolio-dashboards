import { protectPage } from '@/lib/auth-guard';
import KanbanViewPage from '@/features/kanban/components/kanban-view-page';

export const metadata = {
  title: 'Dashboard: Fleet Tasks & Workflows'
};

export default async function page() {
  await protectPage();

  return <KanbanViewPage />;
}
