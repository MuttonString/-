// 单个兑换方式规则
export interface SingleProRule {
  priceType: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH'
  cash: number
  integral: string
}

// 添加商品
export interface AppendGoods {
  categoryId: number
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
  shippingRegin: string
  supplierName: string
  supplierPhone: string
  stock: number
}

// 添加草稿
export interface AppendDraft {
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
  shippingRegin?: string
  supplierName?: string
  supplierPhone?: string
}

// 修改商品
export interface ModifyGoods {
  categoryId: number
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
  shippingRegin: string
  supplierName: string
  supplierPhone: string
}

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
  shippingRegin?: string
  supplierName?: string
  supplierPhone?: string
}

// 商品详情
export interface QuerySingleGoods {
  id: number
}

// 草稿详情
export interface QuerySingleDraft {
  id: number
}
