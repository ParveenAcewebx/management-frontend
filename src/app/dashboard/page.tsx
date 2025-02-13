'use client'
import { BarChartComponent } from '@/components/charts/bar-chart'
import { PieChartComponent } from '@/components/charts/pie-chart'
import DateRangePicker from '@/components/date-range-picker'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { useState } from 'react'
import { DateRange } from 'react-day-picker'

function Dashboard() {
  const [dateData, setDateData] = useState<DateRange | undefined>({
    from: new Date(new Date().setDate(new Date().getDate() - 12)),
    to: new Date()
  })

  console.log('dateData-dashboard', dateData)
  return (
    <>
      <div className='flex justify-end'>
        <DateRangePicker setDate={setDateData} date={dateData} />
      </div>
      <div className='flex gap-10 text-center'>
        <Card className='w-[380px] h-32 flex justify-center items-center  bg-gray-100'>
          <CardHeader>
            <CardTitle className='!text-green-500'>$13,720</CardTitle>
            <CardDescription>Expenses</CardDescription>
          </CardHeader>
        </Card>
        <Card className='w-[380px] h-32 flex justify-center items-center bg-gray-100'>
          <CardHeader>
            <CardTitle className='!text-violet-600'>545</CardTitle>
            <CardDescription>Transactions</CardDescription>
          </CardHeader>
        </Card>
      </div>
      <Card className='bg-gray-50'>
        <CardHeader>
          <CardDescription>Total Expense</CardDescription>
          <div className='flex gap-10'>
            <div style={{ height: '588px' }} className='w-1/2'>
              <PieChartComponent />
            </div>
            <div className='w-1/2'>
              <BarChartComponent />
            </div>
            {/* <LineChartComponent /> */}
          </div>
        </CardHeader>
      </Card>
    </>
  )
}

export default Dashboard
