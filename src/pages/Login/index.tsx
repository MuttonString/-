import "./index.less"
import logo from "../../assets/images/logoImage.png"
import LoginContent from "./LoginContent";
function Login() {
    return <div className="background">
        <div className="Left_backgrand">
            <div className="Left_content_background">
                <div className="logoImage">
                    <img className="img" src={logo} alt="" />
                </div>
                <div className="Left_content">
                    <LoginContent></LoginContent>
                </div>
            </div>
        </div>
        <div className="Right_backgrand">
            <div className="Right_content_background">
                <div className="Right_content">

                </div>
            </div>
        </div>
    </div>
}
export default Login;