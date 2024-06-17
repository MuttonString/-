import { Button, Col, Divider, Modal, Row, Image } from 'antd';
import styles from './index.module.less';
import { GOODS_TYPE, GoodsDetail } from '@/api/goodsDetail/type';
import { useState } from 'react';

const Base: React.FC<{ goods: GoodsDetail }> = ({ goods }) => {
    const [isGoodsDetailOpen, setIsGoodsDetailOpen] = useState(false);

    return (
        <div className={styles.main}>
            <Image height={100} src={goods.imgUrl} />
            <Divider orientation='left'>基本信息</Divider>
            <Row>
                <Col span={8}>商品名称：{goods.goodsName}</Col>
                <Col span={8}>权益类型：{GOODS_TYPE[goods.goodsType]}</Col>
                <Col span={8}>描述：{goods.goodsDescribe}</Col>
            </Row>
            <Row>
                <Col span={8}>类目：{goods.categoryName}</Col>
                <Col span={8}>
                    兑换限制：
                    {goods.goodsLimit === -1
                        ? '无限制'
                        : goods.goodsLimit + '件'}
                </Col>
                <Col span={8}>库存：{goods.goodsStock}件</Col>
            </Row>
            <Row>
                <Col span={8}>上线时间：{goods.goodsOnline}</Col>
                <Col span={8}>下线时间：{goods.goodsOffline}</Col>
                <Col span={8}>
                    商品详情：
                    <Button onClick={() => setIsGoodsDetailOpen(true)}>
                        查看
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col span={8}>服务保障：{goods.goodsPromise}</Col>
                <Col span={16}>
                    价格：
                    {goods.boughtTypes.map(
                        (item, idx, arr) =>
                            (item.boughtType === 0
                                ? item.score + '积分'
                                : item.boughtType === 1
                                ? `${item.cash! / 100}元+${item.score}积分`
                                : item.cash! / 100 + '元') +
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
                {goods.goodsDetail.split('\n').map((line, idx) => (
                    <p key={idx} className={styles.line}>
                        {line}
                    </p>
                ))}
            </Modal>

            <Divider orientation='left'>快递信息</Divider>
            <Row>
                投放地区：
                {goods.shipping === undefined
                    ? '无'
                    : goods.shipping.map(
                          (item, idx, arr) =>
                              item.name + (arr.length - 1 === idx ? '' : '、')
                      )}
            </Row>
            <Row>
                不发货地区：
                {goods.noShipping === undefined
                    ? '无'
                    : goods.noShipping.map(
                          (item, idx, arr) =>
                              item.name + (arr.length - 1 === idx ? '' : '、')
                      )}
            </Row>

            <Divider orientation='left'>供应商信息</Divider>
            <Row>
                <Col span={8}>供应商名称：{goods.goodsFactory}</Col>
                <Col span={8}>供应商电话：{goods.goodsPhone}</Col>
            </Row>
        </div>
    );
};

export default Base;
