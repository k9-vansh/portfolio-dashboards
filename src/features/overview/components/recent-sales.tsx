import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

const agentExecutions = [
  {
    name: 'CodeGen Agent #04',
    task: 'Git commit & build pass (Claude 3.7)',
    fallback: 'CG',
    status: '1.4s · $0.034'
  },
  {
    name: 'SQL Optimizer Agent',
    task: 'Partitioned 8 BigQuery tables (Gemini 2.5)',
    fallback: 'SQ',
    status: '620ms · $0.008'
  },
  {
    name: 'Security Sentinel',
    task: 'Vulnerability scan & SBOM check (GPT-4o)',
    fallback: 'SS',
    status: '380ms · $0.012'
  },
  {
    name: 'Customer Support Bot',
    task: 'Resolved refund ticket #8942 (Claude Haiku)',
    fallback: 'CS',
    status: '190ms · $0.002'
  },
  {
    name: 'Vector ETL Worker',
    task: 'Embedded 4,200 docs into Vector DB (Gemini Flash)',
    fallback: 'VE',
    status: '280ms · $0.004'
  }
];

export function RecentSales() {
  return (
    <Card className='h-full'>
      <CardHeader>
        <CardTitle>Live Agent Executions</CardTitle>
        <CardDescription>Recent autonomous tool calls & latency metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='space-y-6'>
          {agentExecutions.map((exec, index) => (
            <div key={index} className='flex items-center'>
              <Avatar className='h-9 w-9 border'>
                <AvatarFallback className='text-xs font-semibold bg-muted'>
                  {exec.fallback}
                </AvatarFallback>
              </Avatar>
              <div className='ml-3 space-y-1 min-w-0 flex-1'>
                <p className='text-sm leading-none font-medium truncate'>{exec.name}</p>
                <p className='text-muted-foreground text-xs truncate'>{exec.task}</p>
              </div>
              <div className='ml-auto font-mono text-xs font-medium text-muted-foreground whitespace-nowrap pl-2'>
                {exec.status}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
