import { ResponseObject } from "@/utils/type"

// 查询商品列表类
export interface QueryList {
  id?: string
  adminName?: string
  page?: number
  pageSize?: number
  proName?: string
  proStatus?: number
  proxyName?: string
  startTime?: string
  endTime?: string
}

// 查询返回商品列表
export interface QueryRes {
  id: string,
  admin: string,
  proName: string,
  proStatus: string,
  stock: number | null,
  startTime: string,
  endTime: string
}

export interface QueryResult {
  records: QueryList[]
    total: number
}

export interface QueryResponse extends ResponseObject {
  data: QueryResult
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

