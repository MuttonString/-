export interface ExMethodData {
  count: number;
  paymentType: string;
}

export interface ResponseTypE {
  code: number;
  data: ExMethodData[];
  msg: string;
}

export interface resultType {
  name: string;
  value: number;
}
