import React, { useState } from 'react'
import { Button, Tabs, Tooltip } from 'antd'
import type { TabsProps } from 'antd'
import { ReloadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import GoodsTable from './GoodsTable'
import type { GoodsInTable } from '../type'
import type { MainProps } from './type'
import styles from './index.module.less'

const GoodsMain: React.FC<MainProps> = ({
  goodsList,
  setGoodsList,
  pagiNationInfo,
  setPagiNationInfo,
  total,
  setTotal,
  queryParams,
  setQueryParams,
  setQueryItem,
}) => {
  const navigate = useNavigate()
  const [status, setStatus] = useState<number>(1)
  // 传递给子组件，让其能改变上线状态
  const changeGoodsStatus = (ids: string[] | string, status: 2 | 3) => {
    if (Array.isArray(ids)) {
      goodsList.forEach((goodsItem: GoodsInTable) => {
        if (ids.indexOf(goodsItem.id) !== -1) {
          goodsItem.proStatus = status
        }
      })
    } else {
      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].id === ids) {
          goodsList[i].proStatus = status
          break
        }
      }
    }
    setGoodsList([...goodsList])
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '全部',
      children: (
        <GoodsTable
          tabId={1}
          tabStatus={status}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
          total={total}
          setTotal={setTotal}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        ></GoodsTable>
      ),
    },
    {
      key: '2',
      label: '已上线',
      children: (
        <GoodsTable
          tabId={2}
          tabStatus={status}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
          total={total}
          setTotal={setTotal}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        ></GoodsTable>
      ),
    },
    {
      key: '3',
      label: '已下线',
      children: (
        <GoodsTable
          tabId={3}
          tabStatus={status}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
          total={total}
          setTotal={setTotal}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
        ></GoodsTable>
      ),
    },
  ]
  return (
    <>
      <div className={styles.main}>
        <header className={styles.header}>
          <div style={{ fontWeight: '500', fontSize: '1.125rem' }}>
            商品列表
          </div>
          <div className={styles['header-right']}>
            <Button type="primary" onClick={() => navigate('/edit')}>
              新建商品
            </Button>
            <Tooltip title="刷新表格">
              <ReloadOutlined
                className={styles.refresh}
                onClick={() => {
                  setQueryParams({})
                  setQueryItem({})
                }}
              />
            </Tooltip>
          </div>
        </header>
        <main>
          <Tabs
            defaultActiveKey="1"
            items={items}
            onChange={(value) => {
              setStatus(+value)
            }}
          ></Tabs>
        </main>
      </div>
    </>
  )
}

export default GoodsMain
