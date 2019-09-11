import React from 'react'
import {Link} from 'react-router-dom'
import Preloader from './Preloader.js'
import Breadcrumps from './Breadcrumps.js';
import Order from './MakeOrder.js';
import OrderDone from './OrderDone.js';

class OrderPage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isOrdered: false,
      data: null
    }
  }

  changeData = freshData => {
    let body = {
      name:freshData.name,
      phone:freshData.phone,
      address:freshData.adress,
      paymentType:freshData.paidType,
      cart: this.props.cartId 
    },
    opts = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body : JSON.stringify(body)
    }

    fetch('https://api-neto.herokuapp.com/bosa-noga/order',opts)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        data.data.info.price = freshData.price;
        this.setState({data:data.data.info,isOrdered:true});        
      }else{
        throw new Error(data.message)
      }
    })
  }


  render(){
    return (
      <div>
        <Preloader/>
        {this.state.isOrdered ? <OrderDone data={this.state.data}/> : <Order changeData={this.changeData} cartId={this.props.cartId} productsInCart={this.props.productsInCart} clearCart={this.props.clearCart}/>}
      </div>)
  }
}


export default OrderPage