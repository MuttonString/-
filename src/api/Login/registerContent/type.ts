export interface LoginContentProps {
  changeState: (stateValue: number) => void;
}

export interface RegisterFormValues {
  userName: string;
  phone: string;
  password: string;
  verificationCodeRegister: string;
}


export interface ApiResponse {
    code: number;
    msg: string;
    data: string;
}

export interface ApiType {
    code: number;
    msg: string;
    data: string;
}
