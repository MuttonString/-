import { UploadFile } from "antd"

export interface ExchangeWay {
  exchangeWayType: number
  cash: number
  score: number
}

export interface GoodsInfo {
  goodsId?: number
  goodsName: string
  goodsAvatar: UploadFile<any>[]
  goodsDesc: string
  goodsDetail: string
  goodsStatus: number
  goodsType: number
  goodsCaId: number
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