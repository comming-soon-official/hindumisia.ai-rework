import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import {
    Popover,
    PopoverContent,
    PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DateSelectorProps {
    label: string
    date: Date
    setDate: (date: Date) => void
    minDate?: Date
    maxDate?: Date
}

export function DateSelector({
    label,
    date,
    setDate,
    minDate,
    maxDate
}: DateSelectorProps) {
    const [open, setOpen] = useState(false)

    const handleDateSelect = (selectedDate: Date) => {
        setDate(selectedDate)
        setOpen(false) // Close the popover after selection
    }

    return (
        <div>
            <div className="text-sm font-medium mb-2">{label}</div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant={'outline'}
                        className={cn(
                            'w-[240px] justify-start text-left font-normal',
                            !date && 'text-muted-foreground'
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        selected={date}
                        onDateSelect={handleDateSelect}
                        disabled={(date) => {
                            if (minDate && date < minDate) return true
                            if (maxDate && date > maxDate) return true
                            return false
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
