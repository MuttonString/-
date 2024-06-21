import { GoodsInTable } from "../../type"
import type { QueryList } from "@/api/goodsList/type"

export interface GoodsTableData {
  tabId: number
  tabStatus: number
  changeGoodsStatus: Function
  setGoodsList: Function
  goodsList: GoodsInTable[]
  pagiNationInfo: PageInfo
  setPagiNationInfo: Function
  total: number
  setTotal: Function
  queryParams: QueryList
  setQueryParams: Function
}

export interface PageInfo {
  page: number,
  pageSize: number
}
