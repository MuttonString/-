import dayjs from 'dayjs'

export interface GoodsInTable {
  key: React.Key
  goodsId: string
  goodsName: string
  goodsStock: number
  startDate: string
  endDate: string
  goodsStatus: number
  admin: string
  option: number
  agents?: string[]
}

export interface GoodsQueryItem {
  goodsId?: string
  goodsName?: string
  startDate?: dayjs.Dayjs
  endDate?: dayjs.Dayjs
  goodsStatus?: number
  admin?: string
  agent?: string
}
