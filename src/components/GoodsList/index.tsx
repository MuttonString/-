import React, { useState, useEffect } from 'react'
import { message } from 'antd'
import GoodsTop from './GoodsTop'
import GoodsMain from './GoodsMain'
import styles from './index.module.less'
import type { GoodsInTable, GoodsQueryItem } from './type'

const GoodsList: React.FC = () => {
  const [goodsList, setGoodsList] = useState<GoodsInTable[]>([]) // 商品总列表
  const [queryList, setQueryList] = useState<GoodsInTable[]>([]) // 查询过滤列表
  const [queryOnlineList, setQueryOnlineList] = useState<GoodsInTable[]>([])
  const [queryOfflineList, setQueryOfflineList] = useState<GoodsInTable[]>([])
  const [queryZero, setQueryZero] = useState<boolean>(false)

  const [messageApi, contextHolder] = message.useMessage() //message消息提示导入

  const errorQueryNull = () => {
    messageApi.open({
      type: 'error',
      content: '查询条件都为空！',
    })
  }

  //传递给Top部分，提供查询的渲染List
  const changeQueryList = (queryItem: GoodsQueryItem, reset = false) => {
    if (reset) {
      setQueryList([])
      return
    }
    const values = Object.values(queryItem)
    if (values.length === 0 || values.every((value) => value === undefined)) {
      errorQueryNull()
      setQueryList([])
      return
    }
    const newQueryList: GoodsInTable[] = goodsList.filter(
      (goodsItem: GoodsInTable) => {
        return (
          (queryItem.goodsName === undefined ||
            queryItem.goodsName === goodsItem.goodsName) &&
          (queryItem.goodsStatus === undefined ||
            queryItem.goodsStatus === goodsItem.goodsStatus) &&
          (queryItem.startDate === undefined ||
            queryItem.startDate === goodsItem.startDate) &&
          (queryItem.endDate === undefined ||
            queryItem.endDate === goodsItem.endDate) &&
          (queryItem.goodsId === undefined ||
            queryItem.goodsId === goodsItem.goodsId) &&
          (queryItem.admin === undefined ||
            queryItem.admin === goodsItem.admin) &&
          (queryItem.agent === undefined ||
            goodsItem.agents?.includes(queryItem.agent))
        )
      }
    )
    if(newQueryList.length === 0) setQueryZero(true)
    else setQueryZero(false)
    setQueryList([...newQueryList])
  }

  // 每次查询总数据更改都需要进行online Or offline过滤
  useEffect(() => {
    if (queryList.length > 0) {
      getQueryOnlineList()
      getQueryOfflineList()
    }
  }, [queryList])

  // 过滤取得queryOnlineList
  const getQueryOnlineList = () => {
    const newQueryOnlineList = queryList.filter(
      (goodsItem: GoodsInTable) => goodsItem.goodsStatus === 5
    )
    setQueryOnlineList([...newQueryOnlineList])
  }

  // 过滤取得queryOfflineList
  const getQueryOfflineList = () => {
    const newQueryOffLineList = queryList.filter(
      (goodsItem: GoodsInTable) => goodsItem.goodsStatus === 6
    )
    setQueryOfflineList([...newQueryOffLineList])
  }
  return (
    <>
      {contextHolder}
      <div className={styles.main}>
        <GoodsTop changeQueryList={changeQueryList} setQueryZero={setQueryZero}></GoodsTop>
        <GoodsMain
          goodsList={goodsList}
          setGoodsList={setGoodsList}
          queryList={queryList}
          queryOnlineList={queryOnlineList}
          queryOfflineList={queryOfflineList}
          queryZero={queryZero}
        ></GoodsMain>
      </div>
    </>
  )
}

export default GoodsList
