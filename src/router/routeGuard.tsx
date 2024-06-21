// import { Navigate,useLocation } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UserInfo } from '../store/userSlice'

interface RootState {
    user: {
        userInfo: UserInfo | null;
    };
}

const RouteGuard = (props: { children: JSX.Element }) => {
    const WhiteList = ["/", "/login"];
    const { pathname } = useLocation()
    const userInfo = useSelector((state: RootState) => state);

    if (WhiteList.indexOf((pathname ? pathname : "/")) === -1) {
        console.log(pathname);
        console.log(userInfo);
        
    }

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
    return props.children
}

export default RouteGuard
