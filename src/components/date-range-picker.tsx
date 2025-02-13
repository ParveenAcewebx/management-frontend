'use client'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfToday,
  startOfWeek,
  startOfYesterday
} from 'date-fns'
import * as React from 'react'
import { CalendarIcon } from "lucide-react";

const shortcuts = [
  {
    label: 'Today',
    getRange: () => ({ from: startOfToday(), to: startOfToday() })
  },
  {
    label: 'Yesterday',
    getRange: () => ({ from: startOfYesterday(), to: startOfYesterday() })
  },
  {
    label: 'This Week',
    getRange: () => ({
      from: startOfWeek(new Date()),
      to: endOfWeek(new Date())
    })
  },
  {
    label: 'Last Week',
    getRange: () => {
      const start =
        startOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000
      const end =
        endOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000
      return { from: new Date(start), to: new Date(end) }
    }
  },
  {
    label: 'This Month',
    getRange: () => ({
      from: startOfMonth(new Date()),
      to: endOfMonth(new Date())
    })
  },
  {
    label: 'Last Month',
    getRange: () => {
      const firstDayLastMonth = startOfMonth(
        new Date(new Date().setMonth(new Date().getMonth() - 1))
      )
      const lastDayLastMonth = endOfMonth(firstDayLastMonth)
      return { from: firstDayLastMonth, to: lastDayLastMonth }
    }
  }
]

export default function DateRangePicker({
  date,
  setDate
}: {
  date: { from: Date | undefined; to: Date | undefined }
  setDate: (range: { from: Date | undefined; to: Date | undefined }) => void
  className?: string
}) {
  const [localDate, setLocalDate] = React.useState(date)
  const [selectedShortcut, setSelectedShortcut] = React.useState<string | null>(
    null
  )
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  const handleApply = () => {
    setDate(localDate)
    setPopoverOpen(false)
  }

  const handleShortcutClick = (
    shortcut: string,
    range: { from: Date | undefined; to: Date | undefined }
  ) => {
    setSelectedShortcut(shortcut)
    setLocalDate(range)
  }


  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
<PopoverTrigger asChild>
  <Button
    variant="outline"
    className={cn(
      "w-[300px] justify-start text-left font-normal flex items-center gap-2",
      !localDate && "text-muted-foreground"
    )}
    onClick={() => setPopoverOpen(true)}
  >
    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
    {localDate?.from ? (
      localDate.to ? (
        <>
          {format(localDate.from, "LLL dd, y")} -{" "}
          {format(localDate.to, "LLL dd, y")}
        </>
      ) : (
        format(localDate.from, "LLL dd, y")
      )
    ) : (
      "Pick a date"
    )}
  </Button>
</PopoverTrigger>
      <PopoverContent className='date-range-picker p-4'>
        <div className='flex gap-4'>
          {/* Shortcuts Sidebar */}
          <div className='w-1/4 space-y-2 border-r pr-4'>
            {shortcuts.map(shortcut => (
              <Button
                key={shortcut.label}
                variant={
                  selectedShortcut === shortcut.label ? 'default' : 'ghost'
                }
                size='sm'
                onClick={() =>
                  handleShortcutClick(shortcut.label, shortcut.getRange())
                }
                className='w-full justify-start'
              >
                {shortcut.label}
              </Button>
            ))}
          </div>

          {/* Calendar & Footer Actions */}
          <div className='w-2/3'>
            <Calendar
              mode='range'
              defaultMonth={localDate?.from}
              selected={localDate}
              onSelect={range => {
                setLocalDate(range)
                setSelectedShortcut(null)
              }}
              numberOfMonths={2}
            />
            <div className='flex justify-end gap-2 pt-4'>
              <Button variant='ghost' onClick={() => setPopoverOpen(false)}>
                Close
              </Button>
              <Button onClick={handleApply}>OK</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
