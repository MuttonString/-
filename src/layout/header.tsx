import { Menu, MenuProps } from 'antd';
import { HomeOutlined, ProductOutlined } from '@ant-design/icons';
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

let navigate: NavigateFunction;

const items: MenuItem[] = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: '首页',
        onClick: e => navigate(e.key)
    },
    {
        key: '/admin',
        icon: <ProductOutlined />,
        label: '管理页面',
        onClick: e => navigate(e.key)
    }
];

const HeaderMenu: React.FC = () => {
    navigate = useNavigate();
    const location = useLocation();
    return (
        <Menu
            style={{ backgroundColor: 'transparent' }}
            mode='horizontal'
            items={items}
            selectedKeys={['/' + location.pathname.split('/')[1]]}
        />
    );
};

export default HeaderMenu;
