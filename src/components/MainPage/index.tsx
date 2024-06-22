import mainPageImg from '@/assets/images/homepage.png';
import logoImg from '@/assets/images/logoImage.png';

const divStyle: React.CSSProperties = {
    height: 'calc(100vh - 64px)',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    margin: 0,
    backgroundImage: `url("${mainPageImg}")`,
    color: 'white',
    textAlign: 'center'
};

const imgStyle: React.CSSProperties = {
    top: '5vh',
    position: 'relative'
};

const h1Style: React.CSSProperties = {
    top: '20vh',
    position: 'relative',
    fontSize: '48px',
    textShadow: 'ghostwhite 1px 0 10px'
};

const MainPage: React.FC = () => {
    return (
        <div style={divStyle}>
            <img alt='' src={logoImg} style={imgStyle} />
            <h1 style={h1Style}>欢迎来到数字马力商品管理系统</h1>
        </div>
    );
};

export default MainPage;
