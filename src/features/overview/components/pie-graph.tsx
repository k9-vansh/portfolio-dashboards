'use client';

import { LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';

const chartData = [
  { model: 'anthropic', share: 38, fill: 'var(--color-anthropic)' },
  { model: 'openai', share: 28, fill: 'var(--color-openai)' },
  { model: 'google', share: 20, fill: 'var(--color-google)' },
  { model: 'deepseek', share: 9, fill: 'var(--color-deepseek)' },
  { model: 'openSource', share: 5, fill: 'var(--color-openSource)' }
];

const chartConfig = {
  share: {
    label: 'Token Share (%)'
  },
  anthropic: {
    label: 'Claude 3.7 (38%)',
    color: 'var(--chart-1)'
  },
  openai: {
    label: 'GPT-4o (28%)',
    color: 'var(--chart-2)'
  },
  google: {
    label: 'Gemini 2.5 (20%)',
    color: 'var(--chart-3)'
  },
  deepseek: {
    label: 'DeepSeek R1 (9%)',
    color: 'var(--chart-4)'
  },
  openSource: {
    label: 'Llama 3.3 (5%)',
    color: 'var(--chart-5)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>
          Model Traffic Distribution
          <Badge variant='outline'>
            <Icons.trendingUp />
            Multi-Model Routing
          </Badge>
        </CardTitle>
        <CardDescription>Share of prompt volume by LLM engine</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 items-center justify-center pb-0'>
        <ChartContainer
          config={chartConfig}
          className='[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[300px] min-h-[250px]'
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey='share' hideLabel />} />
            <Pie
              data={chartData}
              innerRadius={30}
              dataKey='share'
              radius={10}
              cornerRadius={8}
              paddingAngle={4}
            >
              <LabelList
                dataKey='share'
                stroke='none'
                fontSize={12}
                fontWeight={500}
                fill='currentColor'
                formatter={(value) => `${value}%`}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
