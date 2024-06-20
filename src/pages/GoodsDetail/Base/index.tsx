import { Button, Col, Divider, Modal, Row, Image } from 'antd';
import styles from './index.module.less';
import { GoodsDetailData } from '@/api/goodsDetail/type';
import { useState } from 'react';

const Base: React.FC<{ goods?: GoodsDetailData }> = ({ goods }) => {
    const [isGoodsDetailOpen, setIsGoodsDetailOpen] = useState(false);
    if (!goods) return null;

    return (
        <div className={styles.main}>
            <Image height={100} src={goods.poster} />
            <Divider orientation='left'>基本信息</Divider>
            <Row>
                <Col span={8}>商品名称：{goods.proName}</Col>
                <Col span={8}>权益类型：{goods.proType}</Col>
                <Col span={8}>描述：{goods.proDesc}</Col>
            </Row>
            <Row>
                // TODO
                <Col span={8}>类目：{goods.categoryId}</Col>
                <Col span={8}>
                    兑换限制：
                    {goods.exchageCap === -1
                        ? '无限制'
                        : goods.exchageCap + '件'}
                </Col>
                // TODO
                <Col span={8}>库存：{114514}件</Col>
            </Row>
            <Row>
                <Col span={8}>上线时间：{goods.startTime}</Col>
                <Col span={8}>下线时间：{goods.endTime}</Col>
                <Col span={8}>
                    商品详情：
                    <Button onClick={() => setIsGoodsDetailOpen(true)}>
                        查看
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={8}>服务保障：{goods.guarantee}</Col>
                <Col span={16}>
                    价格：
                    {goods.proRules.map(
                        (item, idx, arr) =>
                            (item.priceType === 'INTEGRAL'
                                ? item.integral + '积分'
                                : item.priceType === 'INTEGRAL_AND_CASH'
                                ? `${item.cash / 100}元+${item.integral}积分`
                                : item.cash / 100 + '元') +
                            (idx === arr.length - 1 ? '' : ' | ')
                    )}
                </Col>
            </Row>
            <Modal
                open={isGoodsDetailOpen}
                title='商品详情'
                footer={null}
                onCancel={() => setIsGoodsDetailOpen(false)}
            >
                // TODO
                {/* {goods.goodsDetail.split('\n').map((line, idx) => (
                    <p key={idx} className={styles.line}>
                        {line}
                    </p>
                ))} */}
            </Modal>
            <Divider orientation='left'>快递信息</Divider>
            <Row>
                投放地区：
                {goods.shippingRegin ? goods.shippingRegin : '无'}
            </Row>
            <Row>
                不发货地区：
                {goods.nonShippingRegion ? goods.nonShippingRegion : '无'}
            </Row>
            <Divider orientation='left'>供应商信息</Divider>
            <Row>
                <Col span={8}>供应商名称：{goods.supplierName}</Col>
                <Col span={8}>供应商电话：{goods.supplierPhone}</Col>
            </Row>
        </div>
    );
};

export default Base;
