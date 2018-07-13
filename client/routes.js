/**
* @file: 路由文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:15:42
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 17:13:25
*/

import Home from './page/home';
import Detail from './page/detail';
import Layout from './page/layout';
import NotFound from './page/notFound';
const routes = [{
    path: '/home',
    component: Home,
    exact: true
},{
    path: '/page',
    component: Layout,
    exact: true,
    routes:[
        {
            path: '/page/detail/:id',
            component: Detail,
            exact: false
        }
    ]
},{
    path:'/notFound',
    component: NotFound,
    exact:true
}];
export default routes;