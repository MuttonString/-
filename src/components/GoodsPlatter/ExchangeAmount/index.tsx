import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

function ExchangeAmount() {
    const chartRef = useRef(null);

    useEffect(() => {
        console.log('获取兑换量图表数据');
        
        const count = [
            { value: 160, name: '山林类' },
            { value: 140, name: '河湖湿地类' },
            { value: 36, name: '滨海类' },
            { value: 55, name: '温泉类' },
            { value: 6, name: '冰雪类' },
            { value: 9, name: '沙漠草原类' },
            { value: 20, name: '古城古镇类' },
            { value: 44, name: '主题文化类' },
            { value: 26, name: '主题乐园类' },
            { value: 24, name: '乡村田园类' }
        ];

        const option = {
            // 配置项
            title: {
                text: '兑换量',
                x: 'center',
                y: 'bottom',
                textStyle: { color: 'royalblue' }
            },
            tooltip: {},
            xAxis: {
                data: count.map(item => item.name),
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
                    type: 'line',
                    data: count.map(item => item.value),
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
        }

        
        // 初始化实例
        const exchangeAmountEchart = echarts.init(chartRef.current);
        exchangeAmountEchart.setOption(option);

        exchangeAmountEchart.resize();
        addEventListener('resize', () => {
            if (!exchangeAmountEchart.isDisposed())
                exchangeAmountEchart.resize();
        });

        // 清理函数，确保图表实例在组件卸载时被销毁
        return () => {
            if (exchangeAmountEchart) {
                exchangeAmountEchart.dispose();
            }
        };
    }, []);
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

export default ExchangeAmount;
