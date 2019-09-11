import React from 'react'
import CartItem from './CartItem.js'
import Breadcrumps from './Breadcrumps.js'

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

export default Order