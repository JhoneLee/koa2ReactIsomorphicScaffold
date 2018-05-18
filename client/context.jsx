/*eslint-disable*/
import React,{h,Component} from 'react';
import { Redirect } from 'react-router-dom';
import routes from './routes';
import RouteWithSubRoutes from './components/RouteWithSubRoutes';
let App = () => {
    return (
        <div>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route}/>
            ))}
            
        </div>
    );
};
export default App;