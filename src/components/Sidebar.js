import React from 'react'
import {Link} from 'react-router-dom'
import{createURL,switchCaseColor} from '../scripts/script.js'

class Sidebar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      filters : null,
      searchVal: ''
    }
  }

  componentDidMount(){
    fetch('https://api-neto.herokuapp.com/bosa-noga/filters')
    .then(res => res.json())
    .then(data => this.setState({
          filters: data.data
      }));
  }

  //added styles for .chosen a in style-catalogue.css

  chooseFilter = event => {
    let hasChosen = event.currentTarget.classList.contains('chosen');
    for (let item of event.currentTarget.parentElement.children){
      item.classList.remove('chosen');
    }
    if(!hasChosen) event.currentTarget.classList.add('chosen');
  }


  toggleView = event => {
    let opener = event.currentTarget.parentElement.querySelector('.sidebar__division-title div');
    if(opener.classList.contains('opener-up')){
      opener.classList.remove('opener-up');
      opener.classList.add('opener-down');
      event.currentTarget.parentElement.classList.contains('sidebar__price') ? event.currentTarget.parentElement.querySelector('.price-slider').style.display = 'none' : event.currentTarget.parentElement.querySelector('ul').style.display = 'none';
    }else{
      opener.classList.remove('opener-down');
      opener.classList.add('opener-up');
      event.currentTarget.parentElement.classList.contains('sidebar__price') ? event.currentTarget.parentElement.querySelector('.price-slider').style.display = 'flex' : event.currentTarget.parentElement.querySelector('ul').style.display = 'flex';
    }
  }

  fillColors = (filter,index) => {
                let color = switchCaseColor(filter);
    return  <li key={index} onClick={this.chooseFilter} className={this.searchParams.get('color') === filter ? 'chosen' : ''}><Link to={createURL('color',filter)}><div className="color" style={{background:color}}></div><span className="color-name">{filter}</span></Link></li>
  }

  createMultipleURL = (name,filter) => {
    let searchParams = new URLSearchParams(window.location.search);
    searchParams.has(name) ? searchParams.get(name) === filter ? searchParams.delete(name) : searchParams.set(name,filter) : searchParams.append(name, filter);
    return '?' + searchParams.toString(); 
  }


  fillSizes = (sizes,name) =>  {
    let nodesArr = [];
    let sizesArr = [], heelSizesArr = [];
      for(let pair of this.searchParams.entries()){
        if(pair[0] === 'size[]'){
           sizesArr.push(pair[1]);
        }
        if(pair[0] === 'heelSize[]'){
           heelSizesArr.push(pair[1]);
        }
      }
    let arr = name === 'size[]' ? sizesArr : heelSizesArr;
    nodesArr.push(<div className="list-1" key={1}>{sizes.map((size,index) => {if(index < sizes.length/2)return <li key={index} ><label><Link to={this.createMultipleURL(name,size)}><input type="checkbox" className="checkbox" checked={arr.includes(`${size}`)} readOnly/><span className="checkbox-custom"></span></Link> <span className="label" >{size}</span></label></li>})}</div>)
    nodesArr.push(<div className="list-2" key={2}>{sizes.map((size,index) => {if(index >= sizes.length/2)return <li key={index} ><label><Link to={this.createMultipleURL(name,size)}><input type="checkbox" className="checkbox" checked={arr.includes(`${size}`)} readOnly/><span className="checkbox-custom"></span></Link> <span className="label">{size}</span></label></li>})}</div>)
    return nodesArr;
  }


  render(){

    if(!this.state.filters){
      return null;
    }
    this.searchParams = new URLSearchParams(window.location.search);

    return(      
    <section className="sidebar" ref={element => this.sidebar = element}>
        <section className="sidebar__division">
          <div className="sidebar__catalogue-list" >
            <div className="sidebar__division-title" ref={element => this.type = element} onClick={this.toggleView}>
              <h3>Каталог</h3><div className="opener-up"></div>
            </div>
            <ul>
              {this.state.filters.type.map((filter,index) => <li key={index} onClick={this.chooseFilter} className={this.searchParams.get('type') === filter ? 'chosen' : ''}><Link to={'/catalogue' + `${createURL('type',filter)}`}>{filter}</Link></li>)}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-1"></div>
        <section className="sidebar__division">
            <div className="sidebar__price"  >
              <div className="sidebar__division-title" ref={element => this.price = element} onClick={this.toggleView}>
                <h3>Цена</h3><div className="opener-up"></div>
              </div>
              <div className="price-slider">
                <div className="circle-container">
                  <div className="circle-1"></div>
                  <div className="line-white"></div>
                  <div className="line-colored"></div>
                  <div className="circle-2"></div>
                </div>
                <div className="counter">
                  <input type="text" className="input-1" defaultValue="1000"/>
                  <div className="input-separator"></div>
                  <input type="text" className="input-2" defaultValue="30 000"/>
                </div>
              </div>
            </div>
        </section>
        <div className="separator-150 separator-150-2"></div>
        <section className="sidebar__division">
          <div className="sidebar__color">
            <div className="sidebar__division-title"  ref={element => this.color = element} onClick={this.toggleView}>
              <h3>Цвет</h3><div className="opener-up"></div>
            </div>
            <ul>
              { this.state.filters.color.map(this.fillColors)}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-3"></div>         
        <section className="sidebar__division">
          <div className="sidebar__size" >
            <div className="sidebar__division-title" ref={element => this.size = element} onClick={this.toggleView}>
              <h3>Размер</h3><div className="opener-up"></div>
            </div>
            <ul>
                {this.fillSizes(this.state.filters.sizes,'size[]')}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-4"></div>         
        <section className="sidebar__division">    
          <div className="sidebar__heel-height" >
            <div className="sidebar__division-title" ref={element => this.heelSize = element} onClick={this.toggleView}>
              <h3>Размер каблука</h3><div className="opener-up"></div>
            </div>
            <ul>
               {this.fillSizes(this.state.filters.heelSize,'heelSize[]')} 
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-5"></div>            
        <section className="sidebar__division">  
          <div className="sidebar__occasion" >
            <div className="sidebar__division-title" ref={element => this.reason = element} onClick={this.toggleView}>
              <h3>Повод</h3><div className="opener-up"></div>
            </div>
            <ul>
              { this.state.filters.reason.map((filter,index) => <li key={index} onClick={this.chooseFilter} className={this.searchParams.get('reason') === filter ? 'chosen' : ''}><Link to={'/catalogue' + `${createURL('reason',filter)}`}>{filter}</Link></li>)} 
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-6"></div>       
        <section className="sidebar__division">
          <div className="sidebar__season" >
            <div className="sidebar__division-title" ref={element => this.season = element} onClick={this.toggleView}>
              <h3>Сезон</h3><div className="opener-up"></div>
            </div>
            <ul>
              {this.state.filters.season.map((filter,index) => <li  key={index} onClick={this.chooseFilter} className={this.searchParams.get('season') === filter ? 'chosen' : ''}><Link to={'/catalogue' + `${createURL('season',filter)}`}>{filter}</Link></li>)}
            </ul>
          </div>
        </section>
        <div className="separator-150 separator-150-7"></div>            
        <section className="sidebar__division">
            <div className="sidebar__brand">
              <h3>Бренд</h3>
              <form action="post" className="brand-search">
                <input type="search" className="brand-search" id="brand-search" placeholder="Поиск" onChange={event => this.setState({searchVal:event.currentTarget.value})}/>
                <Link to={this.state.searchVal.length ? '?search=' + this.state.searchVal : '/catalogue'}><input className="submit"/></Link>
              </form>
            </div>
              <Link to={createURL('discounted','true')}><label ><input type="checkbox" className="checkbox" name="checkbox-disc" checked={this.searchParams.has('discounted')} readOnly/><span className="checkbox-discount" ></span> <span className="text-discount">Со скидкой</span></label></Link>
          <div className="separator-240"></div>
        </section>
            
        <section className="sidebar__division">    
          <div className="drop-down">
            <Link to="/catalogue"><span className="drop-down-icon"></span>Сбросить</Link>
          </div>
        </section>
      </section> );
  }
}

export default Sidebar