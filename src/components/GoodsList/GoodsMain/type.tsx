import { GoodsInTable } from "../type"
import type { PageInfo } from "./GoodsTable/type"
export interface MainProps {
  goodsList: GoodsInTable[]
  setGoodsList: Function
  queryZero: boolean
  pagiNationInfo: PageInfo
  setPagiNationInfo: Function
}