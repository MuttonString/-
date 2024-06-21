import { ResponseObject } from '@/utils/type';

export enum PRICE_TYPE {
    CASH = '现金',
    INTEGRAL = '积分',
    INTEGRAL_AND_CASH = '积分 + 现金'
}

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
    proStatus:
        | '待审核'
        | '待上线'
        | '运行中'
        | '已下线'
        | '审核驳回'
        | '审核中'
        | '草稿';
    admin: {
        userId: string;
        userName: string;
    }
}
export interface Proxy {
    userId: string;
    userName: string;
}

export interface ProRule {
    cash: number;
    id: string;
    integral: string;
    priceType: "CASH" | "INTEGRAL" | "INTEGRAL_AND_CASH";
    proId: 0;
}

export interface AuditRequest {
    desc?: string;
    proId: string;
}

export interface OperationResponse extends ResponseObject {
    data: OperationData;
}
export interface OperationData {
    current: number;
    hitCount: true;
    pages: number;
    records: OperationRecord[];
    searchCount: boolean;
    size: number;
    total: number;
}
export interface OperationRecord {
    createTime: string;
    id: string;
    operationEnum:
        | 'APPROVAL_REJECTION'
        | 'APPROVED'
        | 'GO_LIVE'
        | 'INITIATE_APPROVAL'
        | 'NEW_PRODUCTS_ADDED'
        | 'OFFLINE';
    operationTypeString: string;
    proId: string;
    remark: string;
    userId: string;
    userName: string;
}

export interface SelectableProxysResponse extends ResponseObject {
    data: Proxy[];
}
