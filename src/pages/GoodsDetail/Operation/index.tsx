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
    const id = parseInt(location.pathname.split('/').pop() as string);

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
    async function test() {
        const res = await request.post('/product/list', {
            page: 1,
            pageSize: 10
        });
        console.log(res);
    }
    test();

    return (
        <div>
            <Table
                columns={columns}
                dataSource={operationsData}
                pagination={false}
            />
        </div>
    );
};

export default Operation;
