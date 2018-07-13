/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-13 16:31:30
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 16:46:51
*/
// 获取电影详情
import {query} from '../pool';

async function getMovieDetail(oo){
    let sql = `select * from movie_detail where m_id=${oo.id}`;
    let result = await query(sql).then(res=>{
        return res;
    }).catch(e=>false);
    if(result){
        return {
            status:0,
            data:result[0],
            statusInfo:'success'
        }
    } else {
        return {
            status:1,
            statusInfo:'db error'
        }
    }
}

export default {
    getMovieDetail
}