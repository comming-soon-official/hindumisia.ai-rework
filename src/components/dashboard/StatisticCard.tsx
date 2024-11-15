import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticCardProps {
  title: string;
  value: number;
  previousDayValue?: number | null;
  color?: string;
  bgColor?: string;
  timeframe: string;
}

export const StatisticCard = ({
  title,
  value,
  previousDayValue,
  color,
  bgColor,
  timeframe,
}: StatisticCardProps) => {
  const calculateChange = () => {
    if (previousDayValue === null || previousDayValue === undefined)
      return null;
    return value - previousDayValue;
  };

  const change = calculateChange();

  return (
    <Card className={bgColor}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Filter className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${color}`}>{value}</div>
        {timeframe === "daily" && change !== null && (
          <p className="text-xs text-muted-foreground">
            {change > 0 ? "+" : ""}
            {change} from previous day
          </p>
        )}
      </CardContent>
    </Card>
  );
};
