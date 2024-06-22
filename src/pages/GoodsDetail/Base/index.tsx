import { Col, Divider, Row, Image } from 'antd';
import styles from './index.module.less';
import { GoodsDetailData } from '@/api/goodsDetail/type';
import dayjs from 'dayjs';
import cities from '@/assets/json/flatCities.json';

const Base: React.FC<{ goods?: GoodsDetailData }> = ({ goods }) => {
    if (!goods) return null;

    return (
        <div className={styles.main}>
            {goods.poster && <Image height={100} src={goods.poster} />}
            <Divider orientation='left'>基本信息</Divider>
            <Row>
                <Col span={8}>商品名称：{goods.proName}</Col>
                <Col span={8}>权益类型：{goods.proType}</Col>
                <Col span={8}>描述：{goods.proDesc}</Col>
            </Row>
            <Row>
                <Col span={8}>类目：{goods.categoryName}</Col>
                <Col span={8}>
                    兑换限制：
                    {goods.exchageCap === -1 || goods.exchageCap === null
                        ? '无限制'
                        : goods.exchageCap}
                </Col>
                <Col span={8}>库存：{goods.stock}</Col>
            </Row>
            <Row>
                <Col span={8}>
                    上线时间：
                    {goods.startTime
                        ? dayjs(goods.startTime).format('YYYY-MM-DD HH:mm:ss')
                        : ''}
                </Col>
                <Col span={8}>
                    下线时间：
                    {goods.endTime
                        ? dayjs(goods.endTime).format('YYYY-MM-DD HH:mm:ss')
                        : ''}
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
            <Divider orientation='left'>快递信息</Divider>
            <Row>
                投放地区：
                {goods.shippingRegion
                    ? goods.shippingRegion
                          .split(',')
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          .map(id => (cities as any)[id])
                          .join(',')
                    : '无'}
            </Row>
            <Row>
                不发货地区：
                {goods.nonShippingRegion
                    ? goods.nonShippingRegion
                          .split(',')
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          .map(id => (cities as any)[id])
                          .join(',')
                    : '无'}
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
