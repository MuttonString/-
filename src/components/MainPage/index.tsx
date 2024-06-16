const divStyle: React.CSSProperties = {
    height: 'calc(100vh - 64px)',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 0,
    backgroundImage: 'url("/src/assets/homepage.png")',
    color: 'white',
    textAlign: 'center',
};

const MainPage: React.FC = () => {
    return (
        <div style={divStyle}>
            <h1>欢迎来到商品管理系统</h1>
        </div>
    );
};

export default MainPage;
