'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import * as React from 'react';

type Props = {
  value?: string;
  onChange: (value: string) => void;
  showLabel?: boolean;
};

export function DateTimePicker({ value, onChange, showLabel }: Props) {
  const [open, setOpen] = React.useState(false);

  const initialDate = value ? new Date(value) : undefined;
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [time, setTime] = React.useState(
    initialDate ? initialDate.toTimeString().slice(0, 8) : '12:00:00'
  );

  React.useEffect(() => {
    if (date && time) {
      const [h, m, s] = time.split(':');
      const newDate = new Date(date);
      newDate.setHours(+h, +m, +s);
      onChange(newDate.toISOString());
    }
  }, [date, onChange, time]);

  return (
    <div className="flex w-full gap-4">
      <div className="flex flex-1 flex-col gap-3">
        {showLabel && <Label className="px-1">Date</Label>}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative justify-start font-normal">
              <div className="flex w-full items-center justify-between ps-7">
                {date ? date.toLocaleDateString() : 'Select date'}
                <ChevronDownIcon />
              </div>
              <CalendarIcon className="text-muted-foreground absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(selected) => {
                setDate(selected);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        {showLabel && <Label className="px-1">Time</Label>}
        <Input
          type="time"
          step="1"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="bg-background appearance-none"
        />
      </div>
    </div>
  );
}
