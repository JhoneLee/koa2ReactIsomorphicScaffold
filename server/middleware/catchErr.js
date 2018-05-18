/**
* @file: 统一出错处理
* @Author: liyunjiao
* @Date:   2018-05-17 11:21:43
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 16:09:33
*/

const errHandler = async (ctx,next)=>{
    try{
        await next();
    } catch(err){
        console.log(err);
        ctx.response.status = 500;
        ctx.response.body = {
            message:err.message
        }
    }
}

export default errHandler;
