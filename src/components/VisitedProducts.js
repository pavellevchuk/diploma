import React from 'react'
import {Link} from 'react-router-dom'

class VisitedProducts extends React.Component{
    constructor(props){
        super(props);
        this.prods = props.products;
        this.state = {
          first: 0,
          second: 1,
          third: 2,
          fourth: 3,
          fifth: 4
        }
    }

    moveSlider = event => {
      let dir = event.currentTarget.classList.contains('overlooked-slider__arrow_right'),
        index1 = this.state.first,
        index2 = this.state.second,
        index3 = this.state.third,
        index4 = this.state.fourth,
        index5 = this.state.fifth;


    if(index1 === 0 && !dir){
      index1 = this.prods.length - 1;
    }
    else if (index1 === this.prods.length - 1 && dir) {
      index1 = 0;
    }
    else{
      index1 = dir ? index1 + 1 : index1 - 1;
    }

    if(index2 === this.prods.length - 1 && dir){
      index2 = 0;
    }
    else if(index2 === 0 && !dir){
      index2 = this.prods.length - 1;
    }else{
      index2 = dir ? index2 + 1 : index2 - 1;
    }

    if(index3 === this.prods.length - 1 && dir){
      index3 = 0;
    }
    else if(index3 === 0 && !dir){
      index3 = this.prods.length - 1;
    }else{
      index3 = dir ? index3 + 1 : index3 - 1;
    }

    if(index4 === this.prods.length - 1 && dir){
      index4 = 0;
    }
    else if(index4 === 0 && !dir){
      index4 = this.prods.length - 1;
    }else{
      index4 = dir ? index4 + 1 : index4 - 1;
    }

    if(index5 === this.prods.length - 1 && dir){
      index5 = 0;
    }
    else if(index5 === 0 && !dir){
      index5 = this.prods.length - 1;
    }else{
      index5 = dir ? index5 + 1 : index5 - 1;
    }
    this.setState({first:index1,second:index2,third:index3,fourth:index4,fifth:index5});
    }

    render(){
      const {first,second,third,fourth,fifth} = this.state;
      if(!this.prods.length) return null;

        return(
    <div>    
      <h3>Вы смотрели:</h3>
    <div className="overlooked-slider">
      <div className={`overlooked-slider__arrow overlooked-slider__arrow_left arrow ${this.prods.length > 5? '' : 'hidden'}`} onClick={this.moveSlider}></div>
        <div className={`overlooked-slider__item ${this.prods[first] ? '' : 'hidden'}`} style={{background:`url(${this.prods[first] ? this.prods[first].images[0] : ''}) center center/contain no-repeat`}}>
          <Link to={`/product-card-desktop?id=${this.prods[first] ? this.prods[first].id : ''}`}></Link>
        </div>
        <div className={`overlooked-slider__item ${this.prods[second] ? '' : 'hidden'}`} style={{background:`url(${this.prods[second] ? this.prods[second].images[0] : ''}) center center/contain no-repeat`}}>
          <Link to={`/product-card-desktop?id=${this.prods[second] ? this.prods[second].id : ''}`}></Link>
        </div>
        <div className={`overlooked-slider__item ${this.prods[third] ? '' : 'hidden'}`} style={{background:`url(${this.prods[third] ? this.prods[third].images[0] : ''}) center center/contain no-repeat`}}>
          <Link to={`/product-card-desktop?id=${this.prods[third] ? this.prods[third].id : ''}`}></Link>
        </div>
        <div className={`overlooked-slider__item ${this.prods[fourth] ? '' : 'hidden'}`} style={{background:`url(${this.prods[fourth] ? this.prods[fourth].images[0] : ''}) center center/contain no-repeat`}}>
          <Link to={`/product-card-desktop?id=${this.prods[fourth] ? this.prods[fourth].id : ''}`}></Link>
        </div>
        <div className={`overlooked-slider__item ${this.prods[fifth] ? '' : 'hidden'}`} style={{background:`url(${this.prods[fifth] ? this.prods[fifth].images[0] : ''}) center center/contain no-repeat`}}>
          <Link to={`/product-card-desktop?id=${this.prods[fifth] ? this.prods[fifth].id : ''}`}></Link>
        </div>
      <div className={`overlooked-slider__arrow overlooked-slider__arrow_right arrow ${this.prods.length > 5? '' : 'hidden'}`} onClick={this.moveSlider}></div>
    </div> 
    </div>)
    }
}

export default VisitedProducts