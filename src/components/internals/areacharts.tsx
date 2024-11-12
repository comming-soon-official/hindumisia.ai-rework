import React from "react";
import ReactECharts from "echarts-for-react";
import {
  generateTrendsData,
  getTrendsChartConfig,
} from "@/config/chartConfigs";

const TrendsChart = () => {
  const data = generateTrendsData();
  const option = getTrendsChartConfig(data);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <ReactECharts
        option={option}
        style={{ height: "500px", width: "100%" }}
      />
    </div>
  );
};

export default TrendsChart;
