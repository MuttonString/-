import { GoodsInTable } from "../../type"

export interface GoodsTableData {
  // data: GoodsInTable[]
  tabId: string
  changeGoodsStatus: Function
  setGoodsList: Function
  goodsList: GoodsInTable[]
  pagiNationInfo: PageInfo
  setPagiNationInfo: Function
}

export interface PageInfo {
  page: number,
  pageSize: number,
  total: number
}
