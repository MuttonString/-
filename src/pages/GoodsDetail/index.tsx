import {
    Button,
    Col,
    Divider,
    Drawer,
    Flex,
    Popconfirm,
    Row,
    Select,
    Tabs,
    TabsProps,
    Typography
} from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import type {
    AuditRequest,
    GoodsDetailData,
    Proxy
} from '@/api/goodsDetail/type';
import Base from './Base';
import Preview from './Preview';
import Operation from './Operation';
import { LeftOutlined } from '@ant-design/icons';
import {
    reqAudit,
    reqAuditDown,
    reqAuditPass,
    reqGoodsDetail,
    reqGoodsOffline,
    reqGoodsOnline,
    reqSelectableProxys
} from '@/api/goodsDetail';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

const getGoodsDetail = async (
    id: string,
    setGoods: React.Dispatch<React.SetStateAction<GoodsDetailData | undefined>>,
    setStatus: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
    const goods = await reqGoodsDetail(id);
    setGoods(goods);
    setStatus(goods?.proStatus);
};

const getSelectableProxys = async (
    id: string,
    setSelectableProxys: React.Dispatch<
        React.SetStateAction<Proxy[] | undefined>
    >,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
    setSelectableProxys(await reqSelectableProxys(id));
    setLoading(false);
};

const GoodsDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/').pop()!;
    const [auditOpen, setAuditOpen] = useState(false);
    const [goods, setGoods] = useState<GoodsDetailData>();
    const [remark, setRemark] = useState('');
    const [pass, setPass] = useState(true);
    const [status, setStatus] = useState(goods?.proStatus);
    const [transferOpen, setTransferOpen] = useState(false);
    const [proxyOpen, setProxyOpen] = useState(false);
    const [selectableProxys, setSelectableProxys] = useState<Proxy[]>();
    const [loading, setLoading] = useState(false);
    useState(() => getGoodsDetail(id, setGoods, setStatus));
    const items: TabsProps['items'] = [
        {
            key: 'base',
            label: '基本信息',
            children: <Base goods={goods} />
        },
        {
            key: 'pewview',
            label: '商品预览',
            children: <Preview goods={goods} />
        },
        {
            key: 'operation',
            label: '操作记录',
            children: <Operation />
        }
    ];

    return (
        <Row className={styles.main}>
            <Col sm={0} md={2} xxl={6} />
            <Col sm={24} md={20} xxl={12}>
                <Typography className={styles.typography}>
                    <Title level={2}>
                        <Button type='link' onClick={() => navigate(-1)}>
                            <LeftOutlined />
                            返回
                        </Button>
                        {goods?.proName}
                        <Flex wrap gap='small' className={styles.buttons}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    navigate('/edit/' + id);
                                }}
                            >
                                编辑
                            </Button>

                            {status === '待审核' && (
                                <Popconfirm
                                    title='发起审核'
                                    description='确定发起审核？'
                                    onConfirm={() => {
                                        reqAudit({ proId: id });
                                        getGoodsDetail(id, setGoods, setStatus);
                                    }}
                                    okText='确定'
                                    cancelText='取消'
                                >
                                    <Button type='primary'>发起审核</Button>
                                </Popconfirm>
                            )}

                            {/* // TODO: Super Admin */}
                            {status === '审核中' && (
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setAuditOpen(true);
                                        setPass(true);
                                        getGoodsDetail(id, setGoods, setStatus);
                                    }}
                                >
                                    审核通过
                                </Button>
                            )}

                            {/* // TODO: Super Admin */}
                            {status === '审核中' && (
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setAuditOpen(true);
                                        setPass(false);
                                        getGoodsDetail(id, setGoods, setStatus);
                                    }}
                                >
                                    审批驳回
                                </Button>
                            )}

                            {status === '待上线' && (
                                <Popconfirm
                                    title='上线'
                                    description='确定上线该商品？'
                                    onConfirm={() => {
                                        reqGoodsOnline(id);
                                        getGoodsDetail(id, setGoods, setStatus);
                                    }}
                                    okText='确定'
                                    cancelText='取消'
                                >
                                    <Button type='primary' danger>
                                        上线
                                    </Button>
                                </Popconfirm>
                            )}

                            {status === '运行中' && (
                                <Popconfirm
                                    title='下线'
                                    description='确定下线该商品？'
                                    onConfirm={() => {
                                        reqGoodsOffline(id);
                                        getGoodsDetail(id, setGoods, setStatus);
                                    }}
                                    okText='确定'
                                    cancelText='取消'
                                >
                                    <Button type='primary' danger>
                                        下线
                                    </Button>
                                </Popconfirm>
                            )}
                        </Flex>
                    </Title>
                    <Divider />
                    <Row>
                        <Col span={8}>
                            <Text strong>管理人：</Text>
                            <Text>{goods?.admin}</Text>
                            {/* // TODO: Self */}
                            {true && (
                                <Button
                                    type='link'
                                    onClick={() => {
                                        setTransferOpen(true);
                                        getSelectableProxys(
                                            id,
                                            setSelectableProxys,
                                            setLoading
                                        );
                                    }}
                                >
                                    转让
                                </Button>
                            )}
                        </Col>

                        <Col span={12}>
                            <Text strong>代理人：</Text>
                            <Text>
                                {goods?.proxys?.length
                                    ? goods.proxys.map(
                                          (item, idx, arr) =>
                                              item.userName +
                                              (idx === arr.length - 1
                                                  ? ''
                                                  : '、')
                                      )
                                    : '无'}
                            </Text>
                            {/* // TODO: Self */}
                            {true && (
                                <Button
                                    type='link'
                                    onClick={() => {
                                        setProxyOpen(true);
                                        getSelectableProxys(
                                            id,
                                            setSelectableProxys,
                                            setLoading
                                        );
                                    }}
                                >
                                    修改
                                </Button>
                            )}
                        </Col>

                        <Col span={3}>
                            <Text style={{ float: 'right' }}>状态</Text>
                        </Col>
                        <Col span={1} />
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Text strong>权益ID：</Text>
                            <Text>{id}</Text>
                        </Col>
                        <Col span={11}>
                            <Title level={4} style={{ float: 'right' }}>
                                {status}
                            </Title>
                        </Col>
                        <Col span={1} />
                    </Row>
                </Typography>

                <Tabs defaultActiveKey='base' items={items} />
            </Col>
            <Col sm={0} md={2} xxl={6} />

            <Drawer
                title='审批备注'
                width={300}
                open={auditOpen}
                onClose={() => setAuditOpen(false)}
                extra={
                    <Button
                        type='primary'
                        onClick={() => {
                            const obj: AuditRequest = {
                                proId: id,
                                desc: remark
                            };
                            if (pass) reqAuditPass(obj);
                            else reqAuditDown(obj);
                            setRemark('');
                            setAuditOpen(false);
                        }}
                    >
                        提交
                    </Button>
                }
            >
                <TextArea
                    onChange={item => setRemark(item.target.value)}
                    value={remark}
                />
            </Drawer>

            <Drawer
                title='转让管理人'
                width={300}
                open={transferOpen}
                onClose={() => setTransferOpen(false)}
                extra={
                    <Button type='primary' onClick={() => {}}>
                        提交
                    </Button>
                }
            >
                <Select
                    loading={loading}
                    options={selectableProxys?.map(item => ({
                        value: item.id,
                        label: item.userName
                    }))}
                    style={{ width: '100%' }}
                />
            </Drawer>

            <Drawer
                title='修改代理人'
                width={300}
                open={proxyOpen}
                onClose={() => setProxyOpen(false)}
                extra={
                    <Button type='primary' onClick={() => {}}>
                        提交
                    </Button>
                }
            >
                <Select
                    loading={loading}
                    options={selectableProxys?.map(item => ({
                        value: item.id,
                        label: item.userName
                    }))}
                    style={{ width: '100%' }}
                />
            </Drawer>
        </Row>
    );
};

export default GoodsDetail;
