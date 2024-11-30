import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MonthlyPicker({
  setStartDate,
  setEndDate,
  startDate,
}: {
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  startDate: Date;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentYear = new Date().getFullYear();

  const handleMonthSelect = (monthIndex: string) => {
    const month = parseInt(monthIndex);
    const year = currentYear;

    // Start of month
    const startDate = new Date(year, month, 1);

    // End of month
    const endDate = new Date(year, month + 1, 0);

    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Get the current selected month index as a string
  const getCurrentMonthValue = () => {
    return startDate.getMonth().toString();
  };

  // Get the current month name for display
  const getCurrentMonthDisplay = () => {
    return months[startDate.getMonth()];
  };

  return (
    <Select value={getCurrentMonthValue()} onValueChange={handleMonthSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{getCurrentMonthDisplay()}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{currentYear}</SelectLabel>
          {months.map((month, index) => (
            <SelectItem key={month} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
