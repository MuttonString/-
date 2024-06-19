export interface VipInputType {
  id?: string,
  typeNum: number,
  score: number,
  cash: number,
  isAble?: boolean
  isInitial?: boolean
}

export type VipInputTypes = VipInputType[]
