import {
    Button,
    Col,
    Divider,
    Flex,
    Row,
    Tabs,
    TabsProps,
    Typography
} from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import type { GoodsDetailData } from '@/api/goodsDetail/type';
import Base from './Base';
import Preview from './Preview';
import Operation from './Operation';
import { LeftOutlined } from '@ant-design/icons';
import { reqGoodsDetail } from '@/api/goodsDetail';

const { Title, Text } = Typography;

const getGoodsDetail = async (
    id: number,
    func: React.Dispatch<React.SetStateAction<GoodsDetailData | undefined>>
) => {
    func(await reqGoodsDetail(id));
};

const GoodsDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = parseInt(location.pathname.split('/').pop() as string);

    const [goods, setGoods] = useState<GoodsDetailData>();
    getGoodsDetail(id, setGoods);
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
                            <Button type='primary'>编辑</Button>
                            <Button type='primary'>发起审核</Button>
                            <Button type='primary'>审核通过</Button>
                            <Button type='primary'>审批驳回</Button>
                            <Button type='primary' danger>
                                上线
                            </Button>
                        </Flex>
                    </Title>
                    <Divider />
                    <Row>
                        <Col span={6}>
                            <Text strong>管理人：</Text>
                            <Text>{goods?.poster}</Text>
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
                                {/* // TODO */}
                                {''}
                            </Title>
                        </Col>
                        <Col span={1} />
                    </Row>
                </Typography>

                <Tabs defaultActiveKey='base' items={items} />
            </Col>
            <Col sm={0} md={2} xxl={6} />
        </Row>
    );
};

export default GoodsDetail;
