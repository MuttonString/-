import request from './request';
import { LoginResponse } from './type';

async function relogin() {
    localStorage.removeItem('refreshToken');
    const resp = await request.post<string, LoginResponse>(
        '/user/refreshToken',
        {
            refreshToken: localStorage.getItem('refreshToken')
        }
    );
    if (resp.code === 200) {
        localStorage.setItem('token', resp.data.token);
        return Promise.resolve();
    }
    return Promise.reject({ code: resp.code, msg: resp.msg });
}

export default relogin;
