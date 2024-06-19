import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Account: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    const navigate = useNavigate();

    return (
        <div style={style}>
            {/* <span style={{ marginRight: '24px' }}>用户名、登录、注销部分</span> */}
            <Button onClick={() => navigate('/login')}>登录/注册</Button>
        </div>
    );
};

export default Account;
