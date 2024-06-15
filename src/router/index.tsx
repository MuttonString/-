import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import NotFoundPage from '@/components/404'
import GoodsDetail from '@/pages/GoodsDetail'
import LayoutPage from '@/layout'
import GoodsList from '@/components/GoodsList'

//路由配置
const routes: RouteObject[] = [
  {
    path: '/admin',
    element: <LayoutPage />,
    children: [
      {
        path: '/list',
        element: <GoodsList></GoodsList>
      },
      {
        path: '/',
        element: <Navigate to="/admin/list"></Navigate>
      }
    ],
  },
  {
    path: '/detail/:id',
    element: <GoodsDetail></GoodsDetail>
  },
  {
    path: '*',
    
  },
  {
    path: '*',
    element: <NotFoundPage></NotFoundPage>,
  },
]

const router = createBrowserRouter(routes)

export default router
