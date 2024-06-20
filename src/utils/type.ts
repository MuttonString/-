export interface ResponseObject {
    code: number;
    data: object;
    msg: string;
}

export interface LoginResponse extends ResponseObject {
    data: {
        token: string;
        refreshToken: string;
    }
}