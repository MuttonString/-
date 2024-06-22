import { UserInfo, setUser } from '@/store/userSlice';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Account: React.FC<{ style: React.CSSProperties }> = ({ style }) => {
    const navigate = useNavigate();
    const userInfo = useSelector(
        state => (state as { user: { userInfo: UserInfo } }).user.userInfo
    );
    const dispatch = useDispatch();

    return (
        <div style={style}>
            {userInfo && userInfo.id >= 0 ? (
                <>
                    <span style={{ marginRight: '24px' }}>
                        {userInfo.userName}（{userInfo.roleName}）
                    </span>
                    <Button
                        danger
                        onClick={() => {
                            dispatch(
                                setUser({
                                    id: -1,
                                    userName: '',
                                    roleName: '',
                                    userId: ''
                                })
                            );
                            localStorage.removeItem('token');
                            localStorage.removeItem('refreshToken');
                            navigate('/login');
                        }}
                    >
                        注销
                    </Button>
                </>
            ) : (
                <Button onClick={() => navigate('/login')}>登录/注册</Button>
            )}
        </div>
    );
};

export default Account;
