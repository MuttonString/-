import { message } from "antd"
import type { QueryList, QueryResponse } from "./type"
import type { ResponseObject } from "@/utils/type"
import request from "@/utils/request"

enum API {
  GET_QUERY_LIST = "/product/list",
  GOODS_ONLINE = "/product/up/",
  GOODS_OFFLINE = "/product/down/",
  BATCH_GOODS_ONLINE = "/product/batchUp",
  BATCH_GOODS_OFFLINE = "/product/batchDown"
}

export const requestQueryList = async (queryItem: QueryList) => {
  const result = await request.post<unknown, QueryResponse>(API.GET_QUERY_LIST, queryItem)
  if (result.code == 200) {
    return result.data
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestGoodsOnline = async (id: string) => {
  const result = await request.get<unknown, ResponseObject>(API.GOODS_ONLINE + `${id}`)
  if (result.code == 200) {
    return "上线成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestGoodsOffline = async (id: string) => {
  const result = await request.get<unknown, ResponseObject>(API.GOODS_OFFLINE + `${id}`)
  if (result.code == 200) {
    return "已下线"
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestBatchGoodsOnline = async (ids: string[]) => {
  const result = await request.post<unknown, ResponseObject>(API.BATCH_GOODS_ONLINE, ids)
  if (result.code == 200) {
    return "批量上线成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

export const requestBatchGoodsOffline = async (ids: string[]) => {
  const result = await request.post<unknown, ResponseObject>(API.BATCH_GOODS_OFFLINE, ids)
  if (result.code == 200) {
    return "批量下线成功"
  }
  message.error(`${result.msg}(${result.code})`)
}

