import React from 'react'
import {Link} from 'react-router-dom'
import Preloader from './Preloader.js'
import Breadcrumps from './Breadcrumps.js';

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


class Order extends React.Component{
    constructor(props){
        super(props);
        this.checkboxes = [];
        this.inputs = [];
        this.count = 0;
        this.state = {
          quantity : 1,
          price : null,
          data:null,
          isLodaing: true,
          paths:[{path:'/',name:'Главная'},{path:'/order',name:'Корзина'},{path:'/order',name:'Оформление заказа'}]
        }
    }

    componentDidMount(){
      if(!this.props.cartId){
        document.querySelector('.preloader_wrapper').classList.add('hidden');
        return;
      }  
      this.setState((prevState) => {return {isLodaing:true}});
      fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${this.props.cartId}`)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'ok'){
          this.setState((prevState) => {return {data:data.data.products,isLodaing:false}})
        }else{
          throw new Error(data.message);
        }
      });
    }


    sendData = e => {
      e.preventDefault();
      if(e.currentTarget.classList.contains('order-process__form-submit_disabled')) return;
      let obj = {
        name : this.inputs[0].value,
        phone : this.inputs[1].value,
        adress : this.inputs[2].value,
        price : this.state.price,
        paid : this.checkboxes.find(cb => cb.checked).parentElement.querySelector('span').innerText,
        paidType: this.checkboxes.find(cb => cb.checked).value
      }
      this.props.clearCart();
      this.props.changeData(obj);
    }

    checkInputs = e => {
      this.inputs = Array.from(document.querySelectorAll('.order-process__delivery-input'))
      let filledInputs = this.inputs.filter(input => input.value.length > 0),
      nameIsCorrect = /^[A-Za-z]+$/.test(this.inputs[0].value),
      phoneIsCorrect = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(this.inputs[1].value),
      emailIsCorrect = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.inputs[2].value),
      addressIsCorrect = /^[a-zA-Z0-9\s,'-]*$/.test(this.inputs[3].value);
      
      if(nameIsCorrect && phoneIsCorrect && emailIsCorrect && addressIsCorrect && filledInputs.length === this.inputs.length){
        this.button.classList.remove('order-process__form-submit_disabled');
      }else{
        this.button.classList.add('order-process__form-submit_disabled');
      }
    }

    createCartItem = (item,index) => {
      for(let product of this.props.productsInCart){
        if(product.id === item.id && product.size === item.size) return <CartItem changePrice = {this.changePrice} item={product} index={index} key={index} curr={this.state.price}/>
      }
    }

    changePrice = () => {
      let sum = 0;
      document.querySelectorAll('.basket-item__price').forEach(item => sum += parseInt(item.innerText,10));
      this.setState({price: sum});
    }

    shouldComponentUpdate(p,state){
      if(this.state.price === null && state.price === null) return true;
      return this.state.price !== state.price;
    }


    render(){
      const {isLodaing} = this.state, preloader = document.querySelector('.preloader_wrapper');
      if(isLodaing){
       if(preloader) preloader.classList.remove('hidden');
        return null;
      }
      preloader.classList.add('hidden');
    
        return(      
        <div className="wrapper order-wrapper">
        <Breadcrumps paths={this.state.paths}/>
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">в вашей корзине:</div>
            <div className="order-basket__item-list">
              {this.state.data.map(this.createCartItem)}
            </div>
            <div className="order-basket__summ">Итого:<span>{this.state.price} <i className="fa fa-rub" aria-hidden="true"></i></span></div>
          </div>
          <div className="order-process__confirmed">
            <form action="#">
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form" key={1}>
                  <label className="order-process__delivery-label">
                    <div className="order-process__delivery-text">Имя</div>
                    <input className="order-process__delivery-input" type="text" name="delivery" placeholder="Представьтесь, пожалуйста" onChange={this.checkInputs} ref={element => this.inputs.push(element)}/>
                  </label>
                  <label className="order-process__delivery-label" key={2}>
                    <div className="order-process__delivery-text">Телефон</div>
                    <input className="order-process__delivery-input" type="tel" name="delivery" placeholder="Номер в любом формате" onChange={this.checkInputs} ref={element => this.inputs.push(element)}/>
                  </label>
                  <label className="order-process__delivery-label" key={3}>
                    <div className="order-process__delivery-text">E-mail</div>
                    <input className="order-process__delivery-input" type="email" name="delivery" placeholder="Укажите E-mail" onChange={this.checkInputs} ref={element => this.inputs.push(element)}/>
                  </label>
                  <label className="order-process__delivery-label order-process__delivery-label_adress" key={4}>
                    <div className="order-process__delivery-text">Адрес</div>
                    <input className="order-process__delivery-input order-process__delivery-input_adress" type="text" name="delivery" placeholder="Ваша покупка будет доставлена по этому адресу" onChange={this.checkInputs} ref={element => this.inputs.push(element)}/>
                  </label>
                </div>
                <p>Все поля обязательны для заполнения. Наш оператор свяжется с вами для уточнения деталей заказа.</p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="onlineCard" ref={element => this.checkboxes.push(element)}/><span className="order-process__paid-text">Картой онлайн</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCard" ref={element => this.checkboxes.push(element)} defaultChecked/><span className="order-process__paid-text">Картой курьеру</span>
                  </label>
                  <label className="order-process__paid-label">
                    <input className="order-process__paid-radio" type="radio" name="paid" value="offlineCash" ref={element => this.checkboxes.push(element)}/><span className="order-process__paid-text">Наличными курьеру</span>
                  </label>
                </div>
              </div>
              <button className="order-process__form-submit order-process__form-submit_click order-process__form-submit_disabled" ref={element => this.button = element} onClick={this.sendData}>Подтвердить заказ</button>
            </form>
          </div>
        </section>
      </div>);
    }
}

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
export default OrderPage