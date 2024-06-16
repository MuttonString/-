import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'gainsboro ',
    color: 'black',
    height: '64px'
};

const siderStyle: React.CSSProperties = {
    width: '128px',
    backgroundColor: 'silver'
};

const contentStyle: React.CSSProperties = {
    height: 'calc(100vh - 64px)'
};

const LayoutPage: React.FC = () => {
    return (
        <Layout>
            <Header style={headerStyle}>
                <h1>商品管理系统</h1>
            </Header>
            <Layout>
                <Sider style={siderStyle}>侧边栏</Sider>
                <Content style={contentStyle}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default LayoutPage;
