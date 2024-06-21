export interface SalesData {
  count: string;
  categoryName: string;
}

export interface responseTypE {
  code: number;
  data: SalesData[];
  msg: string;
}
