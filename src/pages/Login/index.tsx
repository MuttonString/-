import "./index.less"
import logo from "../../assets/images/logoImage.png"
import LoginContent from "./LoginContent";
import RegisterContent from "./registerContent";
import { useEffect, useState } from "react";
function Login() {
    const [state, setState] = useState(0)
    useEffect(() => {
        // console.log(state)
    }, [state])
    function changeState(stateValue: number) {
        setState(stateValue)
    }
    return <div className="background">
        <div className="Left_backgrand">
            <div className="Left_content_background">
                <div className="logoImage">
                    <img className="img" src={logo} alt="" />
                </div>
                <div className="Left_content">
                    {state==0 ? <LoginContent changeState={(stateValue: number)=>changeState(stateValue)}></LoginContent> : <></>}
                </div>
            </div>
        </div>
        <div className="Right_backgrand">
            <div className="Right_content_background">
                <div className="Right_content">
                    {state==1 ? <RegisterContent changeState={(stateValue: number)=>changeState(stateValue)}></RegisterContent> : <></>}
                </div>
            </div>
        </div>
    </div>
}
export default Login;