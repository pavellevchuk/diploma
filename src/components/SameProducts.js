import React from 'react'
import {Link} from 'react-router-dom'

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

export default SameProducts