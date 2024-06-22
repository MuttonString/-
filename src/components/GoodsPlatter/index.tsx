import React, { useState, useEffect, useRef } from 'react';
import { DatePicker, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ExchangeAmount from "./ExchangeAmount"
import Top20Sales from "./Top20Sales"
import ExchangeMethod from './ExchangeMethod';

dayjs.extend(customParseFormat);

const GoodsPlatter: React.FC = () => {
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '兑换量',
      children: <ExchangeAmount dates={dates}></ExchangeAmount>,
    },
    {
      key: '2',
      label: '销售量top20',
      children: <Top20Sales dates={dates}></Top20Sales>,
    },
    {
      key: '3',
      label: '兑换方式',
      children: <ExchangeMethod dates={dates}></ExchangeMethod>,
    },
  ];

  const yesterdayRef = useRef<dayjs.Dayjs | null>(null);
  const eighthDayAgoRef = useRef<dayjs.Dayjs | null>(null);

  useEffect(() => {
    // 计算昨天和过去第八天的日期
    yesterdayRef.current = dayjs().subtract(1, 'day');
    eighthDayAgoRef.current = dayjs().subtract(8, 'day');

    // 设置默认日期范围
    setDates([eighthDayAgoRef.current, yesterdayRef.current]);
  }, []); // 注意这里没有依赖项数组，所以此effect只在组件挂载时执行一次

  const { RangePicker } = DatePicker;

  const disabledDate = (current: dayjs.Dayjs) => {
    // 阻止选择今天及未来的日期
    const today = dayjs();
    return current && (current.isSame(today, 'day') || current.isAfter(today));
  };

  const onCalendarChange = (newDates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {
    // 当选择的日期范围超过60天时,重置选择器
    if (newDates[0] && newDates[1]) {
      let start = newDates[0];
      let end = newDates[1];

      // 检查开始日期是否大于结束日期，并进行交换
      if (start.isAfter(end)) {
        [start, end] = [end, start]; // 交换 start 和 end
      }

      const duration = end.diff(start, 'day');

      if (duration > 59) {
        alert('日期范围不能超过60天');
        // 重置选择器
        setDates([eighthDayAgoRef.current, yesterdayRef.current]);
      } else {
        setDates([start, end]);
      }
    }
  };

  return (
    <div style={{ overflow: 'auto', backgroundColor: 'var(--main-bg-color)', padding: '16px' }}>
      <div className='DatePicker'
        style={{ display: 'flex', justifyContent: 'center', marginTop: '1%' }}
      >
        <RangePicker
          size='large'
          disabledDate={disabledDate}
          onCalendarChange={onCalendarChange}
          value={dates}
          style={{ width: '50%' }}
          format="YYYY-MM-DD"
        />
      </div>
      <div style={{ marginTop: "1%" }}>
        <Tabs
          defaultActiveKey="1"
          items={items}
          size='large'
        />
      </div>
    </div>
  );
};

export default GoodsPlatter;