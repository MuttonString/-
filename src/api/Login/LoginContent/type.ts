export interface LoginFormValues {
  phone: string;
  password: string;
  remember: boolean;
}

export interface LoginContentProps {
  changeState: (stateValue: number) => void;
}

export interface ApiResponse {
  code: number;
  msg: string;
  data: string;
}

export interface ForgetPwdFormValues {
  phone: string;
  password: string;
  verificationCodeForgetPassword: string;
}

export interface ApiType {
  code: number;
  msg: string;
  data: string;
}

export interface ApiResponsE {
  code: number;
  msg: string;
  data: {
    refreshToken: string;
    token: string;
    roleList: roleListType
    username: string;
  };
}

export interface roleListType {
  id: number;
  roleName: string;
}