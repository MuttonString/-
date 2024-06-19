import { message } from 'antd';
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
});

request.interceptors.request.use(config => {
    // 将用户token放到header中
    // config.headers.token = localStorage.getItem('token');
    return config;
});

request.interceptors.response.use(
    (response: AxiosResponse) => {
        return response.data;
    },
    (error: AxiosError) => {
        const status: number = (error.response || error.request).status;
        let msg;
        switch (status) {
            case 401:
                msg = 'TOKEN过期';
                break;
            case 403:
                msg = '无权访问';
                break;
            case 404:
                msg = '请求地址错误';
                break;
            case 500:
                msg = '服务器出现问题';
                break;
            default:
                msg = '网络异常，连接超时';
                break;
        }
        message.error(`${msg}（${status}）`);
        return Promise.reject(msg);
    }
);

export default request;
