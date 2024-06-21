import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

import dayjs from 'dayjs';
import request from '@/utils/request';

interface Props {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

interface SalesData {
    count: string;
    categoryName: string;
}

interface responseType {
    code: number;
    data: SalesData[];
    msg: string;
}

const option = {
    // 配置项
    title: {
        text: '销量Top20',
        x: 'center',
        y: 'bottom',
        textStyle: { color: 'royalblue' }
    },
    //鼠标移入提示
    tooltip: {
        trigger: 'item',
        //控制提示格式
        formatter: '{b}:{c}'
    },
    xAxis: {
        data: [] as string[],
        axisLine: {
            lineStyle: { color: 'royalblue' }
        }
    },
    yAxis: {
        axisLine: {
            lineStyle: { color: 'royalblue' }
        }
    },
    series: [
        {
            type: 'bar',
            data: [] as number[],
            label: {
                show: true, // 开启显示
                position: 'top', // 在上方显示
                distance: 15, // 距离图形元素的距离。当 position 为字符描述值（如 'top'、'insideRight'）时候有效
                verticalAlign: 'middle',
                color: 'royalblue', // 顶部数据的颜色
                fontSize: 14 // 顶部数据的字体大小
            }
        }
    ]
};

let Data: { [key: string]: number } = {}

async function getData(dates: [number | null, number | null]) {

    Data = {}

    await request.post<responseType, responseType>('/order/querySalesByPro',
        {
            startTime: dates[0],
            endTime: dates[1]
        }
    ).then((res) => {

        if (res.code === 200) {
            if (res.data !== null && res.data.length !== 0) {

                res.data.forEach((item: SalesData) => {
                    const CategoryName = item.categoryName
                    if (Data[CategoryName] === null || Data[CategoryName] === undefined) {
                        Data[CategoryName] = 0
                    }
                    Data[CategoryName] += Number(item.count)
                })

            }
        }

    })
}


function Top20Sales({ dates }: Props) {

    const chartRef = useRef(null);

    // 初始化实例
    let Top20SalesEchart: echarts.ECharts;

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
    }

    useEffect(() => {
        if (chartRef.current) {
            // 初始化echarts实例，仅在此处进行一次初始化
            if (!Top20SalesEchart && Top20SalesEchart === undefined) {
                Top20SalesEchart = echarts.init(chartRef.current);
                Top20SalesEchart.resize();
                addEventListener('resize', () => {
                    if (!Top20SalesEchart.isDisposed())
                        Top20SalesEchart.resize();
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

export default Top20Sales;
