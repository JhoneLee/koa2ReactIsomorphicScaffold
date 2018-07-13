/**
* @file:详情页action
* @Author: liyunjiao
* @Date:   2018-05-16 11:25:54
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-12 18:45:50
*/

export const MOVIE_DETAIL = 'MOVIE_DETAIL';
export function movieDetail(json){
    return {
        type:MOVIE_DETAIL,
        payload:json
    };
}


const dic = {
    'detail':movieDetail
};

export function detailReceive(subreddit, json) {
    return dic[subreddit](json);
}