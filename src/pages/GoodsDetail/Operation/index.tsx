import { reqOperation } from '@/api/goodsDetail';
import { OperationRecord } from '@/api/goodsDetail/type';
import { Table } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const columns = [
    { title: 'ID', dataIndex: 'opId', key: 'opId' },
    { title: '状态', dataIndex: 'opStatus', key: 'opStatus' },
    { title: '操作时间', dataIndex: 'opTime', key: 'opTime' },
    { title: '操作人', dataIndex: 'userName', key: 'userName' },
    { title: '备注', dataIndex: 'opDesc', key: 'opDesc' }
];

const getOperation = async (
    id: string,
    setOperationRecords: React.Dispatch<
        React.SetStateAction<OperationRecord[] | undefined>
    >
) => {
    const operation = await reqOperation(id);
    setOperationRecords(operation);
};

const Operation: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/').pop();
    const [operationRecords, setOperationRecords] =
        useState<OperationRecord[]>();
    useEffect(() => {
        getOperation(id!, setOperationRecords);
    }, [id]);

    const dataSource = operationRecords?.map(item => ({
        key: item.id,
        opId: item.id,
        opStatus: item.operationTypeString,
        opTime: item.createTime,
        userName: item.userName,
        opDesc: item.remark
    }));

    return (
        <div>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </div>
    );
};

export default Operation;
