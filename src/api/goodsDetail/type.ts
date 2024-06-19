export const GOODS_TYPE = ['实物', '券', '虚拟商品'];

export const GOODS_STATUS = [
    '草稿',
    '待提交审核',
    '待审核',
    '审核通过',
    '审核不通过',
    '上线',
    '下线'
];

export const BOUGHT_TYPE = ['现金', '积分 + 现金', '积分'];

interface Resopnse {
    code: number;
    data: object;
    msg: string;
}

export interface GoodsDetail {
    goodsName: string; // 商品名称
    imgUrl?: string; // 商品图片url
    goodsDesc: string; // 商品描述
    goodsType: number; // 商品类型
    goodsDetail: string; // 商品详情
    categoryId: number; // 商品分类id
    categoryName: string; // 商品分类名
    goodsFactory: string; // 供应商名称
    goodsPhone: string; // 供应商联系方式
    goodsPromise: string; // 服务保障
    goodsLimit: number; // 兑换上限
    goodsStock: number; // 库存
    goodsOnline: string; // 上线时间字符串
    goodsOffline: string; // 下线时间字符串
    goodsStatus: number; // 商品状态
    userId: number; // 该商品创建者的用户id
    userName: string; // 该商品创建者的用户名
    noShipping?: Place[]; // 不发货地区
    shipping?: Place[]; // 投放地区
    boughtTypes: BoughtType[];
}

export interface Place {
    id: number; // 地区id
    name: string; // 地区名
}

export interface BoughtType {
    boughtType: number; //购买方式
    score?: number; //所需积分
    cash?: number; //所需现金
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
