import React,{h} from 'react';
import {Link} from 'react-router-dom';
const NotFound = (props) => {
    return (<div>
        <h1>没有找到这个页面</h1>
        <Link to="/home">回首页</Link>
    </div>);
};
export default NotFound;