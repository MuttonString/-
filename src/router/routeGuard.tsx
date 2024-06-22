import { Navigate, useLocation } from "react-router-dom";
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
        if (userInfo.user.userInfo === null) {
            return <Navigate to="/login" />;
        } else if (userInfo.user.userInfo.roleName === "运营小二" || userInfo.user.userInfo.roleName === "超级管理员") {
            if (userInfo.user.userInfo.roleName !== "超级管理员" && pathname === "/admin/platter") {
                alert("您没有权限访问该页面")
                return <Navigate to="/" />;
            }
        } else {
            alert("请登录!")
            return <Navigate to="/login" />;
        }
    }
    return props.children
}

export default RouteGuard
