import React from 'react'
import Sidebar from './Sidebar.js'
import Item from './Item.js'
import Pagination from './Pagination.js'
import{headerTitle} from '../scripts/script.js'
import VisitedProducts from './VisitedProducts.js';
import Preloader from './Preloader.js'
import Breadcrumps from './Breadcrumps.js';

class CatalogueWithFetcher extends React.Component{
  constructor(props){
    super(props);
    this.url = 'https://api-neto.herokuapp.com/bosa-noga/products';
    this.state = {
      products: null,
      page : 1,
      isLoading: true
    }
  }

  componentDidMount(){
    this.fetchData(this.state.page);
  }

  fetchData = page => {
    this.setState({isLoading:true});
    fetch(`${this.url}?page=${page}&${window.location.search.replace('?','&')}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.setState({products:data,isLoading:false,pages:data.pages});
      }else throw new Error(data.message);
    });
  }


  render(){
    const {isLoading} = this.state;
    if(isLoading){
      return null;
    }

    let id = new URLSearchParams(window.location.search).get('categoryId');

    return(
  <div>
    <Preloader/>  
    <Breadcrumps paths={[{path:'/',name:'Главная'},{path:`/catalogue${id === null ?  '' : `?categoryId=${id}`}`,name:headerTitle()}]}/>
    <main className="product-catalogue"> {/* added clearfix in style-catalogue.css */}
    <Sidebar maxPrice={this.state.products.data[0].price}/>
      <section className="product-catalogue-content">
        <Catalogue page={this.state.page} changeCrump = {this.changeCrump}/>
      </section>
    </main>
    <section className="product-catalogue__overlooked-slider">
      <VisitedProducts products={this.props.visitedProducts}/>
    </section>
    </div>
    );
  }
}

class Catalogue extends React.Component{
  constructor(props){
    super(props);
    this.url = 'https://api-neto.herokuapp.com/bosa-noga/products';
    this.state = {
      products: null,
      isLoading : true,
      page:this.props.page,
      sortValue : '',
      headerTitle:''
    }
  }

  componentDidMount(){
    this.fetchData(this.props.page);
  }

  componentWillReceiveProps(props){
    this.fetchData(props.page);
  }

  fetchData = (page,withSort) => {
    this.setState({isLoading:true,page:page});
    let search = `?page=${page}&${window.location.search.replace('?','&')}${withSort?'&sortBy='+withSort:''}`;
    fetch(`${this.url}${search}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        let name = headerTitle();
        this.setState({products:data,isLoading:false,headerTitle:name});
      }else throw new Error(data.message);
    })
    .then(()=>this.sorting.value = withSort ? withSort : 'price');
  }

  sortBy = event => {
    this.fetchData(this.state.page,event.currentTarget.value);
  }

    render(){
      const {products,isLoading} = this.state, preloader = document.querySelector('.preloader_wrapper');
      if(isLoading){
        if(preloader) preloader.classList.remove('hidden');
        return null;
      } 
      preloader.classList.add('hidden');
        return(
      <div>
        <section className="product-catalogue__head">
          <div className="product-catalogue__section-title">
            <h2 className="section-name">{this.state.headerTitle}</h2><span className="amount">{products.goods} товаров</span>
          </div>
          <div className="product-catalogue__sort-by">
            <p className="sort-by">Сортировать</p>
            <select id="sorting" onChange={this.sortBy} ref={element => this.sorting = element}>
              <option value="price">по цене</option>
              <option value="popularity">по популярности</option>
              <option value="size">по размеру</option>
              <option value="brand">по производителю</option>
            </select>
          </div>
        </section>
        <section  className="product-catalogue__item-list">
          {products.data.map((product,index) => <Item data={product} key={index}/>)}
        </section>
          <Pagination pages={products.pages} fetchData={this.fetchData} page={this.state.page}/>
      </div>);
    }
}

export default CatalogueWithFetcher