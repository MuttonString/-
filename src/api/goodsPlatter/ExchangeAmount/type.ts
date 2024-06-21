export interface ExchangeData {
  date: string;
  count: string;
}

export interface ResponseTypE {
  code: number;
  data: ExchangeData[];
  msg: string;
}
