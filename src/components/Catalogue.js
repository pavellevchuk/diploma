import React from 'react'
import SitePath from './SitePath.js'
import Sidebar from './Sidebar.js'
import Item from './Item.js'
import Pagination from './Pagination.js'
import{createURL} from '../scripts/script.js'
import VisitedProducts from './VisitedProducts.js';
import Preloader from './Preloader.js'

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


  headerTitle = () => {
    let searchParams = new URLSearchParams(window.location.search);
    switch (searchParams.get('categoryId')){
      case('12'):
        return 'Мужская обувь';
      case('13'):
        return 'Женская обувь';
      case('15'):
        return 'Детская обувь';
      default:
        return 'Все товары';
    }
  }



  render(){
    const {isLoading} = this.state;
    if(isLoading){
      return null;
    }

    return(
  <div>
    <Preloader/>  
    <SitePath/>
    <main className="product-catalogue"> {/* added clearfix in style-catalogue.css */}
    <Sidebar/>
      <section className="product-catalogue-content">
        <Catalogue page={this.state.page}/>
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
      sortValue : ''
    }
  }

  componentDidMount(){
    this.fetchData(this.props.page);
  }

  componentWillReceiveProps({page}){
    this.fetchData(page);
  }

  fetchData = (page,withSort) => {
    this.setState({isLoading:true,page:page});
    let search = `?page=${page}&${window.location.search.replace('?','&')}`;
    fetch(`${this.url}${search}`)
    .then(res => res.json())
    .then(data => {
      if(data.status === 'ok'){
        this.setState({products:data,isLoading:false});
      }else throw new Error(data.message);
    });
  }

  headerTitle = () => {
    let searchParams = new URLSearchParams(window.location.search);
    switch (searchParams.get('categoryId')){
      case('12'):
        return 'Мужская обувь';
      case('13'):
        return 'Женская обувь';
      case('15'):
        return 'Детская обувь';
      default:
        return 'Все товары';
    }
  }

  sortBy = event => {
    window.location.search = createURL('sortBy', event.currentTarget.value);
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
            <h2 className="section-name">{this.headerTitle()}</h2><span className="amount">{products.goods} товаров</span>
          </div>
          <div className="product-catalogue__sort-by">
            <p className="sort-by">Сортировать</p>
            <select id="sorting" onChange={this.sortBy} defaultValue={new URLSearchParams(window.location.search).get('sortBy')}>
              <option></option>
              <option value="popularity">по популярности</option>
              <option value="price">по цене</option>
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