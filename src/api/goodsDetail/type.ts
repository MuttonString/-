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
    id: string;
    nonShippingRegion: string;
    poster: string;
    proDesc: string;
    proName: string;
    proRules: ProRule[];
    proType: string;
    proxys: Proxy[];
    shippingRegion: string;
    startTime: string;
    supplierName: string;
    supplierPhone: string;
    stock: number;
    categoryName: string;
    proStatus: string;
    admin: string;
}

export interface OperationResponse extends ResponseObject {
    data: OperationData;
}

export interface OperationData {
    countId: string;
    current: number;
    hitCount: boolean;
    maxLimit: number;
    optimizeCountSql: boolean;
    orders: {
        asc: boolean;
        column: string;
    }[];
    pages: number;
    records: Operation[];
    searchCount: boolean;
    size: number;
    total: number;
}

export interface Operation {
    id: string;
    remark: string;
    createTime: string;
    userId: string;
    proId: string;
    operationEnum: string;
    operationTypeString: string;
}

export interface Proxy {
    id: string;
    userName: string;
}

export interface ProRule {
    cash: number;
    id: string;
    integral: number;
    priceType: string;
    proId: 0;
}

export interface AuditRequest {
    desc?: string;
    proId: string;
}

// 操作记录响应数据
export interface OperationResponse {
    opId: string; // 操作id
    opStatus: number; // 操作状态
    opTime: string; // 操作时间字符串
    userName: string; // 操作人名字
    opDesc?: string; // 操作备注
}

// 操作记录请求数据
export interface OperationRequest {
    goodsId: string; // 商品id
    opStatus: number; // 操作状态
    opTime: string; // 操作时间字符串
    userId: string; // 操作人id
    opDesc?: string; // 操作备注
}
