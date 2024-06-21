import * as echarts from "echarts";
import request from "@/utils/request";

import { responseTypE, SalesData } from "./type";
enum API {
  GET_TOP20_SALES = "/order/querySalesByPro",
}

const option = {
  // 配置项
  title: {
    text: "销量Top20",
    x: "center",
    y: "bottom",
    textStyle: { color: "royalblue" },
  },
  //鼠标移入提示
  tooltip: {
    trigger: "item",
    //控制提示格式
    formatter: "{b}:{c}",
  },
  xAxis: {
    data: [] as string[],
    axisLine: {
      lineStyle: { color: "royalblue" },
    },
    axisLabel: {
      interval: 0,
    },
  },
  yAxis: {
    axisLine: {
      lineStyle: { color: "royalblue" },
    },
  },
  series: [
    {
      type: "bar",
      data: [] as number[],
      label: {
        show: true, // 开启显示
        position: "top", // 在上方显示
        distance: 15, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
        verticalAlign: "middle",
        color: "royalblue", // 顶部数据的颜色
        fontSize: 14, // 顶部数据的字体大小
      },
    },
  ],
};

let Data: { [key: string]: number } = {};

export const requestTop20Sales = async (
  dates: [number | null, number | null]
) => {
  const res: responseTypE = await request.post<unknown, responseTypE>(
    API.GET_TOP20_SALES,
    {
      startTime: dates[0],
      endTime: dates[1],
    }
  );
  return res;
};

export const getData = async (dates: [number | null, number | null]) => {
  Data = {};

  const res = await requestTop20Sales(dates);

  if (res.code === 200) {
    if (res.data !== null && res.data.length !== 0) {
      res.data.forEach((item: SalesData) => {
        const CategoryName = item.categoryName;
        if (Data[CategoryName] === null || Data[CategoryName] === undefined) {
          Data[CategoryName] = 0;
        }
        Data[CategoryName] += Number(item.count);
      });
    }
  }
};

export const updateChart = async (
  timestampDates: [number | null, number | null],
  Top20SalesEchart: echarts.ECharts
) => {
  // 更新数据
  await getData(timestampDates);
  // 将对象转换为键值对数组
  const entries = Object.entries(Data);
  // 按照值从大到小排序键值对数组
  const sortedEntries = entries.sort((a, b) => b[1] - a[1]);
  // 取前20个元素以展示Top20
  const top20Entries = sortedEntries.slice(0, 20);
  // 将排序后的键值对数组转换回对象
  const sortedData = Object.fromEntries(top20Entries);
  option.xAxis.data = Object.keys(sortedData);
  option.series[0].data = Object.values(sortedData);
  if (Top20SalesEchart) {
    Top20SalesEchart.setOption(option);
  }
};
