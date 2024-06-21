import dayjs from 'dayjs';

export interface Props {
    dates: [dayjs.Dayjs | null, dayjs.Dayjs | null];
}

export interface ExchangeData {
    date: string;
    count: string;
}

export interface ResponseTypE {
    code: number;
    data: ExchangeData[];
    msg: string;
}