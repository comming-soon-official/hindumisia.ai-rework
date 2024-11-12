import { Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatisticCardProps {
  title: string;
  value: number;
  change: number;
  color?: string;
  bgColor?: string;
}

export const StatisticCard = ({
  title,
  value,
  change,
  color,
  bgColor,
}: StatisticCardProps) => (
  <Card className={bgColor}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Filter className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <p className="text-xs text-muted-foreground">
        {change > 0 ? "+" : ""}
        {change} from previous day
      </p>
    </CardContent>
  </Card>
);
