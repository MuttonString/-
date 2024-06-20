import request from '@/utils/request';
import { AuditRequest, GoodsDetailResponse } from './type';
import { message } from 'antd';
import { ResponseObject } from '@/utils/type';

export async function reqGoodsDetail(id: number) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/api/product/proDetail/${id}`
    );
    if (result.code === 200) {
        return result.data;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqAuditPass(req: AuditRequest) {
    const result = await request.post<unknown, ResponseObject, AuditRequest>(
        '/api/product/auditPass',
        req
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqAuditDown(req: AuditRequest) {
    const result = await request.post<unknown, ResponseObject, AuditRequest>(
        '/api/product/auditDown',
        req
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqGoodsOnline(id: number) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/api/product/up/${id}`
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqGoodsOffline(id: number) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/api/product/down/${id}`
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}
