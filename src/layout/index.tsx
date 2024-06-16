import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SiderMenu from './sider';
import HeaderMenu from './header';
import Account from './account';

const { Header, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'left',
    backgroundColor: 'white',
    color: 'black',
    height: '64px',
    borderBottom: '0.5px solid silver'
};

const logoStyle: React.CSSProperties = {
    display: 'inline-block',
    width: '200px',
    fontSize: '24px',
    position: 'relative',
    left: '-20px'
};

const siderStyle: React.CSSProperties = {
    backgroundColor: 'white'
};

const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 64px)',
    overflowY: 'auto',
    padding: '24px'
};

const accountStyle: React.CSSProperties = {
    right: '24px',
    position: 'absolute',
};

const LayoutPage: React.FC = () => {
    return (
        <Layout>
            <Header style={headerStyle}>
                <div style={logoStyle}>商品管理系统</div>
                <HeaderMenu />
                <Account style={accountStyle} />
            </Header>
            <Layout>
                <Sider style={siderStyle}>
                    <SiderMenu />
                </Sider>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
