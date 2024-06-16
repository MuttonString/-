import { Menu, MenuProps } from 'antd';
import { OrderedListOutlined, PieChartOutlined } from '@ant-design/icons';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

let navigate: NavigateFunction;

const items: MenuItem[] = [
    {
        key: '/admin/list',
        icon: <OrderedListOutlined />,
        label: '商品管理',
        onClick: e => navigate(e.key)
    },
    {
        key: '/admin/platter',
        icon: <PieChartOutlined />,
        label: '数据大盘',
        onClick: e => navigate(e.key)
    }
];

const SiderMenu: React.FC = () => {
    navigate = useNavigate();
    const location = useLocation();
    return <Menu mode='vertical' items={items} selectedKeys={[location.pathname]} />;
};

export default SiderMenu;
