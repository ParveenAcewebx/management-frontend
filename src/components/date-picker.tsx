import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { addDays, format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import * as React from 'react'

interface DatePickerWithPresetsProps {
  onSelectDate: (date: Date | undefined) => void
}

export function DatePickerWithPresets({ onSelectDate }: DatePickerWithPresetsProps) {
  const [date, setDate] = React.useState<Date>()
  const [popoverOpen, setPopoverOpen] = React.useState(false)

  const handleDateSelect = (newDate: Date | undefined) => {
    setDate(newDate)
    onSelectDate(newDate)
    setPopoverOpen(false) // Close the calendar on date selection
  }

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[287px] justify-start text-left font-normal',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Search Date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className='flex w-auto flex-col space-y-2 p-2'>
        <Select
          onValueChange={value => {
            const newDate = addDays(new Date(), parseInt(value))
            handleDateSelect(newDate)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Select' />
          </SelectTrigger>
          <SelectContent position='popper'>
            <SelectItem value='0'>Today</SelectItem>
            <SelectItem value='1'>Tomorrow</SelectItem>
            <SelectItem value='3'>In 3 days</SelectItem>
            <SelectItem value='7'>In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className='rounded-md border'>
          <Calendar
            mode='single'
            selected={date}
            onSelect={handleDateSelect}
            
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
