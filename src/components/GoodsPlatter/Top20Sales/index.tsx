import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

import { updateChart } from '../../../api/goodsPlatter/Top20Sales/index'
import { Props } from '../../../api/goodsPlatter/type'

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
            updateChart(timestampDates, Top20SalesEchart);
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
