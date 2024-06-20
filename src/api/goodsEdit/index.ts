import request from "@/utils/request"
import { AllCategoryResponse, AppendGoods } from "./type"
import { ResponseObject } from "@/utils/type"
import { message } from "antd"

enum API {
  GET_ALL_CATEGORY='/category/getAll',
  APPEND_GOODS='/product/insertPro'
}

export const requestAllCategory= async () => {
  const result = await request.get<unknown, AllCategoryResponse>(API.GET_ALL_CATEGORY)
  if (result.code == 200) {
    return result.data
  }
  message.error(`${result.msg}(${result.code})`)
}
export const requestAddGoods = async (goodsInfo: AppendGoods) => {
  const result = await request.post<unknown, ResponseObject>(API.APPEND_GOODS, goodsInfo)
  if (result.code == 200) {
    return "新增成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

