import { Suspense, useState } from "react";
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

export default function HomePage() {
  const [timeframe, setTimeframe] = useState("daily");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [selectedPortal, setSelectedPortal] = useState("all");
  const [chartTheme, setChartTheme] = useState({
    barOrientation: "horizontal",
    showLegends: true,
    legendPosition: "top",
    colors: ["hsl(0, 100%, 50%)", "hsl(0, 0%, 70%)", "hsl(120, 100%, 35%)"],
  });

  // Mock data (you might want to move this to a separate file later)
  const sentimentData: SentimentData = {
    total: 143,
    negative: 54,
    neutral: 82,
    positive: 7,
    change: {
      total: 17,
      negative: -8,
      neutral: 15,
      positive: 0,
    },
  };

  const portalData: PortalData[] = [
    { name: "Telegraph India", negative: 23, neutral: 41, positive: 5 },
    { name: "The Print", negative: 14, neutral: 20, positive: 1 },
    { name: "The Week", negative: 12, neutral: 3, positive: 0 },
    { name: "Maktoobmedia", negative: 3, neutral: 2, positive: 0 },
    { name: "Sabrangindia", negative: 1, neutral: 3, positive: 0 },
    { name: "News Laundry", negative: 1, neutral: 3, positive: 0 },
  ];

  const toneDistributionData: PortalData[] = [
    { name: "National Herald", negative: 100.0, neutral: 0, positive: 0 },
    { name: "Maktoobmedia", negative: 60.0, neutral: 40.0, positive: 0 },
    { name: "The News Minute", negative: 50.0, neutral: 50.0, positive: 0 },
    { name: "Telegraph India", negative: 47.8, neutral: 49.3, positive: 2.9 },
    { name: "The Print", negative: 32.3, neutral: 61.3, positive: 6.4 },
    { name: "Sabrangindia", negative: 25.0, neutral: 75.0, positive: 0 },
    { name: "The Week", negative: 21.7, neutral: 69.6, positive: 8.7 },
    { name: "News Laundry", negative: 16.7, neutral: 83.3, positive: 0 },
  ];
  const pieData: PieData[] = [
    { name: "Negative", value: 37.8 },
    { name: "Neutral", value: 57.3 },
    { name: "Positive", value: 4.9 },
  ];

  // Update the date range selection logic
  const handleStartDateChange = (newDate: Date) => {
    setStartDate(newDate);
    // If end date is before new start date, update it
    if (endDate < newDate) {
      setEndDate(newDate);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold text-orange-500">
            MEDIA SENTIMENT SCORECARD
          </h1>
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
                      setDate={handleStartDateChange}
                      maxDate={new Date()} // Today is the maximum date
                    />
                    <DateSelector
                      label="End Date"
                      date={endDate}
                      setDate={setEndDate}
                      minDate={startDate} // Start date is the minimum date for end date
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
                    <SelectItem value="telegraph">Telegraph India</SelectItem>
                    <SelectItem value="print">The Print</SelectItem>
                    <SelectItem value="week">The Week</SelectItem>
                    <SelectItem value="maktoob">Maktoobmedia</SelectItem>
                    <SelectItem value="sabrang">Sabrangindia</SelectItem>
                    <SelectItem value="newslaundry">News Laundry</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>
          </div>

          {/* Statistics Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatisticCard
              title="Total Articles"
              value={sentimentData.total}
              change={sentimentData.change.total}
            />
            <StatisticCard
              title="Negative"
              value={sentimentData.negative}
              change={sentimentData.change.negative}
              color="text-red-500"
              bgColor="bg-red-500/10"
            />
            <StatisticCard
              title="Neutral"
              value={sentimentData.neutral}
              change={sentimentData.change.neutral}
              color="text-gray-500"
              bgColor="bg-gray-500/10"
            />
            <StatisticCard
              title="Positive"
              value={sentimentData.positive}
              change={sentimentData.change.positive}
              color="text-green-500"
              bgColor="bg-green-500/10"
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
            <HeadlinesTable />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
