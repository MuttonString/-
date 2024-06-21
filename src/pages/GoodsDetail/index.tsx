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
import React, { useEffect, useState } from 'react';
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
import { DeleteOutlined, LeftOutlined, PlusOutlined } from '@ant-design/icons';
import {
    reqAddProxy,
    reqAudit,
    reqAuditDown,
    reqAuditPass,
    reqDelProxy,
    reqGoodsDetail,
    reqGoodsOffline,
    reqGoodsOnline,
    reqSelectableProxys,
    reqTransfer
} from '@/api/goodsDetail';
import TextArea from 'antd/es/input/TextArea';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

const getGoodsDetail = async (
    id: string,
    setGoods: React.Dispatch<React.SetStateAction<GoodsDetailData | undefined>>
) => {
    const goods = await reqGoodsDetail(id);
    setGoods(goods);
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
    const [transferOpen, setTransferOpen] = useState(false);
    const [proxyOpen, setProxyOpen] = useState(false);
    const [selectableProxys, setSelectableProxys] = useState<Proxy[]>();
    const [loading, setLoading] = useState(false);
    const [transferId, setTransferId] = useState('');
    const [proxyId, setProxyId] = useState('');
    useEffect(() => {
        getGoodsDetail(id, setGoods);
    }, [id]);

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
        }
    ];

    // TODO: Super Admin
    if (true) {
        items.push({
            key: 'operation',
            label: '操作记录',
            children: <Operation />
        });
    }

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
                            {(goods?.proStatus === '已下线' ||
                                goods?.proStatus === '草稿') && (
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        navigate('/edit/' + id);
                                    }}
                                >
                                    编辑
                                </Button>
                            )}

                            {goods?.proStatus === '待审核' && (
                                <Popconfirm
                                    title='发起审核'
                                    description='确定发起审核？'
                                    onConfirm={() => {
                                        reqAudit({ proId: id });
                                        getGoodsDetail(id, setGoods);
                                    }}
                                    okText='确定'
                                    cancelText='取消'
                                >
                                    <Button type='primary'>发起审核</Button>
                                </Popconfirm>
                            )}

                            {/* // TODO: Super Admin */}
                            {goods?.proStatus === '审核中' && (
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setAuditOpen(true);
                                        setPass(true);
                                    }}
                                >
                                    审核通过
                                </Button>
                            )}

                            {/* // TODO: Super Admin */}
                            {goods?.proStatus === '审核中' && (
                                <Button
                                    type='primary'
                                    onClick={() => {
                                        setAuditOpen(true);
                                        setPass(false);
                                    }}
                                >
                                    审批驳回
                                </Button>
                            )}

                            {(goods?.proStatus === '待上线' ||
                                goods?.proStatus === '已下线') && (
                                <Popconfirm
                                    title='上线'
                                    description='确定上线该商品？'
                                    onConfirm={() => {
                                        reqGoodsOnline(id).then(() =>
                                            getGoodsDetail(id, setGoods)
                                        );
                                    }}
                                    okText='确定'
                                    cancelText='取消'
                                >
                                    <Button type='primary' danger>
                                        上线
                                    </Button>
                                </Popconfirm>
                            )}

                            {goods?.proStatus === '运行中' && (
                                <Popconfirm
                                    title='下线'
                                    description='确定下线该商品？'
                                    onConfirm={() => {
                                        reqGoodsOffline(id).then(() =>
                                            getGoodsDetail(id, setGoods)
                                        );
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
                            <Text>{goods?.admin.userName}</Text>
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
                                    ? goods.proxys.map((item, idx, arr) => (
                                          <span key={item.userId}>
                                              {item.userName}
                                              {/* // TODO: Self */}
                                              {true && (
                                                  <Popconfirm
                                                      title='删除代理人'
                                                      description='确定删除该代理人？'
                                                      onConfirm={() => {
                                                          reqDelProxy(
                                                              id,
                                                              item.userId
                                                          ).then(() =>
                                                              getGoodsDetail(
                                                                  id,
                                                                  setGoods
                                                              )
                                                          );
                                                      }}
                                                      okText='确定'
                                                      cancelText='取消'
                                                  >
                                                      <Button
                                                          type='link'
                                                          danger
                                                          size='small'
                                                      >
                                                          <DeleteOutlined />
                                                      </Button>
                                                  </Popconfirm>
                                              )}
                                              {idx === arr.length - 1
                                                  ? ''
                                                  : '、'}
                                          </span>
                                      ))
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
                                    <PlusOutlined />
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
                                {goods?.proStatus}
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
                    <Button
                        type='primary'
                        onClick={() => {
                            reqTransfer(id, transferId).then(() => {
                                setTransferId('');
                                setTransferOpen(false);
                                getGoodsDetail(id, setGoods);
                            });
                        }}
                        disabled={!transferId}
                    >
                        提交
                    </Button>
                }
            >
                <Select
                    loading={loading}
                    options={selectableProxys?.map(item => ({
                        value: item.userId,
                        label: item.userName
                    }))}
                    style={{ width: '100%' }}
                    onChange={value => setTransferId(value)}
                />
            </Drawer>

            <Drawer
                title='添加代理人'
                width={300}
                open={proxyOpen}
                onClose={() => setProxyOpen(false)}
                extra={
                    <Button
                        type='primary'
                        onClick={() => {
                            reqAddProxy(id, proxyId).then(() => {
                                setProxyId('');
                                setProxyOpen(false);
                                getGoodsDetail(id, setGoods);
                            });
                        }}
                        disabled={!proxyId}
                    >
                        提交
                    </Button>
                }
            >
                <Select
                    loading={loading}
                    options={selectableProxys?.map(item => ({
                        value: item.userId,
                        label: item.userName
                    }))}
                    style={{ width: '100%' }}
                    onChange={value => setProxyId(value)}
                />
            </Drawer>
        </Row>
    );
};

export default GoodsDetail;
