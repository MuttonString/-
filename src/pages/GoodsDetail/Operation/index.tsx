import request from '@/utils/request';
import { Table } from 'antd';
import { useLocation } from 'react-router-dom';
// import { GOODS_STATUS } from '@/api/goodsDetail/type';

const columns = [
    { title: 'ID', dataIndex: 'opId', key: 'opId' },
    { title: '状态', dataIndex: 'opStatus', key: 'opStatus' },
    { title: '操作时间', dataIndex: 'opTime', key: 'opTime' },
    { title: '操作人', dataIndex: 'userName', key: 'userName' },
    { title: '备注', dataIndex: 'opDesc', key: 'opDesc' }
];

const Operation: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop();

    // TODO
    const operationsData = undefined;
    // const operationsData = operations.map(item => ({
    //     key: item.opId,
    //     opId: item.opId,
    //     opStatus: GOODS_STATUS[item.opStatus],
    //     opTime: item.opTime,
    //     userName: item.userName,
    //     opDesc: item.opDesc
    // }));
    async function test1() {
        const res = await request.post('/product/list', {
            page: 1,
            pageSize: 100
        });
        console.log(res);
    }
    test1();

    async function test2() {
        const res = await request.get('/operation/1/100');
        console.log(res);
    }
    test2();

    // async function test3() {
    //     const res = await request.get('/product/proDetail/01803710870644338689');
    //     console.log(res);
    // }
    // test3();

    return (
        <div>
            <Table
                columns={columns}
                dataSource={operationsData}
            />
        </div>
    );
};

export default Operation;
