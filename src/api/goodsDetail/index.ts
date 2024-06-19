import request from '@/utils/request';
import { GoodsDetailResponse } from './type';
import { message } from 'antd';

export async function reqGoodsDetail(id: number) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/product/proDetail/${id}`
    );
    if (result.code === 200) {
        return result.data;
    }
    message.error(`${result.msg}（${result.code}）`);
}
