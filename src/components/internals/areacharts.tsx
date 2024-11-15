import ReactECharts from "echarts-for-react";
import useUniversalStore from "@/store/useUniversalStore";
import { useMemo } from "react";

const TrendsChart = () => {
  const { csvData, rangeFromDate, rangeToDate } = useUniversalStore();

  const chartData = useMemo(() => {
    const dateMap = new Map<
      string,
      { negative: number; neutral: number; positive: number }
    >();

    csvData.forEach((item) => {
      const date = new Date(item.publishedDate);
      if (
        rangeFromDate &&
        rangeToDate &&
        date >= rangeFromDate &&
        date <= rangeToDate
      ) {
        const dateStr = date.toISOString().split("T")[0];
        const current = dateMap.get(dateStr) || {
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

        dateMap.set(dateStr, current);
      }
    });

    const dates = Array.from(dateMap.keys()).sort();
    const negative = dates.map((date) => dateMap.get(date)?.negative || 0);
    const neutral = dates.map((date) => dateMap.get(date)?.neutral || 0);
    const positive = dates.map((date) => dateMap.get(date)?.positive || 0);

    return { dates, negative, neutral, positive };
  }, [csvData, rangeFromDate, rangeToDate]);

  const option = {
    title: {
      text: "Sentiment Trends Over Time",
      left: "center",
      top: 0,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      formatter: function (params: any) {
        let tooltip = params[0].axisValue + "<br/>";
        let total = 0;
        params.forEach((param: any) => {
          total += param.value;
          tooltip += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
        });
        tooltip += `<br/>Total: ${total}`;
        return tooltip;
      },
    },
    legend: {
      data: ["Negative", "Neutral", "Positive"],
      top: 25,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
      top: 100,
    },
    toolbox: {
      feature: {
        saveAsImage: { title: "Save" },
        dataView: {
          title: "Data View",
          readOnly: false,
        },
        restore: { title: "Restore" },
        dataZoom: { title: "Zoom" },
        magicType: {
          title: {
            line: "Switch to Line",
            bar: "Switch to Bar",
            stack: "Stack",
            tiled: "Tiled",
          },
          type: ["line", "bar", "stack", "tiled"],
        },
      },
      top: 25,
      right: 20,
    },
    dataZoom: [
      {
        type: "slider",
        show: true,
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
      {
        type: "inside",
        xAxisIndex: [0],
        start: 0,
        end: 100,
      },
    ],
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: chartData.dates,
      axisLabel: {
        rotate: 45,
        formatter: (value: string) => {
          return new Date(value).toLocaleDateString();
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          type: "dashed",
        },
      },
      axisLabel: {
        formatter: "{value}",
      },
    },
    series: [
      {
        name: "Negative",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: "series",
          blurScope: "coordinateSystem",
        },
        data: chartData.negative,
        itemStyle: {
          color: "hsl(0, 100%, 50%)",
        },
      },
      {
        name: "Neutral",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: "series",
          blurScope: "coordinateSystem",
        },
        data: chartData.neutral,
        itemStyle: {
          color: "hsl(0, 0%, 70%)",
        },
      },
      {
        name: "Positive",
        type: "line",
        stack: "Total",
        smooth: true,
        areaStyle: {
          opacity: 0.8,
        },
        emphasis: {
          focus: "series",
          blurScope: "coordinateSystem",
        },
        data: chartData.positive,
        itemStyle: {
          color: "hsl(120, 100%, 35%)",
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicInOut",
  };

  return (
    <ReactECharts
      option={option}
      style={{ height: "100%", width: "100%" }}
      notMerge={true}
      lazyUpdate={true}
    />
  );
};

export default TrendsChart;
