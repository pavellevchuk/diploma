import React from 'react'
import {Link} from 'react-router-dom'
import {manageItemToLocalStorage} from '../scripts/script.js'
import VisitedProducts from './VisitedProducts.js'


class ProductCard extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            data:null,
            isLoading:true,
            mainPhoto : null,
            price : null,
            quantity: 1,
            inFavourites:false,
            size: null,
            paths:[]
        }
    }
    componentDidMount(){
      this.fetchData();
    }

    componentWillReceiveProps(){
      if(this.state.data && `${this.state.data.id}` !== new URLSearchParams(window.location.search).get('id'))this.fetchData();
    }


    fetchData = () => {
        this.setState({isLoading:true});
        fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${new URLSearchParams(window.location.search).get('id')}`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 'ok'){
                this.setState({data:data.data,isLoading:false,mainPhoto:data.data.images[0],price:data.data.price});
                this.props.addToVisited(data.data);
            }else{
                throw new Error(data.message);
            }
        });
    }

    chooseSize = event => {
        event.preventDefault();
        let hasChosen = event.currentTarget.classList.contains('active');
        for(let item of event.currentTarget.parentElement.children){
            item.classList.remove('active');
        }
        if(!hasChosen) {
            event.currentTarget.classList.add('active');
            this.toBasket.classList.remove('in-basket_disabled');
            this.toBasket.innerText = 'В корзину';
            this.setState({size:event.currentTarget.querySelector('a').innerText});
        }else{
            this.toBasket.classList.add('in-basket_disabled');
        }
    }

    changePhoto = (e,image) => {
        e.preventDefault();
        this.setState({mainPhoto:image})
    }

    changePrice = e => {
        let plus = e.currentTarget.classList.contains('basket-item-list__quantity-change_plus');
        if(!plus && this.state.quantity === 1) return;
        this.setState({quantity: plus ? this.state.quantity + 1 : this.state.quantity - 1})
    }

    manageToLocalStorage = e => {
        e.preventDefault();
        e.currentTarget.querySelector('.favourite').classList.toggle('chosen');
        manageItemToLocalStorage(this.state.data);
    }

    addToCart = e => {
        if(e.currentTarget.classList.contains('in-basket_disabled')){
            e.currentTarget.innerText = 'Выберите размер!';
            return;
        }
        document.querySelector('.header').scrollIntoView({block: "start", behavior: "smooth"});
        this.fetchForCart();
    }

    fetchForCart = () => {
      let sameIndex = this.props.productsInCart.findIndex(item => item.id === this.state.data.id && item.size == this.state.size),
          quantity;
      if(sameIndex !== -1){
        quantity = this.props.productsInCart[sameIndex].amount;
        quantity += this.state.quantity;
      } 

      let opts = {
        method:'POST',
        headers:{'Content-Type' : 'application/json'},
        body: JSON.stringify({id:this.state.data.id,size:parseInt(this.state.size),amount:sameIndex !== -1 ? quantity :this.state.quantity })
      }
      
      fetch(`https://api-neto.herokuapp.com/bosa-noga/cart/${this.props.cartId ? this.props.cartId : ''}`,opts)
      .then(res => res.json())
      .then(data => {
        if(data.status === 'ok'){
          this.props.addToCart(data.data.id,this.state.size,this.state.data);
        }else{
          throw new Error(data.message);
        }
      })
    }


    render(){
        const {data,isLoading,mainPhoto,price,quantity} = this.state;
        if(isLoading){
            return (    
            <div className="preloader_wrapper ">
                <div className="preloader">
                    <hr/><hr/><hr/><hr/>
                </div>
            </div> );
        }

        let favourites = JSON.parse(localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')) : [];

        return(
        <div>
        <main className="product-card">
			<section className="product-card-content">
				<h2 className="section-name">{data.title}</h2>
				<section className="product-card-content__main-screen">
				<section className="main-screen__favourite-product-slider">
				<div className={`favourite-product-slider ${data.images.length === 1 ? 'hidden' : ''}`}>
					<div className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-up ${data.images.length > 3 ? '' : 'hidden'}`}></div>
                    {data.images.map((image,index) => <div className="favourite-product-slider__item" style={{background:`url(${image}) center center /contain no-repeat`}} onClick ={e => this.changePhoto(e,image)} key={index}><a href="#"></a></div>)}
				    <div className={`favourite-product-slider__arrow favourite-product-slider__arrow_up arrow-down ${data.images.length > 3 ? '' : 'hidden'}`}></div>
		       	</div>
				</section>
				<div className="main-screen__favourite-product-pic" style={{textAlign:'center'}}>
					<a href={`${mainPhoto}`} target="_blank"><img src={mainPhoto} alt="" style={{maxWidth:'100%',maxHeight:'100%'}}/></a>
					{/* <a href="#" className="main-screen__favourite-product-pic__zoom"></a> */}
				</div>
								<div className="main-screen__product-info">
									<div className="product-info-title"><h2>{data.title}</h2><div className="in-stock">В наличии</div></div>
									<div className="product-features">
									  <table className="features-table">
                    <tbody>
									    <tr>
									      <td className="left-col">Артикул:</td>
									      <td className="right-col">{data.sku}</td>
									    </tr>
									      <tr>
									        <td className="left-col">Производитель:</td>
									        <td className="right-col"><Link to={`/catalogue?brand=${data.brand}`}><span className="producer">{data.brand}</span></Link></td>
									    </tr>
									      <tr>
									        <td className="left-col">Цвет:</td>
									        <td className="right-col">{data.color}</td>
									    </tr>
									      <tr>
									        <td className="left-col">Материалы:</td>
									        <td className="right-col">{data.material}</td>
									    </tr>
									      <tr>
									        <td className="left-col">Сезон:</td>
									        <td className="right-col">{data.season}</td>
									    </tr>
									      <tr>
									        <td className="left-col">Повод:</td>
									        <td className="right-col">{data.reason}</td>
									    </tr>
                                        </tbody>
									  </table>
									</div>
									<p className="size">Размер</p>
									<ul className="sizes">
                                        {data.sizes.map((size,index) => size.available ? <li onClick={this.chooseSize} key={index}><a>{size.size}</a></li>:null)}
									</ul>
									<div className="size-wrapper">
											<a href="#"><span className="size-rule"></span><p className="size-table">Таблица размеров</p></a>
									</div>
									<a href="#" className="in-favourites-wrapper" onClick={this.manageToLocalStorage}>
										<div className={`favourite ${favourites.find(item => item.id === data.id) ? 'chosen' : ''}`} ></div><p className="in-favourites">В избранное</p>
									</a>
									<div className="basket-item__quantity">
									  <div className="basket-item__quantity-change basket-item-list__quantity-change_minus" onClick = {this.changePrice}>-</div>{quantity}
									  <div className="basket-item__quantity-change basket-item-list__quantity-change_plus" onClick = {this.changePrice}>+</div>
									</div>
									<div className="price">{`${price * quantity} ₽`}</div>
									<button className="in-basket in-basket-click in-basket_disabled" ref={element => this.toBasket = element} style={{outline:'none'}} onClick ={this.addToCart}>В корзину</button>
								</div>

				</section>
			</section>
    </main>
    <section className="product-card__overlooked-slider">
      <VisitedProducts products={this.props.visitedProducts}/>
    </section>
    <SameProducts type={data.type} color={data.color} activeId={data.id} fetchData={this.fetchData}/>
    </div>
    );
    }
}


class SameProducts extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:null,
            prev : null,
            active: null,
            next : null
        }
    }
    componentDidMount(){
        fetch(`https://api-neto.herokuapp.com/bosa-noga/products?type=${this.props.type}&color=${this.props.color}`)
        .then(res => res.json())
        .then(data => {
            if(data.status === 'ok'){
                this.data = data.data.filter(item => item.id !== this.props.activeId);
                this.setState({prev:this.data.length - 1, active: 0, next: 1})
            }else{
                throw new Error(data.message);
            }
        });
    }

    moveSlider = event => {
        let dir = event.currentTarget.classList.contains('similar-products-slider__arrow_right'),
        indexA = this.state.active,
        indexP = this.state.prev,
        indexN = this.state.next;

    if(indexA === 0 && !dir){
      indexA = this.data.length - 1;
    }
    else if (indexA === this.data.length - 1 && dir) {
      indexA = 0;
    }
    else{
      indexA = dir ? indexA + 1 : indexA - 1;
    }

    if(indexP === this.data.length - 1 && dir){
      indexP = 0;
    }
    else if(indexP === 0 && !dir){
      indexP = this.data.length - 1;
    }else{
      indexP = dir ? indexP + 1 : indexP - 1;
    }

    if(indexN === this.data.length - 1 && dir){
      indexN = 0;
    }
    else if(indexN === 0 && !dir){
      indexN = this.data.length - 1;
    }else{
      indexN = dir ? indexN + 1 : indexN - 1;
    }
    this.setState({active:indexA,prev:indexP,next:indexN});
    }

    render(){
        const {prev,active,next} = this.state, data = this.data;
        if(!data || !data.length) return null;

        return(    
    <section className="product-card__similar-products-slider">
      <h3>Похожие товары:</h3>
      <div className="similar-products-slider">
        <div className={`similar-products-slider__arrow similar-products-slider__arrow_left arrow ${data.length > 3 ? '' : "hidden"}`} onClick ={this.moveSlider}></div>
        	<div className={`similar-products-slider__item-list__item-card item ${data.length - 1 === 0? 'hidden' : ''}`}>
            <div className="similar-products-slider__item" style={{background:`url(${data[prev].images[0]}) center center/contain no-repeat`}}>
              <Link to={`?id=${data[prev].id}`}>
              </Link>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">{data[prev].title}</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{data[prev].brand}</span></p>
              <p className="similar-products-slider__item-price">{data[prev].price}</p>
            </div>    
          </div>
        	<div className="similar-products-slider__item-list__item-card item">
            <div className="similar-products-slider__item" style={{background:`url(${data[active].images[0]}) center center/contain no-repeat`}}>
              <Link to={`?id=${data[active].id}`}>
              </Link>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">{data[active].title}</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{data[active].brand}</span></p>
              <p className="similar-products-slider__item-price">{data[active].price}</p>
            </div>    
          </div>
        	<div className={`similar-products-slider__item-list__item-card item ${data[next] ? '' : 'hidden'}`}>
            <div className="similar-products-slider__item" style={{background:`url(${data[next] ? data[next].images[0] : null}) center center/contain no-repeat`}}>
              <Link to={`?id=${data[next] ? data[next].id :null}`}>
              </Link>
            </div>
            <div className="similar-products-slider__item-desc">
              <h4 className="similar-products-slider__item-name">{data[next] ? data[next].title :null}</h4>
              <p className="similar-products-slider__item-producer">Производитель: <span className="producer">{data[next] ? data[next].brand :null}</span></p>
              <p className="similar-products-slider__item-price">{data[next] ? data[next].price :null}</p>
            </div>    
          </div>
        <div className={`similar-products-slider__arrow similar-products-slider__arrow_right arrow ${data.length > 3 ? '' : "hidden"}`} onClick ={this.moveSlider}></div>
      </div>
    </section>)
    }
}

export default ProductCard