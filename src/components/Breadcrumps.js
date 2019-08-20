import React from 'react'
import {Link} from 'react-router-dom'

class Breadcrumps extends React.Component{
    render(){
        return (   
            <div className="site-path" style={{width:'75%'}}>
                <ul className="site-path__items">
                    {this.props.paths.map((item,index) => <li className="site-path__item" key={index}><Link to={item.path}>{item.name}</Link></li>)}
                </ul>
            </div>);
    }
}

export default Breadcrumps