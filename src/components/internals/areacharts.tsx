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
      textStyle: {
        color: "var(--foreground)",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#ffffff",
          color: "var(--accent-foreground)",
        },
      },
      backgroundColor: "var(--card)",
      borderWidth: 1,
      borderColor: "var(--border)",
      padding: [10, 15],
      textStyle: {
        color: "var(--card-foreground)",
      },
      formatter: function (params: any) {
        let tooltip = `<div style="color: var(--card-foreground)">
          ${params[0].axisValue}<br/>`;
        let total = 0;
        params.forEach((param: any) => {
          total += param.value;
          tooltip += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
        });
        tooltip += `<br/>Total: ${total}</div>`;
        return tooltip;
      },
    },
    legend: {
      data: ["Negative", "Neutral", "Positive"],
      top: 25,
      textStyle: {
        color: "var(--foreground)",
      },
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
        backgroundColor: "var(--secondary)",
        dataBackground: {
          lineStyle: {
            color: "var(--muted-foreground)",
          },
          areaStyle: {
            color: "var(--muted)",
          },
        },
        selectedDataBackground: {
          lineStyle: {
            color: "var(--primary)",
          },
          areaStyle: {
            color: "var(--primary)",
          },
        },
        fillerColor: "var(--accent)",
        borderColor: "var(--border)",
        textStyle: {
          color: "var(--foreground)",
        },
        handleStyle: {
          color: "var(--primary)",
          borderColor: "var(--border)",
        },
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
        color: "var(--foreground)",
        rotate: 45,
        formatter: (value: string) => {
          return new Date(value).toLocaleDateString();
        },
      },
      axisLine: {
        lineStyle: {
          color: "var(--muted-foreground)",
        },
      },
    },
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "var(--border)",
        },
      },
      axisLabel: {
        color: "var(--foreground)",
        formatter: "{value}",
      },
      axisLine: {
        lineStyle: {
          color: "var(--muted-foreground)",
        },
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
          color: "hsl(0, 100%, 50%)", // Default red
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
          color: "hsl(0, 0%, 70%)", // Default gray
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
          color: "hsl(120, 100%, 35%)", // Default green
        },
      },
    ],
    animation: true,
    animationDuration: 1000,
    animationEasing: "cubicInOut",
    backgroundColor: "transparent",
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
