import { useEffect, useRef } from 'react';
import './textContent.less';

interface State {
    state: number
}

const TextContent: React.FC<State> = ({ state }) => {
    const animation = useRef<HTMLDivElement>(null)
    useEffect(() => {
        setTimeout(() => {
            if (animation.current !== null) {
                animation.current.style.opacity = '1';
            }
        })
    }, [])
    return (
        <div ref={animation}
            style={{
                textAlign: 'center',
                opacity: '0',
                transition: 'opacity 1s ease-in-out'
            }}
        >
            {
                state === 1 ?
                    <div className="welcome-back">
                        <h1>欢迎回归,亲爱的商家！</h1>
                        <hr />
                        <p>即刻登录,体验：</p>
                        <ul>
                            <li>数据大盘 - 洞察市场动态，实时更新的兑换量与销量排行。</li>
                            <li>商品管理 - 批量操作，一键上下线、新建与查询。</li>
                            <li>详情编辑 - 精准调整商品信息，优化商品展示。</li>
                            <li>权限管理 - 区分用户角色，保障系统安全。</li>
                        </ul>
                        <p>启动高效旅程,马上登录！</p>
                    </div>
                    :
                    <div className="welcome-to-join">
                        <h1>加入我们,开启您的商品管理新篇章！</h1>
                        <hr />
                        <p>注册即享：</p>
                        <ul>
                            <li>一站式智能商品管理,高效运营</li>
                            <li>流畅用户界面,卓越体验</li>
                            <li>深度数据统计,智能决策</li>
                            <li>安全登录,无忧管理</li>
                        </ul>
                        <p>无需技术知识,立即注册,开启您的成功之旅。</p>
                    </div>
            }
        </div>
    );
}

export default TextContent;