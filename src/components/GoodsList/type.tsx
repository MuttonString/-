import dayjs from 'dayjs'

export interface GoodsInTable {
  key: React.Key
  id: string
  proName: string
  startTime: string
  endTime: string
  proStatus: number
  adminName: string
  page: number
  pageSize: number
  option?: number
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
