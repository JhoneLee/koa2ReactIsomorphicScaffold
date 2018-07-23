/**
* @file: 接口映射表
* @Author: liyunjiao
* @Date:   2018-05-17 18:13:34
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 13:40:51
*/
import domain from './domain';
let base = domain.BASE;
export default {
    '/home/:flag?':[{
        state:'homeList',
        api:'getDataList', //数据库方法
        init:{

        }
    }],
    '/page/detail/:id':[{
        state:'movieDetail',
        api:`getMovieDetail`
    }]
}