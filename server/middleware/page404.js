/**
* @file: 404页面处理
* @Author: liyunjiao
* @Date:   2018-05-17 11:28:02
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-17 15:55:46
*/

const page404 = async (ctx,next)=>{
    ctx.status = 404;
    ctx.redirect('/notFound');
    return;
};

export default page404;