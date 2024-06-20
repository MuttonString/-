import { ResponseObject } from '@/utils/type';

export enum PRICE_TYPE {
    CASH = '现金',
    INTEGRAL = '积分',
    INTEGRAL_AND_CASH = '积分 + 现金'
}

export const PRO_STATUS = [
    '待提交审核',
    '待上线',
    '上线',
    '下线',
    '审核驳回',
    '待审核',
    '草稿'
];

export interface GoodsDetailResponse extends ResponseObject {
    data: GoodsDetailData;
}

export interface GoodsDetailData {
    categoryId: string;
    endTime: string;
    exchageCap: number;
    guarantee: string;
    id: number;
    nonShippingRegion: string;
    poster: string;
    proDesc: string;
    proName: string;
    proRules: ProRule[];
    proType: string;
    proxys: Proxy[];
    shippingRegin: string;
    startTime: string;
    supplierName: string;
    supplierPhone: string;
}

export interface Proxy {
    id: number;
    userName: string;
}

export interface ProRule {
    cash: number;
    id: number;
    integral: number;
    priceType: string;
    proId: 0;
}

// 操作记录响应数据
export interface OperationResponse {
    opId: number; // 操作id
    opStatus: number; // 操作状态
    opTime: string; // 操作时间字符串
    userName: string; // 操作人名字
    opDesc?: string; // 操作备注
}

// 操作记录请求数据
export interface OperationRequest {
    goodsId: number; // 商品id
    opStatus: number; // 操作状态
    opTime: string; // 操作时间字符串
    userId: number; // 操作人id
    opDesc?: string; // 操作备注
}
