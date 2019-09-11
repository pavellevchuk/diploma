import React from 'react'
import {Link} from 'react-router-dom'

class CartItem extends React.Component{
    constructor(props){
      super(props);
      this.email = JSON.parse(localStorage.getItem('email'));
      this.state = {
        quantity : props.item.amount
        
      }
    }
  
     componentDidMount(){
      this.props.changePrice();
    }
  
    componentDidUpdate(){
      this.props.changePrice();
    } 
  
    changePrice = e => {
      let plus = e.currentTarget.classList.contains('basket-item-list__quantity-change_plus');
      if(!plus && this.state.quantity === 1) return;
      this.setState((prevState) => {return {quantity: plus ? prevState.quantity + 1 : prevState.quantity - 1}});
    }
  
    render(){
      const index = this.props.index, item = this.props.item;
      return(
                <div className="basket-item" key={index}>
                  <Link to={`/product-card-desktop?id=${item.id}`} className="basket-item__pic" style={{background:`url(${item.images[0]}) center center /contain no-repeat`}}></Link>
                  <div className="basket-item__product">
                    <div className="basket-item__product-name"><Link to={`/product-card-desktop?id=${item.id}`}>{item.title}</Link></div>
                    <div className="basket-item__product-features">
                      <div className="basket-item__size">Размер: <span>{item.size}</span></div>
                      <div className="basket-item__producer">Производитель: <span>{item.brand}</span></div>
                      <div className="basket-item__color">Цвет: <span>{item.color}</span></div>
                    </div>
                  </div>
                  <div className="basket-item__quantity">
                    <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick = {this.changePrice}>-</div>{this.state.quantity}
                    <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick = {this.changePrice}>+</div>
                  </div>
                  <div className="basket-item__price">{item.price * this.state.quantity}<i className="fa fa-rub" aria-hidden="true"></i></div>
                </div>)
    }
  }

  export default CartItem