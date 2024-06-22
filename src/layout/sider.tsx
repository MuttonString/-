import { Menu, MenuProps } from 'antd';
import { OrderedListOutlined, PieChartOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { UserInfo } from '@/store/userSlice';

type MenuItem = Required<MenuProps>['items'][number];

const SiderMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector(
        state => (state as { user: { userInfo: UserInfo } }).user.userInfo
    );

    const items: MenuItem[] = [
        {
            key: '/admin/list',
            icon: <OrderedListOutlined />,
            label: '商品管理'
        }
    ];

    if (userInfo?.roleName === '超级管理员') {
        items.push({
            key: '/admin/platter',
            icon: <PieChartOutlined />,
            label: '数据大盘'
        });
    }

    return (
        <Menu
            mode='vertical'
            items={items}
            selectedKeys={[location.pathname]}
            onClick={e => navigate(e.key)}
        />
    );
};

export default SiderMenu;
