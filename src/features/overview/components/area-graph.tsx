'use client';

import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Icons } from '@/components/icons';
import React from 'react';

const chartData = [
  { month: 'January', promptTokens: 34.2, completionTokens: 14.5 },
  { month: 'February', promptTokens: 48.6, completionTokens: 25.4 },
  { month: 'March', promptTokens: 41.2, completionTokens: 21.7 },
  { month: 'April', promptTokens: 52.9, completionTokens: 28.1 },
  { month: 'May', promptTokens: 58.8, completionTokens: 32.2 },
  { month: 'June', promptTokens: 68.1, completionTokens: 39.8 },
  { month: 'July', promptTokens: 62.4, completionTokens: 35.2 },
  { month: 'August', promptTokens: 82.5, completionTokens: 44.3 },
  { month: 'September', promptTokens: 74.7, completionTokens: 41.9 },
  { month: 'October', promptTokens: 89.2, completionTokens: 48.6 },
  { month: 'November', promptTokens: 102.3, completionTokens: 54.7 },
  { month: 'December', promptTokens: 118.5, completionTokens: 62.8 }
];

const chartConfig = {
  promptTokens: {
    label: 'Prompt Tokens (M)',
    color: 'var(--chart-1)'
  },
  completionTokens: {
    label: 'Completion Tokens (M)',
    color: 'var(--chart-2)'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Token Generation & Context Volume
          <Badge variant='outline'>
            <Icons.trendingUp />
            +24.8%
          </Badge>
        </CardTitle>
        <CardDescription>Monthly prompt ingestion vs completion tokens in millions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray='3 3' />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <DottedBackgroundPattern config={chartConfig} />
            </defs>
            <Area
              dataKey='completionTokens'
              type='natural'
              fill='url(#dotted-background-pattern-completionTokens)'
              fillOpacity={0.4}
              stroke='var(--color-completionTokens)'
              stackId='a'
              strokeWidth={0.8}
            />
            <Area
              dataKey='promptTokens'
              type='natural'
              fill='url(#dotted-background-pattern-promptTokens)'
              fillOpacity={0.4}
              stroke='var(--color-promptTokens)'
              stackId='a'
              strokeWidth={0.8}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

const DottedBackgroundPattern = ({ config }: { config: ChartConfig }) => {
  const items = Object.fromEntries(
    Object.entries(config).map(([key, value]) => [key, value.color])
  );
  return (
    <>
      {Object.entries(items).map(([key, value]) => (
        <pattern
          key={key}
          id={`dotted-background-pattern-${key}`}
          x='0'
          y='0'
          width='7'
          height='7'
          patternUnits='userSpaceOnUse'
        >
          <circle cx='5' cy='5' r='1.5' fill={value} opacity={0.5}></circle>
        </pattern>
      ))}
    </>
  );
};
