import "./index.less"
import logoImage from "../../assets/images/logoImage.png"
import logo from "../../assets/images/logo.png"
import LoginContent from "./LoginContent/LoginContent";
import RegisterContent from "./registerContent/registerContent";
import TextContent from "./textContent/textContent";

import { Card } from "antd";
import { useState } from "react";


function Login() {
    const [state, setState] = useState(1)

    function changeState(stateValue: number) {
        setState(stateValue)
    }
    return (
        <div className="background">
            <div className="Left_backgrand">
                <div className="Left_content_background">
                    <div className="logoImage">
                        <img className="img" src={logo} alt="" />
                    </div>
                    <Card
                        className="Left_content"
                        hoverable
                    >
                        {state == 1 ?
                            <div>
                                <LoginContent
                                    changeState={(stateValue: number) => changeState(stateValue)}
                                />
                            </div>
                            :
                            <div>
                                <TextContent state={state}></TextContent>
                            </div>
                        }
                    </Card>
                </div>
            </div>
            <div className="Right_backgrand">
                <div className="Right_content_background">
                    <Card
                        className="Right_content"
                        hoverable
                    >
                        {state == 0 ?
                            <div style={{ opacity: `${state ? 0 : 1}` }}>
                                <RegisterContent
                                    changeState={(stateValue: number) => changeState(stateValue)}
                                />
                            </div>
                            :
                            <div style={{ opacity: `${state}` }}>
                                <TextContent state={state}></TextContent>
                            </div>
                        }
                    </Card>
                    <div className="logo">
                        <img className="img" src={logoImage} alt="" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;