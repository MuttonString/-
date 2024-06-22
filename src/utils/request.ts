import { message } from 'antd';
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { LoginResponse, ResponseObject } from './type';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
});

request.interceptors.request.use(config => {
    config.headers.token = localStorage.getItem('token');
    config.headers.refreshToken = localStorage.getItem('refreshToken');
    return config;
});

request.interceptors.response.use(
    async (response: AxiosResponse) => {
        if ((response.data as ResponseObject).code === 207  || (response.data as ResponseObject).code === 202) {
            localStorage.removeItem('token');
            const resp = await request.post<string, LoginResponse>(
                '/user/refreshToken',
                null,
                {
                    headers: {
                        refreshToken: localStorage.getItem('refreshToken')
                    }
                }
            );
            if (resp.code === 200) {
                localStorage.setItem('token', resp.data.token);
                return Promise.resolve(request.request(response.config));
            } else {
                message.error(
                    `登录已过期，3秒后跳转到登录页。错误信息：${resp.msg}（${resp.code}）`
                );
                setTimeout(() => (location.href = '/login'), 3000);
            }
        }
        return Promise.resolve(response.data);
    },
    async (error: AxiosError) => {
        const status: number = (error.response || error.request).status;
        message.error(error.message);
        return Promise.reject(status);
    }
);

export default request;
