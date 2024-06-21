import type { ResponseObject } from "@/utils/type"

// 单个兑换方式规则
export interface SingleProRule {
  priceType: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH'
  cash: number
  integral: string
}

// 添加商品
export interface AppendGoods {
  id?: string 
  categoryId: string
  exchangeCap: number
  guarantee: string
  nonShippingRegion: string
  poster: string
  proDesc: string
  proName: string
  proRules: SingleProRule[]
  proType: string
  startTime: string
  endTime: string
  shippingRegion: string
  supplierName: string
  supplierPhone: string
  stock: number
  // detail: string
}

// 添加草稿
export interface AppendDraft {
  id?: string 
  categoryId?: string
  exchangeCap?: number
  guarantee?: string
  nonShippingRegion?: string
  poster?: string
  proDesc?: string
  proName?: string
  proRules?: SingleProRule[]
  proType?: string
  startTime?: string
  endTime?: string
  shippingRegion?: string
  supplierName?: string
  supplierPhone?: string
  stock?: number
  // detail: string
}

/* // 修改商品
export interface ModifyGoods {
  categoryId: string
  exchangeCap: number
  guarantee: string
  nonShippingRegion: string
  poster: string
  proDesc: string
  proName: string
  proRules: SingleProRule[]
  proType: string
  startTime: string
  endTime: string
  shippingRegion: string
  supplierName: string
  supplierPhone: string
} */

// 修改草稿
export interface ModifyDraft {
  categoryId?: number
  exchangeCap?: number
  guarantee?: string
  nonShippingRegion?: string
  poster?: string
  proDesc?: string
  proName?: string
  proRules?: SingleProRule[]
  proType?: string
  startTime?: string
  endTime?: string
  shippingRegion?: string
  supplierName?: string
  supplierPhone?: string
}

// 商品详情
export interface QuerySingleGoods {
  id: string
}

// 草稿详情
export interface QuerySingleDraft {
  id: string
}

// 获取所有商品分类
export interface SingleCategory {
  categoryList: SingleCategory[] | null
  id: string
  name: string,
  pid: string
}
export interface AllCategoryResponse extends ResponseObject {
  data: SingleCategory[]
}
