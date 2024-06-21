import { Navigate,useLocation } from "react-router-dom";

const RouteGuard = (props)=> {
    const WhiteList = ["/","/login"];
    // const { pathname } = useLocation()
    // if(WhiteList.indexOf((pathname?pathname:"/")) === -1){
    //     let token = localStorage.getItem("token","rem432412341324");
    //     if(token){
    //         return props.children;
    //     }else{
    //         return <Navigate to = "/login" />;
    //     }
    // }else{
    //     return props.children;
    // }
}

export default RouteGuard
