import React from 'react'
import { Table, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import type { TableColumnsType } from 'antd'
import styles from './index.module.less'

interface DataType {
  key: React.Key
  goodsId: string
  goodsName: string
  goodsStock: number
  startDate: string
  endDate: string
  goodsStatus: number
  admin: string
  option: number
}

const columns: TableColumnsType<DataType> = [
  {
    title: '权益ID',
    dataIndex: 'goodsId',
    render: (id: string) => <NavLink to={`/detail/${id}`}>{id}</NavLink>,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
  },
  {
    title: '库存',
    dataIndex: 'goodsStock',
  },
  {
    title: '开始时间',
    dataIndex: 'startDate',
  },
  {
    title: '结束时间',
    dataIndex: 'endDate',
  },
  {
    title: '商品状态',
    dataIndex: 'goodsStatus',
    render: (goodsStatus: number) => {
      const statusMap: any = {
        0: '草稿',
        1: '待提交',
        2: '待审核',
        3: (
          <>
            <span style={{ color: 'green' }}>■&nbsp;</span>
            <span>审核通过</span>
          </>
        ),
        4: (
          <>
            <span style={{ color: 'red' }}>■&nbsp;</span>
            <span>审核未通过</span>
          </>
        ),
        5: (
          <>
            <span style={{ color: 'green' }}>●&nbsp;</span>
            <span>运行中</span>
          </>
        ),
        6: (
          <>
            <span style={{ color: 'red' }}>●&nbsp;</span>
            <span>已下线</span>
          </>
        ),
        default: <span style={{ color: 'red' }}>状态信息出错</span>,
      }
      return <>{statusMap[goodsStatus] || statusMap.default}</>
    },
  },
  {
    title: '管理人',
    dataIndex: 'admin',
  },
  {
    title: '操作',
    dataIndex: 'option',
    render: (option: number) => {
      const optionMap: any = {
        5: (
          <Button
            style={{
              border: '1px solid red',
              color: 'red',
              height: '2.1875rem',
              width: '4.375rem',
            }}
          >
            下线
          </Button>
        ),
        6: (
          <Button
            style={{
              border: '1px solid skyblue',
              color: 'skyblue',
              height: '2.1875rem',
              width: '4.375rem',
            }}
          >
            上线
          </Button>
        ),
        default: '',
      }
      return optionMap[option] || optionMap.default
    },
  },
]

const data: DataType[] = [
  {
    key: '1',
    goodsId: '1',
    goodsName: '巧乐兹',
    goodsStock: 300,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 3,
    admin: '丁真',
    option: 3,
  },
  {
    key: '2',
    goodsId: '2',
    goodsName: '雨伞',
    goodsStock: 50,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 4,
    admin: '马嘉祺',
    option: 4,
  },
  {
    key: '3',
    goodsId: '3',
    goodsName: '杠铃',
    goodsStock: 3000,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 5,
    admin: '马保国',
    option: 5,
  },
  {
    key: '4',
    goodsId: '4',
    goodsName: '大米',
    goodsStock: 3200,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 6,
    admin: '米老鼠',
    option: 6,
  },
  {
    key: '5',
    goodsId: '5',
    goodsName: '钢筋',
    goodsStock: 3000,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 7,
    admin: '小阳哥',
    option: 7,
  },
  {
    key: '6',
    goodsId: '6',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
  {
    key: '7',
    goodsId: '7',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
  {
    key: '8',
    goodsId: '8',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
  {
    key: '9',
    goodsId: '9',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
  {
    key: '10',
    goodsId: '10',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
  {
    key: '11',
    goodsId: '11',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  }
]

const GoodsTable: React.FC = () => {
  return (
    <>
      <div className={styles.main}>
        <Table
          rowSelection={{
            type: 'checkbox',
          }}
          columns={columns}
          dataSource={data}
        ></Table>
      </div>
    </>
  )
}

export default GoodsTable
