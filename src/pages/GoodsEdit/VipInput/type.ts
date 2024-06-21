export interface VipInputType {
  id?: string,
  typeNum: 'CASH' | 'INTEGRAL' | 'INTEGRAL_AND_CASH',
  score: string,
  cash: number,
  isAble?: boolean
  isInitial?: boolean
}

export type VipInputTypes = VipInputType[]
