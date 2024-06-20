import { GoodsDetailData } from '@/api/goodsDetail/type';
import styles from './index.module.less';

const Preview: React.FC<{ goods?: GoodsDetailData }> = ({ goods }) => {
    if (!goods) return null;
    const cash = goods.proRules?.filter(item => item.priceType === 'CASH');
    const score = goods.proRules?.filter(item => item.priceType === 'INTEGRAL');
    if (!goods.proRules?.length) return null;
    let price = '';
    let cnt = 0;
    // 如有，展示纯现金价格
    if (cash.length) {
        price += cash[0].cash / 100 + '元';
        cnt++;
    }
    // 如有，展示纯积分价格
    if (score.length) {
        price += (cnt ? ' | ' : '') + score[0].integral + '积分';
        cnt++;
    }
    // 如均无，展示积分加现金价格
    if (!cnt) {
        price = `${goods.proRules[0].cash / 100}元+`;
        cnt++;
    }
    // 展示出来的价格是否是全部的
    if (cnt < goods.proRules.length) {
        price += ' 等';
    }

    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <img alt='' src={goods.poster} />
                <div>
                    <p>{goods.proName}</p>
                    <p style={{ color: 'crimson' }}>{price}</p>
                </div>
            </div>

            <div className={styles.phone}>
                <div className={styles.topbar}>
                    07:21<span>100%</span>
                </div>
                <img alt='' src={goods.poster} />
                <div className={styles.detail}>
                    <h3>{goods.proName}</h3>
                    <p>{goods.supplierName}</p>
                    <br />
                    {goods.proRules.map((item, idx) => (
                        <h2 key={idx}>
                            {item.priceType === 'INTEGRAL'
                                ? item.integral + '积分'
                                : item.priceType === 'INTEGRAL_AND_CASH'
                                ? `${item.cash! / 100}元+${item.integral}积分`
                                : item.cash! / 100 + '元'}
                        </h2>
                    ))}
                    <br />
                    <p>服务保障：{goods.guarantee}</p>
                </div>
                <button>购买</button>
            </div>
        </div>
    );
};

export default Preview;
