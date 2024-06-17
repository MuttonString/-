import { Menu, MenuProps } from 'antd';
import { OrderedListOutlined, PieChartOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/admin/list',
        icon: <OrderedListOutlined />,
        label: '商品管理'
    },
    {
        key: '/admin/platter',
        icon: <PieChartOutlined />,
        label: '数据大盘'
    }
];

const SiderMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
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
