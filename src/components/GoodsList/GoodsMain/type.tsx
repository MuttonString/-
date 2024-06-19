import { GoodsInTable } from "../type"
export interface MainProps {
  goodsList: GoodsInTable[]
  setGoodsList: Function
  queryList: GoodsInTable[]
  queryOnlineList: GoodsInTable[]
  queryOfflineList: GoodsInTable[]
  queryZero: boolean
}