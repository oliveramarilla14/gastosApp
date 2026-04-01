'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import type { DashboardData } from '@/entites/types/gasto.type';
import { formatoMoneda } from '@/lib/numbers';

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
];

function formatYAxis(value: number): string {
  if (value >= 1_000_000) return `${value / 1_000_000}M`;
  if (value >= 1_000) return `${value / 1_000}K`;
  return String(value);
}

interface Props {
  dashboardData: DashboardData;
}

export function GastosDashboardChart({ dashboardData }: Props) {
  const { data, categories } = dashboardData;

  const chartConfig: ChartConfig = Object.fromEntries(
    categories.map((cat, i) => [
      cat,
      { label: cat, color: CHART_COLORS[i % CHART_COLORS.length] },
    ])
  );

  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <BarChart data={data} margin={{ top: 4, right: 8, left: 8, bottom: 4 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
        <YAxis
          tickFormatter={formatYAxis}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={48}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              formatter={(value, name) => [
                formatoMoneda.format(value as number),
                name,
              ]}
            />
          }
        />
        <ChartLegend content={<ChartLegendContent />} />
        {categories.map((cat, i) => (
          <Bar
            key={cat}
            dataKey={cat}
            stackId="a"
            fill={CHART_COLORS[i % CHART_COLORS.length]}
            radius={i === categories.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
