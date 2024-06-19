import React, { useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { ReloadOutlined, ColumnHeightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import GoodsTable from './GoodsTable'
import type { GoodsInTable } from '../type'
import type { MainProps } from './type'
import styles from './index.module.less'

const data: GoodsInTable[] = [
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
    goodsId: '11',
    goodsName: '船桨',
    goodsStock: 320,
    startDate: '2024-2-10',
    endDate: '2024-3-10',
    goodsStatus: 0,
    admin: '大阳哥',
    option: 0,
  },
]

const GoodsMain: React.FC<MainProps> = ({goodsList, setGoodsList, queryList, queryOnlineList, queryOfflineList, queryZero}) => {
  const navigate = useNavigate()
  const [onlineList, setOnlineList] = useState<GoodsInTable[]>([])
  const [offlineList, setOfflineList] = useState<GoodsInTable[]>([])
  // 传递给子组件，让其能改变上线状态
  const changeGoodsStatus = (ids: string[] | string, status: 5 | 6) => {
    if (Array.isArray(ids)) {
      goodsList.forEach((goodsItem: GoodsInTable) => {
        if (ids.indexOf(goodsItem.goodsId) !== -1) {
          goodsItem.goodsStatus = status
          goodsItem.option = status
        }
      })
    } else {
      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].goodsId === ids) {
          goodsList[i].goodsStatus = status
          goodsList[i].option = status
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
          data={queryList.length > 0 || queryZero ? queryList : goodsList}
          tabId={1}
          changeGoodsStatus={changeGoodsStatus}
        ></GoodsTable>
      ),
    },
    {
      key: '2',
      label: '已上线',
      children: (
        <GoodsTable
          data={queryList.length > 0 || queryZero ? queryOnlineList : onlineList}
          tabId={2}
          changeGoodsStatus={changeGoodsStatus}
        ></GoodsTable>
      ),
    },
    {
      key: '3',
      label: '已下线',
      children: (
        <GoodsTable
          data={queryList.length > 0 || queryZero ? queryOfflineList : offlineList}
          tabId={3}
          changeGoodsStatus={changeGoodsStatus}
        ></GoodsTable>
      ),
    },
  ]

  // 初始化列表数据
  useEffect(() => {
    setGoodsList(data)
  }, [])

  // 每次总数据更改都需要进行online Or offline过滤
  useEffect(() => {
    if (goodsList.length > 0) {
      getOnlineList()
      getOfflineList()
    }
  }, [goodsList])

  // 过滤取得onlineList
  const getOnlineList = () => {
    const newOnlineList = goodsList.filter(
      (goodsItem: GoodsInTable) => goodsItem.goodsStatus === 5
    )
    setOnlineList([...newOnlineList])
  }

  // 过滤取得offlineList
  const getOfflineList = () => {
    const newOffLineList = goodsList.filter(
      (goodsItem: GoodsInTable) => goodsItem.goodsStatus === 6
    )
    setOfflineList([...newOffLineList])
  }
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
            <ReloadOutlined />
            <ColumnHeightOutlined />
          </div>
        </header>
        <main>
          <Tabs defaultActiveKey="1" items={items}></Tabs>
        </main>
      </div>
    </>
  )
}

export default GoodsMain
