/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-20 10:43:06
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 17:31:56
*/

export default {
    port:8079,
    host:'xxxxx',
    family:4,
    password:'123456',
    retryStrategy(times){
        return Math.min(times*50,2000);
    },
    reconnectOnError(err){
        if(err.message.slice(0,8) == 'READONLY'){
            return true;
        }
    }
}