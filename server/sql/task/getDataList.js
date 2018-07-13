/*
* @Author: liyunjiao2048@163.com
* @Date:   2018-07-13 14:50:20
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 16:29:24
*/

// 获取首页列表数据
import {query} from '../pool';
import {htmlDecode} from '../../utils/tools';

function getSql(date){
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    m = m>10 ? m : '0'+m;
    let d = date.getDate()>10?date.getDate():'0'+date.getDate();
    let time = (new Date(`${y}/${m}/${d} 16:00:00`).getTime())/1000;
    return `select distinct a.m_id,b.m_name,b.m_type,b.m_img
           from current_show a 
           left join movie_detail b 
           on a.m_id = b.m_id 
           where a.date=${time}
           order by a.m_cc desc;`;
}

function dealData(list){
  let arr = [];
  list.forEach((e)=>{
    let {m_type} = e;
    let ms = htmlDecode(m_type).split('/');
    let oo = Object.assign({},e,{
      m_type:ms
    });
    arr.push(oo);
  });
  return arr;
}

async function getDataList(){
    let sql = getSql(new Date());
    let result = await query(sql).then((res)=>{
        return res;
    }).catch((e)=>{
        console.log('error',e);
        return false;
    });
    if(result){
      result = dealData(result);
      return {
        status:0,
        data:{
          list:result
        },
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
    getDataList
}