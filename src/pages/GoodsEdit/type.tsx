import { UploadFile } from "antd"

export interface ExchangeWay {
  exchangeWayType: number
  cash: number
  score: number
}

// 初始定义的GoodsInfo
export interface GoodsInfo {
  goodsId?: number
  goodsName: string
  goodsAvatar: UploadFile<any>[]
  goodsDesc: string
  goodsDetail: string
  goodsStatus: number
  goodsType: number
  goodsCaId: string
  supplierName: string
  supplierPhone: string
  serviceGuarantee: string
  noCities: string[]
  exchangeWays: ExchangeWay[]
  exchangeLimit: number
  stock: number
  startDate: string
  endDate: string
  yesCities: string[]
}

// 城市在Tree里面的数据结构
export interface CitiesInTree {
  title: string
  key: string
  children?: CitiesInTree[]
}


//实际获取的城市列表数据结构
export interface AreaData {
  [key: string]: { [key: string]: string };
}