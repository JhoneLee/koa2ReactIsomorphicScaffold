/**
* @file: 
* @Author: liyunjiao
* @Date:   2018-05-16 17:21:33
* @Last Modified by:   liyunjiao2048@163.com
* @Last Modified time: 2018-07-13 17:24:52
*/

import React from 'react';
import {matchPath} from 'react-router-dom';
import ReactDomServer from 'react-dom/server';
import { AppContainer } from 'react-hot-loader';
import {StaticRouter as Router} from 'react-router';
import { Provider } from 'react-redux';
import Context from '../../client/context';
import routes from '../../client/routes';
import {makeStore} from '../../client/store';
import fetch from 'node-fetch';
import renderBefore from '../utils/renderBefore';
let roots = async (ctx,next)=>{
    if(ctx.url == '/'){
        ctx.redirect('/home');
        return;
    }
    console.log(ctx.url,'root');
    let routers = rangeRoute(routes);
    let rmatch = false;
    routers.forEach(route => {
        let match = matchPath(ctx.url,route);
        if(match){
            rmatch = match;
        }
    });
    console.log(rmatch);
    const context = {};
    if(rmatch){
        let {path,params} = rmatch;
        let preState = await renderBefore(path,params);
        let pStr = JSON.stringify(preState);
        let store = makeStore(preState);
        await ctx.render('index',{
            root:ReactDomServer.renderToString(
                <div>
                    <AppContainer>
                        <Provider store = {store}>
                            <Router location={ctx.url} context={context}>
                                <Context/>
                            </Router>
                        </Provider>
                    </AppContainer>
                </div>
            ),
            preState:pStr
        });
    } else {
        await next();
    }
}

function rangeRoute(routes){
    let arr = [];
    routes.forEach((e)=>{
        if(e.routes){
            arr = arr.concat(rangeRoute(e.routes));
        } else {
            arr.push(e);
        }
    })
    return arr;
}

export default roots;