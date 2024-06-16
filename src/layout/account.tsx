import { Button } from 'antd';

const Account: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    return (
        <div style={style}>
            <span style={{ marginRight: '24px' }}>用户名、登录、注销部分</span>
            <Button>注销</Button>
        </div>
    );
};

export default Account;
