'use client'

import { TrendingUp } from 'lucide-react'
import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart'
const chartData = [
  { browser: 'Bills', visitors: 2750, fill: 'var(--color-Bills)' },
  { browser: 'Rent', visitors: 12070, fill: 'var(--color-Rent)' },
  { browser: 'Food', visitors: 1087, fill: 'var(--color-Food)' },
  { browser: 'Celebration', visitors: 1703, fill: 'var(--color-Celebration)' },
  { browser: 'Insurance', visitors: 9190, fill: 'var(--color-Insurance)' },
  { browser: 'Electronics', visitors: 2064, fill: '#D35467' },
  { browser: 'Activities', visitors: 2010, fill: '#E74C3C' },
  { browser: 'Mobile', visitors: 600, fill: '#F1C40F' },
  { browser: 'Transportation', visitors: 2250, fill: '#36A2EB' },
  { browser: 'Gifts', visitors: 1130, fill: '#2ECC71' }
]

const chartConfig = {
  visitors: {
    label: 'Visitors'
  },
  Bills: {
    label: 'Bills',
    color: 'hsl(var(--chart-1))'
  },
  Rent: {
    label: 'Rent',
    color: 'hsl(var(--chart-2))'
  },
  Food: {
    label: 'Food',
    color: 'hsl(var(--chart-3))'
  },
  Celebration: {
    label: 'Celebration',
    color: 'hsl(var(--chart-4))'
  },
  Insurance: {
    label: 'Insurance',
    color: 'hsl(var(--chart-5))'
  },
  Electronics: {
    label: 'Electronics',
    color: 'hsl(var(--chart-6))'
  },
  Activities: {
    label: 'Activities',
    color: 'hsl(var(--chart-7))'
  },
  Mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-8))'
  },
  Transportation: {
    label: 'Transportation',
    color: 'hsl(var(--chart-9))'
  },
  Gifts: {
    label: 'Gifts',
    color: 'hsl(var(--chart-10))'
  }
} satisfies ChartConfig

export function PieChartComponent() {
  return (
    <Card className='flex flex-col h-full'>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Expense by Category</CardTitle>
        <CardDescription>Feb 2025</CardDescription>
      </CardHeader>
      <CardContent className='flex-1 pb-0'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[250px]'
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey='visitors' nameKey='browser' />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 font-medium leading-none'>
          Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
        </div>
        <div className='leading-none text-muted-foreground'>
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
