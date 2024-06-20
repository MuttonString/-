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
  const [pagiNationInfo, setPagiNationInfo] = useState<PageInfo>({
    // 分页信息
    page: 1,
    pageSize: 20
  })
  const [queryZero, setQueryZero] = useState<boolean>(false)
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
      //Todo 请求默认数据
      return
    }
    const values = Object.values(queryItem)
    if (values.length === 0 || values.every((value) => value === undefined)) {
      //Todo 请求默认数据
      errorQueryNull()
      return
    }
    const queryParams: QueryList = {}
    if (queryItem.goodsId) {
      queryParams.id = queryItem.goodsId
    }
    if (queryItem.admin) {
      queryParams.adminName = queryItem.admin
    }
    if (queryItem.agent) {
      queryParams.proxyName = queryItem.agent
    }
    if (queryItem.goodsName) {
      queryParams.proName = queryItem.goodsName
    }
    if (queryItem.goodsStatus) {
      queryParams.proStatus = queryItem.goodsStatus
    }
    if (queryItem.startDate) {
      queryParams.startTime = queryItem.startDate.toISOString()
    }
    if (queryItem.endDate) {
      queryParams.endTime = queryItem.endDate.toISOString()
    }
    queryParams.page = pagiNationInfo.page
    queryParams.pageSize = pagiNationInfo.pageSize
    // 请求携带queryParams参数的条件商品列表
  }
  return (
    <>
      {contextHolder}
      <div className={styles.main}>
        <GoodsTop
          changeQueryList={changeQueryList}
          setQueryZero={setQueryZero}
        ></GoodsTop>
        <GoodsMain
          goodsList={goodsList}
          setGoodsList={setGoodsList}
          queryZero={queryZero}
          pagiNationInfo={pagiNationInfo}
          setPagiNationInfo={setPagiNationInfo}
          total={total}
          setTotal={setTotal}
        ></GoodsMain>
      </div>
    </>
  )
}

export default GoodsList
