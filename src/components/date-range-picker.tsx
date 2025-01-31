"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, startOfToday, startOfYesterday, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import * as React from "react";
import { cn } from "@/lib/utils";

const shortcuts = [
  { label: "Today", getRange: () => ({ from: startOfToday(), to: startOfToday() }) },
  { label: "Yesterday", getRange: () => ({ from: startOfYesterday(), to: startOfYesterday() }) },
  { label: "This Week", getRange: () => ({ from: startOfWeek(new Date()), to: endOfWeek(new Date()) }) },
  {
    label: "Last Week",
    getRange: () => {
      const start = startOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000;
      const end = endOfWeek(new Date(), { weekStartsOn: 1 }) - 7 * 24 * 60 * 60 * 1000;
      return { from: new Date(start), to: new Date(end) };
    },
  },
  { label: "This Month", getRange: () => ({ from: startOfMonth(new Date()), to: endOfMonth(new Date()) }) },
  {
    label: "Last Month",
    getRange: () => {
      const firstDayLastMonth = startOfMonth(new Date(new Date().setMonth(new Date().getMonth() - 1)));
      const lastDayLastMonth = endOfMonth(firstDayLastMonth);
      return { from: firstDayLastMonth, to: lastDayLastMonth };
    },
  },
];

export default function DateRangePicker({
  date,
  setDate,
  className,
}: {
  date: { from: Date | undefined; to: Date | undefined };
  setDate: (range: { from: Date | undefined; to: Date | undefined }) => void;
  className?: string;
}) {
  const [localDate, setLocalDate] = React.useState(date);
  const [selectedShortcut, setSelectedShortcut] = React.useState<string | null>(null);

  const handleApply = () => {
    setDate(localDate);
  };

  const handleShortcutClick = (shortcut: string, range: { from: Date | undefined; to: Date | undefined }) => {
    console.log("shortcut",shortcut)
    setSelectedShortcut(shortcut);
    setLocalDate(range);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-[300px] justify-start text-left font-normal",
            !localDate && "text-muted-foreground"
          )}
        >
          {localDate?.from ? (
            localDate.to ? (
              <>
                {format(localDate.from, "LLL dd, y")} - {format(localDate.to, "LLL dd, y")}
              </>
            ) : (
              format(localDate.from, "LLL dd, y")
            )
          ) : (
            "Pick a date"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="date-range-picker p-4">
        <div className="flex gap-4">
          {/* Shortcuts Sidebar */}
          <div className="w-1/4 space-y-2 border-r pr-4">
            {shortcuts.map((shortcut) => (
              <Button
                key={shortcut.label}
                variant={selectedShortcut === shortcut.label ? "default" : "ghost"}
                size="sm"
                onClick={() => handleShortcutClick(shortcut.label, shortcut.getRange())}
                className={cn(
                  "justify-start w-full",
                  // selectedShortcut === shortcut.label && "bg-accent text-accent-foreground"
                )}
              >
                {shortcut.label}
              </Button>
            ))}
          </div>

          {/* Calendar & Footer Actions */}
          <div className="w-2/3">
            <Calendar
              mode="range"
              defaultMonth={localDate?.from}
              selected={localDate}
              onSelect={(range) => {
                setLocalDate(range);
                setSelectedShortcut(null); 
              }}
              numberOfMonths={2}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button variant="ghost" onClick={() => setLocalDate(date)}>
                Close
              </Button>
              <Button onClick={handleApply}>OK</Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
