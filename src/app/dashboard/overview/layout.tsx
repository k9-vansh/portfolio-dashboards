import { protectPage } from '@/lib/auth-guard';
import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import { Icons } from '@/components/icons';
import React from 'react';

export default async function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
}) {
  await protectPage();

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Telemetry & Fleet Operations</h2>
            <p className='text-muted-foreground text-sm'>
              Real-time inference metrics, token consumption, and autonomous agent orchestration.
            </p>
          </div>
          <div className='hidden items-center gap-2 md:flex'>
            <Badge variant='outline' className='gap-1.5 px-3 py-1 font-mono text-xs'>
              <span className='size-2 rounded-full bg-emerald-500 animate-pulse' />
              Fleet Status: 100% Operational
            </Badge>
          </div>
        </div>

        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Total Tokens Streamed</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                148.6M
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +24.8%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                4.8M processed today <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>Across 12 multi-region clusters</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Avg Inference Latency</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                142ms
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingDown />
                  -18.4%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                P95: 210ms · P99: 380ms <Icons.trendingDown className='size-4 text-emerald-500' />
              </div>
              <div className='text-muted-foreground'>TTFT reduced via speculative decoding</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Compute & LLM Spend</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                $2,845.50
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingDown />
                  -8.2%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Saved $412 on cached prompts{' '}
                <Icons.trendingDown className='size-4 text-emerald-500' />
              </div>
              <div className='text-muted-foreground'>Target budget: $3,500/mo</div>
            </CardFooter>
          </Card>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Active Agent Fleets</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                36 Deployed
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <Icons.trendingUp />
                  +6 new
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                99.94% task success rate <Icons.trendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>1.2M autonomous tool executions</div>
            </CardFooter>
          </Card>
        </div>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'> {area_stats}</div>
          <div className='col-span-4 md:col-span-3'>
            {/* sales arallel routes */}
            {sales}
          </div>
          <div className='col-span-4'>{bar_stats}</div>
          <div className='col-span-4 min-h-0 md:col-span-3'>{pie_stats}</div>
        </div>
      </div>
    </PageContainer>
  );
}
