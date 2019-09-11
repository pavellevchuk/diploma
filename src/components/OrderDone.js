import React from 'react'
import {Link} from 'react-router-dom'
import Breadcrumps from './Breadcrumps.js';

class OrderDone extends React.Component{
    constructor(props){
      super(props);
      switch(props.data.paymentType){
        case 'offlineCard':
          this.paymentType = 'Картой курьеру';
          break;
        case 'onlineCard':
          this.paymentType = 'Картой онлайн';
          break;
        case 'offlineCash':
          this.paymentType = 'Наличными курьеру';
          break;
        default:
          this.paymentType = 'Не извесно'
      }
      this.state = {
        paths:[{path:'/',name:'Главная'},{path:'/order',name:'Корзина'},{path:'/order',name:'Оформление заказа'},{path:'/order',name:'Заказ принят'}]
      }
    }
  
    render(){
      const data = this.props.data;
      return(      
      <div className="wrapper order-wrapper">
        <Breadcrumps paths={this.state.paths}/>                  
          <section className="order-done">
            <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
            <div className="order-done__information order-info">
              <div className="order-info__item order-info__item_summ"> 
                <h3>Сумма заказа:</h3>
                <p>{data.price} <i className="fa fa-rub" aria-hidden="true"></i></p>
              </div>
              <div className="order-info__item order-info__item_pay-form"> 
                <h3>Способ оплаты:</h3>
                <p>{this.paymentType}</p>
              </div>
              <div className="order-info__item order-info__item_customer-name"> 
                <h3>Имя клиента:</h3>
                <p>{data.name}</p>
              </div>
              <div className="order-info__item order-info__item_adress">
                <h3>Адрес доставки:</h3>
                <p>{data.address}</p>
              </div>
              <div className="order-info__item order-info__item_phone">
                <h3>Телефон:</h3>
                <p>{data.phone}</p>
              </div>
            </div>
            <p className={`order-done__notice ${this.email ? '' : 'hidden'}`}>Данные о заказе отправлены на адрес <span>{this.email}</span></p>
            <Link to='/catalogue' className="order-done__continue" >продолжить покупки</Link>
          </section>
        </div>);
    }
  }

export default OrderDone