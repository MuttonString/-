import { GoodsInTable } from "../../type"

export interface GoodsTableData {
  // data: GoodsInTable[]
  tabId: number
  changeGoodsStatus: Function
  setGoodsList: Function
  goodsList: GoodsInTable[]
  pagiNationInfo: PageInfo
  setPagiNationInfo: Function
  total: number
  setTotal: Function
}

export interface PageInfo {
  page: number,
  pageSize: number
}
