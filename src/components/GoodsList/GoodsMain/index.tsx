import React from 'react'
import { Button, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { ReloadOutlined, ColumnHeightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import GoodsTable from './GoodsTable'
import type { GoodsInTable } from '../type'
import type { MainProps } from './type'
import styles from './index.module.less'

const GoodsMain: React.FC<MainProps> = ({goodsList, setGoodsList, pagiNationInfo, setPagiNationInfo}) => {
  const navigate = useNavigate()
  // 传递给子组件，让其能改变上线状态
  const changeGoodsStatus = (ids: number[] | number, status: 5 | 6) => {
    if (Array.isArray(ids)) {
      goodsList.forEach((goodsItem: GoodsInTable) => {
        if (ids.indexOf(goodsItem.id) !== -1) {
          goodsItem.proStatus = status
          goodsItem.option = status
        }
      })
    } else {
      for (let i = 0; i < goodsList.length; i++) {
        if (goodsList[i].id === ids) {
          goodsList[i].proStatus = status
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
          tabId={1}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
        ></GoodsTable>
      ),
    },
    {
      key: '2',
      label: '已上线',
      children: (
        <GoodsTable
          tabId={2}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
        ></GoodsTable>
      ),
    },
    {
      key: '3',
      label: '已下线',
      children: (
        <GoodsTable
          tabId={3}
          changeGoodsStatus={changeGoodsStatus}
          setGoodsList={setGoodsList}
          goodsList={goodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
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
