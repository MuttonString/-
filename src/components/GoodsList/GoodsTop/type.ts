import { GoodsQueryItem } from "../type"

export interface TopProps {
  changeQueryList: Function
  queryItem: GoodsQueryItem //收集查询项
  setQueryItem: Function
  statusIsAble: boolean
}