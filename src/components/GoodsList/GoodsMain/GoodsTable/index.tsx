import React, { useState, useEffect } from 'react'
import { Table, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { TableColumnsType, Popconfirm } from 'antd'
import styles from './index.module.less'
import type { GoodsInTable } from '../../type'
import type { GoodsTableData } from './type'
import { requestQueryList } from '@/api/goodsList'

const GoodsTable: React.FC<GoodsTableData> = ({
  // data,
  tabId,
  changeGoodsStatus,
  setGoodsList,
  goodsList,
  pagiNationInfo,
  setPagiNationInfo,
  total,
  setTotal,
}) => {
  const [showWhich, setShowWhich] = useState<number>(0)
  const [mutiCount, setMultiCount] = useState<number>(0)
  const [selectedGoods, setSelectedGoods] = useState<GoodsInTable[]>([])
  useEffect(() => {
    requestDiff()
  }, [pagiNationInfo])

  // 监听data变化，看状态是否发生改变导致批量按钮需要变化,以完成在批量选择时，依旧可以动态单个上下线
  useEffect(() => {
    if (selectedGoods.length > 0) {
      const filtedData: GoodsInTable[] = goodsList.filter((item) => {
        for (let i = 0; i < selectedGoods.length; i++) {
          if (selectedGoods[i].id === item.id) {
            return true
          }
        }
        return false
      })
      handlerTableChange(
        filtedData.map((item) => item.key),
        filtedData
      )
    }
  }, [goodsList])
  // 根据不同页面发送不同条件请求
  const requestDiff = () => {
    if (tabId === 1) {
      requestQueryList({
        page: pagiNationInfo.page,
        pageSize: pagiNationInfo.pageSize,
      }).then((res) => {
        console.log('全部数据:', res)
        setGoodsList(res?.records)
        setTotal(res?.total)
      })
    }
    if (tabId === 2) {
      requestQueryList({
        page: pagiNationInfo.page,
        pageSize: pagiNationInfo.pageSize,
        proStatus: 2,
      }).then((res) => {
        console.log('上线数据', res)
        setGoodsList(res?.records)
        setTotal(res?.total)
      })
    }
    if (tabId === 3) {
      requestQueryList({
        page: pagiNationInfo.page,
        pageSize: pagiNationInfo.pageSize,
        proStatus: 3,
      }).then((res) => {
        console.log('下线数据', res)
        setGoodsList(res?.records)
        setTotal(res?.total)
      })
    }
  }

  // 当批量选择时，浮现按钮的动态变化
  const handlerTableChange = (_: React.Key[], selectedRows: GoodsInTable[]) => {
    setMultiCount(selectedRows.length)
    setSelectedGoods(selectedRows)
    if (tabId === 1 && selectedRows.length > 0) {
      const destiStatus = selectedRows[0].proStatus
      const isEquel = selectedRows.every((row: GoodsInTable) => {
        if (destiStatus === 1 || destiStatus === 3) {
          return row.proStatus === 1 || row.proStatus === 3
        } else {
          return row.proStatus === destiStatus
        }
      })
      if (isEquel) {
        if (destiStatus === 2) {
          setShowWhich(1)
          return
        }
        if (destiStatus === 1 || destiStatus === 3) {
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
      dataIndex: 'id',
      render: (id: string) => <NavLink to={`/detail/${id}`}>{id}</NavLink>,
    },
    {
      title: '商品名称',
      dataIndex: 'proName',
    },
    {
      title: '库存',
      dataIndex: 'stock',
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
    },
    {
      title: '商品状态',
      dataIndex: 'proStatus',
      render: (goodsStatus: number) => {
        const statusMap: any = {
          0: '待提交审核',
          1: (
            <>
              <span style={{ color: 'green' }}>■&nbsp;</span>
              <span>待上线</span>
            </>
          ),
          2: (
            <>
              <span style={{ color: 'green' }}>●&nbsp;</span>
              <span>运行中</span>
            </>
          ),
          3: (
            <>
              <span style={{ color: 'red' }}>●&nbsp;</span>
              <span>已下线</span>
            </>
          ),
          4: (
            <>
              <span style={{ color: 'red' }}>■&nbsp;</span>
              <span>审核驳回</span>
            </>
          ),
          5: '待审核',
          6: '草稿',
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
      dataIndex: 'proStatus',
      render: (proStatus: number, record: GoodsInTable) => {
        const optionMap: any = {
          1: (
            <Button
              style={{
                border: '1px solid skyblue',
                color: 'skyblue',
                height: '2.1875rem',
                width: '4.375rem',
              }}
              onClick={() => {
                changeGoodsStatus(record.id, 2)
              }}
            >
              上线
            </Button>
          ),
          2: (
            <Popconfirm
              title="下线商品"
              description={`你确定要下线【${record.proName}】吗？`}
              onConfirm={() => {
                changeGoodsStatus(record.id, 3)
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
          3: (
            <Button
              style={{
                border: '1px solid skyblue',
                color: 'skyblue',
                height: '2.1875rem',
                width: '4.375rem',
              }}
              onClick={() => {
                changeGoodsStatus(record.id, 2)
              }}
            >
              上线
            </Button>
          ),
          default: '',
        }
        return optionMap[proStatus] || optionMap.default
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
                3
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
                2
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
            total: total,
            onChange: (page: number, pageSize: number) => {
              console.log('当前页码：', page)
              console.log('每页数量：', pageSize)
              if (page != pagiNationInfo.page) {
                setPagiNationInfo({ ...pagiNationInfo, page })
              }
              if (pageSize != pagiNationInfo.pageSize) {
                setPagiNationInfo({ ...pagiNationInfo, pageSize })
              }
            },
            pageSizeOptions: ['10', '20', '50', '100'],
            defaultPageSize: 20,
          }}
          rowSelection={{
            type: 'checkbox',
            onChange: handlerTableChange,
          }}
          columns={columns}
          dataSource={goodsList.map((item, index) => {
            return { ...item, key: index }
          })}
        ></Table>
      </div>
    </>
  )
}

export default GoodsTable
