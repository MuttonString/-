import { Menu, MenuProps } from 'antd';
import { HomeOutlined, ProductOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: '首页'
    },
    {
        key: '/admin',
        icon: <ProductOutlined />,
        label: '管理页面'
    }
];

const HeaderMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Menu
            style={{ backgroundColor: 'transparent' }}
            mode='horizontal'
            items={items}
            selectedKeys={['/' + location.pathname.split('/')[1]]}
            onClick={e => navigate(e.key)}
        />
    );
};

export default HeaderMenu;
