/**
* @file: 接口映射表
* @Author: liyunjiao
* @Date:   2018-05-17 18:13:34
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-18 15:38:10
*/
import domain from './domain';
let base = domain.BASE;
export default {
    '/home':[{
        state:'homeList',
        api:`${base}movie/in_theaters`
    }],
    '/page/detail/:id':[{
        state:'movieDetail',
        api:`${base}movie/subject/:id`
    }]
}