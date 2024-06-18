import React, { useState, useEffect } from 'react';
import { DatePicker, Tabs } from 'antd';
import type { TabsProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import ExchangeAmount from "./ExchangeAmount"
import Top20Sales from "./Top20Sales"
import ExchangeMethod from './ExchangeMethod';


dayjs.extend(customParseFormat);

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '兑换量',
    children: <ExchangeAmount ></ExchangeAmount>,
  },
  {
    key: '2',
    label: '销售量top20',
    children: <Top20Sales></Top20Sales>,
  },
  {
    key: '3',
    label: '兑换方式',
    children: <ExchangeMethod></ExchangeMethod>,
  },
];

const GoodsPlatter: React.FC = () => {
  const [dates, setDates] = useState<[dayjs.Dayjs | null, dayjs.Dayjs | null]>([null, null]);

  useEffect(() => {
    // 计算昨天和过去第八天的日期
    const yesterday = dayjs().subtract(1, 'day');
    const eighthDayAgo = dayjs().subtract(8, 'day');
    
    // 设置默认日期范围
    setDates([eighthDayAgo, yesterday]);
  }, []); // 注意这里没有依赖项数组，所以此effect只在组件挂载时执行一次

  useEffect(() => {
    console.log(dates);

  }, [dates])

  const { RangePicker } = DatePicker;

  const disabledDate = (current: dayjs.Dayjs) => {
    // 阻止选择今天及未来的日期
    const today = dayjs();
    return current && (current.isSame(today, 'day') || current.isAfter(today));
  };

  const onCalendarChange = (newDates: [dayjs.Dayjs | null, dayjs.Dayjs | null]) => {
    // 当选择的日期范围超过60天时,重置选择器
    if (newDates[0] && newDates[1]) {
      const start = newDates[0];
      const end = newDates[1];
      const duration = end.diff(start, 'day');

      if (duration > 59) {
        setDates([null, null]);
      } else {
        setDates(newDates);
      }
    }
  };

  return (
    <div>
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
          onChange={onChange}
          size='large'
        />
      </div>
    </div>
  );
};

export default GoodsPlatter;