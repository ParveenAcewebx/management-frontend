'use client'

import { TrendingUp } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

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

// Correct chart data
const chartData = [
  { month: 'January', totalExpense: 29860 },
  { month: 'February', totalExpense: 50500 },
  { month: 'March', totalExpense: 44070 },
  { month: 'April', totalExpense: 57030 },
  { month: 'May', totalExpense: 40059 },
  { month: 'June', totalExpense: 72814 },
  { month: 'August', totalExpense: 62614 },
  { month: 'September', totalExpense: 39214 },
  { month: 'October', totalExpense: 33714 },
  { month: 'November', totalExpense: 56714 },
  { month: 'December', totalExpense: 91914 }
]

// Updated chartConfig
const chartConfig = {
  totalExpense: {
    label: 'Total Expense',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig

export function BarChartComponent() {
  return (
    <Card>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Monthly Expense Chart</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={chartData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            {/* Corrected dataKey */}
            <Bar dataKey="totalExpense" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
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
