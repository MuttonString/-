import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import request from '@/utils/request';

interface Props {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

interface ExMethodData {
    count: number;
    paymentType: string;
}

interface responseType {
    code: number;
    data: ExMethodData[];
    msg: string;
}

interface resultType {
    name: string;
    value: number;
}

const option = {
    // 配置项
    title: {
        text: '兑换方式',
        x: 'center',
        y: 'bottom',
        textStyle: { color: 'royalblue' }
    },
    //鼠标移入提示
    tooltip: {
        trigger: 'item',
        //控制提示格式
        formatter: '{b}:{c}占比({d}%)'
    },
    legend: {
        orient: 'vertical', //图例的布局，水平布局、垂直布局
        type: 'scroll',
        data: [] as resultType[],
        right: 15,
        top: 'middle',
        icon: 'circle',
        itemWidth: 8, //图例宽度
        itemHeight: 8, //图例高度
        textStyle: { color: 'royalblue' },
        fontSize: 14,
        fontFamily: '微软雅黑'
    },
    series: [
        {
            type: 'pie',
            data: [] as resultType[]
        }
    ]
};

let Data: { [key: string]: number[] } = {}

let resultData: { [key: string]: number } = {}

let result: resultType[] = []

const sumObjValues = (obj: { [key: string]: number[] }): { [key: string]: number } => {
    const result: { [key: string]: number } = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const array = obj[key];
            result[key] = array.reduce((acc, curr) => acc + curr, 0);
        }
    }
    return result;
};

async function getData(dates: [number | null, number | null]) {

    Data = {}

    resultData = {}

    result = []

    await request.post<responseType, responseType>('/order/querySalesByPayment',
        {
            startTime: dates[0],
            endTime: dates[1]
        }
    ).then((res) => {

        if (res.code === 200) {
            if (res.data !== null && res.data.length !== 0) {

                res.data.forEach((item: ExMethodData) => {
                    if (Data[item.paymentType] === null || Data[item.paymentType] === undefined) {
                        Data[item.paymentType] = []
                    }
                    Data[item.paymentType].push(Number(item.count))
                })

                resultData = sumObjValues(Data)

                for (const key in resultData) {
                    result.push({
                        name: Number(key) == 1 ? "纯积分" : (Number(key) == 2 ? "积分+现金" : "纯现金"),
                        value: resultData[key]
                    })
                }

            }
        }

    })
}

function ExchangeMethod({ dates }: Props) {

    const chartRef = useRef(null);

    // 初始化实例
    let exchangeMethodEchart: echarts.ECharts;

    if (dates[0] !== null && dates[1] !== null) {
        if (dates[0] !== undefined && dates[1] !== undefined) {
            if (dates[0]?.valueOf() > dates[1]?.valueOf()) {
                const temp = dates[0]
                dates[0] = dates[1]
                dates[1] = temp
            }
        }
    }

    const timestampDates: [number | null, number | null] = [
        dates[0] ? dates[0].valueOf() : null,
        dates[1] ? dates[1].valueOf() : null,
    ];

    async function updateChart() {
        // 更新数据
        await getData(timestampDates);
        option.legend.data = result;
        option.series[0].data = result;
        if (exchangeMethodEchart) {
            exchangeMethodEchart.setOption(option);
        }
    }

    useEffect(() => {
        if (chartRef.current) {
            // 初始化echarts实例，仅在此处进行一次初始化
            if (!exchangeMethodEchart) {
                exchangeMethodEchart = echarts.init(chartRef.current);
                exchangeMethodEchart.resize();
                addEventListener('resize', () => {
                    if (!exchangeMethodEchart.isDisposed())
                        exchangeMethodEchart.resize();
                });
            }
            // 更新图表数据和配置
            updateChart();
        }
    }, [dates]);

    return (
        <div
            ref={chartRef}
            style={{
                width: 'calc(100vw - 300px)',
                height: 'calc(100vh - 300px)'
            }}
        ></div>
    );
}

export default ExchangeMethod;
