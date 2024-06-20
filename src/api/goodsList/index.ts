import { message } from "antd"
import { QueryList, QueryResponse } from "./type"
import request from "@/utils/request"

enum API {
  GET_QUERY_LIST = "/product/list"
}

export const requestQueryList = async (queryItem: QueryList) => {
  const result = await request.post<unknown, QueryResponse>(API.GET_QUERY_LIST, queryItem)
  if (result.code == 200) {
    return result.data
  }
  message.error(`${result.msg}(${result.code})`)
}