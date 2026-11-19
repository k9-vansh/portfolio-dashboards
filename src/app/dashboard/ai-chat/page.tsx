import { protectPage } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import { AiChatDemo } from '@/features/ai-chat/components/ai-chat-demo';

export const metadata = {
  title: 'Dashboard: Agent Copilot'
};

export default async function Page() {
  await protectPage();

  return (
    <PageContainer
      pageTitle='AgentOps Copilot'
      pageDescription='Autonomous fleet diagnostic assistant with streaming token inference & real-time tool calls'
    >
      <AiChatDemo />
    </PageContainer>
  );
}
