import { GoodsInTable } from "../type"
import type { QueryList } from '@/api/goodsList/type'
import type { PageInfo } from "./GoodsTable/type"
export interface MainProps {
  goodsList: GoodsInTable[]
  setGoodsList: Function
  pagiNationInfo: PageInfo
  setPagiNationInfo: Function
  total: number
  setTotal: Function
  queryParams: QueryList
  setQueryParams: Function
  setQueryItem: Function
}