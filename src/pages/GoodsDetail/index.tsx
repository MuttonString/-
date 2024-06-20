import {
    Button,
    Col,
    Divider,
    Drawer,
    Flex,
    Popconfirm,
    Row,
    Tabs,
    TabsProps,
    Typography
} from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import type { AuditRequest, GoodsDetailData } from '@/api/goodsDetail/type';
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
    reqGoodsOnline
} from '@/api/goodsDetail';
import TextArea from 'antd/es/input/TextArea';

const { Title, Text } = Typography;

const getGoodsDetail = async (
    id: string,
    func: React.Dispatch<React.SetStateAction<GoodsDetailData | undefined>>
) => {
    func(await reqGoodsDetail(id));
};

const GoodsDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = location.pathname.split('/').pop()!;
    const [open, setOpen] = useState(false);
    const [goods, setGoods] = useState<GoodsDetailData>();
    const [remark, setRemark] = useState('');
    const [pass, setPass] = useState(true);
    useState(() => getGoodsDetail(id, setGoods));
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

                            <Button
                                type='primary'
                                onClick={() => {
                                    setOpen(true);
                                    setPass(true);
                                    getGoodsDetail(id, setGoods);
                                }}
                            >
                                审核通过
                            </Button>

                            <Button
                                type='primary'
                                onClick={() => {
                                    setOpen(true);
                                    setPass(false);
                                    getGoodsDetail(id, setGoods);
                                }}
                            >
                                审批驳回
                            </Button>

                            <Popconfirm
                                title='上线'
                                description='确定上线该商品？'
                                onConfirm={() => {
                                    reqGoodsOnline(id);
                                    getGoodsDetail(id, setGoods);
                                }}
                                okText='确定'
                                cancelText='取消'
                            >
                                <Button type='primary' danger>
                                    上线
                                </Button>
                            </Popconfirm>
                            <Popconfirm
                                title='下线'
                                description='确定下线该商品？'
                                onConfirm={() => {
                                    reqGoodsOffline(id);
                                    getGoodsDetail(id, setGoods);
                                }}
                                okText='确定'
                                cancelText='取消'
                            >
                                <Button type='primary' danger>
                                    下线
                                </Button>
                            </Popconfirm>
                        </Flex>
                    </Title>
                    <Divider />
                    <Row>
                        <Col span={6}>
                            <Text strong>管理人：</Text>
                            <Text>{goods?.admin}</Text>
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
                        </Col>
                        <Col span={5}>
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
                open={open}
                onClose={() => setOpen(false)}
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
                            setOpen(false);
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
        </Row>
    );
};

export default GoodsDetail;
