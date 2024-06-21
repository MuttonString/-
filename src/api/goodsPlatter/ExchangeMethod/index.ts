// import * as echarts from "echarts";
import request from "@/utils/request";

import { ResponseTypE, resultType, ExMethodData } from "./type";
import { sumObjValues } from '../index'

enum API {
  GET_METHOD_OF_EXCHANGE = "/order/querySalesByPayment",
}

const option = {
  // 配置项
  title: {
    text: "兑换方式",
    x: "center",
    y: "bottom",
    textStyle: { color: "royalblue" },
  },
  //鼠标移入提示
  tooltip: {
    trigger: "item",
    //控制提示格式
    formatter: "{b}:{c}占比({d}%)",
  },
  legend: {
    orient: "vertical", //图例的布局，水平布局、垂直布局
    type: "scroll",
    data: [] as resultType[],
    right: 15,
    top: "middle",
    icon: "circle",
    itemWidth: 8, //图例宽度
    itemHeight: 8, //图例高度
    textStyle: { color: "royalblue" },
    fontSize: 14,
    fontFamily: "微软雅黑",
  },
  series: [
    {
      type: "pie",
      data: [] as resultType[],
    },
  ],
};

let Data: { [key: string]: number[] } = {};

let resultData: { [key: string]: number } = {};

let result: resultType[] = [];

export const requestMethodOfExchange = async (
  dates: [number | null, number | null]
) => {
  const res: ResponseTypE = await request.post<unknown, ResponseTypE>(
    API.GET_METHOD_OF_EXCHANGE,
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

  result = [];

  const res = await requestMethodOfExchange(dates);

  if (res.code === 200) {
    if (res.data !== null && res.data.length !== 0) {
      res.data.forEach((item: ExMethodData) => {
        if (
          Data[item.paymentType] === null ||
          Data[item.paymentType] === undefined
        ) {
          Data[item.paymentType] = [];
        }
        Data[item.paymentType].push(Number(item.count));
      });

      resultData = sumObjValues(Data);

      for (const key in resultData) {
        result.push({
          name:
            Number(key) == 1
              ? "纯积分"
              : Number(key) == 2
              ? "积分+现金"
              : "纯现金",
          value: resultData[key],
        });
      }
    }
  }
};

export const updateChart = async (
  timestampDates: [number | null, number | null],
  exchangeMethodEchart: echarts.ECharts
) => {
  // 更新数据
  await getData(timestampDates);
  option.legend.data = result;
  option.series[0].data = result;
  if (exchangeMethodEchart) {
    exchangeMethodEchart.setOption(option);
  }
};
