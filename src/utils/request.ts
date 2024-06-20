import { message } from 'antd';
import axios from 'axios';
import type { AxiosResponse, AxiosError } from 'axios';
import { LoginResponse, ResponseObject } from './type';

const request = axios.create({
    timeout: 5000
});

request.interceptors.request.use(config => {
    config.headers.token = localStorage.getItem('token');
    config.headers.refreshToken = localStorage.getItem('refreshToken');
    return config;
});

request.interceptors.response.use(
    async (response: AxiosResponse) => {
        if ((response.data as ResponseObject).code === 207) {
            localStorage.removeItem('token');
            const resp = await request.post<string, LoginResponse>(
                '/api/user/refreshToken',
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
