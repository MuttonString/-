import * as echarts from "echarts";
import request from "@/utils/request";
import { ResponseTypE, ExchangeData } from "./type";
import { sumObjValues } from '../index'

enum API {
  GET_AMOUNT_OF_EXCHANGE = "/order/querySales",
}

const option = {
  // 配置项
  title: {
    text: "兑换量",
    x: "center",
    y: "bottom",
    textStyle: { color: "royalblue" },
  },
  grid: {
    // 图表距离边框的距离
    containLabel: true,
  },
  tooltip: {
    // tooltip 用于控制鼠标滑过或点击时的提示框
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器配置项。
      type: "cross", // 'cross' 十字准星指示器。
      axis: "auto", // 指示器的坐标轴。
      snap: true, // 坐标轴指示器是否自动吸附到点上
    },
    showContent: true,
  },
  xAxis: {
    type: "category",
    data: [] as string[],
    axisLine: {
      lineStyle: { color: "royalblue" },
    },
    axisLabel: {
      rotate: 45, // X 轴标签文字旋转角度
      interval: 0, //设置 X 轴数据间隔几个显示一个，为0表示都显示
    },
    boundaryGap: false, //数据从 Y 轴起始
  },
  yAxis: {
    type: "value",
    axisLine: {
      lineStyle: { color: "royalblue" },
    },
  },
  series: [
    {
      type: "line",
      data: [] as number[],
    },
  ],
  label: {
    show: true, // 开启显示
    position: "top", // 在上方显示
    distance: 15, // 距离图形元素的距离
    verticalAlign: "middle",
    color: "royalblue", // 顶部数据的颜色
    fontSize: 14, // 顶部数据的字体大小
  },
};

let Data: { [key: string]: number[] } = {};

let resultData: { [key: string]: number } = {};

export const requestAmountOfExchange = async (
  dates: [number | null, number | null]
) => {
  const res: ResponseTypE = await request.post<unknown, ResponseTypE>(
    API.GET_AMOUNT_OF_EXCHANGE,
    {
      startTime: dates[0],
      endTime: dates[1],
    }
  );
  return res;
};

export const getData = async (dates: [number | null, number | null]) => {
  Data = {};
  resultData = {};

  const res = await requestAmountOfExchange(dates);

  if (res.code === 200) {
    if (res.data !== null && res.data.length !== 0) {
      res.data.forEach((item: ExchangeData) => {
        const Date = item.date;

        if (Data[Date] === null || Data[Date] === undefined) {
          Data[Date] = [];
        }
        Data[Date].push(Number(item.count));
      });

      resultData = sumObjValues(Data);

      // 将对象转换为键值对数组
      const entries = Object.entries(resultData);

      // 按照日期字符串排序键值对数组
      const sortedEntries = entries.sort((a, b) => {
        const dateA = new Date(a[0]);
        const dateB = new Date(b[0]);
        return dateA.getTime() - dateB.getTime();
      });

      // 将排序后的键值对数组转换回对象
      resultData = Object.fromEntries(sortedEntries);
    }
  }
};

export const updateChart = async (
  timestampDates: [number | null, number | null],
  exchangeAmountEchart: echarts.ECharts
) => {
  // 更新数据

  await getData(timestampDates);
  option.xAxis.data = Object.keys(resultData);
  option.series[0].data = Object.values(resultData);
  if (exchangeAmountEchart) {
    exchangeAmountEchart.setOption(option);
  }
};
