import React,{h} from 'react';
import {Link} from 'react-router-dom';
const HomeDataItem = ({data,...props}) => {
    let {m_id,m_name,m_type,m_img} = data;
    let gens = [];
    gens.push(m_type.map((e)=>{
        return (
            <li>{e}</li>
        );
    }));
    return (<li className="data-item">
        <Link to={`/page/detail/${m_id}`}>
            <div>
                <img src={m_img} alt="封面"/>
            </div>
            <h2>{m_name}</h2>
            <ul className="genres-name">{gens}</ul>
        </Link>
    </li>);
};
export default HomeDataItem;