import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { UserInfo } from '../store/userSlice';
import { createSelector } from 'reselect'; // 引入 reselect

// 定义 RootState 类型
type RootState = {
    user: {
        userInfo: UserInfo | null;
    };
};

// 创建一个 memoized selector 来获取 userInfo
const selectUserInfo = createSelector(
    (state: RootState) => state.user,
    (user) => user.userInfo
);

const RouteGuard = ({ children }: { children: JSX.Element }) => {
    const WhiteList = ["/", "/login"];
    const { pathname } = useLocation();
    const userInfo = useSelector(selectUserInfo); // 使用更具体的选择器

    // 检查路径是否在白名单中
    if (WhiteList.includes(pathname)) {
        return children;
    }

    // 检查用户是否已登录以及是否有访问权限
    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    if (userInfo.roleName !== "超级管理员" && pathname === "/admin/platter") {
        alert("您没有权限访问该页面");
        return <Navigate to="/" />;
    }

    return children;
};

export default RouteGuard;