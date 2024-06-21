import request from '@/utils/request';
import {
    AuditRequest,
    GoodsDetailResponse,
    SelectableProxysResponse
} from './type';
import { message } from 'antd';
import { ResponseObject } from '@/utils/type';

export async function reqGoodsDetail(id: string) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/product/proDetail/${id}`
    );
    if (result.code === 200) {
        return result.data;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqAudit(req: AuditRequest) {
    const result = await request.post<unknown, ResponseObject, AuditRequest>(
        '/product/audit',
        req
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqAuditPass(req: AuditRequest) {
    const result = await request.post<unknown, ResponseObject, AuditRequest>(
        '/product/auditPass',
        req
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqAuditDown(req: AuditRequest) {
    const result = await request.post<unknown, ResponseObject, AuditRequest>(
        '/product/auditDown',
        req
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqGoodsOnline(id: string) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/product/up/${id}`
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqGoodsOffline(id: string) {
    const result = await request.get<unknown, GoodsDetailResponse>(
        `/product/down/${id}`
    );
    if (result.code === 200) {
        return;
    }
    message.error(`${result.msg}（${result.code}）`);
}

export async function reqSelectableProxys(id: string) {
    const result = await request.get<unknown, SelectableProxysResponse>(
        `/user/proxyOptional/${id}`
    );
    if (result.code === 200) {
        return result.data;
    }
    message.error(`${result.msg}（${result.code}）`);
}
