import { Suspense, useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { StatisticCard } from "@/components/dashboard/StatisticCard";
import { DateSelector } from "@/components/dashboard/DateSelector";
import { getBarChartConfig, getPieChartConfig } from "@/config/chartConfigs";
import { SentimentData, PortalData, PieData } from "@/types/sentiment";
import HeadlinesTable from "@/components/internals/tables/table";
import TrendsChart from "@/components/internals/areacharts";
import useUniversalStore from "@/store/useUniversalStore";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function HomePage() {
  const [timeframe, setTimeframe] = useState("daily");
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    if (timeframe === "daily") {
      return today;
    } else if (timeframe === "monthly") {
      return new Date(today.getFullYear(), today.getMonth(), 1);
    }
    return today;
  });

  const [endDate, setEndDate] = useState(() => {
    const today = new Date();
    if (timeframe === "daily") {
      return today;
    } else if (timeframe === "monthly") {
      return new Date(today.getFullYear(), today.getMonth() + 1, 0);
    }
    return today;
  });

  const [selectedPortal, setSelectedPortal] = useState("all");
  const { write, csvData } = useUniversalStore();
  const [publishedDate, setPublishedDate] = useState<Date>();

  const [chartTheme, setChartTheme] = useState({
    barOrientation: "horizontal",
    showLegends: true,
    legendPosition: "top",
    colors: ["hsl(0, 100%, 50%)", "hsl(0, 0%, 70%)", "hsl(120, 100%, 35%)"],
  });

  useEffect(() => {
    const today = new Date();

    if (timeframe === "daily") {
      setStartDate(today);
      setEndDate(today);
    } else if (timeframe === "monthly") {
      setStartDate(new Date(today.getFullYear(), today.getMonth(), 1));
      setEndDate(new Date(today.getFullYear(), today.getMonth() + 1, 0));
    }
    // For "range", we don't auto-update dates to let user pick their own range
  }, [timeframe]);

  useEffect(() => {
    write({ rangeFromDate: startDate, rangeToDate: endDate });
  }, [startDate, endDate, write]);

  const rangeData = useMemo(() => {
    return csvData.filter((data) => {
      const publishedDate = new Date(data.publishedDate);
      // Subtract 1 day from publishedDate
      publishedDate.setDate(publishedDate.getDate() - 1);
      // Set time to midnight for consistent date comparison
      publishedDate.setHours(0, 0, 0, 0);
      setPublishedDate(publishedDate);

      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      return publishedDate >= start && publishedDate <= end;
    });
  }, [csvData, startDate, endDate]);

  // Get unique portals from rangeData
  const availablePortals = useMemo(() => {
    const portals = new Set(rangeData.map((item) => item.portal));
    return Array.from(portals).sort();
  }, [rangeData]);

  // Filter rangeData based on selected portal
  const filteredRangeData = useMemo(() => {
    if (selectedPortal === "all") return rangeData;
    return rangeData.filter((item) => item.portal === selectedPortal);
  }, [rangeData, selectedPortal]);

  // Calculate portal data from rangeData
  const portalData: PortalData[] = useMemo(() => {
    const portalMap = new Map<
      string,
      { negative: number; neutral: number; positive: number }
    >();

    filteredRangeData.forEach((item) => {
      const current = portalMap.get(item.portal) || {
        negative: 0,
        neutral: 0,
        positive: 0,
      };

      switch (item.sentiment.toLowerCase()) {
        case "negative":
          current.negative++;
          break;
        case "neutral":
          current.neutral++;
          break;
        case "positive":
          current.positive++;
          break;
      }

      portalMap.set(item.portal, current);
    });

    return Array.from(portalMap.entries())
      .map(([name, counts]) => ({
        name,
        ...counts,
      }))
      .sort(
        (a, b) =>
          b.negative +
          b.neutral +
          b.positive -
          (a.negative + a.neutral + a.positive)
      );
  }, [filteredRangeData]);

  // Calculate tone distribution data from rangeData
  const toneDistributionData: PortalData[] = useMemo(() => {
    const portalMap = new Map<
      string,
      { negative: number; neutral: number; positive: number }
    >();

    filteredRangeData.forEach((item) => {
      const current = portalMap.get(item.portal) || {
        negative: 0,
        neutral: 0,
        positive: 0,
      };

      switch (item.sentiment.toLowerCase()) {
        case "negative":
          current.negative++;
          break;
        case "neutral":
          current.neutral++;
          break;
        case "positive":
          current.positive++;
          break;
      }

      portalMap.set(item.portal, current);
    });

    return Array.from(portalMap.entries())
      .map(([name, counts]) => {
        const total = counts.negative + counts.neutral + counts.positive;
        return {
          name,
          negative: Number(((counts.negative / total) * 100).toFixed(1)),
          neutral: Number(((counts.neutral / total) * 100).toFixed(1)),
          positive: Number(((counts.positive / total) * 100).toFixed(1)),
        };
      })
      .sort((a, b) => b.negative - a.negative);
  }, [filteredRangeData]);

  // Calculate pie chart data from rangeData
  const pieData: PieData[] = useMemo(() => {
    const totals = filteredRangeData.reduce(
      (acc, item) => {
        switch (item.sentiment.toLowerCase()) {
          case "negative":
            acc.negative++;
            break;
          case "neutral":
            acc.neutral++;
            break;
          case "positive":
            acc.positive++;
            break;
        }
        return acc;
      },
      { negative: 0, neutral: 0, positive: 0 }
    );

    const total = totals.negative + totals.neutral + totals.positive;

    return [
      { name: "Negative", value: (totals.negative / total) * 100 },
      { name: "Neutral", value: (totals.neutral / total) * 100 },
      { name: "Positive", value: (totals.positive / total) * 100 },
    ];
  }, [filteredRangeData]);

  // Calculate current and previous day data
  const { currentData, previousDayData } = useMemo(() => {
    const current = filteredRangeData.reduce(
      (acc, item) => {
        switch (item.sentiment.toLowerCase()) {
          case "negative":
            acc.negative++;
            break;
          case "neutral":
            acc.neutral++;
            break;
          case "positive":
            acc.positive++;
            break;
        }
        return acc;
      },
      { negative: 0, neutral: 0, positive: 0 }
    );

    let previous = null;

    if (timeframe === "daily") {
      // Calculate previous day's data
      const currentDate = new Date(startDate);
      const previousDate = new Date(currentDate);
      previousDate.setDate(previousDate.getDate() - 1);

      previous = csvData.reduce(
        (acc, item) => {
          const itemDate = new Date(item.publishedDate);
          // Compare only dates, not times
          if (
            itemDate.getFullYear() === previousDate.getFullYear() &&
            itemDate.getMonth() === previousDate.getMonth() &&
            itemDate.getDate() === previousDate.getDate()
          ) {
            switch (item.sentiment.toLowerCase()) {
              case "negative":
                acc.negative++;
                break;
              case "neutral":
                acc.neutral++;
                break;
              case "positive":
                acc.positive++;
                break;
            }
          }
          return acc;
        },
        { negative: 0, neutral: 0, positive: 0 }
      );
    }

    return { currentData: current, previousDayData: previous };
  }, [filteredRangeData, csvData, timeframe, startDate]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-orange-500">
            MEDIA SENTIMENT SCORECARD
          </h1>
          <ThemeToggle />
        </div>
      </header>
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="grid gap-6">
          {/* Control Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Time Range Selector */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Select Time Range
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  {["daily", "monthly", "range"].map((option) => (
                    <Button
                      key={option}
                      variant={timeframe === option ? "default" : "outline"}
                      onClick={() => setTimeframe(option)}
                      className="capitalize"
                    >
                      {option}
                    </Button>
                  ))}
                </div>

                {timeframe === "range" && (
                  <div className="flex flex-wrap gap-4">
                    <DateSelector
                      label="Start Date"
                      date={startDate}
                      setDate={setStartDate}
                      maxDate={endDate} // End date is the maximum date
                    />
                    <DateSelector
                      label="End Date"
                      date={endDate}
                      setDate={setEndDate}
                      minDate={startDate} // Start date is the minimum date
                      maxDate={new Date()} // Today is the maximum date
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Portal Filter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Select Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={selectedPortal}
                  onValueChange={setSelectedPortal}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select portal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Portals</SelectItem>
                    {availablePortals.map((portal) => (
                      <SelectItem key={portal} value={portal}>
                        {portal}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard
              title="Total Articles"
              value={
                currentData.negative +
                currentData.neutral +
                currentData.positive
              }
              previousDayValue={
                previousDayData
                  ? previousDayData.negative +
                    previousDayData.neutral +
                    previousDayData.positive
                  : null
              }
              timeframe={timeframe}
            />
            <StatisticCard
              title="Negative"
              value={currentData.negative}
              previousDayValue={previousDayData?.negative ?? null}
              color="text-red-500"
              bgColor="bg-red-500/10"
              timeframe={timeframe}
            />
            <StatisticCard
              title="Neutral"
              value={currentData.neutral}
              previousDayValue={previousDayData?.neutral ?? null}
              color="text-gray-500"
              bgColor="bg-gray-500/10"
              timeframe={timeframe}
            />
            <StatisticCard
              title="Positive"
              value={currentData.positive}
              previousDayValue={previousDayData?.positive ?? null}
              color="text-green-500"
              bgColor="bg-green-500/10"
              timeframe={timeframe}
            />
          </div>

          {/* Charts Section */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Volume Distribution Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg">Volume Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ReactECharts
                    style={{ height: "100%", width: "100%" }}
                    option={getBarChartConfig(portalData, {
                      orientation: "horizontal",
                      showLegend: true,
                      legendPosition: "top",
                      colors: chartTheme.colors,
                      zoom: true,
                      barWidth: 20,
                    })}
                    notMerge={true}
                    lazyUpdate={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Overall Tone Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Overall Tone Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] w-full">
                  <ReactECharts
                    style={{ height: "100%", width: "100%" }}
                    option={getPieChartConfig(pieData, {
                      showLegend: true,
                      legendPosition: "bottom",
                      colors: chartTheme.colors,
                      radius: ["40%", "70%"],
                    })}
                    notMerge={true}
                    lazyUpdate={true}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tone Distribution Chart */}
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg">
                  Tone Distribution by Portal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <ReactECharts
                    style={{ height: "100%", width: "100%" }}
                    option={getBarChartConfig(toneDistributionData, {
                      orientation: "horizontal",
                      showLegend: true,
                      legendPosition: "top",
                      colors: chartTheme.colors,
                      zoom: true,
                      barWidth: 25,
                    })}
                    notMerge={true}
                    lazyUpdate={true}
                  />
                </div>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg">
                  Trends for November 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full">
                  <TrendsChart />
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Headlines Table */}
          <Suspense fallback={<div>Loading headlines...</div>}>
            <HeadlinesTable
              rangeData={filteredRangeData}
              selectedPortal={selectedPortal}
              onPortalChange={setSelectedPortal}
              availablePortals={availablePortals}
            />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
