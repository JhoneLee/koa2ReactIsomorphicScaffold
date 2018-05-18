/**
* @file: store文件
* @Author: liyunjiao
* @Date:   2018-05-14 15:12:03
* @Last Modified by:   liyunjiao
* @Last Modified time: 2018-05-18 16:01:22
*/

import { createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer } from 'react-router-redux';
import reduxThunk from 'redux-thunk'; // 让redux支持dispatch传入函数
import reduxPromise from 'redux-promise'; // 支持promise的action
import reducer from './reducer';
let window = global.window || {};
let preState = window.preState || '{}';
preState = preState.replace('\n','');
export function makeStore(preloadState = {}) {
    return createStore(combineReducers({
        reducer,
        routing: routerReducer
    }), preloadState, applyMiddleware(reduxThunk, reduxPromise));
}
export default makeStore(JSON.parse(preState));