import request from "@/utils/request"
import { AllCategoryResponse, AppendDraft, AppendGoods } from "./type"
import { ResponseObject } from "@/utils/type"
import { message } from "antd"

enum API {
  GET_ALL_CATEGORY='/category/getAll',
  APPEND_GOODS='/product/insertPro',
  MODIFY_GOODS='/product/updatePro',
  Append_DRAFT='/product/insertDraft',
  MODIFY_DRAFT='/product/updateDraft'
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

export const requestUpdateGoods = async (goodsInfo: AppendGoods) => {
  const result = await request.post<unknown, ResponseObject>(API.MODIFY_GOODS, goodsInfo)
  if (result.code == 200) {
    return "修改成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestAppendDraft = async (goodInfo: AppendDraft) => {
  const result = await request.post<unknown, ResponseObject>(API.Append_DRAFT, goodInfo)
  if (result.code == 200) {
    return "新增成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestModifyDraft = async (goodInfo: AppendDraft) => {
  const result = await request.post<unknown, ResponseObject>(API.MODIFY_DRAFT)
  if (result.code == 200) {
    return "修改成功"
  }
  message.error(`${result.msg}(${result.code})`)
}