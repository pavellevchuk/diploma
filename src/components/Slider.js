import React from 'react'
import {Link} from 'react-router-dom'
import {manageItemToLocalStorage} from '../scripts/script.js'

class Slider extends React.Component{
    constructor(props){
      super(props);
      this.visibleProducts = [];
      this.state = {
        prev: null,
        active: null,
        next: null 
      }
    }
  
    componentWillReceiveProps(props){
      this.visibleProducts = props.data.filter(item => `${item.categoryId}` === props.category);
      this.setState({
        prev: this.visibleProducts.length - 1,
        active:0,
        next: 1,
        activeData: this.visibleProducts[0]
      });
    }
  
    moveSlider = event => {
      let dir = event.currentTarget.classList.contains('new-deals__arrow_right'),
          indexA = this.state.active,
          indexP = this.state.prev,
          indexN = this.state.next;
  
      if(indexA === 0 && !dir){
        indexA = this.visibleProducts.length - 1;
      }
      else if (indexA === this.visibleProducts.length - 1 && dir) {
        indexA = 0;
      }
      else{
        indexA = dir ? indexA + 1 : indexA - 1;
      }
  
      if(indexP === this.visibleProducts.length - 1 && dir){
        indexP = 0;
      }
      else if(indexP === 0 && !dir){
        indexP = this.visibleProducts.length - 1;
      }else{
        indexP = dir ? indexP + 1 : indexP - 1;
      }
  
      if(indexN === this.visibleProducts.length - 1 && dir){
        indexN = 0;
      }
      else if(indexN === 0 && !dir){
        indexN = this.visibleProducts.length - 1;
      }else{
        indexN = dir ? indexN + 1 : indexN - 1;
      }
      this.setState({active:indexA,prev:indexP,next:indexN,activeData:this.visibleProducts[indexA]});
    } 
  
    manageToFavs = e => {
      let classList = e.currentTarget.classList;
      if(classList.contains('new-deals__product_favorite-fill')){
        classList.remove('new-deals__product_favorite-fill');
        classList.add('new-deals__product_favorite')
      }else{
        classList.add('new-deals__product_favorite-fill');
        classList.remove('new-deals__product_favorite')
      }
      manageItemToLocalStorage(this.state.activeData);
    }
  
    render(){
      if(!this.visibleProducts.length) return null;
      let favourites = JSON.parse(localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')): [];
      return(
      <div>      
        <div className="new-deals__slider">
          <div className="new-deals__arrow new-deals__arrow_left arrow" ref ={element => this.leftArrow = element} onClick={this.moveSlider}></div>
          <div className = "new-deals__product"style = {{backgroundImage: `url(${ this.visibleProducts[this.state.prev].images[0]})`,backgroundSize: 'contain'}}>
            <Link to = {`/product-card-desktop?id=${this.visibleProducts[this.state.prev].id}`} > </Link>
          </div>
  
          <div className="new-deals__product new-deals__product_active" style={{backgroundImage:`url(${this.visibleProducts[this.state.active].images[0]})`,backgroundSize:'contain'}}>
            < Link to = {`/product-card-desktop?id=${this.visibleProducts[this.state.active].id}`}> </Link>
            <div className={`${favourites.find(item => item.id === this.state.activeData.id)? 'new-deals__product_favorite-fill' :'new-deals__product_favorite'}`} onClick={this.manageToFavs}></div>
          </div>
          <div className="new-deals__product" style={{backgroundImage:`url(${this.visibleProducts[this.state.next].images[0]})`,backgroundSize:'contain'}}>
            <Link to={`/product-card-desktop?id=${this.visibleProducts[this.state.next].id}`}></Link>
          </div>
          <div className="new-deals__arrow new-deals__arrow_right arrow" ref ={element => this.rightArrow = element} onClick={this.moveSlider}></div>
        </div>
        <div className="new-deals__product-info">
          <a href="product-card-desktop.html" className="h3">{this.visibleProducts[this.state.active].title}</a>
          <p>Производитель:
            <span>{this.visibleProducts[this.state.active].brand}</span>
          </p>
          <h3 className="h3">{`${this.visibleProducts[this.state.active].price} ₽`}</h3>
        </div>
      </div>)
    }
  }

  export default Slider;