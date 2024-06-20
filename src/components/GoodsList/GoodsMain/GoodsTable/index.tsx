import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { TableColumnsType, Popconfirm } from 'antd'
import styles from './index.module.less'
import type { GoodsInTable } from '../../type'
import type { GoodsTableData } from './type'

/* const data: GoodsInTable[] = [
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
    goodsStatus: 5,
    admin: '米老鼠',
    option: 5,
  },
  {
    key: '5',
    goodsId: '5',
    goodsName: '钢筋',
    goodsStock: 3000,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 6,
    admin: '小阳哥',
    option: 6,
  },
  {
    key: '6',
    goodsId: '6',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 6,
    admin: '大阳哥',
    option: 6,
  },
  {
    key: '7',
    goodsId: '7',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 5,
    admin: '大阳哥',
    option: 5,
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
    proId: '11',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
] */

const GoodsTable: React.FC<GoodsTableData> = ({
  // data,
  tabId,
  changeGoodsStatus,
  changeGoods,
  goodsList,
  pagiNationInfo,
  setPagiNationInfo
}) => {
  const [showWhich, setShowWhich] = useState<number>(0)
  const [mutiCount, setMultiCount] = useState<number>(0)
  const [selectedGoods, setSelectedGoods] = useState<GoodsInTable[]>([])

  // 监听data变化，看状态是否发生改变导致批量按钮需要变化,以完成在批量选择时，依旧可以动态单个上下线
  useEffect(() => {
    if(selectedGoods.length > 0) {
      const filtedData: GoodsInTable[] = goodsList.filter(item => {
        for(let i = 0; i < selectedGoods.length; i++) {
          if(selectedGoods[i].id === item.id) {
            return true
          }
        }
        return false
      })
      handlerTableChange(filtedData.map(item => item.key), filtedData)
    }
  },[goodsList])

  const handlerTableChange = (_: React.Key[], selectedRows: GoodsInTable[]) => {
    setMultiCount(selectedRows.length)
    setSelectedGoods(selectedRows)
    if (tabId === 1 && selectedRows.length > 0) {
      const destiStatus = selectedRows[0].proStatus
      const isEquel = selectedRows.every((row: GoodsInTable) => {
        if (destiStatus === 3 || destiStatus === 6) {
          return row.proStatus === 3 || row.proStatus === 6
        } else {
          return row.proStatus === destiStatus
        }
      })
      if (isEquel) {
        if (destiStatus === 5) {
          setShowWhich(1)
          return
        }
        if (destiStatus === 6 || destiStatus === 3) {
          setShowWhich(2)
          return
        }
        setShowWhich(0)
      } else {
        setShowWhich(0)
      }
    } else if (tabId === 2 && selectedRows.length > 0) {
      setShowWhich(1)
    } else if (selectedRows.length > 0) {
      setShowWhich(2)
    }
  }

  /* 对商品列表Table部分进行编写 */

  const columns: TableColumnsType<GoodsInTable> = [
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
      render: (option: number, record: GoodsInTable) => {
        const optionMap: any = {
          3: (
            <Button
              style={{
                border: '1px solid skyblue',
                color: 'skyblue',
                height: '2.1875rem',
                width: '4.375rem',
              }}
              onClick={() => {
                changeGoodsStatus(record.id, 5)
              }}
            >
              上线
            </Button>
          ),
          5: (
            <Popconfirm
              title="下线商品"
              description={`你确定要下线【${record.proName}】吗？`}
              onConfirm={() => {
                changeGoodsStatus(record.id, 6) 
              }}
              okText="确定"
              cancelText="取消"
            >
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
            </Popconfirm>
          ),
          6: (
            <Button
              style={{
                border: '1px solid skyblue',
                color: 'skyblue',
                height: '2.1875rem',
                width: '4.375rem',
              }}
              onClick={() => {
                changeGoodsStatus(record.id, 5)
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
  return (
    <>
      <div
        className={styles['message-multi']}
        style={{ display: mutiCount > 0 ? 'flex' : 'none' }}
      >
        <p>已选择&nbsp;&nbsp;{mutiCount}&nbsp;&nbsp;项</p>
        {showWhich === 0 ? null : showWhich === 1 ? (
          <Popconfirm
            title="批量下线商品"
            description="你确定要下线这些商品吗？"
            okText="确定"
            cancelText="取消"
            onConfirm={() => {
              changeGoodsStatus(
                selectedGoods?.map(
                  (selectedGoodsItem: GoodsInTable) => selectedGoodsItem.id
                ),
                6
              )
              setShowWhich(2)
            }}
          >
            <p>批量下线</p>
          </Popconfirm>
        ) : (
          <p
            onClick={() => {
              changeGoodsStatus(
                selectedGoods?.map(
                  (selectedGoodsItem: GoodsInTable) => selectedGoodsItem.id
                ),
                5
              )
              setShowWhich(1)
            }}
          >
            批量上线
          </p>
        )}
      </div>
      <div className={styles.main}>
        <Table
          pagination={{
            current: pagiNationInfo.page,
            total: pagiNationInfo.total,
            onChange: (page: number, pageSize: number) => {
              console.log('当前页码：',page)
              console.log('每页数量：',pageSize)
              setPagiNationInfo({...pagiNationInfo, page})
              setPagiNationInfo({...pagiNationInfo, pageSize})
            },
            pageSizeOptions: ['10','20','50','100'],
            defaultPageSize: 20
          }}
          rowSelection={{
            type: 'checkbox',
            onChange: handlerTableChange,
          }}
          columns={columns}
          dataSource={goodsList}
        ></Table>
      </div>
    </>
  )
}

export default GoodsTable
