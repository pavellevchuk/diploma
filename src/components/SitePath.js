import React from 'react'
import {Link} from 'react-router-dom'

class SitePath extends React.Component{
    render(){
        return(
    <div className="site-path">
      <ul className="site-path__items">
        <li className="site-path__item"><Link to="/">Главная</Link></li>
        <li className="site-path__item"><Link to="/catalogue">Женская обувь</Link></li>
      </ul>
    </div>)
    }
}

export default SitePath