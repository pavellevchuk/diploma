import React from 'react'
import {Link} from 'react-router-dom'
import Item from './Item.js'
import Pagination from './Pagination.js'
import Catalogue from './Catalogue.js'
import{headerTitle} from '../scripts/script.js'

class CatalogueFetcher extends React.Component{
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

  export default CatalogueFetcher