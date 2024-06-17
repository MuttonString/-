import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import SiderMenu from './sider';
import HeaderMenu from './header';
import Account from './account';
import MainPage from '@/components/MainPage';

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
    left: '-48px'
};

const siderStyle: React.CSSProperties = {
    backgroundColor: 'white'
};

const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 64px)',
    padding: '24px',
};

const accountStyle: React.CSSProperties = {
    right: '24px',
    position: 'absolute'
};

const LayoutPage: React.FC = () => {
    const location = useLocation();

    let content: JSX.Element;
    if (location.pathname === '/') {
        content = <MainPage />;
    } else {
        content = (
            <>
                <Sider style={siderStyle}>
                    <SiderMenu />
                </Sider>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </>
        );
    }

    return (
        <Layout>
            <Header style={headerStyle}>
                <img
                    alt=''
                    src='/src/assets/images/logo.png'
                    style={logoStyle}
                />
                <HeaderMenu />
                <Account style={accountStyle} />
            </Header>
            <Layout>{content}</Layout>
        </Layout>
    );
};

export default LayoutPage;
