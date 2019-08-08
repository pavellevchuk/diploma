import React from 'react'
import {Link} from 'react-router-dom'
import {manageItemToLocalStorage} from '../scripts/script.js'

class Item extends React.Component{
  constructor(props){
    super(props);
    this.data = props.data;
    this.state = {
      extendedData: null,
      imageCount : 0
    }
  }

  componentDidMount(){
    fetch(`https://api-neto.herokuapp.com/bosa-noga/products/${this.data.id}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.setState({extendedData:data.data});
      }
    });
    this.data.images.length > 1 ? this.leftArrow.onclick = this.rightArrow.onclick = this.changeImage : this.leftArrow.style.display = this.rightArrow.style.display = 'none';
    this.inFav = JSON.parse(localStorage.getItem('favourites')) ? JSON.parse(localStorage.getItem('favourites')).find(item => this.data.id === item.id) : null;
  }

  manageToFavourites = e => {
    e.preventDefault();
    let classList = e.currentTarget.classList;
    manageItemToLocalStorage(this.state.extendedData);
    if(this.props.onFavPage) {
      this.props.reloadFavs();
      return;
    }
    if(classList.contains('product-catalogue__product_favorite-chosen')){
      classList.remove('product-catalogue__product_favorite-chosen');
      classList.add('product-catalogue__product_favorite')
    }else{
      classList.add('product-catalogue__product_favorite-chosen');
      classList.remove('product-catalogue__product_favorite')
    }
  }

  changeImage = event => {
    event.preventDefault();
    event.stopPropagation();
    let dir = event.currentTarget.classList.contains('arrow_right');
    if(this.state.imageCount === 0 && !dir){
      this.setState({imageCount : this.data.images.length - 1});
      return;
    }
    if(this.state.imageCount === this.data.images.length - 1 && dir){
      this.setState({imageCount : 0});
      return;
    }
    this.setState({imageCount: dir ? this.state.imageCount + 1 : this.state.imageCount - 1});
  }

  fillSizes = () => {
    let strArr = [];
    this.state.extendedData.sizes.map(size => {
      if(size.available){
        strArr.push(size.size);
      }
    });
    return strArr.join(', ');
  }

  render() {
    return(          
          <Link className="item-list__item-card item" to={`/product-card-desktop?id=${this.data.id}`} key={this.data.id}>
            <div className="item-pic" style={{background:`url(${this.data.images[this.state.imageCount]}) center / contain  no-repeat`}}>
              <div className={`${this.inFav ? this.props.onFavPage ? 'product-catalogue__product_favorite' : 'product-catalogue__product_favorite-chosen' :'product-catalogue__product_favorite'}`} onClick = {this.manageToFavourites}>
                <p></p>
              </div>
              <div className="arrow arrow_left" ref={element => this.leftArrow = element}></div>
              <div className="arrow arrow_right" ref={element => this.rightArrow = element}></div>
            </div>
            <div className="item-desc">
              <h4 className="item-name">{this.data.title}</h4>
              <p className="item-producer">Производитель: <span className="producer">{this.data.brand}</span></p>
              <p className="item-price">{this.data.price}</p>
              <div className="sizes">
                <p className="sizes__title">Размеры в наличии:</p>
                <p className="sizes__avalible">{this.state.extendedData? this.fillSizes():null}</p>
              </div>
            </div>
          </Link>)
  }
}

export default Item