import React from 'react'
import logo from '../layout/img/header-logo.png'
import {headerHiddenPanelProfileVisibility,headerHiddenPanelBasketVisibility,headerMainSearchVisibility,mainSubmenuVisibility} from '../scripts/script.js'
import {Link} from 'react-router-dom'

class Nav extends React.Component{
  constructor(props){
    super(props);
    this.blickCount = 0;
    this.state = {
      categoryId: '',
      data: [],
      cartCount : 0,
      products : null,
      searchVal:''
    }
  }
  componentDidMount(){
    this.profilePic.onclick = headerHiddenPanelProfileVisibility;
    this.basketPic.onclick = headerHiddenPanelBasketVisibility;
    this.searchPic.onclick = headerMainSearchVisibility;

    for (let item of this.mainMenuItems.children) {
      item.onclick = this.menuItemEventListeners;
    }
    this.topMenu.querySelectorAll('li').forEach(item => item.addEventListener('click', this.selectАnchor));    
  }

  componentWillReceiveProps(props){
    let cartWrapper = document.querySelector('.hidden-panel__basket');
    if(!props.cart.length){
        cartWrapper.querySelector('.basket-dropped__product-list').style.display = 'none';
        cartWrapper.querySelector('.basket-dropped__title').style.display = 'none';
        cartWrapper.querySelector('.basket-dropped__order-button').style.display = 'none';
        cartWrapper.querySelector('.no-products__title').style.display = 'block';
        this.setState({cartCountVisible:false});
        return;
      }

    cartWrapper.querySelector('.basket-dropped__product-list').style.display = 'block';
    cartWrapper.querySelector('.basket-dropped__title').style.display = 'block';
    cartWrapper.querySelector('.basket-dropped__order-button').style.display = 'block';
    cartWrapper.querySelector('.no-products__title').style.display = 'none';

    if(this.state.data.length < props.cart.length) setTimeout(this.toggleCartIndex,400);
    fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${props.cartId}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.createItems(data.data.products,props.cart);
      }else{
        throw new Error(data.message);
      }
    })
  }

  createItems = (data,cart) => {
    let arr = [];
    for(let item of data){
      let product = cart.find(prod => prod.id === item.id && prod.size === item.size);
      if(product) arr.push(Object.assign(product,item))
    }
    this.setState({data:arr,cartCount:arr.length,cartCountVisible:true});
  } 

  selectАnchor = event => {
     event.preventDefault()
  }

  menuItemEventListeners =  event => {
    mainSubmenuVisibility(event);
    this.activeMenuSection(event);
  }

  activeMenuSection = event => {
    event.preventDefault();
    this.setState({categoryId:event.currentTarget.getAttribute('data-category')});
  }

  createCartItem = (item,index) => {
    return (        
      <div className="product-list__item" key={index}>
            <Link className="product-list__pic" to={`/product-card-desktop?id=${item.id}`}>
                <img className="" src={item.images[0]} alt="product"/>
            </Link>
            <Link className="product-list__product" to={`/product-card-desktop?id=${item.id}`}>{`${item.title}, ${item.brand}, (размер: ${item.size})${item.amount > 1 ? ', ' + item.amount + ' шт.' : ''}`}</Link>
            <div className="product-list__fill"></div>
            <div className="product-list__price" style={{display:"flex"}}>
                {item.price * item.amount}<i className="fa fa-rub" aria-hidden="true" style={{marginLeft:'6px'}}></i>
            </div>
            <div className="product-list__delete"><i className="fa fa-times" aria-hidden="true" onClick={e => this.props.deleteItem(e,item)}></i></div>
      </div>)
  }

  toggleCartIndex = () => {
    this.blickCount++;
    if(this.blickCount >= 6) {
      this.blickCount = 0;
      this.setState((prevState) => {return {cartCountVisible: true}});
      return;
    }else{
      this.setState((prevState) => {return {cartCountVisible: !prevState.cartCountVisible}})
      setTimeout(this.toggleCartIndex,400);
    }
  }
  
    render(){
      const {data,cartCountVisible} = this.state;

        return(      
        <header className="header">
        <div className="top-menu">
          <div className="wrapper">
            <ul className="top-menu__items" ref={element => this.topMenu = element}>
              <li className="top-menu__item"><a href="/">Возврат</a></li>
              <li className="top-menu__item"><a href="/">Доставка и оплата</a></li>
              <li className="top-menu__item"><a href="/">О магазине</a></li>
              <li className="top-menu__item"><a href="/">Контакты</a></li>
              <li className="top-menu__item"><a href="/">Новости</a></li>
            </ul>
          </div>
        </div>
        <div className="header-main">
          <div className="header-main__wrapper wrapper">
            <div className="header-main__phone"><a href="tel:+7-495-790-35-03">+7 495 79 03 5 03</a>
              <p>Ежедневно: с 09-00 до 21-00</p>
            </div>
            <div className="header-main__logo"><Link to="/">
                <h1><img src={logo} alt="logotype"/></h1></Link>
              <p>Обувь и аксессуары для всей семьи</p>
            </div>
            <div className="header-main__profile">
              <div className="header-main__pics">
                <div className="header-main__pic header-main__pic_search" ref = {element => this.searchPic = element}></div>
                <div className="header-main__pic_border"></div>
                <div className="header-main__pic header-main__pic_profile" ref = {element => this.profilePic = element}>
                  <div className="header-main__pic_profile_menu"></div>
                </div>
                <div className="header-main__pic_border"></div>
                <div className="header-main__pic header-main__pic_basket" ref = {element => this.basketPic = element}>
                  <div className="header-main__pic_basket_full" style={{display:`${cartCountVisible ? 'block' : 'none'}`}}>{this.state.cartCount}</div>
                  <div className="header-main__pic_basket_menu"></div>
                </div>
              </div>
              <form className="header-main__search" action="#" >
                <input placeholder="Поиск" onChange={event => this.setState({searchVal:event.currentTarget.value})}/><Link to={this.state.searchVal.length ? '/catalogue?search=' + this.state.searchVal : '/catalogue'}><i className="fa fa-search" aria-hidden="true" onClick={e => this.searchPic.click()}></i></Link>
              </form>
            </div>
          </div>
          <div className="header-main__hidden-panel hidden-panel">
            <div className="wrapper">
              <div className="hidden-panel__profile"><Link to="/">Личный кабинет</Link><Link to="/favourite"><i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</Link><Link to="/">Выйти</Link></div>
              <div className="hidden-panel__basket basket-dropped" >
                <div className='no-products__title' >В корзине пока ничего нет. Не знаете, с чего начать? Посмотрите наши новинки!</div>
                <div className="basket-dropped__title" style={{display:'none'}}>В вашей корзине:</div>
                <div className="basket-dropped__product-list product-list" style={{display:'none'}}>
                  {data ? data.map(this.createCartItem): null}
                </div>
                <Link className="basket-dropped__order-button" to='/order' style={{display:'none'}}>Оформить заказ</Link>
              </div>
            </div>
          </div>  
        </div>
        <nav className="main-menu">
          <div className="wrapper">
            <ul className="main-menu__items" ref = {element => this.mainMenuItems = element}>
              <li className="main-menu__item main-menu__item_sales"><a href="/">акции</a></li>
              <li className="main-menu__item main-menu__item_women" data-category={13}><a href="/">Женская обувь</a></li>
              <li className="main-menu__item main-menu__item_men" data-category={12}><a href="/">Мужская обувь</a></li>
              <li className="main-menu__item main-menu__item_kids" data-category={15}><a href="/">Детская обувь</a></li>
              <li className="main-menu__item main-menu__item_accessories"><a href="/">аксессуары</a></li>
              <li className="main-menu__item main-menu__item_home"><a href="/">для дома</a></li>
              <li className="main-menu__item main-menu__item_brands"><a href="/">бренды</a></li>
              <li className="main-menu__item main-menu__item_new"><a href="/">новинки</a></li>
            </ul>
          </div>
        </nav>
        <NavFetcher categoryId={this.state.categoryId}/>
      </header>)
    }
}

class NavFetcher extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filters : null,
      isLoading : true,
      activeSection : ''
    }
  }

  componentDidMount(){
    fetch('https://api-neto.herokuapp.com/bosa-noga/filters')
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.setState({filters: data.data,isLoading: false});
      }else throw new Error (data.message);
    });
  }

  componentWillReceiveProps(props){
    this.setState({categoryId:props.categoryId});
  }

  render(){
    const {filters,isLoading} = this.state;
    if(isLoading){
      return null;
    }

    return(
        <div className="dropped-menu">
          <div className="wrapper" ref={element => this.submenuWrapper = element} style ={{overflowX:'auto',overflowY:'hidden',paddingBottom:'30px'}}>
            <div className="dropped-menu__lists dropped-menu__lists_women">
              <h3 className="dropped-menu__list-title">повод:</h3>
              <ul className="dropped-menu__list">
                {filters.reason.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&reason=${filter}`}>{filter}</Link></li>)}
              </ul>
            </div>
            <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
              <h3 className="dropped-menu__list-title">категории:</h3>
              <ul className="dropped-menu__list">
                {filters.type.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&type=${filter}`}>{filter}</Link></li>)}
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">сезон:</h3>
              <ul className="dropped-menu__list">
                {filters.season.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&season=${filter}`}>{filter}</Link></li>)}
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">бренды:</h3>
              <ul className="dropped-menu__list">
                {filters.brand.map((filter,index) => <li className="dropped-menu__item" key={index}><Link to={`/catalogue?categoryId=${this.state.categoryId}&brand=${filter}`}>{filter}</Link></li>)}
              </ul>
            </div>
          </div>
        </div>)
  }
}


export default Nav