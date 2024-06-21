import React, { useState } from 'react'
import { message } from 'antd'
import GoodsTop from './GoodsTop'
import GoodsMain from './GoodsMain'
import styles from './index.module.less'
import type { GoodsInTable, GoodsQueryItem } from './type'
import type { QueryList } from '@/api/goodsList/type'
import type { PageInfo } from './GoodsMain/GoodsTable/type'

const GoodsList: React.FC = () => {
  const [goodsList, setGoodsList] = useState<GoodsInTable[]>([]) // 商品总列表
  const [queryItem, setQueryItem] = useState<GoodsQueryItem>({}) //收集查询项
  const [pagiNationInfo, setPagiNationInfo] = useState<PageInfo>({
    // 分页信息
    page: 1,
    pageSize: 20
  })
  const [queryParams, setQueryParams] = useState<QueryList>({})
  const [total, setTotal] = useState<number>(0) 

  const [messageApi, contextHolder] = message.useMessage() //message消息提示导入

  const errorQueryNull = () => {
    messageApi.open({
      type: 'error',
      content: '查询条件都为空！',
    })
  }
  //传递给Top,收集查询项并查询渲染
  const changeQueryList = (queryItem: GoodsQueryItem, reset = false) => {
    if (reset) {
      setQueryParams({})
      return
    }
    const values = Object.values(queryItem)
    if (values.length === 0 || values.every((value) => value === undefined)) {
      //Todo 请求默认数据
      setQueryParams({})
      errorQueryNull()
      return
    }
    if (queryItem.goodsId) {
      queryParams.id = queryItem.goodsId
    } else {
      queryParams.id = undefined
    }
    if (queryItem.admin) {
      queryParams.adminName = queryItem.admin
    } else {
      queryParams.adminName = undefined
     }
    if (queryItem.agent) {
      queryParams.proxyName = queryParams.proxyName
    } else {
      queryParams.proxyName = undefined
    }
    if (queryItem.goodsName) {
      queryParams.proName = queryItem.goodsName
    } else {
      queryParams.proName = undefined
    }
    if (Number(queryItem.goodsStatus) >= 0) {
      queryParams.proStatus = queryItem.goodsStatus
    } else {
      queryParams.proStatus = undefined
    }
    if (queryItem.startDate) {
      queryParams.startTime = queryItem.startDate.format('YYYY-MM-DDTHH:mm:ss.SSS')
    } else {
      queryParams.startTime = undefined
    }
    if (queryItem.endDate) {
      queryParams.endTime = queryItem.endDate.format('YYYY-MM-DDTHH:mm:ss.SSS')
    } else {
      queryParams.endTime = undefined
    }
    setQueryParams({...queryParams})
  }
  return (
    <>
      {contextHolder}
      <div className={styles.main}>
        <GoodsTop
          changeQueryList={changeQueryList}
          queryItem={queryItem}
          setQueryItem={setQueryItem}
        ></GoodsTop>
        <GoodsMain
          goodsList={goodsList}
          setGoodsList={setGoodsList}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
          total={total}
          setTotal={setTotal}
          queryParams={queryParams}
          setQueryParams={setQueryParams}
          setQueryItem={setQueryItem}
        ></GoodsMain>
      </div>
    </>
  )
}

export default GoodsList
