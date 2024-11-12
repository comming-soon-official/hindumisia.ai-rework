import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DateSelectorProps {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export const DateSelector = ({
  label,
  date,
  setDate,
  minDate,
  maxDate = new Date(), // Default max date is today
}: DateSelectorProps) => (
  <div className="flex flex-col justify-around">
    <div className="flex">
      <CardTitle className="text-sm font-medium text-muted-foreground">
        {label}
      </CardTitle>
    </div>
    <div className="mt-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-48 justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(day: Date | undefined) => day && setDate(day)}
            initialFocus
            disabled={(date) => {
              // Disable future dates
              if (date > new Date()) return true;
              // Disable dates before minDate if provided
              if (minDate && date < minDate) return true;
              // Disable dates after maxDate if provided
              if (maxDate && date > maxDate) return true;
              return false;
            }}
            defaultMonth={date} // Set the default visible month
            fromDate={minDate} // Minimum selectable date
            toDate={maxDate} // Maximum selectable date
          />
        </PopoverContent>
      </Popover>
    </div>
  </div>
);
