// 查询商品列表类
export interface QueryList {
  id?: number
  adminName?: string
  page?: number
  pageSize?: number
  proName?: string
  proStatus?: number
  proxyName?: string
  startTime?: string
  endTime?: string
}

// 上下线单个商品
export interface OnlineSingleGoods {
  id: string
}

export interface OfflineSingleGoods {
  id: string
}

// 批量上下线单个商品
export interface OnlineBatchGoods {
  ids: number[]
}

export interface OfflineBatchGoods {
  ids: number[]
}

