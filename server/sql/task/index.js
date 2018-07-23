/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-13 14:59:02
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 15:13:49
*/

import getDataList from './getDataList';
import getMovieDetail from './getMovieDetail';
import getUserInfo from './getUserInfo';
export default {
    ...getDataList,
    ...getMovieDetail,
    ...getUserInfo
}