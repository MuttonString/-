import { GoodsDetail } from '@/api/goodsDetail/type';
import styles from './index.module.less';

const Preview: React.FC<{ goods: GoodsDetail }> = ({ goods }) => {
    const cash = goods.boughtTypes.filter(item => item.boughtType === 2);
    const score = goods.boughtTypes.filter(item => item.boughtType === 0);
    let price = '';
    let cnt = 0;
    // 如有，展示纯现金价格
    if (cash.length) {
        price += cash[0].cash! / 100 + '元';
        cnt++;
    }
    // 如有，展示纯积分价格
    if (score.length) {
        price += (cnt ? ' | ' : '') + score[0].score! + '积分';
        cnt++;
    }
    // 如均无，展示积分加现金价格
    if (!cnt) {
        price = `${goods.boughtTypes[0].cash! / 100}元+`;
        cnt++;
    }
    // 展示出来的价格是否是全部的
    if (cnt < goods.boughtTypes.length) {
        price += ' 等';
    }

    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <img alt='' src={goods.imgUrl} />
                <div>
                    <p>{goods.goodsName}</p>
                    <p style={{ color: 'crimson' }}>{price}</p>
                </div>
            </div>

            <div className={styles.phone}>
                <div className={styles.topbar}>
                    07:21<span>100%</span>
                </div>
                <img alt='' src={goods.imgUrl} />
                <div className={styles.detail}>
                    <h3>{goods.goodsName}</h3>
                    <p>{goods.goodsFactory}</p>
                    <br />
                    {goods.boughtTypes.map((item, idx) => (
                        <h2 key={idx}>
                            {item.boughtType === 0
                                ? item.score + '积分'
                                : item.boughtType === 1
                                ? `${item.cash! / 100}元+${item.score}积分`
                                : item.cash! / 100 + '元'}
                        </h2>
                    ))}
                    <br />
                    <p>服务保障：{goods.goodsPromise}</p>
                </div>
                <button>购买</button>
            </div>
        </div>
    );
};

export default Preview;
