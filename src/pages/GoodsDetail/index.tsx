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
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';
import { GOODS_STATUS } from '@/api/goodsDetail/type';
import type { GoodsDetail } from '@/api/goodsDetail/type';

import goods from './data/goods.json';
import proxy from './data/proxy.json';
import Base from './Base';
import Preview from './Preview';
import Operation from './Operation';
import { LeftOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

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

const GoodsDetail: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const id = parseInt(location.pathname.split('/').pop() as string);

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
                        {goods.goodsName}
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
                            <Text>{goods.userName}</Text>
                        </Col>
                        <Col span={12}>
                            <Text strong>代理人：</Text>
                            <Text>
                                {proxy === undefined || proxy.length === 0
                                    ? '无'
                                    : proxy.map(
                                          (item, idx, arr) =>
                                              item.userName +
                                              (idx === arr.length - 1
                                                  ? ''
                                                  : '、')
                                      )}
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
                                {GOODS_STATUS[goods.goodsStatus]}
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
