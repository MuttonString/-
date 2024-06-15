import { createBrowserRouter, RouteObject } from "react-router-dom"
import NotFoundPage from "@/components/404"
import LayoutPage from '@/layout';
import Login from "@/pages/Login"

//路由配置
const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutPage />,
    children: []
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>
  },
  {
    path: "/Login",
    element: <Login></Login>
  }
]

const router = createBrowserRouter(routes);

export default router;
