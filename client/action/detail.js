/**
* @file:详情页action
* @Author: liyunjiao
* @Date:   2018-05-16 11:25:54
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 16:55:26
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
    console.log(subreddit);
    return dic[subreddit](json);
}