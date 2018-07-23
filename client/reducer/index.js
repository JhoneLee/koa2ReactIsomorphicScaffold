/**
* @file: reducer汇总
* @Author: liyunjiao
* @Date:   2018-05-15 14:34:43
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-23 16:21:19
*/

import * as fetch from './fetch';
import * as home from './home';
import * as detail from './detail';
import * as username from './username';
import { combineReducers } from 'redux';
export default combineReducers({
    ...fetch,
    ...home,
    ...detail,
    ...username
});