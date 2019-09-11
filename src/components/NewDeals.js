import React from 'react'
import {Link} from 'react-router-dom'
import {manageItemToLocalStorage} from '../scripts/script.js'
import Slider from './Slider.js'

class NewDeals extends React.Component{
  
    constructor(props){
        super(props);
        this.state = {
          category : '13',
          data : null 
        }
    }

    componentDidMount(){
      for(let item of this.menuItems.children){
        item.onclick = this.handleItemClick;
      }
    }

    componentWillReceiveProps(props){
      this.setState({data:props.data.data})
    }

    handleItemClick = (event) => {
      event.preventDefault();
      for (let item of event.currentTarget.parentElement.children) {
        item.classList.remove('new-deals__menu-item_active');
      }
      event.currentTarget.classList.add('new-deals__menu-item_active');
      this.setState({category: event.currentTarget.getAttribute('data-category')})
    }


    render(){
        return( 
    <section className="new-deals wave-bottom">
      <h2 className="h2">Новинки</h2>
      <div className="new-deals__menu">
        <ul className="new-deals__menu-items" ref = {element => this.menuItems = element}>
          <li className="new-deals__menu-item new-deals__menu-item_active" data-category={13}>
            <Link to="/">Женская обувь</Link>
          </li>
          <li className="new-deals__menu-item" data-category={14}>
            <Link to="/">Мужская обувь</Link>
          </li>
          <li className="new-deals__menu-item" data-category={15}>
            <Link to="/">Детская обувь</Link>
          </li>
          <li className="new-deals__menu-item" data-category={16}>
            <Link to="/">аксессуары</Link>
          </li>
          <li className="new-deals__menu-item" data-category={17}>
            <Link to="/">для дома</Link>
          </li>
        </ul>
      </div>
      <Slider category={this.state.category} data={this.state.data}/>
    </section>);
    }
}

export default NewDeals