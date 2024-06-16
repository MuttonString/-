import React from 'react'
import { Button, Tabs } from 'antd'
import type { TabsProps } from 'antd'
import { ReloadOutlined, ColumnHeightOutlined } from '@ant-design/icons'
import GoodsTable from './GoodsTable'
import styles from './index.module.less'

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '全部',
    children: <GoodsTable></GoodsTable>
  },
  {
    key: '2',
    label: '已上线'
  },
  {
    key: '3',
    label: '已下线'
  }
]

const GoodsMain: React.FC = () => {
  return (
    <>
      <div className={styles.main}>
        <header className={styles.header}>
          <div style={{fontWeight: '500', fontSize: '1.125rem'}}>商品列表</div>
          <div className={styles['header-right']}>
            <Button type='primary'>新建商品</Button>
            <ReloadOutlined />
            <ColumnHeightOutlined />
          </div>
        </header>
        <main>
          <Tabs
            defaultActiveKey='1'
            items={items}
          ></Tabs>
        </main>
      </div>
    </>
  )
}

export default GoodsMain
