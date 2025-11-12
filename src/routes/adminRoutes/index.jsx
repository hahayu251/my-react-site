import Home from '../../pages/home'
import Goods from '../../pages/goods'
import Category from '../../pages/category'
import Product from '../../pages/product'
import Users from '../../pages/users'
import Character from '../../pages/character'
import Chart from '../../pages/chart'

const routes=[
    // {
    //     index: true, // 当访问 /admin 时显示首页
    //     element: <Home />
    // },
    {
        path:'home',
        element:<Home />
    },
    {
        path:'goods',
        element:<Goods />
    },
    {
        path:'category',
        element:<Category />
    },
    {
        path:'product',
        element:<Product />
    },
    {
        path:'users',
        element:<Users />
    },
    {
        path:'character',
        element:<Character />
    },
    {
        path:'chart',
        element:<Chart />
    }
]

export default routes