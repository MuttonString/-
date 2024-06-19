import { GoodsInTable } from "../../type"

export interface GoodsTableData {
  data: GoodsInTable[]
  tabId: number
  changeGoodsStatus: Function
}