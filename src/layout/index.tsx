import { Layout } from 'antd';

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'midnightblue',
    color: 'white'
};

const LayoutPage: React.FC = () => {
    return (
        <Layout>
            <Header style={headerStyle}>
                <h1>商品管理系统</h1>
            </Header>
            <Content></Content>
        </Layout>
    );
};

export default LayoutPage;
