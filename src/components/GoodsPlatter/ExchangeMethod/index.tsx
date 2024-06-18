import * as echarts from "echarts";
import { useEffect, useRef } from "react";

function ExchangeMethod() {

    const chartRef = useRef(null);

    useEffect(() => {
        console.log("获取图表数据");
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
        ]
        // 初始化实例
        const exchangeMethodEchart =
            echarts.init(chartRef.current)
        exchangeMethodEchart.setOption({
            // 配置项
            title: {
                text: '兑换方式',
                x: 'center',
                y: 'bottom'
            },
            //鼠标移入提示
            tooltip: {
                trigger: 'item',
                //控制提示格式
                formatter: '{b}:{c}占比({d}%)'
            },
            legend: {
                orient: "vertical",//图例的布局，水平布局、垂直布局
                type: 'scroll',
                data: count,
                right: 15,
                top: 'middle',
                icon: 'circle',
                itemWidth: 8,//图例宽度
                itemHeight: 8,//图例高度
                textStyle: {//图例字体样式
                    color: "#000",
                    fontSize: 14,
                    fontFamily: "微软雅黑"
                }
            },
            series: [
                {
                    type: 'pie',
                    data: count
                }
            ]
        })
        
        return () => {
            if (exchangeMethodEchart) {
                exchangeMethodEchart.dispose();
            }
        };
    }, [])

    return (
        <div ref={chartRef} style={{ width: '100%', height: '100%' }}>
        </div>
    )
}

export default ExchangeMethod